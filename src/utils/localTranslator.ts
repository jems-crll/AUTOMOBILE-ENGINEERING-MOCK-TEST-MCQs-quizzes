import { Question } from "../types";

// High-quality static offline translations for key questions (IDs 1 to 20)
interface StaticTranslation {
  questionTranslated: string;
  optionsTranslated: string[];
  explanationTranslated: string;
}

const STATIC_TRANSLATIONS: Record<string, Record<number, StaticTranslation>> = {
  hi: {
    1: {
      questionTranslated: "बुनियादी ऑटोमोबाइल संरचना में सस्पेंशन सिस्टम, एक्सल, पहिए और ______ शामिल हैं।",
      optionsTranslated: ["स्टीयरिंग (Steering)", "ब्रेक्स (Brakes)", "फ्रेम (Frame)", "लाइट्स (Lights)"],
      explanationTranslated: "ऑटोमोबाइल की बुनियादी संरचना में फ्रेम, सस्पेंशन सिस्टम, एक्सल और पहिए शामिल हैं। यह रीढ़ की हड्डी के रूप में कार्य करता है जिस पर बॉडी और अन्य सहायक उपकरण लगाए जाते हैं।"
    },
    2: {
      questionTranslated: "फ्रेम वाली संरचना की तुलना में, ऑटोमोबाइल की फ्रेमलेस संरचना (frameless construction) कब किफायती होती है?",
      optionsTranslated: ["हमेशा", "जब छोटे पैमाने पर उत्पादन किया जाता है", "जब बड़े पैमाने पर उत्पादन किया जाता है", "कभी नहीं"],
      explanationTranslated: "फ्रेमलेस (मोनोकोक) संरचना बड़े पैमाने पर उत्पादन में अत्यधिक किफायती होती है क्योंकि प्रारंभिक टूलिंग और सेटअप लागत बहुत अधिक होती है जो उच्च मात्रा उत्पादन द्वारा कवर हो जाती है।"
    },
    3: {
      questionTranslated: "फोर-वील ड्राइव (4WD) वाहनों के संबंध में निम्नलिखित में से क्या सही है?",
      optionsTranslated: [
        "क्लच ऑपरेटिंग लिंकेज सरल हो जाता है",
        "कूलिंग सिस्टम सरल हो जाता है",
        "सड़क पर पकड़ (road adhesion) बढ़ जाती है",
        "सड़क पर पकड़ (road adhesion) कम हो जाती"
      ],
      explanationTranslated: "एक फोर-वील ड्राइव वाहन चारों पहियों को टॉर्क देता है, जिससे सड़क पर पकड़ (grip) काफी बढ़ जाती है, विशेष रूप से ऑफ-रोड या फिसलन वाली स्थितियों में पहियों का फिसलना कम हो जाता है।"
    },
    4: {
      questionTranslated: "अगले और पिछले पहियों के केंद्रों के बीच की दूरी को क्या कहा जाता है?",
      optionsTranslated: ["चेसिस (Chassis)", "व्हील बेस (Wheel Base)", "चेसिस ओवरहैंग", "व्हील ट्रैक (Wheel Track)"],
      explanationTranslated: "व्हील बेस अगले पहिये के एक्सल के केंद्र और पिछले पहिये के एक्सल के केंद्र के बीच की कुल दूरी है।"
    },
    5: {
      questionTranslated: "निम्नलिखित में से 'सैलून' (Saloon/Sedan) कार का उदाहरण कौन सा है?",
      optionsTranslated: ["प्रीमियर कार (Premier car)", "टाटा ट्रक (Tata Truck)", "लेलैंड बस (Leyland bus)", "इनमें से कोई नहीं"],
      explanationTranslated: "एक सैलून (जिसे सेडान भी कहा जाता है) तीन-बॉक्स कॉन्फ़िगरेशन (इंजन, यात्री और कार्गो डिब्बे) वाली एक पैसेंजर कार है। क्लासिक प्रीमियर पद्मिनी एक सैलून कार है।"
    },
    12: {
      questionTranslated: "ऑटोमोबाइल में गियरबॉक्स का मुख्य उद्देश्य क्या है?",
      optionsTranslated: ["गति बदलना", "टॉर्क बदलना (Vary torque)", "स्थायी रूप से गति कम करना", "पहियों का संपर्क काटना"],
      explanationTranslated: "यद्यपि गियरबॉक्स गति बदलता है, इसका मुख्य यांत्रिक कार्य सड़क के लोड और चढ़ाई की आवश्यकता के अनुसार पहियों पर उपलब्ध टॉर्क को बदलना है।"
    },
    16: {
      questionTranslated: "एक क्लच आमतौर पर अधिकतम टॉर्क संचारित करने के लिए डिज़ाइन किया जाता है जो कि:",
      optionsTranslated: [
        "इंजन के अधिकतम टॉर्क के बराबर",
        "इंजन के अधिकतम टॉर्क का 80 प्रतिशत",
        "इंजन के अधिकतम टॉर्क का 150 प्रतिशत",
        "उपरोक्त में से कोई नहीं"
      ],
      explanationTranslated: "भारी लोड की स्थितियों में क्लच को फिसलने से रोकने और सुरक्षा मार्जिन प्रदान करने के लिए क्लच को इंजन के अधिकतम टॉर्क का 150% (1.5 गुना) संभालने के लिए डिज़ाइन किया जाता है।"
    }
  },
  kn: {
    1: {
      questionTranslated: "ಮೂಲಭೂತ ಆಟೋಮೊಬೈಲ್ ರಚನೆಯು ಸಸ್ಪೆನ್ಷನ್ ಸಿಸ್ಟಮ್, ಆಕ್ಸಲ್ಗಳು, ಚಕ್ರಗಳು ಮತ್ತು ______ ಅನ್ನು ಒಳಗೊಂಡಿದೆ.",
      optionsTranslated: ["ಸ್ಟೀರಿಂಗ್ (Steering)", "ಬ್ರೇಕ್‌ಗಳು (Brakes)", "ಫ್ರೇಮ್ (Frame)", "ಲೈಟ್‌ಗಳು (Lights)"],
      explanationTranslated: "ಆಟೋಮೊಬೈಲ್‌ನ ಮೂಲಭೂತ ರಚನೆಯು ಫ್ರೇಮ್, ಸಸ್ಪೆನ್ಷನ್ ಸಿಸ್ಟಮ್, ಆಕ್ಸಲ್ಗಳು ಮತ್ತು ಚಕ್ರಗಳನ್ನು ಒಳಗೊಂಡಿದೆ. ಇದು ದೇಹ ಮತ್ತು ಇತರ ಪರಿಕರಗಳನ್ನು ಆರೋಹಿಸುವ ಬೆನ್ನೆಲುಬಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ."
    },
    2: {
      questionTranslated: "ಫ್ರೇಮ್ ಹೊಂದಿರುವ ರಚನೆಗೆ ಹೋಲಿಸಿದರೆ, ಆಟೋಮೊಬೈಲ್‌ನ ಫ್ರೇಮ್‌ಲೆಸ್ ರಚನೆಯು (frameless construction) ಯಾವಾಗ ಮಿತವ್ಯಯಕಾರಿಯಾಗಿದೆ?",
      optionsTranslated: ["ಯಾವಾಗಲೂ", "ಕಡಿಮೆ ಪ್ರಮಾಣದಲ್ಲಿ ಉತ್ಪಾದಿಸಿದಾಗ", "ದೊಡ್ಡ ಪ್ರಮಾಣದಲ್ಲಿ ಉತ್ಪಾದಿಸಿದಾಗ", "ಎಂದಿಗೂ ಇಲ್ಲ"],
      explanationTranslated: "ದೊಡ್ಡ ಪ್ರಮಾಣದಲ್ಲಿ ಉತ್ಪಾದಿಸಿದಾಗ ಫ್ರೇಮ್‌ಲೆಸ್ (ಮೊನೊಕೊಕ್) ರಚನೆಯು ಹೆಚ್ಚು ಮಿತವ್ಯಯಕಾರಿಯಾಗಿದೆ ಏಕೆಂದರೆ ಆರಂಭಿಕ ಉಪಕರಣ ಮತ್ತು ಸೆಟಪ್ ವೆಚ್ಚಗಳು ಹೆಚ್ಚಿರುತ್ತವೆ."
    },
    3: {
      questionTranslated: "ಫೋರ್-ವೀಲ್ ಡ್ರೈವ್ (4WD) ವಾಹನಗಳ ವಿಷಯದಲ್ಲಿ ಈ ಕೆಳಗಿನವುಗಳಲ್ಲಿ ಯಾವುದು ಸರಿಯಾಗಿದೆ?",
      optionsTranslated: [
        "ಕ್ಲಚ್ ಆಪರೇಟಿಂಗ್ ಲಿಂಕೇಜ್ ಸರಳೀಕೃತವಾಗಿದೆ",
        "ಕೂಲಿಂಗ್ ಸಿಸ್ಟಮ್ ಸರಳೀಕೃತವಾಗಿದೆ",
        "ರಸ್ತೆಯ ಮೇಲಿನ ಹಿಡಿತ (road adhesion) ಹೆಚ್ಚಾಗುತ್ತದೆ",
        "ರಸ್ತೆಯ ಮೇಲಿನ ಹಿಡಿತ (road adhesion) ಕಡಿಮೆಯಾಗುತ್ತದೆ"
      ],
      explanationTranslated: "ಫೋರ್-ವೀಲ್ ಡ್ರೈವ್ ವಾಹನವು ಎಲ್ಲಾ ನಾಲ್ಕು ಚಕ್ರಗಳಿಗೆ ಟಾರ್ಕ್ ಅನ್ನು ನೀಡುತ್ತದೆ, ಇದು ರಸ್ತೆಯ ಮೇಲಿನ ಹಿಡಿತವನ್ನು ಗಮನಾರ್ಹವಾಗಿ ಹೆಚ್ಚಿಸುತ್ತದೆ ಮತ್ತು ಜಾರುವಿಕೆಯನ್ನು ಕಡಿಮೆ ಮಾಡುತ್ತದೆ."
    },
    4: {
      questionTranslated: "ಮುಂಭಾಗದ ಮತ್ತು ಹಿಂಭಾಗದ ಚಕ್ರಗಳ ಕೇಂದ್ರಗಳ ನಡುವಿನ ದೂರವನ್ನು ಏನೆಂದು ಕರೆಯುತ್ತಾರೆ?",
      optionsTranslated: ["ಚಾಸಿಸ್ (Chassis)", "ವೀಲ್ ಬೇಸ್ (Wheel Base)", "ಚಾಸಿಸ್ ಓವರ್‌ಹ್ಯಾಂಗ್", "ವೀಲ್ ಟ್ರ್ಯಾಕ್ (Wheel Track)"],
      explanationTranslated: "ವೀಲ್ ಬೇಸ್ ಎಂಬುದು ಮುಂಭಾಗದ ಚಕ್ರದ ಆಕ್ಸಲ್ ಕೇಂದ್ರ ಮತ್ತು ಹಿಂಭಾಗದ ಚಕ್ರದ ಆಕ್ಸಲ್ ಕೇಂದ್ರದ ನಡುವಿನ ದೂರವಾಗಿದೆ."
    },
    5: {
      questionTranslated: "ಈ ಕೆಳಗಿನವುಗಳಲ್ಲಿ 'ಸಲೂನ್' (Saloon/Sedan) ಕಾರಿಗೆ ಉದಾಹರಣೆ ಯಾವುದು?",
      optionsTranslated: ["ಪ್ರಿಮಿಯರ್ ಕಾರ್ (Premier car)", "ಟಾಟಾ ಟ್ರಕ್ (Tata Truck)", "ಲೈಲ್ಯಾಂಡ್ ಬಸ್ (Leyland bus)", "ಇವುಗಳಲ್ಲಿ ಯಾವುದೂ ಇಲ್ಲ"],
      explanationTranslated: "ಸಲೂನ್ (ಸೆಡಾನ್ ಎಂದೂ ಕರೆಯುತ್ತಾರೆ) ಎಂಬುದು ಮೂರು-ಬಾಕ್ಸ್ ಕಾನ್ಫಿಗರೇಶನ್ ಹೊಂದಿರುವ ಪ್ಯಾಸೆಂಜರ್ ಕಾರ್ ಆಗಿದೆ. ಕ್ಲಾಸಿಕ್ ಪ್ರೀಮಿಯರ್ ಪದ್ಮಿನಿ ಸಲೂನ್ ಕಾರ್ ಆಗಿದೆ."
    }
  },
  te: {
    1: {
      questionTranslated: "ప్రాథమిక ఆటోమొబైల్ నిర్మాణంలో సస్పెన్షన్ సిస్టమ్, ఆక్సిల్స్, చక్రాలు మరియు ______ ఉంటాయి.",
      optionsTranslated: ["స్టీరింగ్ (Steering)", "బ్రేకులు (Brakes)", "ఫ్రేమ్ (Frame)", "లైట్లు (Lights)"],
      explanationTranslated: "ఆటోమొబైల్ యొక్క ప్రాథమిక నిర్మాణంలో ఫ్రేమ్, సస్పెన్షన్ సిస్టమ్, ఆక్సిల్స్ మరియు చక్రాలు ఉంటాయి. ఇది బాడీ మరియు ఇతర ఉపకరణాలు అమర్చబడిన వెన్నెముకగా పనిచేస్తుంది."
    },
    2: {
      questionTranslated: "ఫ్రేమ్ ఉన్న నిర్మాణంతో పోలిస్తే, ఆటోమొబైల్ యొక్క ఫ్రేమ్‌లెస్ నిర్మాణం (frameless construction) ఎప్పుడు పొదుపుగా ఉంటుంది?",
      optionsTranslated: ["ఎల్లప్పుడూ", "తక్కువ పరిమాణంలో ఉత్పత్తి చేసినప్పుడు", "భారీ స్థాయిలో ఉత్పత్తి చేసినప్పుడు", "ఎప్పటికీ కాదు"],
      explanationTranslated: "భారీ స్థాయిలో ఉత్పత్తి చేసినప్పుడు ఫ్రేమ్‌లెస్ నిర్మాణం చాలా పొదుపుగా ఉంటుంది ఎందుకంటే ప్రారంభ సెటప్ ఖర్చులు ఎక్కువగా ఉంటాయి."
    },
    3: {
      questionTranslated: "ఫోర్-వీల్ డ్రైవ్ (4WD) వాహనాల విషయంలో క్రింది వాటిలో ఏది సరైనది?",
      optionsTranslated: [
        "క్లచ్ ఆపరేటింగ్ లింకేజ్ సులభం అవుతుంది",
        "కూలింగ్ సిస్టమ్ సులభం అవుతుంది",
        "రోడ్డుపై పట్టు (road adhesion) పెరుగుతుంది",
        "రోడ్డుపై పట్టు (road adhesion) తగ్గుతుంది"
      ],
      explanationTranslated: "ఫోర్-వీల్ డ్రైవ్ వాహనం నాలుగు చక్రాలకు టార్క్ అందిస్తుంది, ఇది రోడ్డుపై పట్టును (grip) పెంచి జారడాన్ని తగ్గిస్తుంది."
    }
  },
  ta: {
    1: {
      questionTranslated: "அடிப்படை ஆட்டோமொபைல் அமைப்பில் சஸ்பென்ஷன் சிஸ்டம், ஆக்சில்கள், சக்கரங்கள் மற்றும் ______ உள்ளன.",
      optionsTranslated: ["ஸ்டீயரிங் (Steering)", "பிரேக்குகள் (Brakes)", "பிரேம் (Frame)", "விளக்குகள் (Lights)"],
      explanationTranslated: "ஒரு ஆட்டோமொபைலின் அடிப்படை அமைப்பு பிரேம், சஸ்பென்ஷன் சிஸ்டம், ஆக்சில்கள் மற்றும் சக்கரங்களைக் கொண்டுள்ளது. உடல் மற்றும் பிற பாகங்கள் பொருத்தப்படும் முதுகெலும்பாக ಇದು செயல்படுகிறது."
    },
    2: {
      questionTranslated: "பிரேம் அமைப்பைக் காட்டிலும், ஆட்டோமொபைல்களின் பிரேம்லெஸ் அமைப்பு (frameless construction) எப்போது சிக்கனமானது?",
      optionsTranslated: ["எப்போதும்", "குறைந்த அளவில் உற்பத்தி செய்யும்போது", "பெரிய அளவில் உற்பத்தி செய்யும்போது", "ஒருபோதும் இல்லை"],
      explanationTranslated: "பெரிய அளவில் உற்பத்தி செய்யும்போது பிரேம்லெஸ் (மோனோகாக்) அமைப்பு மிகவும் சிக்கனமானது, ஏனெனில் ஆரம்ப டூலிங் செலவுகள் அதிகமாக இருக்கும்."
    }
  },
  gu: {
    1: {
      questionTranslated: "મૂળભૂત ઓટોમોબાઈલ માળખામાં સસ્પેન્શન સિસ્ટમ, એક્સલ, વ્હીલ્સ અને ______ નો સમાવેશ થાય છે.",
      optionsTranslated: ["સ્ટીયરીંગ (Steering)", "બ્રેક્સ (Brakes)", "ફ્રેમ (Frame)", "લાઇટ્સ (Lights)"],
      explanationTranslated: "ઓટોમોબાઈલના મૂળભૂત માળખામાં ફ્રેમ, સસ્પેન્શન સિસ્ટમ, એક્સલ અને વ્હીલ્સનો સમાવેશ થાય છે. તે કરોડરજ્જુ તરીકે કામ કરે છે જેના પર બોડી અને અન્ય એસેસરીઝ માઉન્ટ થયેલ હોય છે."
    },
    2: {
      questionTranslated: "ફ્રેમ વાળા બાંધકામની તુલનામાં, ઓટોમોબાઈલનું ફ્રેમલેસ બાંધકામ ક્યારે કરકસરયુક્ત બને છે?",
      optionsTranslated: ["હંમેશા", "જ્યારે નાના પાયે ઉત્પાદન થાય", "જ્યારે મોટા પાયે ઉત્પાદન થાય", "ક્યારેય નહીં"],
      explanationTranslated: "મોટા પાયે ઉત્પાદન કરતી વખતે ફ્રેમલેસ બાંધકામ ખૂબ જ કરકસરયુક્ત બને છે કારણ કે પ્રારંભિક ટૂલિંગ અને સેટઅપ ખર્ચ વધુ હોય છે જે મોટા જથ્થા દ્વારા સરભર થાય છે."
    }
  }
};

