import React, { useState, useEffect } from "react";
import { Question, Chapter, StateLanguage } from "../types";
import * as Icons from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface QuizContainerProps {
  chapterId: number | "all";
  mode: "practice" | "exam";
  questions: Question[];
  timeLimitMinutes: number;
  bilingual: boolean;
  selectedLanguage: StateLanguage;
  onComplete: (score: number, answers: Record<number, string>, timeSpentSeconds: number) => void;
  onExit: () => void;
  isPremium?: boolean;
  onUpgradeClick?: () => void;
}

export default function QuizContainer({
  chapterId,
  mode,
  questions,
  timeLimitMinutes,
  bilingual,
  selectedLanguage,
  onComplete,
  onExit,
  isPremium = false,
  onUpgradeClick,
}: QuizContainerProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  
  // Timer state
  const [secondsRemaining, setSecondsRemaining] = useState<number>(timeLimitMinutes * 60);
  const [timeSpent, setTimeSpent] = useState<number>(0);

  // Practice mode specific state
  const [hasAnsweredCurrent, setHasAnsweredCurrent] = useState<boolean>(false);

  const currentQuestion = questions[currentIndex];

  // Timer effect for Exam Mode
  useEffect(() => {
    if (mode === "practice") return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
      setTimeSpent((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [mode]);

  // Keep track of time spent in Practice Mode too
  useEffect(() => {
    if (mode === "exam") return;
    const timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [mode]);

  // Reset answer states when changing questions in practice mode
  useEffect(() => {
    if (mode === "practice") {
      setHasAnsweredCurrent(!!selectedAnswers[currentQuestion.id]);
    }
  }, [currentIndex, mode, selectedAnswers, currentQuestion]);

  const handleOptionSelect = (optionChar: string) => {
    if (mode === "practice" && hasAnsweredCurrent) return; // Prevent changing in practice mode

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionChar,
    }));

    if (mode === "practice") {
      setHasAnsweredCurrent(true);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const toggleFlag = () => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id],
    }));
  };

  const handleSubmit = () => {
    // Calculate final score
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.answer) {
        score++;
      }
    });
    onComplete(score, selectedAnswers, timeSpent);
  };

  // Formatting helper for time
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`;
  };

  const progressPercentage = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="flex flex-col gap-6">
      {/* Top Session Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/60 border border-slate-800 rounded-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg hover:text-white transition"
            title="Exit Practice"
          >
            <Icons.X className="h-4 w-4" />
          </button>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 font-mono">
              {mode === "exam" ? "EXAM MODE (परीक्षा)" : "PRACTICE MODE (सराव)"}
            </span>
            <h3 className="text-sm font-semibold text-slate-200">
              {chapterId === "all"
                ? (bilingual ? "पूर्ण अभ्यासक्रम चाचणी" : "Full Syllabus Test")
                : (bilingual ? `विषय ${chapterId} चाचणी` : `Chapter ${chapterId} Test`)}
            </h3>
          </div>
        </div>

        {/* Timer or Status */}
        <div className="flex items-center gap-4">
          {mode === "exam" ? (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-lg font-mono text-sm font-semibold">
              <Icons.Clock className="h-4 w-4 animate-pulse" />
              <span>{formatTime(secondsRemaining)}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 text-slate-400 rounded-lg font-mono text-xs">
              <Icons.Clock className="h-3 w.5-3" />
              <span>{bilingual ? "गेलेला वेळ:" : "Elapsed"}: {formatTime(timeSpent)}</span>
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-lg transition text-xs uppercase tracking-wider cursor-pointer"
            id="submit-test-btn"
          >
            {bilingual ? "चाचणी पूर्ण करा" : "Finish Test"}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-900">
        <div
          className="bg-gradient-to-r from-amber-500 to-amber-600 h-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {!isPremium && (
        <div className="p-3.5 bg-gradient-to-r from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-amber-400 font-sans shadow-lg shadow-amber-500/5 animate-fade-in">
          <div className="flex items-center gap-2">
            <Icons.Crown className="h-4 w-4 text-amber-500 fill-amber-500/20 shrink-0" />
            <span>
              {selectedLanguage.code === "mr" 
                ? "💡 विनामूल्य डेमो सराव: तुम्ही प्रति संच फक्त ५ प्रश्नांचा सराव करू शकता." 
                : "💡 Free Demo Session: You are limited to the first 5 questions of this set."}
            </span>
          </div>
          {onUpgradeClick && (
            <button
              onClick={onUpgradeClick}
              className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-lg text-[11px] transition-all flex items-center gap-1 shrink-0 cursor-pointer shadow"
            >
              <Icons.Sparkles className="h-3.5 w-3.5" />
              <span>{selectedLanguage.code === "mr" ? "सर्व प्रश्न अनलॉक करा (₹२९९)" : "Unlock all Questions (₹299)"}</span>
            </button>
          )}
        </div>
      )}

      {/* Main Panel layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 sm:gap-6">
        {/* Left Side: Question Panel */}
        <div className="lg:col-span-3 flex flex-col gap-5 sm:gap-6">
          <div className="p-4 sm:p-6 md:p-8 bg-slate-900/40 border border-slate-800/80 rounded-xl backdrop-blur-md min-h-[300px] sm:min-h-[380px] flex flex-col justify-between">
            <div>
              {/* Question Header */}
              <div className="flex justify-between items-start gap-4 mb-4">
                <span className="text-xs px-2.5 py-1 bg-slate-800 text-slate-400 rounded-full font-mono font-bold">
                  Q. {currentIndex + 1} of {questions.length}
                </span>

                {mode === "exam" && (
                  <button
                    onClick={toggleFlag}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border transition ${
                      flaggedQuestions[currentQuestion.id]
                        ? "bg-amber-500/10 border-amber-500 text-amber-400 animate-bounce"
                        : "bg-slate-800/50 border-slate-700 text-slate-400 hover:text-slate-300"
                    }`}
                  >
                    <Icons.Bookmark className="h-3 w-3" />
                    <span>{bilingual ? "पुनरावलोकन" : "Flag"}</span>
                  </button>
                )}
              </div>

              {/* Bilingual Stacked Questions */}
              <div className="mb-6 sm:mb-8" id="question-text-block">
                <h2 className="text-base sm:text-lg md:text-xl font-medium text-white mb-3 leading-snug">
                  {currentQuestion.question}
                </h2>
                {bilingual && (selectedLanguage.code === "mr" ? currentQuestion.questionMarathi : currentQuestion.questionTranslated) && (
                  <p className="text-sm md:text-base text-slate-300 bg-slate-950/40 p-3 sm:p-4 rounded-lg border border-slate-900 leading-relaxed font-sans italic">
                    {selectedLanguage.code === "mr" ? currentQuestion.questionMarathi : currentQuestion.questionTranslated}
                  </p>
                )}
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 gap-3 sm:gap-3.5 mb-6 sm:mb-8" id="options-grid">
                {currentQuestion.options.map((opt, idx) => {
                  const optionChar = String.fromCharCode(65 + idx); // A, B, C, D
                  const isSelected = selectedAnswers[currentQuestion.id] === optionChar;
                  const isCorrectAnswer = currentQuestion.answer === optionChar;

                  let optionStyle = "bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60";

                  if (mode === "practice" && hasAnsweredCurrent) {
                    if (isCorrectAnswer) {
                      // Correct option is always highlighted green
                      optionStyle = "bg-emerald-500/10 border-emerald-500 text-emerald-400";
                    } else if (isSelected) {
                      // If user selected incorrect option, highlight it red
                      optionStyle = "bg-rose-500/10 border-rose-500 text-rose-400";
                    } else {
                      optionStyle = "bg-slate-950/40 border-slate-900 text-slate-600 opacity-60";
                    }
                  } else if (isSelected) {
                    optionStyle = "bg-amber-500/10 border-amber-500 text-amber-400 font-semibold";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(optionChar)}
                      disabled={mode === "practice" && hasAnsweredCurrent}
                      className={`w-full text-left p-3 sm:p-4 rounded-xl border flex items-start gap-3 sm:gap-4 transition-all duration-200 cursor-pointer ${optionStyle}`}
                      id={`option-${optionChar}`}
                    >
                      <span className={`flex items-center justify-center h-6 w-6 rounded-full text-xs font-bold border font-mono shrink-0 ${
                        isSelected 
                          ? (mode === "practice" && isCorrectAnswer ? "bg-emerald-500 text-slate-950 border-emerald-500" : (mode === "practice" ? "bg-rose-500 text-slate-950 border-rose-500" : "bg-amber-500 text-slate-950 border-amber-500"))
                          : (mode === "practice" && isCorrectAnswer && hasAnsweredCurrent ? "bg-emerald-500 text-slate-950 border-emerald-500" : "border-slate-800 text-slate-400")
                      }`}>
                        {optionChar}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="block text-sm sm:text-base leading-snug break-words">{opt}</span>
                        {bilingual && (selectedLanguage.code === "mr" ? currentQuestion.optionsMarathi?.[idx] : currentQuestion.optionsTranslated?.[idx]) && (
                          <span className="block text-xs sm:text-sm text-slate-400 mt-1 break-words">
                            {selectedLanguage.code === "mr" ? currentQuestion.optionsMarathi?.[idx] : currentQuestion.optionsTranslated?.[idx]}
                          </span>
                        )}
                      </div>
                      
                      {/* Icons for validation in practice mode */}
                      {mode === "practice" && hasAnsweredCurrent && (
                        <div className="shrink-0 mt-0.5">
                          {isCorrectAnswer && <Icons.Check className="text-emerald-500 h-5 w-5" />}
                          {!isCorrectAnswer && isSelected && <Icons.X className="text-rose-500 h-5 w-5" />}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Controls inside Question Panel */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-850">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-4 py-2 border border-slate-800 text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Icons.ArrowLeft className="h-4 w-4" />
                <span>{bilingual ? "मागील" : "Previous"}</span>
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex === questions.length - 1}
                className="px-4 py-2 border border-slate-800 text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <span>{bilingual ? "पुढील" : "Next"}</span>
                <Icons.ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Practice Mode Detailed Explanations Panel */}
          {mode === "practice" && hasAnsweredCurrent && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl"
            >
              <div className="flex items-center gap-2 mb-3 border-b border-slate-800 pb-2">
                <Icons.Lightbulb className="text-amber-500 h-5 w-5" />
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                  {bilingual ? "स्पष्टीकरण" : "Explanation"}
                </h4>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {bilingual && (selectedLanguage.code === "mr" ? currentQuestion.explanationMarathi : currentQuestion.explanationTranslated)
                  ? (selectedLanguage.code === "mr" ? currentQuestion.explanationMarathi : currentQuestion.explanationTranslated)
                  : currentQuestion.explanation}
              </p>
            </motion.div>
          )}
        </div>

        {/* Right Side: Quiz Navigation Console */}
        <div className="lg:col-span-1">
          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl backdrop-blur-md sticky top-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <Icons.Compass className="h-4 w-4 text-amber-500" />
              {bilingual ? "चाचणी नेव्हिगेशन" : "Test Console"}
            </h3>

            {/* Grid of question bubbles */}
            <div className="grid grid-cols-5 gap-2 mb-6">
              {questions.map((q, idx) => {
                const isSelected = idx === currentIndex;
                const isAnswered = !!selectedAnswers[q.id];
                const isFlagged = flaggedQuestions[q.id];

                let bubbleStyle = "bg-slate-950/60 border-slate-850 text-slate-400 hover:border-slate-700";

                if (isSelected) {
                  bubbleStyle = "bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-md shadow-amber-500/10";
                } else if (mode === "practice" && isAnswered) {
                  // In practice mode, color correctly directly
                  const isCorrect = selectedAnswers[q.id] === q.answer;
                  bubbleStyle = isCorrect 
                    ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400 font-medium"
                    : "bg-rose-500/10 border-rose-500/40 text-rose-400 font-medium";
                } else if (isFlagged) {
                  bubbleStyle = "bg-amber-500/15 border-amber-500/40 text-amber-400 font-medium";
                } else if (isAnswered) {
                  bubbleStyle = "bg-slate-800 border-slate-700 text-slate-200 font-medium";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 w-9 rounded-lg border text-xs font-mono flex items-center justify-center transition-all cursor-pointer ${bubbleStyle}`}
                    id={`nav-bubble-${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend / Info */}
            <div className="flex flex-col gap-2.5 text-[11px] text-slate-400 border-t border-slate-800/80 pt-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 bg-slate-800 border border-slate-700 rounded-sm" />
                <span>{bilingual ? "उत्तर दिलेले" : "Answered"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 bg-slate-950/60 border border-slate-850 rounded-sm" />
                <span>{bilingual ? "उत्तर न दिलेले" : "Not Answered"}</span>
              </div>
              {mode === "exam" ? (
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 bg-amber-500/20 border border-amber-500/40 rounded-sm" />
                  <span>{bilingual ? "पुनरावलोकनासाठी चिन्हांकित" : "Flagged for Review"}</span>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 bg-emerald-500/20 border border-emerald-500/40 rounded-sm" />
                    <span>{bilingual ? "बरोबर उत्तर" : "Correct Answer"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 bg-rose-500/20 border border-rose-500/40 rounded-sm" />
                    <span>{bilingual ? "चूक उत्तर" : "Incorrect Answer"}</span>
                  </div>
                </>
              )}
            </div>

            {/* Exam specific instructions warnings */}
            {mode === "exam" && (
              <div className="mt-5 p-3.5 bg-slate-950/80 border border-slate-850 rounded-lg text-[10px] text-slate-500 leading-normal">
                <Icons.AlertTriangle className="h-3 w-3 text-amber-500/80 inline mr-1 -mt-0.5" />
                {bilingual 
                  ? "परीक्षा मोडमध्ये, तुम्ही पूर्ण करून सबमिट करेपर्यंत कोणतीही उत्तरे उघड केली जाणार नाहीत." 
                  : "In Exam mode, answers will not be revealed until you submit the test."}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
