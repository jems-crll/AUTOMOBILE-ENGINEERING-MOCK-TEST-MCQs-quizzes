import React, { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import { StateLanguage, User } from "../types";

interface AdminPanelProps {
  selectedLanguage: StateLanguage;
  onClose?: () => void;
}

interface StudentRecord {
  email: string;
  username: string;
  password?: string;
  isPremium: boolean;
  expiryDate?: string;
  isBlocked?: boolean;
  paymentTxnId?: string;
  paymentDate?: string;
}

export default function AdminPanel({ selectedLanguage, onClose }: AdminPanelProps) {
  const isMarathi = selectedLanguage.code === "mr";
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"list" | "guide" | "plans" | "settings">("list");
  const [guideSubTab, setGuideSubTab] = useState<"firebase" | "sheets" | "sql">("firebase");
  
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [adminSettings, setAdminSettings] = useState({
    secretAdminPass: "9988",
    bypassPass1: "OMTOADMIN",
    bypassPass2: "BYPASS2026"
  });

  // Form states for adding a student
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newIsPremium, setNewIsPremium] = useState(false);
  const [newExpiryDate, setNewExpiryDate] = useState(() => {
    // Default to 1 year from now
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    return d.toISOString().split("T")[0];
  });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  // Load students from omto_users_db on mount
  useEffect(() => {
    loadStudents();
    loadPlans();
    loadSettings();
  }, []);

  const loadSettings = () => {
    const stored = localStorage.getItem("omto_admin_settings");
    if (stored) {
      setAdminSettings(JSON.parse(stored));
    }
  };

  const saveSettings = (newSettings: typeof adminSettings) => {
    setAdminSettings(newSettings);
    localStorage.setItem("omto_admin_settings", JSON.stringify(newSettings));
  };

  const loadPlans = () => {
    const storedPlans = localStorage.getItem("omto_subscription_plans");
    if (storedPlans) {
      setPlans(JSON.parse(storedPlans));
    } else {
      const defaults: SubscriptionPlan[] = [
        { id: "1", name: "1 Month", price: 100, durationMonths: 1 },
        { id: "2", name: "2 Months", price: 200, durationMonths: 2 },
        { id: "3", name: "4 Months", price: 300, durationMonths: 4 }
      ];
      setPlans(defaults);
      localStorage.setItem("omto_subscription_plans", JSON.stringify(defaults));
    }
  };

  const savePlans = (newPlans: SubscriptionPlan[]) => {
    setPlans(newPlans);
    localStorage.setItem("omto_subscription_plans", JSON.stringify(newPlans));
  };

  const loadStudents = () => {
    try {
      const dbStr = localStorage.getItem("omto_users_db");
      if (dbStr) {
        const db = JSON.parse(dbStr);
        const recordList = Object.keys(db).map((email) => ({
          email,
          username: db[email].username || email.split("@")[0],
          password: db[email].password || "password123",
          isPremium: db[email].isPremium || false,
          expiryDate: db[email].expiryDate || "2027-06-25",
          isBlocked: db[email].isBlocked || false,
          paymentTxnId: db[email].paymentTxnId,
          paymentDate: db[email].paymentDate,
        }));
        setStudents(recordList);
      }
    } catch (e) {
      console.error("Failed to load students:", e);
    }
  };

  const saveToDb = (updatedList: StudentRecord[]) => {
    try {
      const db: Record<string, any> = {};
      updatedList.forEach((s) => {
        db[s.email.toLowerCase().trim()] = {
          email: s.email,
          username: s.username,
          password: s.password || "password123",
          isPremium: s.isPremium,
          role: s.email.toLowerCase().includes("admin") ? "admin" : "student",
          subscriptionStatus: s.isPremium ? "active" : "inactive",
          expiryDate: s.expiryDate || "2027-06-25",
          isBlocked: s.isBlocked || false,
          paymentTxnId: s.paymentTxnId,
          paymentDate: s.paymentDate,
        };
      });
      localStorage.setItem("omto_users_db", JSON.stringify(db));
      setStudents(updatedList);
    } catch (e) {
      console.error("Failed to save to database:", e);
    }
  };

  // 1. Add Student
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!newEmail || !newUsername) {
      setFormError(isMarathi ? "कृपया ईमेल आणि नाव प्रविष्ट करा." : "Please enter email and name.");
      return;
    }

    const emailKey = newEmail.toLowerCase().trim();
    if (students.some((s) => s.email.toLowerCase() === emailKey)) {
      setFormError(isMarathi ? "या ईमेलचा विद्यार्थी आधीपासूनच अस्तित्वात आहे!" : "A student with this email already exists!");
      return;
    }

    const newRecord: StudentRecord = {
      email: newEmail,
      username: newUsername,
      password: "password123",
      isPremium: newIsPremium,
      expiryDate: newExpiryDate,
      isBlocked: false,
    };

    const updated = [newRecord, ...students];
    saveToDb(updated);

    // Reset Form
    setNewEmail("");
    setNewUsername("");
    setNewIsPremium(false);
    setFormSuccess(isMarathi ? "विद्यार्थी यशस्वीरित्या जोडला गेला!" : "Student added successfully!");
    
    // Clear success message after 3 seconds
    setTimeout(() => setFormSuccess(""), 3000);
  };

  // 2. Toggle Premium Subscription
  const handleToggleSubscription = (email: string) => {
    const updated = students.map((s) => {
      if (s.email === email) {
        const nextPremium = !s.isPremium;
        return {
          ...s,
          isPremium: nextPremium,
          // Set expiry to 1 year if enabling
          expiryDate: nextPremium ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0] : s.expiryDate,
        };
      }
      return s;
    });
    saveToDb(updated);
  };

  // 3. Toggle Block User
  const handleToggleBlock = (email: string) => {
    const updated = students.map((s) => {
      if (s.email === email) {
        return { ...s, isBlocked: !s.isBlocked };
      }
      return s;
    });
    saveToDb(updated);

    // If current logged-in user blocks themselves, or we want immediate local enforcement, we can check.
    // The next time the blocked user tries to login, they will be rejected.
  };

  // 4. Delete Student Record
  const handleDeleteStudent = (email: string) => {
    if (confirm(isMarathi ? `तुम्हाला खात्री आहे की तुम्ही ${email} ला काढून टाकू इच्छिता?` : `Are you sure you want to remove ${email}?`)) {
      const updated = students.filter((s) => s.email !== email);
      saveToDb(updated);
    }
  };

  // Filter students based on search query
  const filteredStudents = students.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      s.username.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-slate-900 border border-slate-850 rounded-3xl p-6 sm:p-8 shadow-2xl animate-fade-in text-slate-100">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Icons.ShieldAlert className="h-6 w-6 text-amber-500" />
            <span>{isMarathi ? "ॲडमीन डॅशबोर्ड" : "Admin Control Panel"}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isMarathi 
              ? "विद्यार्थ्यांच्या सबस्क्रिप्शन व प्रीमियम खात्यांचे व्यवस्थापन करा" 
              : "Manage students, edit subscription status, and monitor user logins"}
          </p>
        </div>

        {/* View togglers */}
        <div className="flex gap-2 bg-slate-950 p-1 rounded-xl border border-slate-850">
          <button
            onClick={() => setActiveTab("list")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === "list" 
                ? "bg-amber-500 text-slate-950" 
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Icons.Users className="h-3.5 w-3.5" />
            <span>{isMarathi ? "विद्यार्थी यादी" : "Student Directory"}</span>
          </button>
          <button
            onClick={() => setActiveTab("guide")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === "guide" 
                ? "bg-amber-500 text-slate-950" 
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Icons.DatabaseBackup className="h-3.5 w-3.5" />
            <span>{isMarathi ? "डेटाबेस कनेक्ट मार्गदर्शक" : "Connect Real Database"}</span>
          </button>
          <button
            onClick={() => setActiveTab("plans")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === "plans" 
                ? "bg-amber-500 text-slate-950" 
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Icons.CreditCard className="h-3.5 w-3.5" />
            <span>{isMarathi ? "प्लॅन व्यवस्थापन" : "Manage Plans"}</span>
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === "settings" 
                ? "bg-amber-500 text-slate-950" 
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Icons.Settings className="h-3.5 w-3.5" />
            <span>{isMarathi ? "सेटिंग्ज" : "Settings"}</span>
          </button>
        </div>
      </div>

      {activeTab === "list" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Column 1: Manage & Directory */}
          <div className="lg:col-span-2 space-y-5">
            {/* Search filter utility */}
            <div className="flex items-center gap-3 bg-slate-950 border border-slate-850 rounded-2xl px-4 py-2">
              <Icons.Search className="h-4 w-4 text-slate-500 shrink-0" />
              <input
                type="text"
                placeholder={isMarathi ? "नाव किंवा ईमेलने शोधा..." : "Search students by name or email..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none text-xs text-slate-200 focus:outline-none w-full placeholder-slate-600 font-medium"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="text-slate-500 hover:text-slate-300 transition"
                >
                  <Icons.X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Students List Card */}
            <div className="bg-slate-950 border border-slate-850 rounded-2xl overflow-hidden">
              <div className="p-4 bg-slate-900/40 border-b border-slate-850 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400">
                  {isMarathi ? `एकूण विद्यार्थी: ${filteredStudents.length}` : `Total Registered: ${filteredStudents.length}`}
                </span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/20">
                  {isMarathi ? "लाईव्ह डेटाबेस" : "Live Local DB Sync"}
                </span>
              </div>

              {filteredStudents.length === 0 ? (
                <div className="p-8 text-center text-slate-500 space-y-2">
                  <Icons.UserX className="h-10 w-10 text-slate-600 mx-auto" />
                  <p className="text-xs font-semibold">
                    {isMarathi ? "कोणताही विद्यार्थी सापडला नाही." : "No student matches your query."}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-850 max-h-[450px] overflow-y-auto">
                  {filteredStudents.map((student) => (
                    <div 
                      key={student.email} 
                      className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition hover:bg-slate-900/30 ${
                        student.isBlocked ? "opacity-60 bg-red-950/5" : ""
                      }`}
                    >
                      {/* Left: User description & email */}
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`font-black text-sm text-white truncate max-w-[180px]`}>
                            {student.username}
                          </span>
                          
                          {/* Expiry / Sub Badge */}
                          {student.isBlocked ? (
                            <span className="text-[9px] bg-red-500/10 text-red-400 font-bold px-2 py-0.5 rounded border border-red-500/25">
                              {isMarathi ? "ब्लॉक केलेला" : "BLOCKED"}
                            </span>
                          ) : student.isPremium ? (
                            <span className="text-[9px] bg-emerald-500/15 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/25 flex items-center gap-0.5 shadow-sm shadow-emerald-500/10">
                              <Icons.Crown className="h-2.5 w-2.5 text-amber-500 fill-amber-500/25" />
                              {isMarathi ? "प्रीमियम" : "PREMIUM"}
                            </span>
                          ) : (
                            <span className="text-[9px] bg-slate-800 text-slate-400 font-bold px-2 py-0.5 rounded border border-slate-700">
                              {isMarathi ? "मोफत सदस्य" : "FREE USER"}
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5 truncate">
                          <Icons.Mail className="h-3 w-3 text-slate-500 shrink-0" />
                          <span className="truncate">{student.email}</span>
                        </div>

                        {student.isPremium && (
                          <div className="text-[10px] text-amber-500/80 font-semibold flex items-center gap-1">
                            <Icons.CalendarDays className="h-3 w-3 text-amber-500/70" />
                            <span>
                              {isMarathi ? `मुदत संपण्याची तारीख: ` : `Expires on: `}
                              <span className="font-mono">{student.expiryDate || "2027-06-25"}</span>
                            </span>
                          </div>
                        )}

                        {student.paymentTxnId && (
                          <div className="text-[9px] text-slate-500 font-mono truncate max-w-full">
                            UTR: {student.paymentTxnId}
                          </div>
                        )}
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-2 shrink-0 flex-wrap">
                        {/* Toggle Premium Button */}
                        <button
                          onClick={() => handleToggleSubscription(student.email)}
                          disabled={student.isBlocked}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer select-none ${
                            student.isBlocked
                              ? "bg-slate-900 text-slate-600 border border-slate-850 cursor-not-allowed"
                              : student.isPremium
                              ? "bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/25"
                              : "bg-emerald-500 hover:bg-emerald-600 text-slate-950"
                          }`}
                        >
                          {student.isPremium ? (
                            <>
                              <Icons.UserMinus className="h-3.5 w-3.5" />
                              <span>{isMarathi ? "कॅन्सल सबस्क्रिप्शन" : "Cancel Sub"}</span>
                            </>
                          ) : (
                            <>
                              <Icons.UserPlus className="h-3.5 w-3.5" />
                              <span>{isMarathi ? "प्रीमियम द्या" : "Activate Sub"}</span>
                            </>
                          )}
                        </button>

                        {/* Block/Unblock Button */}
                        <button
                          onClick={() => handleToggleBlock(student.email)}
                          className={`p-1.5 rounded-lg text-xs border transition cursor-pointer select-none ${
                            student.isBlocked
                              ? "bg-red-500 hover:bg-red-600 text-white border-red-500"
                              : "bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-red-400 border-slate-850"
                          }`}
                          title={student.isBlocked ? (isMarathi ? "अनब्लॉक करा" : "Unblock Student") : (isMarathi ? "ब्लॉक करा" : "Block Student")}
                        >
                          <Icons.Ban className="h-3.5 w-3.5" />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteStudent(student.email)}
                          className="p-1.5 bg-slate-900 hover:bg-red-950/40 text-slate-500 hover:text-red-400 border border-slate-850 rounded-lg transition cursor-pointer select-none"
                          title={isMarathi ? "पूर्णपणे काढून टाका" : "Delete Student Record"}
                        >
                          <Icons.Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Add Student Form */}
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-850 rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-850 pb-3">
                <Icons.UserPlus className="h-4 w-4 text-emerald-500" />
                <span>{isMarathi ? "नवीन विद्यार्थी जोडा" : "Add New Student"}</span>
              </h3>

              <form onSubmit={handleAddStudent} className="space-y-4">
                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    {isMarathi ? "ईमेल आयडी" : "Email Address"}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@example.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-slate-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500 transition font-mono"
                  />
                </div>

                {/* Username / Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    {isMarathi ? "विद्यार्थ्याचे नाव" : "Student Full Name"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isMarathi ? "उदा. गणेश पाटील" : "e.g. Rahul Sharma"}
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-slate-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500 transition"
                  />
                </div>

                {/* Expiry Date */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    {isMarathi ? "सबस्क्रिप्शन मुदत तारीख" : "Subscription Expiry"}
                  </label>
                  <input
                    type="date"
                    required
                    value={newExpiryDate}
                    onChange={(e) => setNewExpiryDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-slate-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500 transition font-mono"
                  />
                </div>

                {/* Is Premium Checkbox */}
                <label className="flex items-center gap-2.5 p-2.5 bg-slate-900/60 border border-slate-850 rounded-xl cursor-pointer hover:border-slate-800 transition select-none">
                  <input
                    type="checkbox"
                    checked={newIsPremium}
                    onChange={(e) => setNewIsPremium(e.target.checked)}
                    className="rounded border-slate-800 text-emerald-500 bg-slate-950 focus:ring-emerald-500/20 h-3.5 w-3.5 cursor-pointer accent-emerald-500"
                  />
                  <span className="text-xs text-slate-300 font-bold">
                    {isMarathi ? "थेट प्रीमियम खाते द्या" : "Activate Premium Sub immediately"}
                  </span>
                </label>

                {formError && (
                  <p className="text-[10px] text-red-400 font-semibold flex items-center gap-1 bg-red-500/5 p-2 rounded-lg border border-red-500/10">
                    <Icons.AlertCircle className="h-3.5 w-3.5 text-red-500 shrink-0" />
                    <span>{formError}</span>
                  </p>
                )}

                {formSuccess && (
                  <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/10">
                    <Icons.CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>{formSuccess}</span>
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-black rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-500/10 select-none"
                >
                  <Icons.Plus className="h-4 w-4" />
                  <span>{isMarathi ? "नवीन विद्यार्थी जोडा" : "Add Student Record"}</span>
                </button>
              </form>
            </div>

            {/* Quick Helper card */}
            <div className="bg-slate-950 border border-slate-850 rounded-2xl p-4 text-[10.5px] text-slate-400 leading-relaxed space-y-2 font-sans">
              <span className="font-bold text-amber-500 uppercase tracking-wider text-[9px] block">
                {isMarathi ? "💡 डेटाबेस टीप" : "💡 Synchronization Notice"}
              </span>
              <p>
                {isMarathi 
                  ? "हा डॅशबोर्ड थेट विद्यार्थ्यांच्या स्थानिक डेटाबेसशी सिंक केलेला आहे. तुम्ही बदललेली कोणतीही सबस्क्रिप्शन स्टेटस किंवा ब्लॉक स्टेटस लॉगिन करताना तात्काळ लागू होते."
                  : "This panel connects directly to the local users database on this browser session. Activating or canceling subscriptions dynamically blocks or unlocks mock tests for that student immediately."}
              </p>
            </div>
          </div>
        </div>
      ) : activeTab === "settings" ? (
        <div className="bg-slate-950 border border-slate-850 rounded-2xl p-6 space-y-6">
          <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-850 pb-3">
            <Icons.Settings className="h-4 w-4 text-amber-500" />
            <span>{isMarathi ? "सिस्टम सेटिंग्ज" : "System Settings"}</span>
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">{isMarathi ? "गुप्त ॲडमीन पासवर्ड" : "Secret Admin Password"}</label>
              <input 
                value={adminSettings.secretAdminPass} 
                onChange={(e) => saveSettings({...adminSettings, secretAdminPass: e.target.value})}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">{isMarathi ? "बायपास पासवर्ड १" : "Bypass Password 1"}</label>
              <input 
                value={adminSettings.bypassPass1} 
                onChange={(e) => saveSettings({...adminSettings, bypassPass1: e.target.value})}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">{isMarathi ? "बायपास पासवर्ड २" : "Bypass Password 2"}</label>
              <input 
                value={adminSettings.bypassPass2} 
                onChange={(e) => saveSettings({...adminSettings, bypassPass2: e.target.value})}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white"
              />
            </div>
          </div>
        </div>
      ) : activeTab === "plans" ? (
        <div className="bg-slate-950 border border-slate-850 rounded-2xl p-6 space-y-6">
          <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-850 pb-3">
            <Icons.Settings className="h-4 w-4 text-amber-500" />
            <span>{isMarathi ? "सबस्क्रिप्शन प्लॅन्स" : "Subscription Plans"}</span>
          </h3>
          <div className="space-y-4">
            {plans.map((plan) => (
              <div key={plan.id} className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-xl">
                <div>
                  <p className="font-bold text-slate-100">{plan.name}</p>
                  <p className="text-xs text-slate-400">₹{plan.price} / {plan.durationMonths} {isMarathi ? "महिने" : "Months"}</p>
                </div>
                <button
                   onClick={() => {
                     const newPlans = plans.filter(p => p.id !== plan.id);
                     savePlans(newPlans);
                   }}
                   className="text-red-400 hover:text-red-300"
                >
                  <Icons.Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const newPlan: SubscriptionPlan = {
                  id: Date.now().toString(),
                  name: formData.get("name") as string,
                  price: Number(formData.get("price")),
                  durationMonths: Number(formData.get("duration")),
                };
                savePlans([...plans, newPlan]);
                e.currentTarget.reset();
              }}
              className="flex gap-2 p-4 bg-slate-900 border border-slate-800 rounded-xl"
            >
              <input name="name" placeholder={isMarathi ? "प्लॅनचे नाव" : "Plan Name"} className="bg-slate-950 border border-slate-800 text-xs rounded-lg p-2 text-white w-full" required />
              <input name="price" type="number" placeholder={isMarathi ? "किंमत (₹)" : "Price (₹)"} className="bg-slate-950 border border-slate-800 text-xs rounded-lg p-2 text-white w-20" required />
              <input name="duration" type="number" placeholder={isMarathi ? "महिने" : "Months"} className="bg-slate-950 border border-slate-800 text-xs rounded-lg p-2 text-white w-20" required />
              <button type="submit" className="bg-emerald-500 text-slate-950 px-3 rounded-lg text-xs font-bold">
                <Icons.Plus className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* Real Database Connection Guide */
        <div className="space-y-6">
          <div className="bg-slate-950 border border-slate-850 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-850 pb-3">
              <Icons.DatabaseBackup className="h-5 w-5 text-amber-500" />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                {isMarathi ? "तुमचा स्वतःचा खरा डेटाबेस कसा कनेक्ट कराल?" : "Database Connection Integration Guide"}
              </h3>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              {isMarathi
                ? "सध्या हा ॲप स्थानिक ब्राउझर मेमरी (LocalStorage) वापरतो. तुम्ही जेव्हा हे ॲप तुमच्या विद्यार्थ्यांसाठी लाईव्ह कराल, तेव्हा तुम्ही खालीलपैकी कोणत्याही पद्धतीने डेटाबेस कनेक्ट करू शकता. येथे आम्ही पूर्ण कोड तयार केला आहे:"
                : "Currently this app saves students inside standard LocalStorage. When deploying this for real student registration, you can integrate Firebase, Google Sheets, or SQL databases. Below are clean copy-paste templates ready to go:"}
            </p>

            {/* Sub Tabs for guides */}
            <div className="flex gap-2 bg-slate-900 p-1 rounded-xl border border-slate-850 max-w-lg">
              <button
                onClick={() => setGuideSubTab("firebase")}
                className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                  guideSubTab === "firebase" ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Firebase Firestore
              </button>
              <button
                onClick={() => setGuideSubTab("sheets")}
                className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                  guideSubTab === "sheets" ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Google Sheets API
              </button>
              <button
                onClick={() => setGuideSubTab("sql")}
                className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                  guideSubTab === "sql" ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                REST API (Node/SQL)
              </button>
            </div>

            {/* Guide details */}
            {guideSubTab === "firebase" && (
              <div className="space-y-3 animate-fade-in text-xs">
                <p className="text-slate-300 font-bold">1. Firebase cloud setup instructions:</p>
                <p className="text-slate-400 leading-relaxed font-sans">
                  Firebase is the easiest cloud database. Create a Firestore collection named <code className="bg-slate-900 px-1 py-0.5 rounded text-amber-400 font-mono text-[10.5px]">students</code> where each document ID is the student's email, containing fields: <code className="text-amber-400 font-mono text-[10px]">username</code>, <code className="text-amber-400 font-mono text-[10px]">isPremium</code>, and <code className="text-amber-400 font-mono text-[10px]">expiryDate</code>.
                </p>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-[10.5px] overflow-x-auto text-amber-300 whitespace-pre leading-relaxed">
{`// src/db/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "omto-test-app.firebaseapp.com",
  projectId: "omto-test-app",
  storageBucket: "omto-test-app.appspot.com",
  messagingSenderId: "12345678",
  appId: "1:12345678:web:abcdef"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Save or upgrade a student subscription
export async function updateStudentSubscription(email: string, isPremium: boolean, expiryDate: string) {
  const studentRef = doc(db, "students", email.toLowerCase().trim());
  await updateDoc(studentRef, {
    isPremium: isPremium,
    expiryDate: expiryDate
  });
}`}
                </div>
              </div>
            )}

            {guideSubTab === "sheets" && (
              <div className="space-y-3 animate-fade-in text-xs">
                <p className="text-slate-300 font-bold">2. Connect via Google Sheets (Free No-Code Backend):</p>
                <p className="text-slate-400 leading-relaxed font-sans">
                  You can use a simple Google Sheet as your subscription database. Create a Sheet with headers: <code className="bg-slate-900 px-1 py-0.5 rounded text-amber-400 font-mono text-[10.5px]">Name, Email, Status, Expiry</code>. Then publish a Google Apps Script Web App to handle GET/POST:
                </p>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-[10.5px] overflow-x-auto text-amber-300 whitespace-pre leading-relaxed">
{`// Google Apps Script (Tools > Extensions > Apps Script)
function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  if (data.action === "add") {
    sheet.appendRow([data.username, data.email, data.isPremium ? "Active" : "Inactive", data.expiryDate]);
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// React code to submit new student to Google Sheets
const addStudentToGoogleSheet = async (student) => {
  const SCRIPT_URL = "https://script.google.com/macros/s/YOUR_MACRO_ID/exec";
  await fetch(SCRIPT_URL, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ action: "add", ...student })
  });
};`}
                </div>
              </div>
            )}

            {guideSubTab === "sql" && (
              <div className="space-y-3 animate-fade-in text-xs">
                <p className="text-slate-300 font-bold">3. Express backend REST API Integration (PostgreSQL/SQL):</p>
                <p className="text-slate-400 leading-relaxed font-sans">
                  For secure, enterprise-grade applications, connect this Admin Panel to a Node.js Express server backed by an SQL database:
                </p>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-[10.5px] overflow-x-auto text-amber-300 whitespace-pre leading-relaxed">
{`// server.ts (Express subscription endpoints)
app.post("/api/admin/subscriptions", async (req, res) => {
  const { email, isPremium, expiryDate } = req.body;
  try {
    // Update PostgreSQL Database using SQL/ORM
    await db.query(
      "UPDATE students SET is_premium = $1, expiry_date = $2 WHERE email = $3",
      [isPremium, expiryDate, email.toLowerCase().trim()]
    );
    res.json({ success: true, message: "Subscription updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});`}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
