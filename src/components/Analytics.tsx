import React from "react";
import { QuizAttempt } from "../types";
import { CHAPTERS } from "../data/questions";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import * as Icons from "lucide-react";

interface AnalyticsProps {
  attempts: QuizAttempt[];
  bilingual: boolean;
  onClearHistory: () => void;
}

export default function Analytics({ attempts, bilingual, onClearHistory }: AnalyticsProps) {
  if (attempts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-slate-900/40 border border-slate-800 rounded-xl min-h-[300px] text-center">
        <div className="p-4 bg-slate-800/60 rounded-full text-slate-500 mb-4">
          <Icons.Inbox className="h-8 w-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-300 mb-1">
          {bilingual ? "चाचणी इतिहास उपलब्ध नाही" : "No Test History Yet"}
        </h3>
        <p className="text-xs text-slate-500 max-w-sm">
          {bilingual 
            ? "तुमची कामगिरी, गुण प्रगती आणि सरासरीची माहिती मिळवण्यासाठी आधी मॉक टेस्ट पूर्ण करा." 
            : "Take a few chapter-wise mock tests to generate performance trends, progress graphs, and strengths metrics."}
        </p>
      </div>
    );
  }

  // Format data for Recharts line chart
  const chartData = attempts.map((a, idx) => ({
    name: `#${idx + 1}`,
    score: Math.round((a.score / a.totalQuestions) * 100),
    date: new Date(a.date).toLocaleDateString(bilingual ? "mr-IN" : "en-US", {
      month: "short",
      day: "numeric",
    }),
    chapter: a.chapterName,
  }));

  // Analyze strengths and weaknesses
  const getStrengthsAndWeaknesses = () => {
    const chapterTotals: Record<number, { scores: number[]; name: string }> = {};

    attempts.forEach((a) => {
      if (a.chapterId === "all") return; // skip global tests for specific chapter analysis
      if (!chapterTotals[a.chapterId]) {
        const ch = CHAPTERS.find((c) => c.id === a.chapterId);
        chapterTotals[a.chapterId] = {
          scores: [],
          name: ch ? (bilingual ? ch.nameMarathi : ch.name) : `Chapter ${a.chapterId}`,
        };
      }
      chapterTotals[a.chapterId].scores.push((a.score / a.totalQuestions) * 100);
    });

    const averages = Object.keys(chapterTotals).map((idStr) => {
      const id = parseInt(idStr);
      const item = chapterTotals[id];
      const avg = Math.round(item.scores.reduce((sum, s) => sum + s, 0) / item.scores.length);
      return { id, name: item.name, average: avg };
    });

    // Sort by average score descending
    averages.sort((a, b) => b.average - a.average);

    const strengths = averages.filter((a) => a.average >= 70);
    const weaknesses = averages.filter((a) => a.average < 70);

    return { strengths, weaknesses, hasData: averages.length > 0 };
  };

  const { strengths, weaknesses, hasData } = getStrengthsAndWeaknesses();

  // Custom tooltip for line chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg shadow-lg">
          <p className="text-xs font-mono font-bold text-amber-500">{data.date} (Attempt {data.name})</p>
          <p className="text-sm font-bold text-white mt-1">Score: <span className="text-emerald-400">{data.score}%</span></p>
          <p className="text-[11px] text-slate-400 mt-1 max-w-[200px] truncate">{data.chapter}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Upper Grid stats */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">{bilingual ? "प्रगती आणि विश्लेषण" : "Performance Analytics"}</h2>
          <p className="text-xs text-slate-500 mt-0.5">{bilingual ? "तुमच्या गुणांचे सविस्तर आलेख आणि प्रगती अहवाल" : "Bilingual review of test progression and target learning zones"}</p>
        </div>
        <button
          onClick={() => {
            if (window.confirm(bilingual ? "तुम्हाला खरोखर सर्व इतिहास पुसून टाकायचा आहे का?" : "Are you sure you want to clear your test history? This cannot be undone.")) {
              onClearHistory();
            }
          }}
          className="px-3.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
        >
          <Icons.Trash2 className="h-3.5 w-3.5" />
          <span>{bilingual ? "इतिहास पुसा" : "Clear History"}</span>
        </button>
      </div>

      {/* Graphical Chart panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-5 bg-slate-900/60 border border-slate-800 rounded-xl backdrop-blur-md flex flex-col justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
            <Icons.TrendingUp className="h-4 w-4 text-amber-500" />
            <span>{bilingual ? "गुण प्रगती आलेख" : "Score Progression Trend"}</span>
          </h3>

          <div className="h-[240px] w-full font-mono text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 15, left: -25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis domain={[0, 100]} stroke="#64748b" />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  activeDot={{ r: 8 }}
                  dot={{ stroke: "#1e1b4b", strokeWidth: 2, r: 4, fill: "#f59e0b" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Strengths and Weaknesses Card */}
        <div className="lg:col-span-1 flex flex-col gap-5">
          {/* Strengths */}
          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl backdrop-blur-md flex-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <Icons.CheckCircle className="h-4 w-4 text-emerald-400" />
              <span>{bilingual ? "मजबूत विषय (Score ≥ 70%)" : "Strong Areas (Score ≥ 70%)"}</span>
            </h3>

            {hasData && strengths.length > 0 ? (
              <div className="flex flex-col gap-2.5">
                {strengths.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-2.5 bg-slate-950/40 border border-slate-850 rounded-lg">
                    <span className="text-xs text-slate-200 truncate pr-2 font-medium">{item.name}</span>
                    <span className="text-xs font-mono font-extrabold text-emerald-400">{item.average}%</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic py-2">
                {bilingual ? "अद्याप पुरेसा डेटा नाही." : "No chapters identified yet. Achieve 70% or higher to list here."}
              </p>
            )}
          </div>

          {/* Weaknesses */}
          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl backdrop-blur-md flex-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <Icons.AlertTriangle className="h-4 w-4 text-rose-400" />
              <span>{bilingual ? "अभ्यासाची गरज (Score < 70%)" : "Target Zones (Score < 70%)"}</span>
            </h3>

            {hasData && weaknesses.length > 0 ? (
              <div className="flex flex-col gap-2.5">
                {weaknesses.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-2.5 bg-slate-950/40 border border-slate-850 rounded-lg">
                    <span className="text-xs text-slate-200 truncate pr-2 font-medium">{item.name}</span>
                    <span className="text-xs font-mono font-extrabold text-rose-400">{item.average}%</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic py-2">
                {bilingual ? "अभ्यासाची गरज असलेला कोणताही विशिष्ट विषय नाही!" : "No target zones identified. Keep practicing to locate improvement focus."}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* History table list */}
      <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl backdrop-blur-md">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
          <Icons.History className="h-4 w-4 text-blue-400" />
          <span>{bilingual ? "सर्व चाचणी इतिहास" : "Detailed Attempt Log"}</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
                <th className="pb-3 pr-4">{bilingual ? "तारीख" : "Date"}</th>
                <th className="pb-3 pr-4">{bilingual ? "विषय" : "Chapter"}</th>
                <th className="pb-3 pr-4 text-center">{bilingual ? "गुण" : "Score"}</th>
                <th className="pb-3 text-center">{bilingual ? "वेळ" : "Time Spent"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {[...attempts].reverse().map((a) => {
                const percent = Math.round((a.score / a.totalQuestions) * 100);
                const mins = Math.floor(a.timeSpentSeconds / 60);
                const secs = a.timeSpentSeconds % 60;

                return (
                  <tr key={a.id} className="text-slate-300 hover:bg-slate-900/20">
                    <td className="py-3.5 pr-4 font-mono text-slate-400">
                      {new Date(a.date).toLocaleDateString(bilingual ? "mr-IN" : "en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="py-3.5 pr-4 font-semibold text-slate-200">{a.chapterName}</td>
                    <td className="py-3.5 pr-4 text-center font-mono font-bold">
                      <span className={percent >= 60 ? (percent >= 85 ? "text-emerald-400" : "text-amber-400") : "text-rose-400"}>
                        {a.score} / {a.totalQuestions} ({percent}%)
                      </span>
                    </td>
                    <td className="py-3.5 text-center font-mono text-slate-400">{mins}m {secs}s</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