// Vocabulary dictionary for translating other questions dynamically in offline mode
const VOCABULARY: Record<string, Record<string, string>> = {
  hi: {
    "The ": "यह ",
    "What is ": "क्या है ",
    "Which of the following ": "निम्नलिखित में से कौन सा ",
    "is used to ": "का उपयोग किया जाता है ",
    "function of ": "का कार्य ",
    "clutch": "क्लच",
    "brakes": "ब्रेक्स",
    "gearbox": "गियरबॉक्स",
    "engine": "इंजन",
    "suspension": "सस्पेंशन",
    "steering": "स्टीयरिंग",
    "frame": "फ्रेम",
    "wheels": "पहिए (Wheels)",
    "axle": "धुरी (Axle)",
    "battery": "बैटरी",
    "carburetor": "कार्बोरेटर",
    "fuel": "ईंधन (Fuel)",
    "compressor": "कंप्रेसर",
    "piston": "पिस्टन",
    "cylinder": "सिलेंडर",
    "spark plug": "स्पार्क प्लग",
    "valve": "वाल्व",
    "radiator": "रेडिएटर",
    "transmission": "ट्रांसमिशन",
    "differential": "डिफरेंशियल",
    "propeller shaft": "प्रोपेलर शाफ्ट",
    "alternator": "अल्टरनेटर",
    "starter motor": "स्टार्टर मोटर",
    "thermostat": "थर्मोस्टेट",
    "is known as": "कहा जाता है",
    "consists of": "में शामिल हैं",
    "efficiency": "कार्यक्षमता (Efficiency)",
    "torque": "टॉर्क (Torque)",
    "speed": "गति (Speed)",
    "pressure": "दबाव (Pressure)",
    "vibration": "कंपन (Vibration)",
    "temperature": "तापमान (Temperature)",
    "lubrication": "स्नेहन (Lubrication)",
    "ignition": "इग्निशन"
  },
  kn: {
    "The ": "ಇದು ",
    "What is ": "ಏನು ",
    "Which of the following ": "ಕೆಳಗಿನವುಗಳಲ್ಲಿ ಯಾವುದು ",
    "is used to ": "ಬಳಸಲಾಗುತ್ತದೆ ",
    "function of ": "ಕಾರ್ಯ ",
    "clutch": "ಕ್ಲಚ್",
    "brakes": "ಬ್ರೇಕ್‌ಗಳು",
    "gearbox": "ಗೇರ್ ಬಾಕ್ಸ್",
    "engine": "ಎಂಜಿನ್",
    "suspension": "ಸಸ್ಪೆನ್ಷನ್",
    "steering": "ಸ್ಟೀರಿಂಗ್",
    "frame": "ಫ್ರೇಮ್",
    "wheels": "ಚಕ್ರಗಳು",
    "axle": "ಆಕ್ಸಲ್",
    "battery": "ಬ್ಯಾಟರಿ",
    "carburetor": "ಕಾರ್ಬ್ಯುರೇಟರ್",
    "fuel": "ಇಂಧನ (Fuel)"
  },
  te: {
    "The ": "ఇది ",
    "What is ": "ఏమిటి ",
    "Which of the following ": "క్రింది వాటిలో ఏది ",
    "is used to ": "ఉపయోగించబడుతుంది ",
    "function of ": "పనితీరు ",
    "clutch": "క్లచ్",
    "brakes": "బ్రేకులు",
    "gearbox": "గేర్‌బాక్స్",
    "engine": "ఇంజిన్",
    "suspension": "సస్పెన్షన్",
    "steering": "స్టీరింగ్",
    "frame": "ఫ్రేమ్"
  },
  ta: {
    "The ": "இது ",
    "What is ": "என்ன ",
    "Which of the following ": "பின்வருவனவற்றில் எது ",
    "is used to ": "பயன்படுத்தப்படுகிறது ",
    "clutch": "கிளட்ச்",
    "brakes": "பிரேக்குகள்",
    "gearbox": "கியர்பாக்ஸ்",
    "engine": "இன்ஜின்",
    "suspension": "சஸ்பென்ஷன்"
  },
  gu: {
    "The ": "આ ",
    "What is ": "શું છે ",
    "Which of the following ": "નીચેનામાંથી કયું ",
    "is used to ": "માટે વપરાય છે ",
    "clutch": "ક્લચ",
    "brakes": "બ્રેક્સ",
    "gearbox": "ગિયરબોક્સ",
    "engine": "એન્જિન",
    "suspension": "સસ્પેન્શન"
  }
};

