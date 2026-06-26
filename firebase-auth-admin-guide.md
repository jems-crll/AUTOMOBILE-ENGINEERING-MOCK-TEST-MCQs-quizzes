# Production-Ready Firebase Auth & Role-Based Access Control Guide

This guide provides the complete, production-ready full-stack architecture, database design, frontend pages (`index.html` and `admin.html`), and Android WebView integration details for your Vercel-hosted Mock Test App.

---

## 1. Firestore Database Structure

We will design a secure and clean schema in Firestore. A flat root-level `users` collection is ideal, where each document's **ID** is the user's authenticated **UID** (not email) to ensure identity consistency.

### Collection: `users`
*   **Document ID**: `request.auth.uid` (User UID)
*   **Fields**:
    *   `uid`: `string` (Matches Document ID)
    *   `name`: `string` (e.g., `"Rahul Patil"`)
    *   `email`: `string` (e.g., `"student@example.com"`)
    *   `role`: `string` (`"student"` | `"admin"`)
    *   `subscriptionStatus`: `string` (`"active"` | `"inactive"`)
    *   `expiryDate`: `string` (ISO Date string, e.g., `"2027-06-25"`)

### Hardened Firestore Security Rules (`firestore.rules`)
To prevent unauthorized users from tampering with their role or editing subscription statuses directly from client SDKs, implement the following security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Default deny-all safety net
    match /{document=**} {
      allow read, write: if false;
    }

    // Helper functions
    function isSignedIn() {
      return request.auth != null;
    }

    function getUserData(userId) {
      return get(/databases/$(database)/documents/users/$(userId)).data;
    }

    function isAdmin() {
      return isSignedIn() && getUserData(request.auth.uid).role == "admin";
    }

    function isOwner(userId) {
      return isSignedIn() && request.auth.uid == userId;
    }

    // Rules for 'users' collection
    match /users/{userId} {
      // Allow users to read their own profile, or admins to view all profiles
      allow get: if isOwner(userId) || isAdmin();
      allow list: if isAdmin();

      // Only admins can create or update admin roles/subscriptions
      allow create: if isSignedIn() && (
        // A user can create their own profile during registration, but only with a "student" role and "inactive" subscription
        (isOwner(userId) && request.resource.data.role == "student" && request.resource.data.subscriptionStatus == "inactive") ||
        isAdmin()
      );

      allow update: if isSignedIn() && (
        // Students can only update their own non-sensitive details (like name)
        (isOwner(userId) && 
         request.resource.data.role == resource.data.role && 
         request.resource.data.subscriptionStatus == resource.data.subscriptionStatus &&
         request.resource.data.email == resource.data.email) ||
        // Admins can update any field
        isAdmin()
      );

      // Only admins can delete profiles
      allow delete: if isAdmin();
    }
  }
}
```

---

## 2. Shared Firebase Client Initialization (`firebase-config.js`)

To keep your codebase modular and avoid duplicating configuration, create a single config file that both `index.html` and `admin.html` import.

```javascript
// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  collection, 
  getDocs, 
  updateDoc 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { 
  auth, 
  db, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  doc, 
  getDoc, 
  collection, 
  getDocs, 
  updateDoc 
};
```

---

## 3. Student & Login Portal (`index.html`)

This page serves as a unified entry point. If the user is unauthenticated, it presents a beautiful, high-contrast dark login form. If authenticated as a `"student"`, it dynamically displays their personalized dashboard and mock tests.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mock Academy Portal</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500&display=swap">
  <style>
    body { font-family: 'Inter', sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col justify-between">

  <!-- Header -->
  <header class="border-b border-slate-900 bg-slate-950/80 backdrop-blur px-6 py-4 sticky top-0 z-50 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <!-- App Logo -->
      <div id="app-logo" class="h-9 w-9 bg-amber-500 rounded-xl flex items-center justify-center font-black text-slate-950 text-lg shadow-lg shadow-amber-500/20 cursor-pointer select-none">
        M
      </div>
      <span class="font-extrabold text-sm tracking-tight text-white uppercase">Mock Academy</span>
    </div>
    <div id="user-header-profile" class="hidden flex items-center gap-4">
      <span id="header-user-name" class="text-xs text-slate-300 font-semibold"></span>
      <button id="logout-btn" class="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 px-3 py-1.5 rounded-lg transition font-bold cursor-pointer">
        Logout
      </button>
    </div>
  </header>

  <!-- Main Content Wrapper -->
  <main class="flex-1 flex items-center justify-center p-6">
    
    <!-- 1. Beautiful Login View -->
    <div id="login-container" class="w-full max-w-md bg-slate-900 border border-slate-850 rounded-3xl p-8 shadow-2xl space-y-6">
      <div class="space-y-2 text-center">
        <h1 class="text-2xl font-black text-white tracking-tight">Access Student Portal</h1>
        <p class="text-xs text-slate-400">Sign in with your registered credentials</p>
      </div>

      <form id="login-form" class="space-y-4">
        <div class="space-y-1.5">
          <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">Email Address</label>
          <input type="email" id="login-email" required placeholder="name@example.com" class="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-amber-500 transition font-mono">
        </div>

        <div class="space-y-1.5">
          <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">Password</label>
          <input type="password" id="login-password" required placeholder="••••••••" class="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-amber-500 transition">
        </div>

        <div id="login-error" class="hidden text-[11px] text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-xl font-medium"></div>

        <button type="submit" class="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl transition cursor-pointer shadow-lg shadow-amber-500/15">
          Sign In
        </button>
      </form>
    </div>

    <!-- 2. Dynamic Student Dashboard View (Initially Hidden) -->
    <div id="dashboard-container" class="hidden w-full max-w-4xl space-y-8">
      
      <!-- Subscription Alert Banner -->
      <div id="sub-status-banner" class="p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border"></div>

      <!-- Syllabus / Mock Tests Container -->
      <div class="space-y-4">
        <div>
          <h2 class="text-lg font-extrabold text-white">Your Premium Mock Tests</h2>
          <p class="text-xs text-slate-400">Unlock your ultimate scoring potential</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Mock Test Card 1 -->
          <div class="bg-slate-900 border border-slate-850 p-5 rounded-2xl space-y-4 relative overflow-hidden group">
            <div class="space-y-1">
              <span class="text-[9px] bg-amber-500/15 text-amber-400 font-bold px-2 py-0.5 rounded border border-amber-500/25">MOCK TEST #1</span>
              <h3 class="text-sm font-bold text-white mt-1 group-hover:text-amber-400 transition">MPSC Rajya Seva Paper 1</h3>
              <p class="text-xs text-slate-400">General Studies full length 100 questions practice test.</p>
            </div>
            <div class="flex items-center justify-between pt-2 border-t border-slate-850">
              <span class="text-[10px] text-slate-500 font-mono">Duration: 120 Mins</span>
              <button class="test-btn px-4 py-1.5 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 text-xs font-bold rounded-lg transition cursor-pointer">
                Start Mock Test
              </button>
            </div>
          </div>

          <!-- Mock Test Card 2 -->
          <div class="bg-slate-900 border border-slate-850 p-5 rounded-2xl space-y-4 relative overflow-hidden group">
            <div class="space-y-1">
              <span class="text-[9px] bg-amber-500/15 text-amber-400 font-bold px-2 py-0.5 rounded border border-amber-500/25">MOCK TEST #2</span>
              <h3 class="text-sm font-bold text-white mt-1 group-hover:text-amber-400 transition">MPSC CSAT Practice Quiz</h3>
              <p class="text-xs text-slate-400">Logical reasoning and data interpretation tests.</p>
            </div>
            <div class="flex items-center justify-between pt-2 border-t border-slate-850">
              <span class="text-[10px] text-slate-500 font-mono">Duration: 90 Mins</span>
              <button class="test-btn px-4 py-1.5 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 text-xs font-bold rounded-lg transition cursor-pointer">
                Start Mock Test
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- Footer -->
  <footer class="border-t border-slate-900 bg-slate-950 py-4 text-center text-[10px] text-slate-500 font-mono">
    &copy; 2026 Mock Academy. Protected via Cryptographic Security Policies.
  </footer>

  <!-- Script logic interfacing with firebase-config -->
  <script type="module">
    import { 
      auth, 
      db, 
      signInWithEmailAndPassword, 
      signOut, 
      onAuthStateChanged,
      doc, 
      getDoc 
    } from "./firebase-config.js";

    const loginContainer = document.getElementById("login-container");
    const dashboardContainer = document.getElementById("dashboard-container");
    const loginForm = document.getElementById("login-form");
    const loginError = document.getElementById("login-error");
    const userHeaderProfile = document.getElementById("user-header-profile");
    const headerUserName = document.getElementById("header-user-name");
    const logoutBtn = document.getElementById("logout-btn");
    const subStatusBanner = document.getElementById("sub-status-banner");
    const testBtns = document.querySelectorAll(".test-btn");

    // Secure auth tracking session
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Fetch additional user role from Firestore
          const userSnap = await getDoc(doc(db, "users", user.uid));
          if (!userSnap.exists()) {
            await signOut(auth);
            showError("No database record associated with this account.");
            return;
          }

          const userData = userSnap.data();

          // 1. Role Check Redirect logic
          if (userData.role === "admin") {
            // Redirect admin to admin panel
            window.location.href = "./admin.html";
            return;
          }

          // 2. Setup Student View
          loginContainer.classList.add("hidden");
          dashboardContainer.classList.remove("hidden");
          userHeaderProfile.classList.remove("hidden");
          headerUserName.textContent = `Student: ${userData.name || user.email}`;

          // Display subscription status banner dynamically
          const isPremium = userData.subscriptionStatus === "active";
          if (isPremium) {
            subStatusBanner.className = "p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-emerald-500/20 bg-emerald-500/5 text-emerald-400";
            subStatusBanner.innerHTML = `
              <div class="space-y-1">
                <span class="text-xs font-extrabold uppercase tracking-wide">✨ Premium Access Active</span>
                <p class="text-xs text-slate-300">Your premium mock exams are unlocked. Premium Expiry: <span class="font-mono">${userData.expiryDate || 'N/A'}</span></p>
              </div>
              <span class="text-[10px] bg-emerald-500 text-slate-950 font-black px-3 py-1 rounded-full uppercase self-start sm:self-auto shadow-md">Unlocked</span>
            `;
            testBtns.forEach(btn => btn.removeAttribute("disabled"));
          } else {
            subStatusBanner.className = "p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-amber-500/20 bg-amber-500/5 text-amber-400";
            subStatusBanner.innerHTML = `
              <div class="space-y-1">
                <span class="text-xs font-extrabold uppercase tracking-wide">⚠️ Subscription Inactive</span>
                <p class="text-xs text-slate-300">Upgrade to active membership to start testing with premium MPSC exams.</p>
              </div>
              <button class="bg-amber-500 text-slate-950 px-4 py-1.5 rounded-xl text-xs font-black self-start sm:self-auto hover:bg-amber-600 transition shadow-md">Unlock Full Access</button>
            `;
            testBtns.forEach(btn => btn.setAttribute("disabled", "true"));
          }

        } catch (err) {
          console.error("Profile resolution error:", err);
          showError("System error retrieving your roles. Please retry.");
        }
      } else {
        // User not logged in, show login screen
        loginContainer.classList.remove("hidden");
        dashboardContainer.classList.add("hidden");
        userHeaderProfile.classList.add("hidden");
      }
    });

    // Login Form processing Handler
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      loginError.classList.add("hidden");
      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value;

      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        showError("Invalid email or password. Verify credentials.");
      }
    });

    // Logout trigger
    logoutBtn.addEventListener("click", () => signOut(auth));

    function showError(msg) {
      loginError.textContent = msg;
      loginError.classList.remove("hidden");
    }

    // --- Android Hidden Admin Trigger Option ---
    let clickCount = 0;
    const logo = document.getElementById("app-logo");
    logo.addEventListener("click", () => {
      clickCount++;
      if (clickCount >= 5) {
        clickCount = 0;
        const confirmGo = confirm("Admin Access Portal Detected! Do you want to open the Admin Portal login?");
        if (confirmGo) {
          window.location.href = "./admin.html";
        }
      }
    });
  </script>
</body>
</html>
```

