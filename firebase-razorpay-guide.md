# Production-Ready Firebase & Razorpay Secure Integration Guide

This guide provides the full backend and frontend code to implement secure, automated payment processing using **Firebase Cloud Functions (v2)**, **Firestore Database**, and **Razorpay**.

This setup guarantees:
1. **Zero Fake Transactions**: Webhook signatures are validated using your cryptographic Webhook Secret, ensuring that only actual payments from Razorpay can trigger database upgrades.
2. **Robust Attribution**: The student's Firestore user ID (or Document ID) is passed inside Razorpay's `notes` object during order creation. It is securely returned in the webhook payload, allowing automated account activation.
3. **Backend-Generated Orders**: Orders are generated securely on the backend, preventing client-side price tampering.

---

## 1. Firebase Cloud Functions (Backend Code)

Create this structure in your Firebase projects' `functions` folder. Install dependencies first:
```bash
npm install razorpay crypto-js firebase-admin firebase-functions
```

### `functions/src/index.ts`

```typescript
import { onRequest, onCall, HttpsError } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import Razorpay from "razorpay";
import * as crypto from "crypto";

// Initialize Firebase Admin SDK
admin.initializeApp();
const db = admin.firestore();

// Lazy-loaded Razorpay Client to prevent initialization crashes if keys are temporarily missing
let razorpayClient: Razorpay | null = null;
function getRazorpayClient(): Razorpay {
  if (!razorpayClient) {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
      throw new HttpsError(
        "failed-precondition",
        "Razorpay API Keys are not configured in environment variables."
      );
    }
    razorpayClient = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  }
  return razorpayClient;
}

/**
 * 1. SECURE ORDER CREATION FUNCTION
 * This function is called from the frontend to generate a Razorpay Order ID.
 * The price is hardcoded or verified on the backend to prevent client-side manipulation.
 */
export const createRazorpayOrder = onCall({ cors: true }, async (request) => {
  // Ensure the user is authenticated via Firebase Auth
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Authentication is required to place an order.");
  }

  const uid = request.auth.uid;
  const amountInINR = 299; // Set package price on backend to prevent tampering
  
  try {
    const rzp = getRazorpayClient();
    
    const options = {
      amount: amountInINR * 100, // Razorpay works in paise (₹299 = 29900 paise)
      currency: "INR",
      receipt: `receipt_uid_${uid}_${Date.now()}`,
      notes: {
        document_id: uid, // Pass Firestore User/Document ID to correlate upon successful webhook
        email: request.auth.token.email || "",
      }
    };

    const order = await rzp.orders.create(options);
    
    return {
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency
    };
  } catch (error: any) {
    console.error("Error creating Razorpay Order:", error);
    throw new HttpsError("internal", error.message || "Failed to create payment order.");
  }
});

/**
 * 2. SECURE WEBHOOK HANDLER FOR PAYMENTS
 * Configured in Razorpay Dashboard to listen to `payment.captured` event.
 * Verifies webhook signature cryptographically and activates the user account.
 */
export const handleRazorpayWebhook = onRequest({ cors: true }, async (req, res) => {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("RAZORPAY_WEBHOOK_SECRET is not configured.");
    res.status(500).send("Webhook configuration error.");
    return;
  }

  const signature = req.headers["x-razorpay-signature"] as string;
  if (!signature) {
    console.warn("Rejected: Missing Webhook Signature.");
    res.status(400).send("Missing signature header.");
    return;
  }

  // Cryptographically verify the request payload matches the Razorpay signature
  const rawBody = (req as any).rawBody || JSON.stringify(req.body);
  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(rawBody)
    .digest("hex");

  if (signature !== expectedSignature) {
    console.error("Cryptographic Signature mismatch. Fake transaction attempt rejected.");
    res.status(400).send("Invalid webhook signature.");
    return;
  }

  const event = req.body;

  // We are only interested in 'payment.captured' (or 'order.paid')
  if (event.event === "payment.captured") {
    const paymentEntity = event.payload.payment.entity;
    
    // Extract notes containing our critical Firestore attribution data
    const notes = paymentEntity.notes;
    const documentId = notes?.document_id || notes?.userId;
    const paymentId = paymentEntity.id;
    const orderId = paymentEntity.order_id;
    const amountPaid = paymentEntity.amount / 100; // converted back to INR

    if (!documentId) {
      console.error("Critical Error: Webhook received without 'document_id' inside notes.", paymentEntity);
      res.status(400).send("No user ID found in metadata.");
      return;
    }

    try {
      const userRef = db.collection("users").doc(documentId);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        console.warn(`User document ${documentId} does not exist in Firestore. Creating record...`);
      }

      // Calculate future expiry date (e.g. 1 year from now)
      const expiry = new Date();
      expiry.setFullYear(expiry.getFullYear() + 1);

      // Atomically update subscription status and record transaction receipt
      await userRef.set({
        isPremium: true,
        subscriptionStatus: "active",
        expiryDate: expiry.toISOString().split("T")[0],
        paymentTxnId: paymentId,
        paymentOrderId: orderId,
        paymentDate: new Date().toISOString(),
        paymentStatus: "success",
        amountPaid: amountPaid
      }, { merge: true });

      console.log(`Successfully activated Premium subscription for User: ${documentId} via Razorpay Txn: ${paymentId}`);
      res.status(200).json({ status: "success", message: "User upgraded successfully" });
    } catch (error) {
      console.error("Database update failed during webhook handler:", error);
      res.status(500).send("Internal Database Error");
    }
  } else {
    // Acknowledge other event hooks politely so Razorpay doesn't keep retrying them
    res.status(200).json({ received: true });
  }
});
```

