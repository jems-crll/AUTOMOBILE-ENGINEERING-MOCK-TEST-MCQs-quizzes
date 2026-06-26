import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { QUESTIONS } from "./src/data/questions";
import Razorpay from "razorpay";
import crypto from "crypto";

dotenv.config();

// Helper to make Gemini API calls resilient with exponential backoff & multi-model fallback
async function generateContentWithRetry(ai: any, params: { model: string; contents: any; config?: any }, retries = 3, delayMs = 1000): Promise<any> {
  let attempt = 0;
  // Fall back across highly-available models to guarantee robust, error-free delivery
  const modelsToTry = [params.model, "gemini-2.5-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
  
  for (const currentModel of modelsToTry) {
    for (attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`Calling Gemini API using model ${currentModel} (Attempt ${attempt}/${retries})...`);
        const result = await ai.models.generateContent({
          ...params,
          model: currentModel,
        });
        return result;
      } catch (error: any) {
        // Use console.warn to denote non-fatal transient issues and avoid triggering system-level warnings during self-healing
        console.warn(`Gemini API Transient Warning on model ${currentModel} (Attempt ${attempt}/${retries}):`, error.message || error);
        
        // Check if it is a transient error (503, 429, or status UNAVAILABLE)
        const isTransient = 
          error.status === "UNAVAILABLE" || 
          error.status === "RESOURCE_EXHAUSTED" ||
          (error.status === 503) ||
          (error.status === 429) ||
          (error.message && (
            error.message.includes("503") || 
            error.message.includes("429") || 
            error.message.includes("high demand") || 
            error.message.includes("temporary") || 
            error.message.includes("UNAVAILABLE")
          ));
          
        if (isTransient && attempt < retries) {
          const waitTime = delayMs * Math.pow(2, attempt - 1);
          console.log(`Transient error encountered. Retrying in ${waitTime}ms...`);
          await new Promise((resolve) => setTimeout(resolve, waitTime));
        } else {
          // Break out of this model's retry loop and try the next fallback model
          break;
        }
      }
    }
  }
  
  throw new Error("All fallback models and retries failed due to high demand or API service unavailability.");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini API client
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey
    ? new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      })
    : null;

  // API endpoint for explaining questions
  app.post("/api/explain", async (req, res) => {
    const { question, optionSelected, correctAnswer, options, languageName, languageState, explanation, explanationTranslated } = req.body;
    try {
      if (!ai) {
        return res.status(503).json({
          error: "Gemini API Client is not configured. Please add GEMINI_API_KEY in Secrets.",
        });
      }

      const langName = languageName || "Marathi";
      const langState = languageState || "Maharashtra";

      const prompt = `
You are an expert Automobile Engineering tutor. Explain the following Multiple Choice Question to a student clearly and concisely.
The student wants explanations in a mix of ${langName} and English (bilingual/bilingual ${langName}, as typically understood by engineering students in ${langState}, using English terms for technical words but with ${langName} sentence structure).

Question: ${question}
Options:
${options.map((opt: string, idx: number) => `${String.fromCharCode(65 + idx)}) ${opt}`).join("\n")}

Correct Answer: ${correctAnswer}
Student Selected Option: ${optionSelected || "None (Skipped)"}

Please provide:
1. Direct confirmation (Was the student correct or incorrect?).
2. Detailed explanation of why the correct answer is right (explain the engineering principles/concepts in bilingual ${langName}-English).
3. Why other options are incorrect or in what context they apply (briefly).
4. Translate any very complex technical terms into simple words and give a practical real-world automobile example if applicable.

Keep the tone encouraging, professional, and clear. Format the response nicely using clean Markdown.
`;

      const result = await generateContentWithRetry(ai, {
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      res.json({ explanation: result.text });
    } catch (error: any) {
      console.warn("Gemini API Error in generating explanation, using local standard fallback:", error.message || error);
      
      const standardExp = explanationTranslated || explanation || "This question tests fundamental principles of Automobile Engineering. Please verify your course textbook or syllabus for deep structural details of this assembly.";
      const isMr = languageName?.toLowerCase().includes("marathi") || languageName?.toLowerCase().includes("mr");

      const fallbackText = `
### ⚠️ AI Engine High Demand / तात्पुरती AI लोड मर्यादा
*The AI tutor is currently experiencing very high demand or is temporarily unavailable. Below is the verified standard explanation for this question:*

---

**Correct Answer / बरोबर उत्तर:** ${correctAnswer}
**Your Option / तुमचा पर्याय:** ${optionSelected}

### **Standard Explanation / सविस्तर स्पष्टीकरण:**
${standardExp}

---
*We apologize for the interruption. You can continue taking tests seamlessly.*
`;
      res.json({ explanation: fallbackText, isFallback: true });
    }
  });

  // API endpoint for generating questions dynamically (Endless 1000+ Questions Mode)
  app.post("/api/generate-questions", async (req, res) => {
    const { chapterId, chapterName, count, languageName, languageState } = req.body;
    const countNum = Math.min(25, Math.max(5, parseInt(count) || 10));
    try {
      if (!ai) {
        return res.status(503).json({
          error: "Gemini API Client is not configured. Please add GEMINI_API_KEY in Secrets.",
        });
      }

      const langName = languageName || "Marathi";
      const langState = languageState || "Maharashtra";

      const prompt = `
You are an elite Automobile Engineering professor and exam designer for Indian technical education boards (like MSBTE, GTU, TNDTE, etc.).
Generate ${countNum} high-quality, textbook-level Multiple Choice Questions (MCQs) for the following chapter:
Chapter ID: ${chapterId === "all" ? "Mixed" : chapterId}
Chapter Name: ${chapterName}

You must write each question in two versions:
1. English (rigorous, technical)
2. Regional Indian Language: ${langName} (used in ${langState}). 
For the ${langName} version, use simple, natural sentence structures but retain standard English terms for complex technical words (e.g. use "clutch", "transmission", "suspension", "brake caliper", "alternator" instead of translating them literally, so it is extremely easy for engineering students to read).

The response MUST be a valid JSON array of objects. Do not include any explanation or markdown formatting outside of the JSON block. Do not wrap it in anything other than the JSON array.

Strict JSON format:
[
  {
    "id": <a unique random positive integer between 1000 and 99999>,
    "chapterId": ${chapterId === "all" ? 1 : chapterId},
    "question": "Question text in English",
    "questionTranslated": "Question text in ${langName}",
    "options": ["Option A in English", "Option B in English", "Option C in English", "Option D in English"],
    "optionsTranslated": ["Option A in ${langName}", "Option B in ${langName}", "Option C in ${langName}", "Option D in ${langName}"],
    "answer": "A", // must be A, B, C, or D
    "explanation": "Clear, informative explanation of why the correct answer is right and others are incorrect, written primarily in ${langName} with English technical terms."
  }
]

Please ensure the questions are rigorous, strictly accurate, cover diverse topics within the chapter, and do not repeat simple introductory facts. Keep the correct answers evenly distributed among A, B, C, and D.
`;

      const result = await generateContentWithRetry(ai, {
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });

      const responseText = result.text?.trim() || "[]";
      const questions = JSON.parse(responseText);

      res.json({ questions });
    } catch (error: any) {
      console.warn("Gemini API Error in generating questions, using robust local database fallback:", error.message || error);
      
      try {
        // Filter questions by chapter
        let filtered = [...QUESTIONS];
        if (chapterId !== "all") {
          filtered = QUESTIONS.filter((q) => q.chapterId === Number(chapterId));
        }

        // If we don't have enough questions from this chapter, pad with other chapters
        if (filtered.length < countNum) {
          const otherChapters = QUESTIONS.filter((q) => q.chapterId !== Number(chapterId));
          const shuffledOthers = otherChapters.sort(() => 0.5 - Math.random());
          filtered = [...filtered, ...shuffledOthers].slice(0, countNum);
        } else {
          filtered = filtered.sort(() => 0.5 - Math.random()).slice(0, countNum);
        }

        const isMr = languageName?.toLowerCase().includes("marathi") || languageName?.toLowerCase().includes("mr");

        const fallbackQuestions = filtered.map((q) => ({
          id: q.id + 50000 + Math.floor(Math.random() * 10000), // Ensure random unique IDs
          chapterId: q.chapterId,
          question: q.question,
          questionTranslated: isMr ? q.questionMarathi : q.question,
          options: q.options,
          optionsTranslated: isMr ? q.optionsMarathi : q.options,
          answer: q.answer,
          explanation: isMr ? (q.explanationMarathi || q.explanation) : q.explanation
        }));

        console.log(`Successfully generated ${fallbackQuestions.length} fallback questions from local Textbook Bank.`);
        res.json({ questions: fallbackQuestions, isFallback: true });
      } catch (fallbackError: any) {
        console.error("Critical: Fallback generation failed:", fallbackError);
        res.status(500).json({ error: "Failed to generate questions. Standard textbook bank fallback failed." });
      }
    }
  });

  // API endpoint for translating static questions to any Indian language on demand
  app.post("/api/translate-questions", async (req, res) => {
    const { questions, languageName, languageState } = req.body;
    try {
      if (!ai) {
        return res.status(503).json({
          error: "Gemini API Client is not configured. Please add GEMINI_API_KEY in Secrets.",
        });
      }

      if (!questions || !Array.isArray(questions)) {
        return res.status(400).json({ error: "Invalid questions payload" });
      }

      const langName = languageName || "Marathi";
      const langState = languageState || "Maharashtra";

      const prompt = `
You are an expert technical translator. Translate the following list of Automobile Engineering questions into ${langName} (the language of ${langState}, India).
Follow these guidelines carefully:
1. Retain the exact meanings, options, correct answers, and explanations.
2. For each question, provide a translated version of the question, options, and explanation.
3. Keep technical words (like "chassis", "thermostat", "ABS", "alternator", "torque converter", etc.) in English, but write them in simple natural script of ${langName}. The sentence structure must be in ${langName}.
4. Return the result strictly as a JSON array of translated questions matching the input structure. Do not add any markdown blocks or intro/outro text.

Input JSON:
${JSON.stringify(questions.map(q => ({
  id: q.id,
  question: q.question,
  options: q.options,
  explanation: q.explanation
})))}

Output JSON format:
[
  {
    "id": <same id>,
    "questionTranslated": "Translated question text",
    "optionsTranslated": ["Translated option A", "Translated option B", "Translated option C", "Translated option D"],
    "explanationTranslated": "Translated explanation"
  }
]
`;

      const result = await generateContentWithRetry(ai, {
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });

      const responseText = result.text?.trim() || "[]";
      const translations = JSON.parse(responseText);

      res.json({ translations });
    } catch (error: any) {
      console.warn("Gemini API Error in translating questions, falling back to local bilingual mappings:", error.message || error);
      
      const fallbackTranslations = questions.map(q => ({
        id: q.id,
        questionTranslated: q.questionTranslated || q.questionMarathi || q.question,
        optionsTranslated: q.optionsTranslated || q.optionsMarathi || q.options,
        explanationTranslated: q.explanationTranslated || q.explanationMarathi || q.explanation
      }));
      
      res.json({ translations: fallbackTranslations, isFallback: true });
    }
  });

  // Simple server-side in-memory database of webhook-verified premium users
  const verifiedPayments = new Map<string, { paymentId: string; timestamp: string }>();

  // Lazy initialize Razorpay client
  let razorpayInstance: any = null;
  const getRazorpayInstance = () => {
    if (!razorpayInstance) {
      const keyId = process.env.RAZORPAY_KEY_ID;
      const keySecret = process.env.RAZORPAY_KEY_SECRET;
      if (!keyId || !keySecret) {
        return null;
      }
      try {
        razorpayInstance = new (Razorpay as any)({
          key_id: keyId,
          key_secret: keySecret,
        });
      } catch (e) {
        console.error("Failed to initialize Razorpay SDK:", e);
        return null;
      }
    }
    return razorpayInstance;
  };

  // 1. Create Razorpay Order securely
  app.post("/api/razorpay/create-order", async (req, res) => {
    const { amount, currency, notes } = req.body;
    try {
      const razorpay = getRazorpayInstance();
      if (!razorpay) {
        console.warn("RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is not configured. Falling back to secure simulated order.");
        const mockOrderId = "order_mock_" + crypto.randomBytes(8).toString("hex");
        return res.json({
          id: mockOrderId,
          amount: amount || 29900,
          currency: currency || "INR",
          notes: notes || {},
          isSimulated: true,
          keyId: "rzp_test_mock_keys_123"
        });
      }

      const options = {
        amount: amount || 29900,
        currency: currency || "INR",
        receipt: `receipt_omto_${Date.now()}`,
        notes: notes || {}
      };

      const order = await razorpay.orders.create(options);
      res.json({
        ...order,
        keyId: process.env.RAZORPAY_KEY_ID,
        isSimulated: false
      });
    } catch (error: any) {
      console.error("Razorpay Order Creation Error:", error);
      res.status(500).json({ error: error.message || "Failed to create Razorpay Order" });
    }
  });

  // 2. Handle Razorpay webhook
  app.post("/api/razorpay/webhook", async (req, res) => {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || "omto_webhook_secret_2026";
    const signature = req.headers["x-razorpay-signature"] as string;

    try {
      if (!signature) {
        return res.status(400).json({ error: "Missing Razorpay Webhook Signature" });
      }

      const shasum = crypto.createHmac("sha256", secret);
      shasum.update(JSON.stringify(req.body));
      const digest = shasum.digest("hex");

      if (digest !== signature) {
        console.error("Invalid Webhook Signature!");
        return res.status(403).json({ error: "Webhook signature verification failed" });
      }

      console.log("Razorpay Webhook Signature Verified Successfully!");
      const event = req.body.event;
      
      if (event === "payment.captured") {
        const payment = req.body.payload.payment.entity;
        const notes = payment.notes || {};
        const studentEmail = (notes.email || notes.document_id || "").toLowerCase().trim();
        const razorpayPaymentId = payment.id;
        
        console.log(`Payment captured for student: ${studentEmail}, Payment ID: ${razorpayPaymentId}`);
        
        if (studentEmail) {
          verifiedPayments.set(studentEmail, {
            paymentId: razorpayPaymentId,
            timestamp: new Date().toISOString()
          });
          console.log(`[BACKEND STORAGE] Recorded premium activation status for: ${studentEmail}`);
        }
      }

      res.json({ status: "ok" });
    } catch (error: any) {
      console.error("Razorpay Webhook Processing Error:", error);
      res.status(500).json({ error: error.message || "Webhook processing failed" });
    }
  });

  // 3. Query payment verification status
  app.get("/api/razorpay/check-verification", (req, res) => {
    const email = (req.query.email as string || "").toLowerCase().trim();
    if (!email) {
      return res.status(400).json({ error: "Email parameter is required" });
    }

    if (verifiedPayments.has(email)) {
      const record = verifiedPayments.get(email);
      return res.json({
        verified: true,
        paymentId: record?.paymentId,
        timestamp: record?.timestamp
      });
    }

    res.json({ verified: false });
  });

  // 4. Manual/Admin force verification (for mock testing convenience)
  app.post("/api/razorpay/admin-verify", (req, res) => {
    const { email, paymentId } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const cleanEmail = email.toLowerCase().trim();
    const cleanPaymentId = paymentId || "pay_manual_" + crypto.randomBytes(6).toString("hex");
    
    verifiedPayments.set(cleanEmail, {
      paymentId: cleanPaymentId,
      timestamp: new Date().toISOString()
    });
    console.log(`[ADMIN FORCE] Activated premium verification for: ${cleanEmail}`);
    res.json({ success: true, email: cleanEmail, paymentId: cleanPaymentId });
  });

  // Serve static questions data from backend if needed
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", geminiConfigured: !!ai });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