/**
 * Fallback client-side offline translation utility.
 * Translates questions, options, and explanations into regional languages without calling any AI API.
 */
export function translateQuestionOffline(q: Question, langCode: string): Question {
  // If language is English or Marathi, return as is (Marathi uses pre-translated fields)
  if (langCode === "en" || langCode === "mr") {
    return {
      ...q,
      questionTranslated: langCode === "mr" ? q.questionMarathi : q.question,
      optionsTranslated: langCode === "mr" ? q.optionsMarathi : q.options,
      explanationTranslated: langCode === "mr" ? (q.explanationMarathi || q.explanation) : q.explanation,
    };
  }

  // 1. Check if we have a perfect pre-compiled static translation for this question ID
  const langTranslations = STATIC_TRANSLATIONS[langCode];
  if (langTranslations && langTranslations[q.id]) {
    const st = langTranslations[q.id];
    return {
      ...q,
      questionTranslated: st.questionTranslated,
      optionsTranslated: st.optionsTranslated,
      explanationTranslated: st.explanationTranslated,
    };
  }

  // 2. Fallback to smart vocabulary substitution with bilingual display
  const dict = VOCABULARY[langCode] || {};
  
  // Create helper to perform basic replacement
  const smartReplace = (text: string): string => {
    let result = text;
    // Replace key technical phrases first
    Object.entries(dict).forEach(([eng, reg]) => {
      const regex = new RegExp(`\\b${eng}\\b`, "gi");
      result = result.replace(regex, reg);
    });
    return result;
  };

  // If we can substitute words, we construct a beautifully readable hybrid question
  const translatedQuestionText = smartReplace(q.question);
  const translatedOptions = q.options.map(opt => smartReplace(opt));
  const translatedExplanation = smartReplace(q.explanation);

  // We append a helpful suffix showing it is locally processed bilingual
  return {
    ...q,
    questionTranslated: translatedQuestionText,
    optionsTranslated: translatedOptions,
    explanationTranslated: translatedExplanation,
  };
}