---

## 4. Secure Role-Based Admin Panel (`admin.html`)

This page is locked down cryptographically. Upon rendering, it validates if a user is both signed in and has `role === "admin"`. If a non-authorized user (like a student) attempts to access this, the page clears the body content, displays a modern "Access Denied" view, and redirects them to the login.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Panel - Mock Academy</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500&display=swap">
  <style>
    body { font-family: 'Inter', sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen">

  <!-- Full Guard Overlay (Securing screen flicker) -->
  <div id="guard-overlay" class="fixed inset-0 bg-slate-950 z-[100] flex items-center justify-center flex-col space-y-4">
    <div class="h-10 w-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
    <p class="text-xs text-slate-400 tracking-wider uppercase font-mono">Authorizing admin clearance...</p>
  </div>

  <!-- Denied View (Initially Hidden) -->
  <div id="denied-view" class="hidden fixed inset-0 bg-slate-950 z-[200] flex items-center justify-center p-6">
    <div class="text-center space-y-4 max-w-sm">
      <div class="h-14 w-14 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold">⚠️</div>
      <h1 class="text-xl font-black text-white">ACCESS DENIED</h1>
      <p class="text-xs text-slate-400">Your profile credentials do not have administrative privilege permissions. Relocating back to Student Login.</p>
    </div>
  </div>

  <!-- Main Dashboard (Initially Blocked) -->
  <div id="admin-dashboard" class="hidden">
    <!-- Header -->
    <header class="border-b border-slate-900 bg-slate-950/80 backdrop-blur px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="h-9 w-9 bg-red-500 rounded-xl flex items-center justify-center font-black text-slate-950 text-sm shadow-lg shadow-red-500/20">
          ADM
        </div>
        <div>
          <span class="font-extrabold text-sm tracking-tight text-white uppercase block">Mock Academy</span>
          <span class="text-[9px] text-red-400 font-mono font-bold tracking-widest uppercase">System Console</span>
        </div>
      </div>
      <button id="admin-logout" class="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 px-3 py-1.5 rounded-lg transition font-bold cursor-pointer">
        Logout Console
      </button>
    </header>

    <!-- Content Area -->
    <main class="max-w-6xl mx-auto p-6 space-y-6">
      
      <!-- Statistics overview row -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-slate-900 border border-slate-850 p-5 rounded-2xl">
          <span class="text-[10px] text-slate-500 uppercase font-bold tracking-wide">Security Mode</span>
          <p class="text-lg font-black text-emerald-400 mt-1">Firestore Rules Enabled</p>
        </div>
        <div class="bg-slate-900 border border-slate-850 p-5 rounded-2xl">
          <span class="text-[10px] text-slate-500 uppercase font-bold tracking-wide">Registered Accounts</span>
          <p id="total-students-count" class="text-lg font-black text-white mt-1 font-mono">0</p>
        </div>
        <div class="bg-slate-900 border border-slate-850 p-5 rounded-2xl">
          <span class="text-[10px] text-slate-500 uppercase font-bold tracking-wide">Database Sync</span>
          <p class="text-lg font-black text-amber-400 mt-1">Firestore Cloud Live</p>
        </div>
      </div>

      <!-- Students Table -->
      <div class="bg-slate-900 border border-slate-850 rounded-2xl overflow-hidden">
        <div class="p-5 border-b border-slate-850 flex items-center justify-between">
          <h2 class="text-sm font-extrabold text-white uppercase tracking-wider">Students Subscriptions Directory</h2>
          <span class="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20 font-bold">Write Permissions Secured</span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs border-collapse">
            <thead>
              <tr class="bg-slate-950/50 text-slate-400 border-b border-slate-850">
                <th class="p-4 font-bold uppercase tracking-wider">Student Name</th>
                <th class="p-4 font-bold uppercase tracking-wider">Email Address</th>
                <th class="p-4 font-bold uppercase tracking-wider">Subscription Status</th>
                <th class="p-4 font-bold uppercase tracking-wider">Expiry Date</th>
                <th class="p-4 font-bold uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody id="students-table-body" class="divide-y divide-slate-850">
              <!-- Dynamically populated rows -->
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>

  <script type="module">
    import { 
      auth, 
      db, 
      signOut, 
      onAuthStateChanged,
      doc, 
      getDoc, 
      collection, 
      getDocs, 
      updateDoc 
    } from "./firebase-config.js";

    const guardOverlay = document.getElementById("guard-overlay");
    const deniedView = document.getElementById("denied-view");
    const adminDashboard = document.getElementById("admin-dashboard");
    const studentsTableBody = document.getElementById("students-table-body");
    const totalStudentsCount = document.getElementById("total-students-count");

    // Secure Role Verification on Auth state change
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        redirectToLogin();
        return;
      }

      try {
        // Query user document in Firestore securely to check role
        const userDocRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDocRef);

        if (!userSnap.exists() || userSnap.data().role !== "admin") {
          triggerAccessDenied();
          return;
        }

        // Passed Auth & Authorization! Unblock viewport
        guardOverlay.classList.add("hidden");
        adminDashboard.classList.remove("hidden");

        // Load students database
        fetchStudentsList();

      } catch (err) {
        console.error("Auth security screening error:", err);
        triggerAccessDenied();
      }
    });

    /**
     * Retrieves all student records from Firestore
     */
    async function fetchStudentsList() {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        studentsTableBody.innerHTML = "";
        
        let count = 0;
        querySnapshot.forEach((docSnap) => {
          const user = docSnap.data();
          
          // Only show students in this table
          if (user.role === "student") {
            count++;
            const isPremium = user.subscriptionStatus === "active";
            const row = document.createElement("tr");
            row.className = "hover:bg-slate-900/40 transition";
            row.innerHTML = `
              <td class="p-4 font-bold text-white">${user.name || 'Anonymous'}</td>
              <td class="p-4 font-mono text-slate-400">${user.email}</td>
              <td class="p-4">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold border ${
                  isPremium 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                    : 'bg-slate-800 text-slate-500 border-slate-700'
                }">
                  ${user.subscriptionStatus.toUpperCase()}
                </span>
              </td>
              <td class="p-4 font-mono text-slate-400">${user.expiryDate || 'N/A'}</td>
              <td class="p-4 text-right">
                ${isPremium ? `
                  <button class="cancel-sub-btn bg-red-500/10 hover:bg-red-500 hover:text-slate-950 text-red-400 border border-red-500/25 px-3 py-1.5 rounded-lg text-[11px] font-black transition cursor-pointer select-none" data-uid="${docSnap.id}">
                    Cancel Subscription
                  </button>
                ` : `
                  <button class="activate-sub-btn bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-3 py-1.5 rounded-lg text-[11px] font-black transition cursor-pointer select-none" data-uid="${docSnap.id}">
                    Activate Access
                  </button>
                `}
              </td>
            `;
            studentsTableBody.appendChild(row);
          }
        });

        totalStudentsCount.textContent = count;

        // Bind Action buttons events dynamically
        bindSubscriptionActionButtons();

      } catch (err) {
        console.error("Failed to read students collections:", err);
        alert("Failed to retrieve directory. Please check Firestore security rules configuration.");
      }
    }

    /**
     * Binds subscription upgrade and cancellation click actions
     */
    function bindSubscriptionActionButtons() {
      // 1. Cancel Sub Click
      document.querySelectorAll(".cancel-sub-btn").forEach(btn => {
        btn.addEventListener("click", async (e) => {
          const uid = e.target.getAttribute("data-uid");
          if (confirm("Cancel this subscription? Student's premium mock exams will immediately lock.")) {
            await updateStudentSubscriptionStatus(uid, "inactive");
          }
        });
      });

      // 2. Activate Sub Click
      document.querySelectorAll(".activate-sub-btn").forEach(btn => {
        btn.addEventListener("click", async (e) => {
          const uid = e.target.getAttribute("data-uid");
          if (confirm("Unlock premium access for this student?")) {
            await updateStudentSubscriptionStatus(uid, "active");
          }
        });
      });
    }

    /**
     * Dynamic database update function that modifies Firestore values
     */
    async function updateStudentSubscriptionStatus(uid, status) {
      try {
        const userDocRef = doc(db, "users", uid);
        const nextExpiry = status === "active" 
          ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0] // 1 year expiry
          : "";

        // Update the Firestore document directly
        await updateDoc(userDocRef, {
          subscriptionStatus: status,
          expiryDate: nextExpiry
        });

        alert(`Subscription updated successfully to: ${status.toUpperCase()}!`);
        // Refresh directory table
        fetchStudentsList();
      } catch (err) {
        console.error("Firestore write permission denied:", err);
        alert("Error modifying document. Verify your Firebase Rules policies restrict students.");
      }
    }

    // Handle logout triggers
    document.getElementById("admin-logout").addEventListener("click", () => {
      signOut(auth).then(() => redirectToLogin());
    });

    function triggerAccessDenied() {
      guardOverlay.classList.add("hidden");
      deniedView.classList.remove("hidden");
      setTimeout(() => redirectToLogin(), 3500);
    }

    function redirectToLogin() {
      window.location.href = "./index.html";
    }
  </script>
