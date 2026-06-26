import React, { useState } from "react";
import { Chapter, QuizAttempt, StateLanguage, STATE_LANGUAGES } from "../types";
import { CHAPTERS, QUESTIONS } from "../data/questions";
import * as Icons from "lucide-react";

interface DashboardProps {
  onStartTest: (config: {
    chapterId: number | "all";
    mode: "practice" | "exam";
    questionCount: number;
    timeLimitMinutes: number;
    source: "static" | "ai";
    setId?: number | "all";
  }) => void;
  attempts: QuizAttempt[];
  selectedLanguage: StateLanguage;
  setSelectedLanguage: (lang: StateLanguage) => void;
  currentUser: any;
  onUpgradeClick: () => void;
}

export default function Dashboard({
  onStartTest,
  attempts,
  selectedLanguage,
  setSelectedLanguage,
  currentUser,
  onUpgradeClick,
}: DashboardProps) {
  const [selectedChapter, setSelectedChapter] = useState<number | "all">("all");
  const [selectedSet, setSelectedSet] = useState<number | "all">("all");
  const [testMode, setTestMode] = useState<"practice" | "exam">("exam");
  const [questionSource, setQuestionSource] = useState<"static" | "ai">("static"); // default to offline textbook mode
  const [questionCount, setQuestionCount] = useState<number>(15);
  const [timeLimit, setTimeLimit] = useState<number>(15);

  const isMarathi = selectedLanguage.code === "mr";

  // Dynamic max questions based on selection
  const getAvailableQuestionCount = () => {
    if (selectedChapter === "all") return QUESTIONS.length;
    return QUESTIONS.filter((q) => q.chapterId === selectedChapter).length;
  };

  const handleStart = () => {
    onStartTest({
      chapterId: selectedChapter,
      mode: testMode,
      questionCount: Math.min(questionCount, getAvailableQuestionCount()),
      timeLimitMinutes: timeLimit,
      source: "static",
      setId: selectedSet,
    });
  };

  // Helper to dynamically render Lucide icons
  const renderIcon = (iconName: string, className: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent className={className} /> : <Icons.BookOpen className={className} />;
  };

  // Calculate statistics
  const totalTests = attempts.length;
  const averageScore = totalTests
    ? Math.round(attempts.reduce((sum, item) => sum + (item.score / item.totalQuestions) * 100, 0) / totalTests)
    : 0;

  const highestScore = totalTests
    ? Math.max(...attempts.map((item) => Math.round((item.score / item.totalQuestions) * 100)))
    : 0;

  // Chapter-wise performance analytics
  const getChapterCompletionStatus = (chapterId: number) => {
    const chapterAttempts = attempts.filter((a) => a.chapterId === chapterId);
    if (!chapterAttempts.length) return { tests: 0, avg: 0, high: 0 };
    const total = chapterAttempts.length;
    const avg = Math.round(chapterAttempts.reduce((sum, item) => sum + (item.score / item.totalQuestions) * 100, 0) / total);
    const high = Math.max(...chapterAttempts.map((item) => Math.round((item.score / item.totalQuestions) * 100)));
    return { tests: total, avg, high };
  };

  // Set-wise performance analytics
  const getSetCompletionStatus = (chapterId: number, setId: number) => {
    const setAttempts = attempts.filter((a) => a.chapterId === chapterId && a.setId === setId);
    if (!setAttempts.length) return null;
    const total = setAttempts.length;
    const avg = Math.round(setAttempts.reduce((sum, item) => sum + (item.score / item.totalQuestions) * 100, 0) / total);
    const high = Math.max(...setAttempts.map((item) => Math.round((item.score / item.totalQuestions) * 100)));
    return { tests: total, avg, high };
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 animate-fade-in">
      {/* Test Control Center */}
      <div className="lg:col-span-1 flex flex-col gap-4 sm:gap-6" id="test-customizer">
        <div className="p-4 sm:p-6 bg-slate-900/60 rounded-2xl border border-slate-800/80 backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between mb-5 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-black font-sans tracking-tight text-white flex items-center gap-2">
              <Icons.Zap className="text-amber-500 h-5 w-5 fill-amber-500/20" />
              <span>{isMarathi ? "मॉक टेस्ट कस्टमाइज" : "Customize Test"}</span>
            </h2>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-950 border border-slate-800 text-slate-400 rounded-lg text-[10px] font-bold uppercase tracking-wider font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>Offline Ready</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:gap-5">
            {/* National State Language Selector */}
            <div className="bg-slate-950 p-3 sm:p-4 rounded-xl border border-slate-850">
              <label className="block text-xs font-bold text-amber-500 uppercase tracking-wider mb-2 flex items-center gap-1.5 font-mono">
                <Icons.Globe className="h-3.5 w-3.5 text-amber-500" />
                <span>STATE LANGUAGE | राज्य भाषा निवड</span>
              </label>
              <select
                value={selectedLanguage.code}
                onChange={(e) => {
                  const lang = STATE_LANGUAGES.find((l) => l.code === e.target.value);
                  if (lang) setSelectedLanguage(lang);
                }}
                className="w-full bg-slate-900 border border-slate-800 text-white rounded-lg p-2.5 sm:p-3 text-xs focus:outline-none focus:border-amber-500 transition font-sans font-semibold cursor-pointer"
              >
                {STATE_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-slate-950">
                    {lang.nativeName} ({lang.name}) — {lang.state}
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-slate-500 mt-2 leading-normal">
                {selectedLanguage.code === "mr" ? "भारतातील इतर राज्यांमधील विद्यार्थी देखील त्यांच्या स्वतःच्या भाषेत परीक्षा देऊ शकतात." :
                 selectedLanguage.code === "hi" ? "भारत के अन्य राज्यों के छात्र भी अपनी भाषा में परीक्षा दे सकते हैं।" :
                 selectedLanguage.code === "kn" ? "ಭಾರತದ ಇತರ ರಾಜ್ಯಗಳ ವಿದ್ಯಾರ್ಥಿಗಳು ಸಹ ತಮ್ಮದೇ ಆದ ಭಾಷೆಯಲ್ಲಿ ಪರೀಕ್ಷೆಯನ್ನು ಬರೆಯಬಹುದು." :
                 selectedLanguage.code === "te" ? "భారతదేశంలోని ఇతర రాష్ట్రాల విద్యార్థులు కూడా వారి స్వంత భాషలో పరీక్ష రాయవచ్చు." :
                 selectedLanguage.code === "ta" ? "இந்தியாவின் பிற மாநிலங்களைச் சேர்ந்த மாணவர்களும் தங்களது சொந்த மொழியில் தேர்வு எழுதலாம்." :
                 selectedLanguage.code === "gu" ? "ભારતના અન્ય રાજ્યોના વિદ્યાર્થીઓ પણ પોતાની ભાષામાં પરીક્ષા આપી શકે છે." :
                 `Students from other states in India can also practice tests in their own regional languages.`}
                <span className="block mt-1 text-amber-500/80 font-semibold font-mono">
                  {selectedLanguage.code === "en" ? "Questions will be in English only." : `BILINGUAL | English + ${selectedLanguage.nativeName}`}
                </span>
              </p>
            </div>

            {/* Chapter Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                {isMarathi ? "विषय निवडा" : "Select Chapter"}
              </label>
              <select
                value={selectedChapter}
                onChange={(e) => {
                  const val = e.target.value === "all" ? "all" : parseInt(e.target.value);
                  setSelectedChapter(val);
                  setSelectedSet("all"); // Reset selected set to "all" when chapter changes
                  // Adjust question count dynamically based on the selected chapter
                  const maxQ = val === "all" ? QUESTIONS.length : QUESTIONS.filter((q) => q.chapterId === val).length;
                  setQuestionCount(Math.min(15, maxQ));
                }}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-500 transition cursor-pointer"
              >
                <option value="all">
                  {isMarathi ? "सर्व विषय (पूर्ण अभ्यासक्रम)" : "All Chapters (Complete Syllabus)"}
                </option>
                {CHAPTERS.map((ch) => (
                  <option key={ch.id} value={ch.id}>
                    {ch.id}. {isMarathi ? ch.nameMarathi : ch.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Set/Section Selection (Active when a specific chapter is selected) */}
            {selectedChapter !== "all" && (
              <div className="bg-slate-950 p-3 sm:p-4 rounded-xl border border-slate-850">
                <label className="block text-xs font-bold text-amber-500 uppercase tracking-wider mb-2 flex items-center justify-between font-mono">
                  <span className="flex items-center gap-1.5">
                    <Icons.Grid className="h-3.5 w-3.5" />
                    <span>{isMarathi ? "सराव संच निवडा (प्रत्येकी २० प्रश्न)" : "SELECT PRACTICE SET (20 Qs each)"}</span>
                  </span>
                  <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Set Ready</span>
                </label>
                <select
                  value={selectedSet}
                  onChange={(e) => {
                    const val = e.target.value === "all" ? "all" : parseInt(e.target.value);
                    setSelectedSet(val);
                    if (val !== "all") {
                      // Set the question count to the size of the set (usually 20, or remaining)
                      const chapterQsCount = QUESTIONS.filter((q) => q.chapterId === selectedChapter).length;
                      const startIdx = (val - 1) * 20;
                      const endIdx = Math.min(val * 20, chapterQsCount);
                      setQuestionCount(endIdx - startIdx);
                    } else {
                      setQuestionCount(15);
                    }
                  }}
                  className="w-full bg-slate-900 border border-slate-800 text-white rounded-lg p-3 text-xs focus:outline-none focus:border-amber-500 transition font-sans font-semibold cursor-pointer"
                >
                  <option value="all">
                    {isMarathi ? "सर्व प्रश्न एकत्रित (रँडम सराव)" : "All Questions Mixed (Random Practice)"}
                  </option>
                  {Array.from({ length: Math.ceil(QUESTIONS.filter((q) => q.chapterId === selectedChapter).length / 20) }).map((_, i) => {
                    const setNum = i + 1;
                    const chapterQsCount = QUESTIONS.filter((q) => q.chapterId === selectedChapter).length;
                    const startNum = (setNum - 1) * 20 + 1;
                    const endNum = Math.min(setNum * 20, chapterQsCount);
                    return (
                      <option key={setNum} value={setNum}>
                        {isMarathi 
                          ? `संच क्र. ${setNum} (प्रश्न ${startNum} ते ${endNum})`
                          : `Set No. ${setNum} (Questions ${startNum} - ${endNum})`}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}

            {/* Mode Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                {isMarathi ? "टेस्ट प्रकार" : "Test Mode"}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTestMode("exam")}
                  className={`p-3 rounded-xl border text-sm font-semibold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                    testMode === "exam"
                      ? "bg-amber-500/10 border-amber-500 text-amber-400"
                      : "bg-slate-950 border-slate-850 text-slate-400 hover:border-slate-800"
                  }`}
                >
                  <Icons.Timer className="h-4 w-4" />
                  <span>{isMarathi ? "परीक्षा पद्धत" : "Exam Mode"}</span>
                  <span className="text-[10px] opacity-80 font-normal">
                    {isMarathi ? "टायमर + सबमिशन" : "Timer + Submission"}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setTestMode("practice")}
                  className={`p-3 rounded-xl border text-sm font-semibold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                    testMode === "practice"
                      ? "bg-amber-500/10 border-amber-500 text-amber-400"
                      : "bg-slate-950 border-slate-850 text-slate-400 hover:border-slate-800"
                  }`}
                >
                  <Icons.BookOpen className="h-4 w-4" />
                  <span>{isMarathi ? "अभ्यास पद्धत" : "Practice Mode"}</span>
                  <span className="text-[10px] opacity-80 font-normal">
                    {isMarathi ? "झटपट उत्तरे + स्पष्टीकरण" : "Instant Ans + Explanations"}
                  </span>
                </button>
              </div>
            </div>

            {/* Question Count Selection */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {isMarathi ? "प्रश्नांची संख्या" : "Number of Questions"}
                </label>
                <span className="text-xs font-mono text-amber-400 font-bold">
                  {selectedSet !== "all" 
                    ? (isMarathi ? `${questionCount} प्रश्न (सेटनुसार लॉक)` : `${questionCount} Qs (Set Locked)`)
                    : `${questionCount} / ${getAvailableQuestionCount()} ${isMarathi ? "प्रश्न उपलब्ध" : "Available"}`
                  }
                </span>
              </div>
              <input
                type="range"
                min="5"
                max={Math.min(100, getAvailableQuestionCount())}
                step="5"
                value={questionCount}
                disabled={selectedSet !== "all"}
                onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                className={`w-full accent-amber-500 cursor-pointer ${selectedSet !== "all" ? "opacity-50 cursor-not-allowed" : ""}`}
              />
              {selectedSet !== "all" && (
                <p className="text-[10px] text-amber-500 mt-1 font-medium leading-relaxed">
                  {isMarathi 
                    ? "✓ सराव संच सक्रिय आहे. या संचातील सर्व प्रश्न क्रमाने उपलब्ध होतील." 
                    : "✓ Practice set is active. All questions from this set will load sequentially."}
                </p>
              )}
            </div>

            {/* Timer Selection (Only active for Exam Mode) */}
            <div className={testMode === "exam" ? "opacity-100 transition" : "opacity-40 pointer-events-none transition"}>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {isMarathi ? "वेळ मर्यादा" : "Time Limit"}
                </label>
                <span className="text-xs font-mono text-amber-400 font-bold">{timeLimit} Mins</span>
              </div>
              <input
                type="range"
                min="5"
                max="60"
                step="5"
                value={timeLimit}
                disabled={testMode !== "exam"}
                onChange={(e) => setTimeLimit(parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Start Button */}
            <button
              onClick={handleStart}
              className="w-full mt-2 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black rounded-xl hover:shadow-lg hover:shadow-amber-500/20 active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2 group text-base cursor-pointer"
              id="start-test-btn"
            >
              <Icons.Play className="fill-slate-950 h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
              <span>{isMarathi ? "मॉक टेस्ट सुरू करा" : "Start Mock Test"}</span>
            </button>
          </div>
        </div>

        {/* Global Statistics Card */}
        <div className="p-4 sm:p-6 bg-slate-900/60 rounded-2xl border border-slate-800/80 backdrop-blur-md">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
            <Icons.BarChart3 className="h-4 w-4 text-emerald-500" />
            {isMarathi ? "तुमची कामगिरी" : "Your Performance"}
          </h3>
          <div className="grid grid-cols-3 gap-2 sm:gap-3 font-mono">
            <div className="bg-slate-950/80 p-2 sm:p-3 rounded-xl text-center border border-slate-850">
              <span className="block text-[9px] sm:text-[10px] text-slate-400 uppercase font-sans font-semibold truncate">{isMarathi ? "एकूण टेस्ट" : "Total Tests"}</span>
              <span className="text-lg sm:text-xl font-bold text-white">{totalTests}</span>
            </div>
            <div className="bg-slate-950/80 p-2 sm:p-3 rounded-xl text-center border border-slate-850">
              <span className="block text-[9px] sm:text-[10px] text-slate-400 uppercase font-sans font-semibold truncate">{isMarathi ? "सरासरी" : "Avg Score"}</span>
              <span className="text-lg sm:text-xl font-bold text-emerald-400">{averageScore}%</span>
            </div>
            <div className="bg-slate-950/80 p-2 sm:p-3 rounded-xl text-center border border-slate-850">
              <span className="block text-[9px] sm:text-[10px] text-slate-400 uppercase font-sans font-semibold truncate">{isMarathi ? "सर्वोच्च" : "Highest"}</span>
              <span className="text-lg sm:text-xl font-bold text-amber-400">{highestScore}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chapters Directory */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        {selectedChapter === "all" ? (
          <>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-2xl font-black text-white font-sans tracking-tight">
                {isMarathi ? "विषयानुसार सराव" : "Chapter-wise Practice"}
              </h2>
              <span className="text-xs text-slate-400 font-mono">
                {CHAPTERS.length} {isMarathi ? "विषय उपलब्ध" : "Chapters Available"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CHAPTERS.map((ch) => {
                const stats = getChapterCompletionStatus(ch.id);
                const totalQ = QUESTIONS.filter((q) => q.chapterId === ch.id).length;

                return (
                  <div
                    key={ch.id}
                    onClick={() => {
                      setSelectedChapter(ch.id);
                      setSelectedSet("all");
                      setQuestionCount(15);
                      const customizer = document.getElementById("test-customizer");
                      customizer?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="p-4 sm:p-5 rounded-2xl border text-left cursor-pointer transition-all duration-200 flex flex-col justify-between group h-full bg-slate-900/40 border-slate-800 hover:border-slate-750 hover:bg-slate-900/60"
                    id={`chapter-card-${ch.id}`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="p-2.5 rounded-xl bg-slate-800/80 text-slate-300 group-hover:bg-slate-800 group-hover:text-amber-400 transition-colors">
                          {renderIcon(ch.icon, "h-5 w-5")}
                        </div>
                        <span className="text-[10px] font-bold font-mono px-2.5 py-1 bg-slate-950 border border-slate-850 text-slate-400 rounded-full">
                          {totalQ} Qs
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-100 group-hover:text-amber-400 transition-colors mb-1 leading-snug">
                        {ch.id}. {isMarathi ? ch.nameMarathi : ch.name}
                      </h3>
                      {isMarathi && (
                        <p className="text-xs text-slate-400 mb-2 font-medium">
                          {ch.name}
                        </p>
                      )}
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {isMarathi ? ch.descriptionMarathi : ch.description}
                      </p>
                    </div>

                    {/* Progress Indicators */}
                    <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
                      {stats.tests > 0 ? (
                        <>
                          <span className="flex items-center gap-1 font-mono text-emerald-400">
                            <Icons.CheckCircle2 className="h-3 w-3" />
                            {stats.tests} {isMarathi ? "चाचण्या" : "Tests"}
                          </span>
                          <span className="font-mono">
                            {isMarathi ? "सरासरी" : "Avg"}: <strong className="text-white font-bold">{stats.avg}%</strong>
                          </span>
                        </>
                      ) : (
                        <span className="text-slate-600 font-medium font-sans">
                          {isMarathi ? "अद्याप सराव केला नाही" : "No practice yet"}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          (() => {
            const activeChapterObj = CHAPTERS.find((ch) => ch.id === selectedChapter);
            if (!activeChapterObj) return null;
            return (
              <div className="flex flex-col gap-5 animate-fade-in">
                {/* Back Button */}
                <div>
                  <button
                    onClick={() => {
                      setSelectedChapter("all");
                      setSelectedSet("all");
                      setQuestionCount(15);
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-750 rounded-lg transition-all cursor-pointer"
                  >
                    <Icons.ArrowLeft className="h-4 w-4" />
                    <span>{isMarathi ? "← सर्व विषयांकडे जा" : "← Back to Chapters Directory"}</span>
                  </button>
                </div>

                {/* Active Chapter Overview Card */}
                <div className="p-4 sm:p-6 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-amber-500/30 shadow-lg shadow-amber-500/5">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {renderIcon(activeChapterObj.icon, "h-7 w-7")}
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-500 font-mono">
                          {isMarathi ? `विषय क्रमांक ${activeChapterObj.id}` : `Chapter ${activeChapterObj.id}`}
                        </span>
                        <h2 className="text-xl md:text-2xl font-black text-white leading-tight">
                          {isMarathi ? activeChapterObj.nameMarathi : activeChapterObj.name}
                        </h2>
                        {isMarathi && (
                          <p className="text-sm text-slate-400 font-medium">{activeChapterObj.name}</p>
                        )}
                      </div>
                    </div>
                    <span className="text-xs font-bold font-mono px-3 py-1.5 bg-slate-950 border border-slate-800 text-slate-300 rounded-lg">
                      {QUESTIONS.filter((q) => q.chapterId === activeChapterObj.id).length} Qs
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                    {isMarathi ? activeChapterObj.descriptionMarathi : activeChapterObj.description}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <h3 className="text-lg font-extrabold text-white font-sans tracking-tight flex items-center gap-2">
                    <Icons.Layers className="h-5 w-5 text-amber-500" />
                    <span>{isMarathi ? "सराव संच विभाग (MCQ Sets)" : "Practice Set Selection (MCQ Sets)"}</span>
                  </h3>
                </div>

                {/* MCQ Sets Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(() => {
                    const chapterQsCount = QUESTIONS.filter((q) => q.chapterId === activeChapterObj.id).length;
                    const totalSetsCount = Math.ceil(chapterQsCount / 20);
                    return Array.from({ length: totalSetsCount }).map((_, idx) => {
                      const setNum = idx + 1;
                      const startNum = (setNum - 1) * 20 + 1;
                      const endNum = Math.min(setNum * 20, chapterQsCount);
                      const totalSetQs = endNum - startNum + 1;
                      
                      const setStats = getSetCompletionStatus(activeChapterObj.id, setNum);
                      const isDemoMode = !currentUser?.isPremium;

                      return (
                        <div
                          key={setNum}
                          className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-750 transition-all flex flex-col justify-between text-left"
                        >
                          <div>
                            {/* Set Card Header */}
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-xs font-bold font-mono text-amber-400 bg-amber-500/5 px-2.5 py-1 rounded-md border border-amber-500/10 uppercase tracking-wide flex items-center gap-1">
                                {isDemoMode ? (
                                  <Icons.ShieldAlert className="h-3.5 w-3.5 text-amber-500" />
                                ) : (
                                  <Icons.Crown className="h-3.5 w-3.5 text-emerald-400 fill-emerald-400/20" />
                                )}
                                <span>{isMarathi ? `संच क्रमांक ${setNum}` : `Set No. ${setNum}`}</span>
                              </span>
                              <span className="text-[11px] font-mono font-bold text-slate-400 bg-slate-950 px-2 py-1 rounded border border-slate-850">
                                {isDemoMode ? "5 Qs" : `${totalSetQs} Qs`}
                              </span>
                            </div>

                            {/* Questions Range Description */}
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="text-base font-bold text-slate-100">
                                {isDemoMode 
                                  ? (isMarathi ? `प्रश्न क्र. ${startNum} ते ${startNum + 4} (डेमो)` : `Questions ${startNum} - ${startNum + 4} (Demo)`)
                                  : (isMarathi ? `प्रश्न क्र. ${startNum} ते ${endNum}` : `Questions ${startNum} - ${endNum}`)}
                              </h4>
                              {isDemoMode && (
                                <span className="text-[10px] bg-amber-500/10 text-amber-500 font-extrabold uppercase font-mono px-2 py-0.5 rounded border border-amber-500/20 flex items-center gap-1">
                                  <Icons.Unlock className="h-2.5 w-2.5" />
                                  <span>{isMarathi ? "डेमो" : "DEMO"}</span>
                                </span>
                              )}
                            </div>

                            {/* Stats / Completion state */}
                            <div className="my-4">
                              {isDemoMode && (
                                <div className="p-3 mb-2 rounded-xl bg-amber-500/5 border border-amber-500/10 text-[11px] text-amber-500/90 leading-relaxed font-sans">
                                  {isMarathi 
                                    ? "💡 विनामूल्य डेमो: तुम्ही या संचातील पहिल्या ५ प्रश्नांचा विनामूल्य सराव करू शकता." 
                                    : "💡 Free Demo: You can practice the first 5 questions of this set for free."}
                                </div>
                              )}
                              {setStats ? (
                                <div className="p-3 rounded-lg bg-slate-950 border border-slate-850 flex flex-col gap-2">
                                  <div className="flex items-center justify-between text-[11px]">
                                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                                      <Icons.CheckCircle2 className="h-3.5 w-3.5" />
                                      {isMarathi ? `पूर्ण केले (${setStats.tests} वेळा)` : `Completed (${setStats.tests} times)`}
                                    </span>
                                    <span className="text-slate-400">
                                      {isMarathi ? "सर्वोच्च" : "Highest"}: <strong className="text-amber-400 font-black">{setStats.high}%</strong>
                                    </span>
                                  </div>
                                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                                      style={{ width: `${setStats.high}%` }}
                                    />
                                  </div>
                                </div>
                              ) : (
                                <span className="text-xs text-slate-500 flex items-center gap-1.5 font-sans font-medium py-1">
                                  <span className="h-2 w-2 rounded-full bg-slate-800" />
                                  {isMarathi ? "अद्याप सराव केला नाही" : "Not attempted yet"}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Direct Start Action Buttons */}
                          <div className="flex flex-col gap-2">
                            <div className="grid grid-cols-2 gap-2 mt-1">
                              <button
                                onClick={() => {
                                  onStartTest({
                                    chapterId: activeChapterObj.id,
                                    mode: "practice",
                                    questionCount: isDemoMode ? 5 : totalSetQs,
                                    timeLimitMinutes: isDemoMode ? 5 : 15,
                                    source: "static",
                                    setId: setNum,
                                  });
                                }}
                                className="py-2.5 px-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-black rounded-xl active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer group"
                              >
                                <Icons.BookOpen className="h-3.5 w-3.5 text-amber-500 group-hover:scale-110 transition-transform" />
                                <span>{isMarathi ? "सराव" : "Practice"}</span>
                              </button>
                              <button
                                onClick={() => {
                                  onStartTest({
                                    chapterId: activeChapterObj.id,
                                    mode: "exam",
                                    questionCount: isDemoMode ? 5 : totalSetQs,
                                    timeLimitMinutes: isDemoMode ? 5 : 15,
                                    source: "static",
                                    setId: setNum,
                                  });
                                }}
                                className="py-2.5 px-3 bg-gradient-to-r from-amber-500/10 to-amber-600/10 hover:from-amber-500/20 hover:to-amber-600/20 border border-amber-500/30 hover:border-amber-500 text-amber-400 text-xs font-black rounded-xl active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer group"
                              >
                                <Icons.Timer className="h-3.5 w-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                                <span>{isMarathi ? "परीक्षा" : "Exam"}</span>
                              </button>
                            </div>

                            {isDemoMode && (
                              <button
                                onClick={onUpgradeClick}
                                className="mt-1 w-full py-2 text-[10px] text-amber-500 hover:text-amber-400 font-extrabold flex items-center justify-center gap-1 bg-amber-500/5 hover:bg-amber-500/10 border border-amber-500/15 hover:border-amber-500/30 rounded-lg transition-all cursor-pointer"
                              >
                                <Icons.Crown className="h-3 w-3 fill-amber-500/10 text-amber-500 animate-pulse" />
                                <span>{isMarathi ? "उर्वरित प्रश्न अनलॉक करा (₹२९९)" : "Unlock all 20 Questions (₹299)"}</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            );
          })()
        )}
      </div>
    </div>
  );
}