---

## 2. Frontend Client Integration (`index.html` or React Component)

Include the official Razorpay Checkout SDK script inside your `index.html`:
```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

Here is the secure client-side integration logic using Firebase modular v9/v10 SDK:

```javascript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const functions = getFunctions(app);

/**
 * Initiates the Secure Checkout Journey
 */
async function initiatePremiumCheckout() {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    alert("Please log in to continue with payment.");
    return;
  }

  try {
    console.log("Generating secure Razorpay order on backend...");
    // 1. Call the Firebase Cloud Function to create the order
    const createOrderCall = httpsCallable(functions, "createRazorpayOrder");
    const response = await createOrderCall();
    
    const { order_id, amount, currency } = response.data;

    // 2. Configure Razorpay checkout wizard options
    const options = {
      key: "YOUR_RAZORPAY_PUBLIC_KEY_ID", // Enter your Public API Key
      amount: amount, // Amount in paise
      currency: currency,
      name: "Mock Test Prep Academy",
      description: "Complete Syllabus Premium Membership Kit",
      image: "https://yourdomain.com/logo.png",
      order_id: order_id, // Pass order generated securely by cloud function
      
      handler: function (paymentResponse) {
        // This callback is called in the client. Note: We do NOT perform upgrades here!
        // The secure webhook handles database changes. We simply show a loading state
        // or poll the database until the webhook updates the status.
        console.log("Client-side payment callback received:", paymentResponse);
        alert("Payment completed successfully! Your subscription is being activated in the background...");
        
        // Reload or poll the database to update the UI
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      },
      prefill: {
        name: currentUser.displayName || "",
        email: currentUser.email || "",
      },
      notes: {
        document_id: currentUser.uid, // Also included here for double reference
      },
      theme: {
        color: "#f59e0b", // Custom Theme Amber Color accent
      },
    };

    // 3. Launch Checkout Overlay
    const rzp1 = new window.Razorpay(options);
    
    rzp1.on("payment.failed", function (failedResponse) {
      console.error("Payment transaction failed:", failedResponse.error);
      alert("Payment failed: " + failedResponse.error.description);
    });

    rzp1.open();

  } catch (error) {
    console.error("Checkout initialization aborted:", error);
    alert("Could not start checkout: " + error.message);
  }
}
```

---

## 3. How to Deploy & Configure Webhooks

### Step 1: Deploy Firebase Functions
Configure env secrets for your Firebase runtime, then deploy:
```bash
# Add secrets securely to Firebase Environment Manager
firebase functions:secrets:set RAZORPAY_KEY_ID="rzp_live_xxxx"
firebase functions:secrets:set RAZORPAY_KEY_SECRET="secret_xxxx"
firebase functions:secrets:set RAZORPAY_WEBHOOK_SECRET="webhook_secret_key_xxxx"

# Deploy Functions
firebase deploy --only functions
```

### Step 2: Configure Webhook in Razorpay Dashboard
1. Log in to your [Razorpay Dashboard](https://dashboard.razorpay.com).
2. Go to **Settings** > **Webhooks** > **Add New Webhook**.
3. Set the **Webhook URL** to your deployed Firebase Function URL:
   `https://handlerazorpaywebhook-<project-id>.a.run.app` (for V2 functions) or standard HTTP trigger URL.
4. Set the **Secret** to your chosen `RAZORPAY_WEBHOOK_SECRET` string.
5. In **Active Events**, select: **`payment.captured`**.
6. Click **Create Webhook**.
