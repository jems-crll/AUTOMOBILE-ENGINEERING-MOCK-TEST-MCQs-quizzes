import React, { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import { User, StateLanguage, SubscriptionPlan } from "../types";

interface RazorpayModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onPaymentSuccess: (updatedUser: User) => void;
  selectedLanguage: StateLanguage;
}

export default function RazorpayModal({
  isOpen,
  onClose,
  currentUser,
  onPaymentSuccess,
  selectedLanguage,
}: RazorpayModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("omto_subscription_plans");
    if (stored) {
      const parsed = JSON.parse(stored);
      setPlans(parsed);
      setSelectedPlan(parsed[0]);
    } else {
      const defaults: SubscriptionPlan[] = [
        { id: "1", name: "1 Month", price: 100, durationMonths: 1 },
        { id: "2", name: "2 Months", price: 200, durationMonths: 2 },
        { id: "3", name: "4 Months", price: 300, durationMonths: 4 }
      ];
      setPlans(defaults);
      setSelectedPlan(defaults[0]);
    }
  }, []);

  // Form input states
  const [txnId, setTxnId] = useState("");
  const [txnError, setTxnError] = useState("");
  const [hasOpenedLink, setHasOpenedLink] = useState(false);

  const isMarathi = selectedLanguage.code === "mr";

  if (!isOpen) return null;

  const handleOpenPaymentLink = async () => {
    setIsProcessing(true);
    setTxnError("");
    if (!selectedPlan) {
      setTxnError(isMarathi ? "कृपया एक प्लॅन निवडा." : "Please select a plan.");
      setIsProcessing(false);
      return;
    }
    try {
      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: selectedPlan.price * 100, // INR in paise
          currency: "INR",
          notes: {
            email: currentUser.email,
            document_id: currentUser.email,
            plan_id: selectedPlan.id
          }
        })
      });

      if (!res.ok) {
        throw new Error("Failed to generate secure order ID");
      }

      const orderData = await res.json();
      console.log("Secure order created on backend:", orderData);

      // Check if Razorpay Checkout script is loaded
      if (typeof (window as any).Razorpay === "undefined") {
        console.warn("Razorpay script not loaded. Falling back to UPI landing page.");
        window.open("https://razorpay.me/@hinajavedsayyad", "_blank", "noopener,noreferrer");
        setHasOpenedLink(true);
        setIsProcessing(false);
        return;
      }

      const options = {
        key: orderData.keyId || "rzp_test_mock_keys_123",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Automobile Engg. Premium",
        description: "Bilingual Automobile Premium Pack",
        order_id: orderData.isSimulated ? undefined : orderData.id,
        handler: async function (response: any) {
          console.log("Razorpay Checkout payment response:", response);
          setIsProcessing(true);
          
          try {
            await fetch("/api/razorpay/admin-verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: currentUser.email,
                paymentId: response.razorpay_payment_id
              })
            });

            setTxnId(response.razorpay_payment_id);
            setPaymentSuccess(true);

            try {
              const usersDbStr = localStorage.getItem("omto_users_db");
              if (usersDbStr) {
                const db = JSON.parse(usersDbStr);
                const emailKey = currentUser.email.trim().toLowerCase();
                if (db[emailKey]) {
                  db[emailKey].isPremium = true;
                  db[emailKey].paymentTxnId = response.razorpay_payment_id;
                  db[emailKey].paymentDate = new Date().toISOString();
                  
                  // Calculate new expiry date
                  const expiryDate = new Date();
                  expiryDate.setMonth(expiryDate.getMonth() + (selectedPlan?.durationMonths || 1));
                  db[emailKey].expiryDate = expiryDate.toISOString().split("T")[0];
                  
                  localStorage.setItem("omto_users_db", JSON.stringify(db));
                }
              }
            } catch (e) {
              console.error(e);
            }

            const updatedUser: User = {
              ...currentUser,
              isPremium: true,
            };
            localStorage.setItem("omto_current_user", JSON.stringify(updatedUser));
            
            setTimeout(() => {
              onPaymentSuccess(updatedUser);
              onClose();
            }, 2000);

          } catch (verifyErr) {
            console.error("Verification failed:", verifyErr);
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: currentUser.username || "",
          email: currentUser.email || ""
        },
        notes: {
          email: currentUser.email,
          document_id: currentUser.email
        },
        theme: {
          color: "#f59e0b"
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (resp: any) {
        console.error("Razorpay Payment Failed:", resp.error);
        setTxnError(isMarathi ? "पेमेंट अयशस्वी झाले. कृपया पुन्हा प्रयत्न करा." : `Payment failed: ${resp.error.description}`);
      });
      rzp.open();
      setHasOpenedLink(true);
    } catch (err: any) {
      console.error("Error creating payment:", err);
      window.open("https://razorpay.me/@hinajavedsayyad", "_blank", "noopener,noreferrer");
      setHasOpenedLink(true);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVerifyPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setTxnError("");

    const trimmedTxn = txnId.trim();

    if (!trimmedTxn) {
      setTxnError(
        isMarathi
          ? "कृपया युपीआय संदर्भ क्रमांक (UPI Ref No) किंवा पेमेंट आयडी प्रविष्ट करा."
          : "Please enter your UPI Reference Number / Transaction ID."
      );
      return;
    }

    if (!isConfirmed) {
      setTxnError(
        isMarathi
          ? "कृपया खात्री करण्यासाठी वरील चेकबॉक्सवर टिक करा."
          : "Please check the confirmation box to verify your payment."
      );
      return;
    }

    const isUtr = /^\d{12}$/.test(trimmedTxn);
    const isRazorpay = /^pay_[a-zA-Z0-9]{14}$/.test(trimmedTxn);

    if (!isUtr && !isRazorpay) {
      setTxnError(
        isMarathi
          ? "अवैध फॉरमॅट! युपीआय संदर्भ क्रमांक (UTR) अचूक १२ अंकी नंबर असावा (उदा. ४३१०२८४९३०१९) किंवा Razorpay आयडी 'pay_' ने सुरू होणारा १८ अंकी असावा."
          : "Invalid format! UPI Reference Number (UTR) must be exactly 12 digits (e.g. 431028493019) or Razorpay ID starting with 'pay_'."
      );
      return;
    }

    if (isUtr) {
      const isRepeating = /^(\d)\1{11}$/.test(trimmedTxn);
      const isSequential = "123456789012".includes(trimmedTxn) || "012345678901".includes(trimmedTxn) || "987654321012".includes(trimmedTxn);
      const isDummyPattern = ["000000000000", "111111111111", "123456789012", "123456789000", "987654321000"].includes(trimmedTxn);

      if (isRepeating || isSequential || isDummyPattern) {
        setTxnError(
          isMarathi
            ? "हा अवैध किंवा डमी संदर्भ क्रमांक वाटतो आहे! कृपया तुमच्या पेमेंट स्क्रीनशॉटमधील अचूक १२ अंकी UTR नंबर टाका."
            : "This looks like a fake or placeholder UPI Ref No! Please enter the actual 12-digit UTR from your receipt."
        );
        return;
      }
    }

    setIsProcessing(true);

    try {
      console.log("Fetching verification status for:", currentUser.email);
      const url = `${window.location.origin}/api/razorpay/check-verification?email=${encodeURIComponent(currentUser.email)}`;
      console.log("Fetching from URL:", url);
      const checkRes = await fetch(url);
      console.log("Check verification response:", checkRes.status, checkRes.statusText);
      if (!checkRes.ok) throw new Error(`Could not reach verification service: ${checkRes.status} ${checkRes.statusText}`);
      const checkData = await checkRes.json();

      if (checkData.verified) {
        setPaymentSuccess(true);
      } else {
        const verifyRes = await fetch(`${window.location.origin}/api/razorpay/admin-verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: currentUser.email,
            paymentId: trimmedTxn
          })
        });
        if (!verifyRes.ok) throw new Error("Failed to submit verification request.");
        setPaymentSuccess(true);
      }

      try {
        const usersDbStr = localStorage.getItem("omto_users_db");
        if (usersDbStr) {
          const db = JSON.parse(usersDbStr);
          const emailKey = currentUser.email.trim().toLowerCase();
          if (db[emailKey]) {
            db[emailKey].isPremium = true;
            db[emailKey].paymentTxnId = trimmedTxn;
            db[emailKey].paymentDate = new Date().toISOString();
            
            // Calculate new expiry date
            const expiryDate = new Date();
            expiryDate.setMonth(expiryDate.getMonth() + (selectedPlan?.durationMonths || 1));
            db[emailKey].expiryDate = expiryDate.toISOString().split("T")[0];
            
            localStorage.setItem("omto_users_db", JSON.stringify(db));
          }
        }
      } catch (e) {
        console.error("Failed to update db status:", e);
      }

      const updatedUser: User = {
        ...currentUser,
        isPremium: true,
      };
      localStorage.setItem("omto_current_user", JSON.stringify(updatedUser));

      setTimeout(() => {
        onPaymentSuccess(updatedUser);
        onClose();
      }, 2500);

    } catch (e: any) {
      console.error("Payment verification error:", e);
      setTxnError(isMarathi 
        ? `पडताळणी दरम्यान त्रुटी आली: ${e.message || "कृपया पुन्हा प्रयत्न करा."}` 
        : `Verification error: ${e.message || "Please try again."}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl animate-fade-in text-slate-100 overflow-y-auto max-h-[90vh] custom-scrollbar">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Icons.Crown className="h-5 w-5 text-amber-500 fill-amber-500/10" />
            <h3 className="font-extrabold text-white text-lg font-sans">
              {isMarathi ? "प्रीमियम पॅक अनलॉक करा" : "Unlock Premium Features"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <Icons.X className="h-5 w-5" />
          </button>
        </div>

        {/* Success Screen */}
        {paymentSuccess ? (
          <div className="py-8 text-center flex flex-col items-center justify-center space-y-4 animate-scale-up">
            <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center text-3xl shadow-lg">
              <Icons.Check className="h-8 w-8 stroke-[3]" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white mb-1">
                {isMarathi ? "पेमेंट यशस्वीरित्या सबमिट झाले!" : "Payment Verified Successfully!"}
              </h4>
              <p className="text-xs text-slate-400 px-4">
                {isMarathi 
                  ? "तुमचे प्रीमियम सबस्क्रिप्शन सुरू करण्यात आले आहे. सर्व प्रगत सराव संच, उत्तरे आणि स्पष्टीकरणे अनलॉक झाले आहेत!" 
                  : "Your Premium access is now fully active. All advanced sets, answers, and detailed explanations are unlocked!"}
              </p>
            </div>
            <div className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg text-[10px] font-mono uppercase tracking-widest font-bold flex flex-col gap-0.5">
              <span>{isMarathi ? "सक्रिय आयडी:" : "ACTIVATION ID:"}</span>
              <span className="text-white select-all">{txnId || "PROMO_OMTO"}</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            
            {/* Package details */}
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {isMarathi ? "प्लॅन निवडा" : "Select Subscription Plan"}
              </p>
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan)}
                  className={`w-full p-4 border rounded-2xl flex justify-between items-center transition ${
                    selectedPlan?.id === plan.id
                      ? "bg-amber-500/10 border-amber-500"
                      : "bg-slate-950 border-slate-850 hover:border-slate-700"
                  }`}
                >
                  <div>
                    <p className="font-bold text-slate-100">{plan.name}</p>
                    <p className="text-xs text-slate-400">{plan.durationMonths} {isMarathi ? "महिने" : "Months"}</p>
                  </div>
                  <p className="font-black text-white text-lg">₹{plan.price}</p>
                </button>
              ))}
            </div>

            {/* User info */}
            <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 overflow-hidden max-w-[200px]">
                  <Icons.User className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                  <span className="truncate">{currentUser.email}</span>
                </span>
                <span className="font-mono text-[10px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded shrink-0">
                  ORDER_OMTO_{selectedPlan?.id}
                </span>
              </div>

            {/* Instruction Banner */}
            <div className="bg-amber-500/5 border border-amber-500/20 p-3 rounded-2xl space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
                <Icons.AlertCircle className="h-4 w-4" />
                <span>{isMarathi ? "पेमेंट सूचना" : "Payment Instructions"}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {isMarathi
                  ? `प्रीमियम फीचर्स वापरण्यासाठी खालील लिंकवर क्लिक करून ₹${selectedPlan?.price} पेमेंट पूर्ण करा आणि पेमेंट पूर्ण झाल्यावर तिथे मिळालेला संदर्भ (UPI Ref No/UTR/Txn ID) क्रमांक खाली टाकून पडताळणी करा.`
                  : `To unlock premium features, click the button below to complete your payment of ₹${selectedPlan?.price}. After paying, enter your transaction reference number (UPI Ref No/UTR/Txn ID) below to verify.`}
              </p>
            </div>

            {/* Step 1: Open Payment Link */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {isMarathi ? "पायरी १: पेमेंट करा" : "Step 1: Open Payment Link"}
              </span>
              <button
                type="button"
                onClick={handleOpenPaymentLink}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-500/10"
              >
                <Icons.ExternalLink className="h-4 w-4" />
                <span>{isMarathi ? `Razorpay वर ₹${selectedPlan?.price} भरा` : `Pay ₹${selectedPlan?.price} on Razorpay`}</span>
              </button>
              <p className="text-[9.5px] text-slate-500 text-center">
                {isMarathi 
                  ? "लिंक सुरक्षित Razorpay पेमेंट पेजवर (https://razorpay.me/@hinajavedsayyad) उघडेल." 
                  : "Opens secure Razorpay payment page at https://razorpay.me/@hinajavedsayyad"}
              </p>
            </div>

            {/* Step 2: Verify Payment Form */}
            <form onSubmit={handleVerifyPayment} className="space-y-3 pt-1 border-t border-slate-800/60">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {isMarathi ? "पायरी २: संदर्भ क्रमांक टाका" : "Step 2: Enter Reference Number"}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icons.Key className="h-4 w-4 text-slate-500" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder={isMarathi ? "उदा. १२ अंकी UPI Ref No किंवा UTR क्रमांक" : "e.g. 12-digit UPI Ref/UTR No"}
                    value={txnId}
                    onChange={(e) => {
                      setTxnId(e.target.value);
                      if (txnError) setTxnError("");
                    }}
                    className="w-full bg-slate-950 border border-slate-850 focus:border-emerald-500 text-slate-100 rounded-xl pl-9 pr-3 py-2.5 text-xs focus:outline-none transition font-mono uppercase"
                  />
                </div>
                {txnError && <p className="text-[10px] text-red-400 font-semibold">{txnError}</p>}
                <p className="text-[9.5px] text-slate-500">
                  {isMarathi 
                    ? "पेमेंट केल्यावर तुमच्या Google Pay/PhonePe/Paytm किंवा बँक पावतीमधील १२-अंकी UTR किंवा Razorpay ID प्रविष्ट करा." 
                    : "Enter the 12-digit UPI Reference / UTR Number or Razorpay Payment ID from your receipt."}
                </p>
              </div>

              {/* Strict manual verification warning notice */}
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl space-y-1">
                <div className="flex items-center gap-1.5 text-red-400 text-[10px] font-bold">
                  <Icons.AlertTriangle className="h-3.5 w-3.5" />
                  <span>{isMarathi ? "दक्षता घ्या (Security Audit)" : "Security & Anti-Fraud Notice"}</span>
                </div>
                <p className="text-[9.5px] text-slate-300 leading-relaxed font-sans">
                  {isMarathi
                    ? "पेमेंटची सत्यता बँक खात्यासोबत मॅन्युअली तपासली जाते. चुकीचा किंवा बनावट (Fake/Duplicate) UTR क्रमांक टाकल्यास तुमचे खाते त्वरित आणि कायमचे ब्लॉक केले जाईल."
                    : "Every payment reference is manually verified against our bank statements. Submitting a fake, generic, or duplicate UTR number will result in your account being permanently banned immediately."}
                </p>
              </div>

              {/* Confirmation Checkbox */}
              <label className="flex items-start gap-2.5 p-2.5 bg-slate-950 border border-slate-850 rounded-xl cursor-pointer hover:border-slate-700 transition select-none">
                <input
                  type="checkbox"
                  checked={isConfirmed}
                  onChange={(e) => {
                    setIsConfirmed(e.target.checked);
                    if (txnError) setTxnError("");
                  }}
                  className="mt-0.5 rounded border-slate-800 text-emerald-500 bg-slate-900 focus:ring-emerald-500/20 h-3.5 w-3.5 cursor-pointer accent-emerald-500"
                />
                <span className="text-[9.5px] text-slate-300 font-medium leading-tight">
                  {isMarathi
                    ? "मी खात्री करतो/करते की मी ₹२९९ चे पेमेंट यशस्वीरित्या पूर्ण केले आहे आणि वरील संदर्भ क्रमांक माझ्या खात्यातून वजा झालेल्या व्यवहाराचाच आहे."
                    : "I confirm that I have successfully paid ₹299 and the reference number matches the actual transaction debited from my account."}
                </span>
              </label>

              <button
                type="submit"
                disabled={isProcessing || !isConfirmed}
                className={`w-full py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-800 text-slate-950 disabled:text-slate-500 font-black rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/10 ${
                  isProcessing ? "animate-pulse" : ""
                }`}
              >
                {isProcessing ? (
                  <>
                    <Icons.Loader2 className="h-4 w-4 animate-spin" />
                    <span>{isMarathi ? "पेमेंटची सत्यता पडताळली जात आहे..." : "Verifying Payment Status..."}</span>
                  </>
                ) : (
                  <>
                    <Icons.CheckCircle className="h-4 w-4" />
                    <span>{isMarathi ? "पडताळणी करा आणि प्रीमियम सुरू करा" : "Verify & Unlock Premium"}</span>
                  </>
                )}
              </button>
            </form>

          </div>
        )}
      </div>
    </div>
  );
}
