import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import QuizContainer from "./components/QuizContainer";
import Scorecard from "./components/Scorecard";
import Analytics from "./components/Analytics";
import { QuizAttempt, Question, StateLanguage, STATE_LANGUAGES, User } from "./types";
import { QUESTIONS, CHAPTERS } from "./data/questions";
import * as Icons from "lucide-react";
import Auth from "./components/Auth";
import RazorpayModal from "./components/RazorpayModal";
import AdminPanel from "./components/AdminPanel";
import { translateQuestionOffline } from "./utils/localTranslator";

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem("omto_current_user");
      if (!stored) return null;
      const user = JSON.parse(stored);
      console.log("Current user:", user);
      // Fix: ensure role is set if missing (legacy support)
      if (!user.role) {
        user.role = user.email.toLowerCase().includes("admin") ? "admin" : "student";
        localStorage.setItem("omto_current_user", JSON.stringify(user));
      }
      return user;
    } catch (_) {
      return null;
    }
  });

  const [isRazorpayOpen, setIsRazorpayOpen] = useState<boolean>(false);
  const [usersDb, setUsersDb] = useState<Record<string, any>>({});

  useEffect(() => {
    const loadDb = () => {
      try {
        const users = localStorage.getItem("omto_users_db");
        if (users) {
          setUsersDb(JSON.parse(users));
        } else {
          const initial = {
            "student@test.com": { email: "student@test.com", password: "password123", isPremium: false },
            "premium@test.com": { email: "premium@test.com", password: "password123", isPremium: true }
          };
          localStorage.setItem("omto_users_db", JSON.stringify(initial));
          setUsersDb(initial);
        }
      } catch (_) {}
    };
    loadDb();
  }, [currentUser]);

  const [activeTab, setActiveTab] = useState<"dashboard" | "analytics" | "admin">("dashboard");
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  
  // National Language state (defaults to Marathi)
  const [selectedLanguage, setSelectedLanguage] = useState<StateLanguage>(() => {
    try {
      const stored = localStorage.getItem("omto_selected_language");
      if (stored) return JSON.parse(stored);
    } catch (_) {}
    return STATE_LANGUAGES[0]; // Marathi as default
  });

  const bilingual = selectedLanguage.code !== "en"; // Treat as bilingual if not English only

  // Loader states for AI compilation
  const [loadingTest, setLoadingTest] = useState<boolean>(false);
  const [loadingStatusText, setLoadingStatusText] = useState<string>("");

  // Quiz states
  const [quizState, setQuizState] = useState<{
    isActive: boolean;
    questions: Question[];
    mode: "practice" | "exam";
    chapterId: number | "all";
    timeLimitMinutes: number;
    setId?: number | "all";
  } | null>(null);

  // Scorecard states
  const [scorecardState, setScorecardState] = useState<{
    questions: Question[];
    score: number;
    answers: Record<number, string>;
    timeSpentSeconds: number;
  } | null>(null);

  // Load attempts from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("omto_quiz_attempts");
      if (stored) {
        setAttempts(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load local quiz attempts:", e);
    }
  }, []);

  // Save attempts to local storage on change
  const saveAttempt = (newAttempt: QuizAttempt) => {
    const updated = [...attempts, newAttempt];
    setAttempts(updated);
    try {
      localStorage.setItem("omto_quiz_attempts", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save local attempts:", e);
    }
  };

  const handleClearHistory = () => {
    setAttempts([]);
    try {
      localStorage.removeItem("omto_quiz_attempts");
    } catch (e) {
      console.error("Failed to clear local attempts:", e);
    }
  };

  // Setup questions and start test
  const handleStartTest = (config: {
    chapterId: number | "all";
    mode: "practice" | "exam";
    questionCount: number;
    timeLimitMinutes: number;
    source: "static" | "ai";
    setId?: number | "all";
  }) => {
    setScorecardState(null);
    setLoadingTest(true);

    let chapterName = "";
    if (config.chapterId === "all") {
      chapterName = selectedLanguage.code === "mr" ? "सर्व चॅप्टर (पूर्ण अभ्यासक्रम)" : "All Chapters Mixed";
    } else {
      const ch = CHAPTERS.find((c) => c.id === config.chapterId);
      chapterName = ch ? (selectedLanguage.code === "mr" ? ch.nameMarathi : ch.name) : `Chapter ${config.chapterId}`;
    }

    // Offline Textbook MCQ selection
    let filtered = [...QUESTIONS];
    if (config.chapterId !== "all") {
      filtered = QUESTIONS.filter((q) => q.chapterId === config.chapterId);
    }

    let selected: Question[] = [];
    if (config.chapterId !== "all" && config.setId && config.setId !== "all") {
      // Load specified set sequentially
      const startIdx = (config.setId - 1) * 20;
      const endIdx = Math.min(config.setId * 20, filtered.length);
      selected = filtered.slice(startIdx, endIdx);
    } else {
      // Shuffle
      const shuffled = filtered.sort(() => 0.5 - Math.random());
      selected = shuffled.slice(0, Math.min(config.questionCount, shuffled.length));
    }

    // Limit questions to 5 for free tier demo (Prompt 3 request)
    if (!currentUser?.isPremium) {
      selected = selected.slice(0, 5);
    }

    // Translate questions offline if the language is regional but not Marathi (Marathi has static translations)
    if (selectedLanguage.code !== "en" && selectedLanguage.code !== "mr") {
      const translated = selected.map((q) => translateQuestionOffline(q, selectedLanguage.code));
      setQuizState({
        isActive: true,
        questions: translated,
        mode: config.mode,
        chapterId: config.chapterId,
        timeLimitMinutes: config.timeLimitMinutes,
        setId: config.setId,
      });
      setLoadingTest(false);
      return;
    }

    // Call API to translate questions if the language is regional but not Marathi (Marathi has static translations)
    if (false && selectedLanguage.code !== "en" && selectedLanguage.code !== "mr") {
      setLoadingStatusText(
        selectedLanguage.code === "hi" ? "AI मुख्य भाषांतर करत आहे..." :
        selectedLanguage.code === "kn" ? "AI ಮುಖ್ಯ ಅನುವಾದಿಸುತ್ತಿದೆ..." :
        selectedLanguage.code === "te" ? "AI ముఖ్య అనువదిస్తోంది..." :
        selectedLanguage.code === "ta" ? "AI முக்கிய மொழிபெயர்க்கிறது..." :
        selectedLanguage.code === "gu" ? "AI મુખ્ય અનુવાદ કરી રહ્યું છે..." :
        "AI Translating questions..."
      );

      fetch("/api/translate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questions: selected,
          languageName: selectedLanguage.name,
          languageState: selectedLanguage.state
        })
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.translations && Array.isArray(data.translations)) {
          const translated = selected.map((q) => {
            const t = data.translations.find((item: any) => item.id === q.id);
            if (t) {
              return {
                ...q,
                questionTranslated: t.questionTranslated,
                optionsTranslated: t.optionsTranslated,
                explanationTranslated: t.explanationTranslated
              };
            }
            return q;
          });
          setQuizState({
            isActive: true,
            questions: translated,
            mode: config.mode,
            chapterId: config.chapterId,
            timeLimitMinutes: config.timeLimitMinutes,
            setId: config.setId,
          });
        } else {
          setQuizState({
            isActive: true,
            questions: selected,
            mode: config.mode,
            chapterId: config.chapterId,
            timeLimitMinutes: config.timeLimitMinutes,
            setId: config.setId,
          });
        }
      })
      .catch((err) => {
        console.error("Translation API error:", err);
        setQuizState({
          isActive: true,
          questions: selected,
          mode: config.mode,
          chapterId: config.chapterId,
          timeLimitMinutes: config.timeLimitMinutes,
          setId: config.setId,
        });
      })
      .finally(() => {
        setLoadingTest(false);
      });
    } else {
      setQuizState({
        isActive: true,
        questions: selected,
        mode: config.mode,
        chapterId: config.chapterId,
        timeLimitMinutes: config.timeLimitMinutes,
        setId: config.setId,
      });
      setLoadingTest(false);
    }
  };

  const handleQuizComplete = (score: number, answers: Record<number, string>, timeSpentSeconds: number) => {
    if (!quizState) return;

    let chName = "";
    if (quizState.chapterId === "all") {
      chName = selectedLanguage.code === "mr" ? "सर्व चॅप्टर (पूर्ण अभ्यासक्रम)" : "All Chapters (Full Test)";
    } else {
      const ch = CHAPTERS.find((c) => c.id === quizState.chapterId);
      chName = ch ? (selectedLanguage.code === "mr" ? ch.nameMarathi : ch.name) : `Chapter ${quizState.chapterId}`;
      if (quizState.setId && quizState.setId !== "all") {
        chName += ` - ${selectedLanguage.code === "mr" ? `संच ${quizState.setId}` : `Set ${quizState.setId}`}`;
      }
    }

    const newAttempt: QuizAttempt = {
      id: Math.random().toString(36).substr(2, 9),
      chapterId: quizState.chapterId,
      chapterName: chName,
      score,
      totalQuestions: quizState.questions.length,
      date: new Date().toISOString(),
      timeSpentSeconds,
      answers,
      setId: quizState.setId,
    };

    saveAttempt(newAttempt);

    setScorecardState({
      questions: quizState.questions,
      score,
      answers,
      timeSpentSeconds,
    });

    setQuizState(null);
  };

  // Render spinning mechanical gear loader
  if (loadingTest) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 selection:bg-amber-500/20 selection:text-amber-400 font-sans">
        <div className="relative flex flex-col items-center max-w-md w-full bg-slate-900/40 p-10 rounded-3xl border border-slate-800/80 text-center backdrop-blur-md shadow-2xl">
          <div className="relative mb-8 w-24 h-24 flex items-center justify-center">
            <Icons.Settings className="h-20 w-20 text-amber-500 animate-spin" style={{ animationDuration: "10s" }} />
            <Icons.Settings className="absolute top-1 right-1 h-10 w-10 text-amber-600/60 animate-spin" style={{ animationDuration: "5s", animationDirection: "reverse" }} />
            <Icons.Wrench className="absolute h-8 w-8 text-white animate-pulse" />
          </div>

          <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-500 font-mono bg-amber-500/10 px-3 py-1 rounded-full mb-3">
            {selectedLanguage.nativeName} ({selectedLanguage.name})
          </span>
          <h2 className="text-xl font-black text-white tracking-tight leading-snug mb-2">
            {loadingStatusText}
          </h2>
          <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
            {selectedLanguage.code === "mr" 
              ? "कृपया थांबा, आमचे प्रगत AI ऑटोमोबाईल अभियांत्रिकीचे सविस्तर प्रश्न संकलित करत आहे..." 
              : "Please wait while our advanced AI engine compiles and localizes detailed Automobile Engineering MCQs..."}
          </p>

          <div className="w-full bg-slate-950 h-1.5 rounded-full mt-6 overflow-hidden border border-slate-850">
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 h-full w-2/3 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-500/20 selection:text-amber-400 antialiased font-sans">
        {/* Top Header */}
        <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
            {/* Logo Branding */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-2.5 bg-amber-500 rounded-xl text-slate-950 shadow-lg shadow-amber-500/10 shrink-0">
                <Icons.Wrench className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.5]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-[10px] bg-slate-800 text-slate-400 font-mono px-1.5 py-0.5 rounded font-bold">OMTO</span>
                  <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500 font-mono truncate">Automobile Engg</span>
                </div>
                <h1 className="text-sm sm:text-lg md:text-xl font-black font-sans tracking-tight text-white mt-0.5 leading-none truncate">
                  ऑटोमोबाईल मॉक टेस्ट <span className="hidden sm:inline text-amber-500 font-normal">| MCQ Test</span>
                </h1>
              </div>
            </div>
            
            {/* National State Language Selector */}
            <div className="flex items-center bg-slate-900 border border-slate-850 pl-2 pr-0.5 sm:pl-2.5 sm:pr-1 py-1 rounded-xl gap-1 sm:gap-2 shadow shrink-0">
              <Icons.Globe className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-500 shrink-0" />
              <select
                value={selectedLanguage.code}
                onChange={(e) => {
                  const lang = STATE_LANGUAGES.find((l) => l.code === e.target.value);
                  if (lang) {
                    setSelectedLanguage(lang);
                    localStorage.setItem("omto_selected_language", JSON.stringify(lang));
                  }
                }}
                className="bg-transparent border-none text-[11px] sm:text-xs font-bold text-slate-200 focus:outline-none pr-1 sm:pr-1.5 cursor-pointer font-sans"
              >
                {STATE_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-slate-950 text-slate-100 text-xs">
                    {lang.nativeName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </header>

        {/* Auth Module Wrapper */}
        <main className="flex-grow flex items-center justify-center">
          <Auth onLoginSuccess={setCurrentUser} selectedLanguage={selectedLanguage} />
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500 font-mono">
          <p>© 2026 OMTO Automobile Engineering Lab. {selectedLanguage.code === "mr" ? "सर्व हक्क राखीव." : "All Rights Reserved."}</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-500/20 selection:text-amber-400 antialiased font-sans">
      
      {/* Top Banner and Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-4 flex items-center justify-between gap-3">
          
          {/* Logo Branding */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="p-2 sm:p-2.5 bg-amber-500 rounded-xl text-slate-950 shadow-lg shadow-amber-500/10 shrink-0">
              <Icons.Wrench className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] bg-slate-800 text-slate-400 font-mono px-1.5 py-0.5 rounded font-bold">OMTO</span>
                <span className="h-1 sm:h-1.5 sm:w-1.5 rounded-full bg-emerald-500" />
                <span className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500 font-mono truncate">Automobile Engg</span>
              </div>
              <h1 className="text-sm sm:text-lg md:text-xl font-black font-sans tracking-tight text-white mt-0.5 leading-none truncate">
                ऑटोमोबाईल मॉक टेस्ट <span className="hidden sm:inline text-amber-500 font-normal">| MCQ Test</span>
              </h1>
            </div>
          </div>

          {/* User Profile, Subscription and Language (Hidden during active test) */}
          {!quizState && (
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
              {/* Tab selector */}
              <nav className="hidden lg:flex bg-slate-900 border border-slate-850 p-1 rounded-lg text-xs font-semibold">
                <button
                  onClick={() => {
                    setActiveTab("dashboard");
                    setScorecardState(null);
                  }}
                  className={`px-4 py-2 rounded-md transition flex items-center gap-1.5 cursor-pointer ${
                    activeTab === "dashboard" && !scorecardState
                      ? "bg-slate-800 text-amber-400"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Icons.LayoutDashboard className="h-3.5 w-3.5" />
                  <span>{selectedLanguage.code === "mr" ? "डॅशबोर्ड" : "Dashboard"}</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab("analytics");
                    setScorecardState(null);
                  }}
                  className={`px-4 py-2 rounded-md transition flex items-center gap-1.5 cursor-pointer ${
                    activeTab === "analytics" && !scorecardState
                      ? "bg-slate-800 text-amber-400"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Icons.TrendingUp className="h-3.5 w-3.5" />
                  <span>{selectedLanguage.code === "mr" ? "प्रगती विश्लेषण" : "Analytics"}</span>
                </button>
                {currentUser?.role === "admin" && (
                  <button
                    onClick={() => {
                      setActiveTab("admin");
                      setScorecardState(null);
                    }}
                    className={`px-4 py-2 rounded-md transition flex items-center gap-1.5 cursor-pointer ${
                      activeTab === "admin" && !scorecardState
                        ? "bg-slate-800 text-amber-400"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Icons.ShieldAlert className="h-3.5 w-3.5" />
                    <span>{selectedLanguage.code === "mr" ? "ॲडमीन" : "Admin"}</span>
                  </button>
                )}
              </nav>

              {/* National State Language Selector */}
              <div className="hidden sm:flex items-center bg-slate-900 border border-slate-850 pl-2 pr-0.5 sm:pl-2.5 sm:pr-1 py-1 rounded-xl gap-1 sm:gap-2 shadow">
                <Icons.Globe className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-500 shrink-0" />
                <select
                  value={selectedLanguage.code}
                  onChange={(e) => {
                    const lang = STATE_LANGUAGES.find((l) => l.code === e.target.value);
                    if (lang) {
                      setSelectedLanguage(lang);
                      localStorage.setItem("omto_selected_language", JSON.stringify(lang));
                    }
                  }}
                  className="bg-transparent border-none text-[11px] sm:text-xs font-bold text-slate-200 focus:outline-none pr-1 sm:pr-1.5 cursor-pointer font-sans font-sans"
                >
                  {STATE_LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code} className="bg-slate-950 text-slate-100 text-xs">
                      {lang.nativeName}
                    </option>
                  ))}
                </select>
              </div>

              {/* User Session Profile Header Info */}
              <div className="flex items-center gap-2 border-l border-slate-850 pl-2 sm:pl-3 md:pl-4">
                <div className="hidden md:flex flex-col text-right">
                  <span className="text-xs text-slate-300 font-bold truncate max-w-[120px]">{currentUser.email}</span>
                  <span className="text-[10px] font-mono font-black flex items-center gap-1 justify-end">
                    {currentUser.isPremium ? (
                      <span className="text-emerald-400 flex items-center gap-0.5">
                        <Icons.Crown className="h-3 w-3 text-amber-500 fill-amber-500/20" />
                        PREMIUM
                      </span>
                    ) : (
                      <span className="text-slate-500 uppercase">Free Account</span>
                    )}
                  </span>
                </div>

                {/* Upgrade Button */}
                {!currentUser.isPremium && (
                  <button
                    onClick={() => setIsRazorpayOpen(true)}
                    className="px-2.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-[11px] sm:text-xs font-black rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Icons.Crown className="h-3.5 w-3.5" />
                    <span className="hidden xs:inline">{selectedLanguage.code === "mr" ? "प्रीमियम" : "Premium"}</span>
                  </button>
                )}

                {/* Logout */}
                <button
                  onClick={() => {
                    localStorage.removeItem("omto_current_user");
                    setCurrentUser(null);
                  }}
                  title={selectedLanguage.code === "mr" ? "लॉगआउट" : "Logout"}
                  className="p-1.5 sm:p-2 bg-slate-900 hover:bg-slate-800 border border-slate-850 text-slate-400 hover:text-white rounded-lg transition cursor-pointer"
                >
                  <Icons.LogOut className="h-3.5 sm:h-4 sm:w-4 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Core Content Stage */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 md:py-10">
        
        {/* Scenario 1: Active Quiz Session */}
        {quizState && (
          <QuizContainer
            chapterId={quizState.chapterId}
            mode={quizState.mode}
            questions={quizState.questions}
            timeLimitMinutes={quizState.timeLimitMinutes}
            bilingual={bilingual}
            selectedLanguage={selectedLanguage}
            onComplete={handleQuizComplete}
            onExit={() => setQuizState(null)}
            isPremium={currentUser?.isPremium ?? false}
            onUpgradeClick={() => setIsRazorpayOpen(true)}
          />
        )}

        {/* Scenario 2: Test Completion scorecard */}
        {!quizState && scorecardState && (
          <Scorecard
            questions={scorecardState.questions}
            score={scorecardState.score}
            selectedAnswers={scorecardState.answers}
            timeSpentSeconds={scorecardState.timeSpentSeconds}
            bilingual={bilingual}
            selectedLanguage={selectedLanguage}
            onRetake={() => {
              // Restart previous config
              handleStartTest({
                chapterId: attempts[attempts.length - 1]?.chapterId || "all",
                mode: attempts[attempts.length - 1]?.timeSpentSeconds > 0 ? "exam" : "practice",
                questionCount: scorecardState.questions.length,
                timeLimitMinutes: 15,
                source: "static",
              });
            }}
            onDashboard={() => setScorecardState(null)}
            isPremium={currentUser?.isPremium ?? false}
            onUpgradeClick={() => setIsRazorpayOpen(true)}
          />
        )}

        {/* Scenario 3: Standard Navigation and Tabs */}
        {!quizState && !scorecardState && (
          <>
            {/* Small Tab bar for mobile and tablet devices */}
            <div className="lg:hidden mb-6 flex bg-slate-900 border border-slate-850 p-1 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex-1 py-2.5 rounded-md text-center transition ${
                  activeTab === "dashboard" ? "bg-slate-800 text-amber-400" : "text-slate-400"
                }`}
              >
                {selectedLanguage.code === "mr" ? "डॅशबोर्ड" : "Dashboard"}
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`flex-1 py-2.5 rounded-md text-center transition ${
                  activeTab === "analytics" ? "bg-slate-800 text-amber-400" : "text-slate-400"
                }`}
              >
                {selectedLanguage.code === "mr" ? "प्रगती" : "Analytics"}
              </button>
              {currentUser?.role === "admin" && (
                <button
                  onClick={() => setActiveTab("admin")}
                  className={`flex-1 py-2.5 rounded-md text-center transition ${
                    activeTab === "admin" ? "bg-slate-800 text-amber-400" : "text-slate-400"
                  }`}
                >
                  {selectedLanguage.code === "mr" ? "ॲडमीन" : "Admin"}
                </button>
              )}
            </div>

            {/* Render Dashboard, Analytics, or AdminPanel */}
            {activeTab === "dashboard" ? (
              <Dashboard
                attempts={attempts}
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage}
                currentUser={currentUser}
                onStartTest={handleStartTest}
                onUpgradeClick={() => setIsRazorpayOpen(true)}
              />
            ) : activeTab === "analytics" ? (
              <Analytics
                attempts={attempts}
                bilingual={bilingual}
                onClearHistory={handleClearHistory}
              />
            ) : (
              currentUser?.role === "admin" ? (
                <AdminPanel
                  selectedLanguage={selectedLanguage}
                  onClose={() => setActiveTab("dashboard")}
                />
              ) : (
                <div className="bg-slate-900 border border-slate-850 rounded-3xl p-8 max-w-md mx-auto text-center space-y-4 shadow-2xl">
                  <div className="p-3 bg-red-500/10 text-red-500 rounded-2xl w-fit mx-auto border border-red-500/20">
                    <Icons.ShieldAlert className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-black text-white">Access Denied / प्रवेश नाकारला</h3>
                  <p className="text-xs text-slate-400">
                    {selectedLanguage.code === "mr" 
                      ? "हे पेज पाहण्यासाठी तुमच्याकडे ॲडमीन अधिकार असणे आवश्यक आहे." 
                      : "You need administrator privileges to view this page."}
                  </p>
                  <button
                    onClick={() => setActiveTab("dashboard")}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black rounded-lg transition"
                  >
                    {selectedLanguage.code === "mr" ? "डॅशबोर्डवर जा" : "Go to Dashboard"}
                  </button>
                </div>
              )
            )}
          </>
        )}
      </main>

      {/* Razorpay Gateway Modal */}
      <RazorpayModal
        isOpen={isRazorpayOpen}
        onClose={() => setIsRazorpayOpen(false)}
        currentUser={currentUser}
        onPaymentSuccess={(updatedUser) => {
          setCurrentUser(updatedUser);
          // Reload local db mapping
          try {
            const db = localStorage.getItem("omto_users_db");
            if (db) setUsersDb(JSON.parse(db));
          } catch (_) {}
        }}
        selectedLanguage={selectedLanguage}
      />

      {/* Footer copyright */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500 font-mono">
        <p>© 2026 OMTO Automobile Engineering Lab. {selectedLanguage.code === "mr" ? "सर्व हक्क राखीव." : "All Rights Reserved."}</p>
      </footer>
    </div>
  );
}
