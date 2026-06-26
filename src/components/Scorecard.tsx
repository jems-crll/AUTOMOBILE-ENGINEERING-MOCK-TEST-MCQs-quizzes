import React, { useState } from "react";
import { Question, StateLanguage } from "../types";
import * as Icons from "lucide-react";
import { motion } from "motion/react";

interface ScorecardProps {
  questions: Question[];
  score: number;
  selectedAnswers: Record<number, string>;
  timeSpentSeconds: number;
  bilingual: boolean;
  selectedLanguage: StateLanguage;
  onRetake: () => void;
  onDashboard: () => void;
  isPremium?: boolean;
  onUpgradeClick?: () => void;
}

export default function Scorecard({
  questions,
  score,
  selectedAnswers,
  timeSpentSeconds,
  bilingual,
  selectedLanguage,
  onRetake,
  onDashboard,
  isPremium = false,
  onUpgradeClick,
}: ScorecardProps) {
  const [reviewIndex, setReviewIndex] = useState<number>(0);

  const percentage = Math.round((score / questions.length) * 100);
  const correctCount = score;
  const incorrectCount = Object.keys(answersMap()).filter(
    (key) => selectedAnswers[parseInt(key)] && selectedAnswers[parseInt(key)] !== questions.find((q) => q.id === parseInt(key))?.answer
  ).length;
  const unansweredCount = questions.length - Object.keys(selectedAnswers).length;

  function answersMap() {
    const map: Record<number, string> = {};
    questions.forEach((q) => {
      map[q.id] = selectedAnswers[q.id] || "";
    });
    return map;
  }

  const currentReviewQuestion = questions[reviewIndex];
  const selectedAns = selectedAnswers[currentReviewQuestion.id];
  const isCorrect = selectedAns === currentReviewQuestion.answer;

  const getScoreMessage = () => {
    if (percentage >= 85) {
      return {
        title: bilingual ? "उत्कृष्ट! अप्रतिम कामगिरी!" : "Outstanding! Elite Performance!",
        desc: bilingual 
          ? "तुमची ऑटोमोबाईल इंजिनिअरिंग संकल्पनांवर मजबूत पकड आहे. अशीच तयारी सुरू ठेवा!"
          : "You have an outstanding grip on Automobile Engineering concepts. Keep it up!",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/30",
        icon: "Trophy"
      };
    } else if (percentage >= 60) {
      return {
        title: bilingual ? "चांगला प्रयत्न! छान!" : "Great Effort! Well Done!",
        desc: bilingual 
          ? "तुमची कामगिरी चांगली आहे, परंतु परिपूर्णतेसाठी अजून काही भागांवर लक्ष केंद्रित करण्याची गरज आहे."
          : "Good performance, but there is still room to sharpen specific details for perfection.",
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/30",
        icon: "ThumbsUp"
      };
    } else {
      return {
        title: bilingual ? "अधिक अभ्यासाची गरज!" : "Needs More Study!",
        desc: bilingual 
          ? "चिंता करू नका! प्रश्नांची उत्तरे तपासा, AI कडून संकल्पना समजून घ्या आणि पुन्हा प्रयत्न करा."
          : "Don't worry! Review the incorrect answers, understand concepts with AI, and try again.",
        color: "text-rose-400",
        bg: "bg-rose-500/10",
        border: "border-rose-500/30",
        icon: "AlertCircle"
      };
    }
  };

  const msg = getScoreMessage();

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}m ${remainingSecs}s`;
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Overview Block */}
      <div className={`p-6 md:p-8 rounded-xl border ${msg.bg} ${msg.border} backdrop-blur-md`}>
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Progress Circle */}
          <div className="relative flex items-center justify-center shrink-0">
            <svg className="w-36 h-36">
              <circle
                className="text-slate-800"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
                r="62"
                cx="72"
                cy="72"
              />
              <circle
                className={percentage >= 60 ? (percentage >= 85 ? "text-emerald-500" : "text-amber-500") : "text-rose-500"}
                strokeWidth="10"
                strokeDasharray={2 * Math.PI * 62}
                strokeDashoffset={2 * Math.PI * 62 * (1 - percentage / 100)}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="62"
                cx="72"
                cy="72"
                style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-extrabold font-mono text-white">{percentage}%</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">{bilingual ? "एकूण गुण" : "Overall"}</span>
            </div>
          </div>

          {/* Feedback details */}
          <div className="flex-1 text-center md:text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 font-mono">
              {bilingual ? "चाचणी निकाल" : "TEST SCORECARD"}
            </span>
            <h2 className={`text-2xl md:text-3xl font-black font-sans tracking-tight mt-1 mb-2 ${msg.color}`}>
              {msg.title}
            </h2>
            <p className="text-sm text-slate-300 mb-5 leading-relaxed max-w-xl">
              {bilingual ? "तुम्ही यशस्वीरित्या चाचणी पूर्ण केली आहे. तुमचे निकाल खालीलप्रमाणे आहेत. तुम्ही सर्व प्रश्नांची अचूक उत्तरे आणि स्पष्टीकरणे खाली पाहू शकता." : "You have successfully completed the mock test. Your complete results are shown below. You can review exact explanations for each question."}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <button
                onClick={onRetake}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs uppercase tracking-wider transition cursor-pointer"
              >
                {bilingual ? "पुन्हा परीक्षा द्या" : "Retake Test"}
              </button>
              <button
                onClick={onDashboard}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold rounded-lg text-xs uppercase tracking-wider transition cursor-pointer"
              >
                {bilingual ? "डॅशबोर्डवर जा" : "Back to Dashboard"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Upgrade Promo Card */}
      {!isPremium && (
        <div className="p-6 bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/30 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-amber-500/5 animate-fade-in">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl shrink-0">
              <Icons.Crown className="h-6 w-6 fill-amber-500/10 text-amber-500 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-black text-amber-400 mb-1 font-sans">
                {bilingual 
                  ? "प्रीमियम सबस्क्रिप्शनसह सर्व २०+ प्रश्न अनलॉक करा!" 
                  : "Unlock all 20+ Questions with Premium!"}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-2xl font-medium">
                {bilingual 
                  ? "तुम्ही विनामूल्य आवृत्तीमध्ये फक्त ५ डेमो प्रश्न पाहिले आहेत. संपूर्ण अभ्यासक्रम आणि सर्व सराव संच सोडवण्यासाठी आजच प्रीमियम सबस्क्रिप्शन घ्या आणि तुमची यशस्वीतेची खात्री करा!"
                  : "You only practiced 5 demo questions in the free version. Secure your success by upgrading to Premium to unlock all questions, explanation keys, and mock exams!"}
              </p>
            </div>
          </div>
          {onUpgradeClick && (
            <button
              onClick={onUpgradeClick}
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm transition-all duration-150 flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-lg shadow-amber-500/10 group active:scale-[0.98]"
            >
              <Icons.Sparkles className="h-4 w-4 fill-slate-950 text-slate-950 group-hover:scale-110 transition-transform" />
              <span>{bilingual ? "आता अनलॉक करा (फक्त ₹२९९)" : "Unlock All Now (Only ₹299)"}</span>
            </button>
          )}
        </div>
      )}

      {/* Grid Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="p-4 bg-slate-900/40 border border-slate-800/80 rounded-xl text-center">
          <span className="block text-[10px] text-slate-400 uppercase mb-1">{bilingual ? "एकूण प्रश्न" : "Total Qs"}</span>
          <span className="text-xl font-bold font-mono text-white">{questions.length}</span>
        </div>
        <div className="p-4 bg-slate-900/40 border border-slate-800/80 rounded-xl text-center">
          <span className="block text-[10px] text-slate-400 uppercase mb-1">{bilingual ? "बरोबर" : "Correct"}</span>
          <span className="text-xl font-bold font-mono text-emerald-400">{correctCount}</span>
        </div>
        <div className="p-4 bg-slate-900/40 border border-slate-800/80 rounded-xl text-center">
          <span className="block text-[10px] text-slate-400 uppercase mb-1">{bilingual ? "चुकीचे" : "Incorrect"}</span>
          <span className="text-xl font-bold font-mono text-rose-400">{questions.length - correctCount - unansweredCount}</span>
        </div>
        <div className="p-4 bg-slate-900/40 border border-slate-800/80 rounded-xl text-center">
          <span className="block text-[10px] text-slate-400 uppercase mb-1">{bilingual ? "सोडवून दिले" : "Skipped"}</span>
          <span className="text-xl font-bold font-mono text-slate-500">{unansweredCount}</span>
        </div>
        <div className="p-4 bg-slate-900/40 border border-slate-800/80 rounded-xl col-span-2 md:col-span-1 text-center">
          <span className="block text-[10px] text-slate-400 uppercase mb-1">{bilingual ? "घेतलेला वेळ" : "Time Taken"}</span>
          <span className="text-xl font-bold font-mono text-amber-400">{formatTime(timeSpentSeconds)}</span>
        </div>
      </div>

      {/* Questions Review Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Review Panel */}
        <div className="lg:col-span-3 flex flex-col gap-5">
          <div className="p-6 md:p-8 bg-slate-900/40 border border-slate-800/80 rounded-xl backdrop-blur-md">
            <div className="flex justify-between items-center mb-4">
              <span className={`text-xs px-3 py-1 font-bold rounded-full ${
                !selectedAns 
                  ? "bg-slate-800 text-slate-400"
                  : (isCorrect ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20")
              }`}>
                {!selectedAns 
                  ? (bilingual ? "सोडून दिला (Skipped)" : "Skipped")
                  : (isCorrect ? (bilingual ? "बरोबर (Correct)" : "Correct") : (bilingual ? "चुकीचे (Incorrect)" : "Incorrect"))}
              </span>
              <span className="text-xs font-mono text-slate-500">Question {reviewIndex + 1} of {questions.length}</span>
            </div>

            <h3 className="text-base md:text-lg font-bold text-white mb-2">{currentReviewQuestion.question}</h3>
            {bilingual && (selectedLanguage.code === "mr" ? currentReviewQuestion.questionMarathi : currentReviewQuestion.questionTranslated) && (
              <p className="text-sm text-slate-400 bg-slate-950/20 p-3 rounded-lg border border-slate-900 mb-6 italic font-sans">
                {selectedLanguage.code === "mr" ? currentReviewQuestion.questionMarathi : currentReviewQuestion.questionTranslated}
              </p>
            )}

            {/* Options grid */}
            <div className="grid grid-cols-1 gap-2.5 mb-6">
              {currentReviewQuestion.options.map((opt, idx) => {
                const char = String.fromCharCode(65 + idx);
                const isSelected = selectedAns === char;
                const isCorrectAns = currentReviewQuestion.answer === char;

                let borderStyle = "border-slate-800 bg-slate-950/30 text-slate-400";
                if (isCorrectAns) {
                  borderStyle = "border-emerald-500/50 bg-emerald-500/5 text-emerald-400 font-medium";
                } else if (isSelected) {
                  borderStyle = "border-rose-500/50 bg-rose-500/5 text-rose-400";
                }

                return (
                  <div key={idx} className={`p-3.5 rounded-lg border text-xs md:text-sm flex items-center justify-between ${borderStyle}`}>
                    <div className="flex items-center gap-3">
                      <span className={`h-5 w-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold border ${
                        isCorrectAns ? "bg-emerald-500 text-slate-950 border-emerald-500" : (isSelected ? "bg-rose-500 text-slate-950 border-rose-500" : "border-slate-800 text-slate-500")
                      }`}>
                        {char}
                      </span>
                      <div>
                        <span>{opt}</span>
                        {bilingual && (selectedLanguage.code === "mr" ? currentReviewQuestion.optionsMarathi?.[idx] : currentReviewQuestion.optionsTranslated?.[idx]) && (
                          <span className="block text-[11px] text-slate-500 mt-0.5">{selectedLanguage.code === "mr" ? currentReviewQuestion.optionsMarathi?.[idx] : currentReviewQuestion.optionsTranslated?.[idx]}</span>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isCorrectAns && <Icons.Check className="h-4 w-4 text-emerald-500" />}
                      {!isCorrectAns && isSelected && <Icons.X className="h-4 w-4 text-rose-500" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Explanation */}
            <div className="mt-6 pt-5 border-t border-slate-850">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                <Icons.Lightbulb className="h-4 w-4 text-amber-500" />
                <span>{bilingual ? "स्पष्टीकरण" : "Explanation"}</span>
              </div>

              <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-sans">
                {bilingual && (selectedLanguage.code === "mr" ? currentReviewQuestion.explanationMarathi : currentReviewQuestion.explanationTranslated)
                  ? (selectedLanguage.code === "mr" ? currentReviewQuestion.explanationMarathi : currentReviewQuestion.explanationTranslated)
                  : currentReviewQuestion.explanation}
              </p>
            </div>
          </div>
        </div>

        {/* Right review bubble grid */}
        <div className="lg:col-span-1">
          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl backdrop-blur-md">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Icons.Eye className="h-4 w-4 text-amber-500" />
              <span>{bilingual ? "सर्व प्रश्न तपासा" : "Review Panel"}</span>
            </h4>

            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const isActive = reviewIndex === idx;
                const isCorrectAns = selectedAnswers[q.id] === q.answer;
                const wasSkipped = !selectedAnswers[q.id];

                let markerStyle = "bg-slate-950/60 border-slate-850 text-slate-400";
                if (isActive) {
                  markerStyle = "bg-amber-500 text-slate-950 font-bold border-amber-500";
                } else if (wasSkipped) {
                  markerStyle = "bg-slate-800 border-slate-700 text-slate-500";
                } else if (isCorrectAns) {
                  markerStyle = "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
                } else {
                  markerStyle = "bg-rose-500/10 border-rose-500/30 text-rose-400";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setReviewIndex(idx);
                    }}
                    className={`h-9 w-9 rounded-lg border text-xs font-mono flex items-center justify-center transition-all cursor-pointer ${markerStyle}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
