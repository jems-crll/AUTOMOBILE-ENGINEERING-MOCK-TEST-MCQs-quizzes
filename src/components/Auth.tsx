import React, { useState } from "react";
import * as Icons from "lucide-react";
import { User, STATE_LANGUAGES, StateLanguage } from "../types";

interface AuthProps {
  onLoginSuccess: (user: User) => void;
  selectedLanguage: StateLanguage;
}

export default function Auth({ onLoginSuccess, selectedLanguage }: AuthProps) {
  const [authMode, setAuthMode] = useState<"login" | "signup" | "forgot_password" | "forgot_username">("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  // Recovery States
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoveredInfo, setRecoveredInfo] = useState<any>(null);
  const [newPassword, setNewPassword] = useState("");
  const [logoClicks, setLogoClicks] = useState(0);

  const isMarathi = selectedLanguage.code === "mr";

  const handleLogoClick = () => {
    const nextClicks = logoClicks + 1;
    if (nextClicks >= 5) {
      setLogoClicks(0);
      const settings = getAdminSettings();
      const secretPassword = prompt(isMarathi ? "कृपया गुप्त ॲडमीन पासवर्ड प्रविष्ट करा:" : "Enter secret admin password:");
      if (secretPassword === settings.secretAdminPass) {
        const adminUser: User = {
          email: "admin@omto.com",
          username: "Admin",
          isPremium: true,
          role: "admin",
          subscriptionStatus: "active"
        };
        const db = getRegisteredUsers();
        db["admin@omto.com"] = {
          email: "admin@omto.com",
          username: "Admin",
          password: "password123",
          isPremium: true,
          role: "admin",
          subscriptionStatus: "active"
        };
        saveUsersDb(db);
        localStorage.setItem("omto_current_user", JSON.stringify(adminUser));
        onLoginSuccess(adminUser);
      } else if (secretPassword !== null) {
        alert(isMarathi ? "चुकीचा पासवर्ड!" : "Incorrect password!");
      }
    } else {
      setLogoClicks(nextClicks);
    }
  };

  // Mock Database handler
  const getRegisteredUsers = (): Record<string, any> => {
    try {
      const users = localStorage.getItem("omto_users_db");
      return users ? JSON.parse(users) : {
        // Initial mock users for convenience
        "student@test.com": { email: "student@test.com", username: "student", password: "password123", isPremium: false, role: "student", subscriptionStatus: "inactive" },
        "premium@test.com": { email: "premium@test.com", username: "premium_user", password: "password123", isPremium: true, role: "student", subscriptionStatus: "active" }
      };
    } catch (_) {
      return {};
    }
  };

  const getAdminSettings = () => {
    try {
      const stored = localStorage.getItem("omto_admin_settings");
      return stored ? JSON.parse(stored) : {
        secretAdminPass: "9988",
        bypassPass1: "OMTOADMIN",
        bypassPass2: "BYPASS2026"
      };
    } catch (_) {
      return {
        secretAdminPass: "9988",
        bypassPass1: "OMTOADMIN",
        bypassPass2: "BYPASS2026"
      };
    }
  };

  const saveUsersDb = (db: Record<string, any>) => {
    localStorage.setItem("omto_users_db", JSON.stringify(db));
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!email || !password) {
      setErrorMessage(isMarathi ? "कृपया सर्व माहिती भरा." : "Please fill in all fields.");
      return;
    }

    const emailKey = email.trim().toLowerCase();
    const db = getRegisteredUsers();

    if (authMode === "login") {
      const settings = getAdminSettings();
      // Admin bypass quick trigger
      if (password === settings.bypassPass1 || password === settings.bypassPass2) {
        const adminUser: User = {
          email: emailKey.includes("@") ? emailKey : `${emailKey}@omto.com`,
          username: emailKey,
          isPremium: true,
          role: "admin",
          subscriptionStatus: "active"
        };
        db[adminUser.email.toLowerCase()] = {
          email: adminUser.email,
          username: adminUser.username,
          password: "password123",
          isPremium: true,
          role: "admin",
          subscriptionStatus: "active"
        };
        saveUsersDb(db);
        localStorage.setItem("omto_current_user", JSON.stringify(adminUser));
        onLoginSuccess(adminUser);
        return;
      }

      // Standard Login Logic
      let existingUser = db[emailKey];
      if (!existingUser) {
        existingUser = Object.values(db).find(
          (u: any) => u.username && u.username.trim().toLowerCase() === emailKey
        );
      }

      if (existingUser && existingUser.password === password) {
        if (existingUser.isBlocked) {
          setErrorMessage(
            isMarathi
              ? "तुमचे खाते प्रशासकाद्वारे ब्लॉक केले गेले आहे. कृपया संपर्क साधा."
              : "Your account has been blocked by the administrator. Please contact support."
          );
          return;
        }

        const userObj: User = {
          email: existingUser.email,
          username: existingUser.username || existingUser.email.split("@")[0],
          isPremium: existingUser.isPremium || false,
          role: existingUser.role || "student",
          subscriptionStatus: existingUser.subscriptionStatus || (existingUser.isPremium ? "active" : "inactive")
        };
        localStorage.setItem("omto_current_user", JSON.stringify(userObj));
        onLoginSuccess(userObj);
      } else {
        setErrorMessage(
          isMarathi
            ? "चुकीचा ईमेल/युझरनेम किंवा पासवर्ड. कृपया पुन्हा प्रयत्न करा."
            : "Invalid email/username or password. Please try again."
        );
      }
    } else if (authMode === "signup") {
      if (!username) {
        setErrorMessage(isMarathi ? "कृपया युझरनेम भरा." : "Please fill in username.");
        return;
      }

      const userKey = username.trim().toLowerCase();

      if (db[emailKey]) {
        setErrorMessage(
          isMarathi
            ? "हा ईमेल आधीच नोंदणीकृत आहे. कृपया लॉगिन करा."
            : "Email is already registered. Please login."
        );
        return;
      }

      const usernameExists = Object.values(db).some(
        (u: any) => u.username && u.username.trim().toLowerCase() === userKey
      );

      if (usernameExists) {
        setErrorMessage(
          isMarathi
            ? "हे युझरनेम आधीच घेतले गेले आहे. कृपया दुसरे निवडा."
            : "This username is already taken. Please choose another."
        );
        return;
      }

      // Create new user (default isPremium: false, role: student)
      const newUser = {
        email: emailKey,
        username: username.trim(),
        password: password,
        isPremium: false,
        role: "student",
        subscriptionStatus: "inactive"
      };
      db[emailKey] = newUser;
      saveUsersDb(db);

      setSuccessMessage(
        isMarathi
          ? "नोंदणी यशस्वी! आता तुम्ही लॉगिन करू शकता."
          : "Registration successful! You can now login."
      );
      setAuthMode("login");
      setPassword("");
    }
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setRecoveredInfo(null);

    if (!recoveryEmail) {
      setErrorMessage(
        isMarathi
          ? "कृपया ईमेल किंवा युझरनेम भरा."
          : "Please enter your email or username."
      );
      return;
    }

    const searchKey = recoveryEmail.trim().toLowerCase();
    const db = getRegisteredUsers();

    let foundUser = db[searchKey];
    if (!foundUser) {
      foundUser = Object.values(db).find(
        (u: any) => u.username && u.username.trim().toLowerCase() === searchKey
      );
    }

    if (foundUser) {
      setRecoveredInfo(foundUser);
      setSuccessMessage(
        isMarathi
          ? `खाते सापडले! युझरनेम: ${foundUser.username || "N/A"}`
          : `Account found! Username: ${foundUser.username || "N/A"}`
      );
    } else {
      setErrorMessage(
        isMarathi
          ? "या ईमेल किंवा युझरनेमसह कोणतेही खाते सापडले नाही."
          : "No account found with this email or username."
      );
    }
  };

  const handlePasswordResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !recoveredInfo) return;

    const db = getRegisteredUsers();
    const emailKey = recoveredInfo.email.toLowerCase();

    if (db[emailKey]) {
      db[emailKey].password = newPassword;
      saveUsersDb(db);
      setSuccessMessage(
        isMarathi
          ? "पासवर्ड यशस्वीरित्या रिसेट झाला! आता तुम्ही नवीन पासवर्डने लॉगिन करू शकता."
          : "Password successfully reset! You can now login with your new password."
      );
      setRecoveredInfo(null);
      setNewPassword("");
      setRecoveryEmail("");
      setAuthMode("login");
    }
  };

  const handleForgotUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!recoveryEmail) {
      setErrorMessage(
        isMarathi ? "कृपया नोंदणीकृत ईमेल पत्ता भरा." : "Please enter your registered email address."
      );
      return;
    }

    const emailKey = recoveryEmail.trim().toLowerCase();
    const db = getRegisteredUsers();
    const foundUser = db[emailKey];

    if (foundUser) {
      setSuccessMessage(
        isMarathi
          ? `तुमचा युझरनेम आहे: "${foundUser.username || "N/A"}"`
          : `Your registered username is: "${foundUser.username || "N/A"}"`
      );
    } else {
      setErrorMessage(
        isMarathi
          ? "या ईमेल पत्त्यासह कोणतेही खाते सापडले नाही."
          : "No account found with this email address."
      );
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 font-sans text-slate-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-4">
          <div 
            id="app-logo"
            onClick={handleLogoClick}
            className="p-3 bg-amber-500 rounded-2xl text-slate-950 shadow-xl shadow-amber-500/10 cursor-pointer hover:scale-105 active:scale-95 transition-all select-none"
            title={isMarathi ? "गुप्त ॲडमीन ॲक्सेससाठी ५ वेळा क्लिक करा" : "Click 5 times for secret admin access"}
          >
            <Icons.Wrench className="h-8 w-8 stroke-[2.5]" />
          </div>
        </div>
        <h2 className="text-center text-2xl md:text-3xl font-black text-white tracking-tight">
          {authMode === "login" && (isMarathi ? "ऑटोमोबाईल मॉक टेस्ट लॉगिन" : "Automobile Mock Test Login")}
          {authMode === "signup" && (isMarathi ? "नवीन खाते तयार करा" : "Create New Account")}
          {authMode === "forgot_password" && (isMarathi ? "पासवर्ड विसरलात?" : "Forgot Password")}
          {authMode === "forgot_username" && (isMarathi ? "युझरनेम विसरलात?" : "Forgot Username")}
        </h2>
        <p className="mt-2 text-center text-xs text-slate-400">
          {isMarathi 
            ? "सर्व फीचर्स आणि सराव चाचण्या वापरण्यासाठी खालील माहिती भरा" 
            : "Fill in the details below to access all study and exam features"}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-xs font-semibold flex items-center gap-2">
              <Icons.AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-semibold flex items-center gap-2">
              <Icons.CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* 1. Login or Signup form */}
          {(authMode === "login" || authMode === "signup") && (
            <form className="space-y-4" onSubmit={handleAuthSubmit}>
              {/* Optional Username input for Signup */}
              {authMode === "signup" && (
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    {isMarathi ? "युझरनेम (Username)" : "Username"}
                  </label>
                  <div className="relative">
                    <Icons.User className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. jemshery"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-slate-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  {authMode === "login" 
                    ? (isMarathi ? "ईमेल पत्ता किंवा युझरनेम" : "Email Address or Username")
                    : (isMarathi ? "ईमेल पत्ता" : "Email Address")}
                </label>
                <div className="relative">
                  <Icons.Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder={authMode === "login" ? "student@test.com or student" : "student@test.com"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-slate-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {isMarathi ? "पासवर्ड" : "Password"}
                  </label>
                  {authMode === "login" && (
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode("forgot_password");
                        setErrorMessage("");
                        setSuccessMessage("");
                        setRecoveryEmail("");
                        setRecoveredInfo(null);
                      }}
                      className="text-[11px] text-amber-500 hover:text-amber-400 font-bold"
                    >
                      {isMarathi ? "पासवर्ड विसरलात?" : "Forgot Password?"}
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Icons.Lock className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-slate-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black rounded-xl hover:shadow-lg transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>{authMode === "login" ? (isMarathi ? "लॉगिन करा" : "Login") : (isMarathi ? "नोंदणी (Signup) करा" : "Register") }</span>
                <Icons.ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}

          {/* 2. Forgot Password Recovery view */}
          {authMode === "forgot_password" && (
            <div className="space-y-4">
              {!recoveredInfo ? (
                <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      {isMarathi ? "नोंदणीकृत ईमेल किंवा युझरनेम" : "Registered Email or Username"}
                    </label>
                    <div className="relative">
                      <Icons.Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
                      <input
                        type="text"
                        required
                        placeholder="student@test.com or student"
                        value={recoveryEmail}
                        onChange={(e) => setRecoveryEmail(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-slate-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Icons.Search className="h-4 w-4" />
                    <span>{isMarathi ? "खाते शोधा" : "Find Account"}</span>
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl text-xs space-y-1">
                    <div className="text-slate-400">{isMarathi ? "युझर ईमेल:" : "User Email:"} <span className="text-white font-semibold">{recoveredInfo.email}</span></div>
                    <div className="text-slate-400">{isMarathi ? "सध्याचा पासवर्ड:" : "Current Password:"} <span className="text-amber-400 font-mono font-bold">{recoveredInfo.password}</span></div>
                    <p className="text-[10px] text-slate-500 leading-tight mt-1">
                      {isMarathi 
                        ? "(टीप: सुरक्षिततेसाठी तुम्ही खाली थेट नवीन पासवर्ड रिसेट देखील करू शकता)" 
                        : "(Note: You can also reset it to a new password directly below)"}
                    </p>
                  </div>

                  <form onSubmit={handlePasswordResetSubmit} className="space-y-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        {isMarathi ? "नवीन पासवर्ड प्रविष्ट करा" : "Enter New Password"}
                      </label>
                      <div className="relative">
                        <Icons.Lock className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
                        <input
                          type="password"
                          required
                          placeholder="••••••••"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-slate-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-slate-950 font-black rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Icons.Check className="h-4 w-4" />
                      <span>{isMarathi ? "पासवर्ड बदला (Reset)" : "Change Password"}</span>
                    </button>
                  </form>
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  setAuthMode("login");
                  setErrorMessage("");
                  setSuccessMessage("");
                }}
                className="w-full py-2 bg-slate-950 hover:bg-slate-900 border border-slate-850 rounded-xl text-xs text-slate-300 font-bold transition cursor-pointer"
              >
                {isMarathi ? "लॉगिन कडे परत जा" : "Back to Login"}
              </button>
            </div>
          )}

          {/* 3. Forgot Username Recovery view */}
          {authMode === "forgot_username" && (
            <div className="space-y-4">
              <form onSubmit={handleForgotUsernameSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    {isMarathi ? "तुमचा नोंदणीकृत ईमेल पत्ता" : "Your Registered Email Address"}
                  </label>
                  <div className="relative">
                    <Icons.Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      placeholder="student@test.com"
                      value={recoveryEmail}
                      onChange={(e) => setRecoveryEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-slate-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Icons.Search className="h-4 w-4" />
                  <span>{isMarathi ? "युझरनेम शोधा" : "Find Username"}</span>
                </button>
              </form>

              <button
                type="button"
                onClick={() => {
                  setAuthMode("login");
                  setErrorMessage("");
                  setSuccessMessage("");
                }}
                className="w-full py-2 bg-slate-950 hover:bg-slate-900 border border-slate-850 rounded-xl text-xs text-slate-300 font-bold transition cursor-pointer"
              >
                {isMarathi ? "लॉगिन कडे परत जा" : "Back to Login"}
              </button>
            </div>
          )}

          {/* Navigation links between login and signup */}
          {authMode === "login" && (
            <div className="mt-4 flex flex-col gap-3 pt-4 border-t border-slate-800/60 text-center">
              <button
                onClick={() => {
                  setAuthMode("signup");
                  setErrorMessage("");
                  setSuccessMessage("");
                }}
                className="text-xs text-amber-500 hover:text-amber-400 font-bold transition-colors cursor-pointer"
              >
                {isMarathi ? "नवीन खाते तयार करायचे आहे? येथे नोंदणी करा" : "Don't have an account? Sign up here"}
              </button>
              <button
                onClick={() => {
                  setAuthMode("forgot_username");
                  setErrorMessage("");
                  setSuccessMessage("");
                  setRecoveryEmail("");
                }}
                className="text-xs text-slate-500 hover:text-slate-400 font-medium transition-colors cursor-pointer"
              >
                {isMarathi ? "युझरनेम विसरलात? येथे शोधा" : "Forgot your username? Find it here"}
              </button>
            </div>
          )}

          {authMode === "signup" && (
            <div className="mt-4 pt-4 border-t border-slate-800/60 text-center">
              <button
                onClick={() => {
                  setAuthMode("login");
                  setErrorMessage("");
                  setSuccessMessage("");
                }}
                className="text-xs text-amber-500 hover:text-amber-400 font-bold transition-colors cursor-pointer"
              >
                {isMarathi ? "आधीच खाते आहे? येथे लॉगिन करा" : "Already have an account? Login here"}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