</body>
</html>
```

---

## 5. Android App WebView Integration

Running this Vercel configuration inside an Android WebView is extremely straightforward, provided you configure cookies and DOM Storage to ensure Firebase keeps user sessions persistent across restarts.

### 1. Android WebView Configuration (Kotlin / Compose)
Make sure your Activity class configures DOM Storage and Cookie managers correctly:

```kotlin
import android.os.Bundle
import android.webkit.CookieManager
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity

class PortalActivity : AppCompatActivity() {
    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        webView = WebView(this)
        setContentView(webView)

        val settings = webView.settings
        settings.javaScriptEnabled = true // Enable JavaScript execution
        settings.domStorageEnabled = true // REQUIRED for Firebase Auth Persistency (IndexedDB/localStorage)
        settings.databaseEnabled = true
        settings.loadWithOverviewMode = true
        settings.useWideViewPort = true

        // Ensure third-party cookies are allowed for seamless secure authentication
        val cookieManager = CookieManager.getInstance()
        cookieManager.setAcceptCookie(true)
        cookieManager.setAcceptThirdPartyCookies(webView, true)

        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                if (url != null && url.startsWith("https://your-vercel-app.vercel.app")) {
                    view?.loadUrl(url)
                    return true
                }
                return false
            }
        }

        webView.loadUrl("https://your-vercel-app.vercel.app/index.html")
    }
}
```

### 2. Secret Activation Button logic explained
The secret click handler is already active on `index.html`! Inside the `M` logo (`#app-logo` component):
```javascript
let clickCount = 0;
const logo = document.getElementById("app-logo");
logo.addEventListener("click", () => {
  clickCount++;
  if (clickCount >= 5) {
    clickCount = 0;
    const confirmGo = confirm("Admin Access Portal Detected! Do you want to open the Admin Portal login?");
    if (confirmGo) {
      window.location.href = "./admin.html";
    }
  }
});
```
When students use the Android App, they simply see the logo as part of the decorative dashboard header. However, if you (the Admin) tap the **logo 5 times consecutively**, the app triggers a prompt to open `admin.html`. After logging in as an admin, you can manage all user records directly from your Android phone!
