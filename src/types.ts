export interface User {
  email: string;
  isPremium: boolean;
  username?: string;
  role?: "student" | "admin";
  subscriptionStatus?: "active" | "inactive";
}

export interface Question {
  id: number;
  chapterId: number;
  question: string;         // English
  questionMarathi?: string;  // Marathi (kept for backwards compatibility)
  questionTranslated?: string; // Translated version using selected language
  options: string[];        // English options [A, B, C, D]
  optionsMarathi?: string[]; // Marathi options [A, B, C, D]
  optionsTranslated?: string[]; // Translated options
  answer: string;           // E.g. "A", "B", "C", "D"
  explanation: string;      // Simple pre-populated explanation
  explanationTranslated?: string; // Translated explanation
  explanationMarathi?: string; // Marathi explanation
}

export interface StateLanguage {
  code: string;
  name: string;
  nativeName: string;
  state: string;
}

export const STATE_LANGUAGES: StateLanguage[] = [
  { code: "mr", name: "Marathi", nativeName: "मराठी", state: "Maharashtra" },
  { code: "en", name: "English", nativeName: "English", state: "All India" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", state: "North & Central India" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", state: "Karnataka" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", state: "Andhra & Telangana" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", state: "Tamil Nadu" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", state: "Gujarat" },
];

export interface Chapter {
  id: number;
  name: string;
  nameMarathi: string;
  nameTranslated?: string; // Translated chapter name
  description: string;
  descriptionMarathi: string;
  descriptionTranslated?: string; // Translated chapter description
  icon: string; // lucide icon name
}

export interface QuizAttempt {
  id: string;
  chapterId: number | "all"; // "all" for custom multi-chapter test
  chapterName: string;
  score: number;
  totalQuestions: number;
  date: string;
  timeSpentSeconds: number;
  answers: Record<number, string>; // questionId -> selectedOption
  setId?: number | "all";
}

export interface ChapterStats {
  chapterId: number;
  completedTests: number;
  averageScore: number;
  highestScore: number;
}
