import { Question, Chapter } from "../types";

export const CHAPTERS: Chapter[] = [
  {
    id: 1,
    name: "Introduction",
    nameMarathi: "परिचय आणि ऑटोमोबाईल वर्गीकरण",
    description: "Basic automobile structures, evolution, wheel drive configurations, and general categories.",
    descriptionMarathi: "मूलभूत ऑटोमोबाईल रचना, विकास, व्हील ड्राईव्ह रचना आणि सामान्य वर्गीकरण.",
    icon: "Car"
  },
  {
    id: 2,
    name: "Chassis Construction",
    nameMarathi: "चेसिस रचना आणि फ्रेमचे प्रकार",
    description: "Types of frames, structural members, bending loads, and supports of engine-gearbox unit.",
    descriptionMarathi: "फ्रेमचे प्रकार, स्ट्रक्चरल मेंबर्स, बेंडिंग लोड आणि इंजिन-गिअरबॉक्स युनिटचे सपोर्ट्स.",
    icon: "Layout"
  },
  {
    id: 3,
    name: "Transmission",
    nameMarathi: "ट्रान्समिशन आणि गिअरबॉक्स",
    description: "Gearbox ratios, planetary gears, torque converters, and speed variations.",
    descriptionMarathi: "गिअरबॉक्स रेशो, प्लॅनेटरी गिअर्स, टॉर्क कन्व्हर्टर्स आणि गतीमधील बदल.",
    icon: "GitBranch"
  },
  {
    id: 4,
    name: "Clutch",
    nameMarathi: "क्लच सिस्टीम",
    description: "Single plate, multi-plate, wet clutches, pressure plates, and spring mechanisms.",
    descriptionMarathi: "सिंगल प्लेट, मल्टि-प्लेट, वेट क्लच,脫म प्रेशर प्लेट्स आणि स्प्रिंग मेकॅनिझम.",
    icon: "Disc"
  },
  {
    id: 5,
    name: "Drive Line",
    nameMarathi: "ड्राईव्ह लाईन आणि प्रोपेलर शाफ्ट",
    description: "Propeller shaft, universal joints, slip joints, and hotchkiss/torque tube drives.",
    descriptionMarathi: "प्रोपेलर शाफ्ट, युनिव्हर्सल जॉइंट्स, स्लिप जॉइंट्स आणि हॉचकिस/टॉर्क ट्यूब ड्राईव्ह.",
    icon: "GitCommit"
  },
  {
    id: 6,
    name: "Front axle & rear axle",
    nameMarathi: "पुढील आणि मागील अ‍ॅक्सल",
    description: "Stub axles, live/dead axles, fully-floating and semi-floating axles, and differentials.",
    descriptionMarathi: "स्टब अ‍ॅक्सल्स, लाईव्ह/डेड अ‍ॅक्सल्स, फुल्ली-फ्लोटिंग आणि सेमी-फ्लोटिंग अ‍ॅक्सल्स, आणि डिफरेंशियल.",
    icon: "Wrench"
  },
  {
    id: 7,
    name: "Suspension system",
    nameMarathi: "सस्पेंशन सिस्टीम",
    description: "Springs, leaf springs, coil springs, shock absorbers, dampers, MacPherson struts, and front/rear axles.",
    descriptionMarathi: "स्प्रिंग्स, लीफ स्प्रिंग्स, कॉइल स्प्रिंग्स, शॉक अ‍ॅब्जॉर्बर, डॅम्पर्स आणि स्वतंत्र सस्पेंशन.",
    icon: "Sliders"
  },
  {
    id: 8,
    name: "Tyres and wheels",
    nameMarathi: "टायर्स आणि व्हील्स",
    description: "Tube/tubeless tyres, radial/cross plies, aspect ratio, sipes, and wheel alignment parameters.",
    descriptionMarathi: "ट्युब/ट्युबलेस टायर्स, आर-प्लाईज, आस्पेक्ट रेशो, साईप्स आणि व्हील अलाईनमेंट.",
    icon: "CircleDot"
  },
  {
    id: 9,
    name: "Braking System",
    nameMarathi: "ब्रेकिंग सिस्टीम",
    description: "Drum and disc brakes, master cylinder, vacuum servo, ABS, and bleeding methods.",
    descriptionMarathi: "ड्रम आणि डिस्क ब्रेक्स, मास्टर सिलेंडर, व्हॅक्यूम सर्व्हो, ABS आणि ब्लीडिंग पद्धती.",
    icon: "Shield"
  },
  {
    id: 10,
    name: "Electrical System",
    nameMarathi: "इलेक्ट्रिकल सिस्टीम आणि वायरिंग",
    description: "Automobile wiring harnesses, relays, switches, gauges, lighting systems, and horns.",
    descriptionMarathi: "ऑटोमोबाईल वायरिंग हार्नेस, रिले, स्विचेस, गेजेस, प्रकाश यंत्रणा आणि हॉर्न.",
    icon: "Zap"
  },
  {
    id: 11,
    name: "Automobile equipments & tests",
    nameMarathi: "ऑटोमोबाईल उपकरणे आणि चाचण्या",
    description: "Speedometers, odometers, fuel level gauges, wipers, dual horns, and road worthiness testing.",
    descriptionMarathi: "स्पीडोमीटर, ओडोमीटर, इंधन पातळी मोजणारी यंत्रे, वायपर्स, हॉर्न आणि वाहन चाचणी.",
    icon: "Gauge"
  },
  {
    id: 12,
    name: "Automotive Body",
    nameMarathi: "ऑटोमोटिव्ह बॉडी रचना",
    description: "Body styling, sedan, hatchback, SUV, aerodynamic drag, composite panels, and safety panels.",
    descriptionMarathi: "बॉडी डिझाइन, सेडान, हॅचबॅक, एसयूव्ही, एरोडायनामिक ड्रॅग आणि पॅसेंजर केबिन रचना.",
    icon: "Maximize"
  },
  {
    id: 13,
    name: "Automotive material",
    nameMarathi: "ऑटोमोटिव्ह साहित्य (Materials)",
    description: "Metals, alloys, high-strength steels, composite materials, and plastics used in auto manufacturing.",
    descriptionMarathi: "ऑटोमोबाईल उत्पादनात वापरले जाणारे धातू, मिश्रधातू, कार्बन फायबर आणि प्लॅस्टिक साहित्य.",
    icon: "Hammer"
  },
  {
    id: 14,
    name: "Safety consideration",
    nameMarathi: "सुरक्षा आणि खबरदारी",
    description: "Active and passive safety systems, seatbelts, airbags, crumple zones, and collision testing.",
    descriptionMarathi: "सक्रिय आणि निष्क्रिय सुरक्षा यंत्रणा, seatbelts, एअरबॅग्ज, क्रंपल झोन आणि सुरक्षा चाचण्या.",
    icon: "ShieldAlert"
  },
  {
    id: 15,
    name: "Vehicle chassis specifications",
    nameMarathi: "वाहनांचे चेसिस तपशील (Specs)",
    description: "Wheelbase, wheel track, ground clearance, front and rear overhang, and turning radius.",
    descriptionMarathi: "व्हीलबेस, व्हील ट्रॅक, ग्राउंड क्लीअरन्स, पुढील आणि मागील ओव्हरहँग आणि टर्निंग रेडियस.",
    icon: "ClipboardList"
  },
  {
    id: 16,
    name: "Cooling system",
    nameMarathi: "कूलिंग सिस्टीम",
    description: "Radiators, thermostats, pumps, lubricants viscosity, and lubrication circuits.",
    descriptionMarathi: "रेडिएटर्स, थर्मोस्टॅट्स, पंप, पाण्याचे पंप, कुलंट आणि हवा/पाणी कूलिंग प्रणाली.",
    icon: "Thermometer"
  },
  {
    id: 17,
    name: "Engine service",
    nameMarathi: "इंजिन सर्व्हिस आणि मेंटेनन्स",
    description: "Cylinder reboring, honing, valve grinding, tappet adjustments, and compression testing.",
    descriptionMarathi: "सिलेंडर रिबोअरिंग, होनिंग, व्हॉल्व्ह ग्राइंडिंग, टॅपेट अ‍ॅडजस्टमेंट आणि कॉम्प्रेशन टेस्टिंग.",
    icon: "Cpu"
  },
  {
    id: 18,
    name: "Lubricants & lubrication",
    nameMarathi: "लुब्रिकंट्स आणि लुब्रिकेशन सिस्टीम",
    description: "Engine oil, viscosity index, gear oils, oil pumps, filters, and splash/pressure systems.",
    descriptionMarathi: "इंजिन ऑईल, व्हिस्कोसिटी इंडेक्स, गिअर ऑईल, ऑईल पंप, फिल्टर्स आणि लुब्रिकेशन यंत्रणा.",
    icon: "Droplet"
  },
  {
    id: 19,
    name: "Fuels",
    nameMarathi: "इंधने (Fuels)",
    description: "Petrol, diesel, CNG, LPG, octane ratings, cetane ratings, and combustion behavior.",
    descriptionMarathi: "पेट्रोल, डिझेल, सीएनजी, एलपीजी, ऑक्टेन आणि सिटेन रेटिंग आणि ज्वलन वैशिष्ट्ये.",
    icon: "Flame"
  },
  {
    id: 20,
    name: "Combustion and combustion chamber",
    nameMarathi: "ज्वलन आणि ज्वलन कक्ष",
    description: "SI and CI engine combustion phases, detonation, knocking, and combustion chamber shapes.",
    descriptionMarathi: "एसआय आणि सीआय इंजिनमधील ज्वलन टप्पे, नॉकिंग, डिटोनेशन आणि कंबशन चेंबर आकार.",
    icon: "Sparkles"
  },
  {
    id: 21,
    name: "Diesel engine fuel supply system",
    nameMarathi: "डिझेल इंजिन इंधन पुरवठा प्रणाली",
    description: "Fuel injection pump (FIP), fuel injectors, feed pumps, governors, and diesel filters.",
    descriptionMarathi: "फ्यूल इंजेक्शन पंप (FIP), इंजेक्टर्स, फीड पंप, गव्हर्नर्स आणि डिझेल फिल्टर्स.",
    icon: "Milestone"
  },
  {
    id: 22,
    name: "Petrol engine fuel supply system",
    nameMarathi: "पेट्रोल इंजिन इंधन पुरवठा प्रणाली",
    description: "Carburetors, float chambers, fuel pumps, MPFI systems, and gasoline direct injection (GDI).",
    descriptionMarathi: "कार्बोरेटर, फ्लोट चेंबर, फ्यूल पंप, एमपीएफआय आणि थेट पेट्रोल इंजेक्शन प्रणाली.",
    icon: "UtilityPole"
  },
  {
    id: 23,
    name: "Engine performance",
    nameMarathi: "इंजिन कामगिरी आणि चाचणी (Performance)",
    description: "Brake power, indicated power, friction power, mechanical efficiency, and dynamometers.",
    descriptionMarathi: "ब्रेक पॉवर, इंडिकेटर पॉवर, फ्रिक्शन पॉवर, मेकॅनिकल कार्यक्षमता आणि डायनॅमोमीटर.",
    icon: "TrendingUp"
  },
  {
    id: 24,
    name: "Electronic ignition system",
    nameMarathi: "इलेक्ट्रॉनिक इग्निशन सिस्टीम",
    description: "Distributorless ignition (DIS), CDI systems, spark timings, and electronic control units (ECU).",
    descriptionMarathi: "डिस्ट्रिब्युटरलेस इग्निशन (DIS), सीडीआय प्रणाली आणि इलेक्ट्रॉनिक इग्निशन सर्किट.",
    icon: "Workflow"
  },
  {
    id: 25,
    name: "Conventional ignition system",
    nameMarathi: "पारंपारिक इग्निशन सिस्टीम",
    description: "Battery coil ignition, magneto ignition, distributors, contact breakers, and spark plugs.",
    descriptionMarathi: "बॅटरी कॉइल इग्निशन, मॅग्नेटो इग्निशन, डिस्ट्रिब्युटर, कॉन्टॅक्ट ब्रेकर्स आणि स्पार्क प्लग.",
    icon: "BatteryCharging"
  },
  {
    id: 26,
    name: "Charging system",
    nameMarathi: "चार्जिंग सिस्टीम",
    description: "Alternators, rectifiers, diodes, voltage regulators, and charging circuit diagnostics.",
    descriptionMarathi: "अल्टरनेटर, रेक्टिफायर्स, डायोड्स, व्होल्टेज रेग्युलेटर आणि charge सर्किट तपासणी.",
    icon: "RefreshCw"
  },
  {
    id: 27,
    name: "Starting system",
    nameMarathi: "स्टार्टिंग सिस्टीम (Self-Starter)",
    description: "Starter motors, solenoid switches, bendix drive gears, and starter safety switches.",
    descriptionMarathi: "स्टार्टर मोटर्स, सोलेनोइड स्विचेस, बेंडिक्स ड्राईव्ह गिअर आणि स्टार्टिंग सर्किट.",
    icon: "Key"
  },
  {
    id: 28,
    name: "Emission control",
    nameMarathi: "उत्सर्जन नियंत्रण (Pollution Control)",
    description: "Catalytic converters, EGR valves, particulate filters, BS6 standards, and PCV systems.",
    descriptionMarathi: "कॅटॅलिटिक कन्व्हर्टर, ईजीआर व्हॉल्व्ह, बीएस६ मानके आणि प्रदूषण नियंत्रण यंत्रणा.",
    icon: "Wind"
  },
  {
    id: 29,
    name: "Automotive engine specification",
    nameMarathi: "ऑटोमोटिव्ह इंजिन तपशील",
    description: "Engine displacement, clearance volume, bore-stroke ratio, and compression ratios.",
    descriptionMarathi: "इंजिन डिस्प्लेसमेंट (swept volume), क्लिअरन्स व्हॉल्युम आणि कॉम्प्रेषण रेशो.",
    icon: "Activity"
  },
  {
    id: 30,
    name: "Storage batteries",
    nameMarathi: "स्टोरेज बॅटरी (Lead-Acid Batteries)",
    description: "Lead-acid battery construction, specific gravity, Ah capacity, and cell testing.",
    descriptionMarathi: "लेड-अ‍ॅसिड बॅटरी रचना, विशिष्ट गुरुत्व (specific gravity) आणि हाय-रेट डिस्चार्ज चाचणी.",
    icon: "Power"
  },
  {
    id: 31,
    name: "Motor Vehicle Act",
    nameMarathi: "मोटार वाहन कायदा (MVA Rules)",
    description: "Driving licenses, registration regulations, road safety signs, insurance, and speed limits.",
    descriptionMarathi: "ड्रायव्हिंग लायसन्स, वाहन नोंदणी नियम, सुरक्षा चिन्हे, विमा आणि आरटीओ कायदे.",
    icon: "Scale"
  }
];

const BASE_QUESTIONS: Question[] = [
  // --- CHAPTER 1: Introduction ---
  {
    id: 1,
    chapterId: 1,
    question: "The basic automobile structure consists of the suspension system, axles, wheels and...",
    questionMarathi: "मूलभूत ऑटोमोबाईल रचनेमध्ये सस्पेंशन सिस्टम, अ‍ॅक्सल्स, व्हील्स आणि ______ चा समावेश होतो.",
    options: ["Steering", "Brakes", "Frame", "Lights"],
    optionsMarathi: ["स्टिअरिंग (Steering)", "ब्रेक्स (Brakes)", "फ्रेम (Frame)", "लाईट्स (Lights)"],
    answer: "C",
    explanation: "The basic structure of an automobile consists of the frame, suspension system, axles, and wheels. It acts as the backbone on which the body and other accessories are mounted.",
    explanationMarathi: "ऑटोमोबाईलच्या मूलभूत रचनेत फ्रेम, सस्पेंशन सिस्टम, अ‍ॅक्सल्स आणि व्हील्स यांचा समावेश होतो. हे शरीरावर आणि इतर उपकरणे बसवण्यासाठी मुख्य कणा म्हणून काम करते."
  },
  {
    id: 2,
    chapterId: 1,
    question: "Compared to framed construction, the frameless construction of automobiles is economical...",
    questionMarathi: "फ्रेम असलेल्या रचनेच्या तुलनेत, ऑटोमोबाईलची फ्रेम नसलेली रचना (frameless construction) कधी किफायतशीर (economical) ठरते?",
    options: ["Always", "When produced in small quantities", "When produced on large scale", "Never"],
    optionsMarathi: ["नेहमीच", "जेव्हा लहान प्रमाणावर उत्पादन केले जाते", "जेव्हा मोठ्या प्रमाणावर उत्पादन केले जाते", "कधीच नाही"],
    answer: "C",
    explanation: "Frameless (monocoque) construction is highly economical when produced on a large scale due to high initial tooling/setup costs which are offset by high volume mass production.",
    explanationMarathi: "फ्रेम नसलेली रचना (monocoque) मोठ्या प्रमाणावर उत्पादन करताना अत्यंत किफायतशीर ठरते कारण सुरुवातीचे टूलिंग/सेटअप खर्च जास्त असतात जे मोठ्या प्रमाणावर उत्पादनाद्वारे भरून निघतात."
  },
  {
    id: 3,
    chapterId: 1,
    question: "In case of a four-wheel driven vehicle...",
    questionMarathi: "फोर-व्हील ड्राईव्ह (4WD) वाहनांच्या बाबतीत खालीलपैकी काय योग्य आहे?",
    options: [
      "Clutch operating linkage is simplified",
      "Cooling system is simplified",
      "The road adhesion is increased",
      "The road adhesion is decreased"
    ],
    optionsMarathi: [
      "क्लच ऑपरेटिंग लिंकेज सुलभ होते",
      "कूलिंग सिस्टम सुलभ होते",
      "रोड अ‍ॅडेसिव्हिटी (road adhesion/पकड) वाढते",
      "रोड अ‍ॅडेसिव्हिटी (road adhesion/पकड) कमी होते"
    ],
    answer: "C",
    explanation: "A four-wheel driven vehicle delivers torque to all four wheels, which significantly increases road adhesion (grip), reducing slippage especially in off-road or slippery conditions.",
    explanationMarathi: "फोर-व्हील ड्राईव्ह वाहन सर्व चार चाकांना टॉर्क पुरवते, ज्यामुळे रस्त्याची पकड (grip) लक्षणीयरीत्या वाढते, विशेषतः ऑफ-रोड किंवा निसरड्या परिस्थितीत घसरणे कमी होते."
  },
  {
    id: 4,
    chapterId: 1,
    question: "The distance between the centers of the front and rear wheels is known as...",
    questionMarathi: "पुढील आणि मागील चाकांच्या मध्यभागांमधील अंतराला काय म्हणतात?",
    options: ["Chassis", "Wheel Base", "Chassis Overhang", "Wheel Track"],
    optionsMarathi: ["चेसिस (Chassis)", "व्हील बेस (Wheel Base)", "चेसिस ओव्हरहॅंग (Chassis Overhang)", "व्हील ट्रॅक (Wheel Track)"],
    answer: "B",
    explanation: "Wheel Base is the distance between the center of the front wheel axle and the center of the rear wheel axle.",
    explanationMarathi: "पुढील चाकाच्या अ‍ॅक्सलच्या मध्यभागी आणि मागील चाकाच्या अ‍ॅक्सलच्या मध्यभागी असलेल्या अंतराला व्हील बेस म्हणतात."
  },
  {
    id: 5,
    chapterId: 1,
    question: "The example of a saloon is...",
    questionMarathi: "खालीलपैकी 'सलून' (Saloon/Sedan) कारचे उदाहरण कोणते आहे?",
    options: ["Premier car", "Tata Truck", "Leyland bus", "None of these"],
    optionsMarathi: ["प्रीमियर कार (Premier car)", "टाटा ट्रक (Tata Truck)", "लेलँड बस (Leyland bus)", "यांपैकी काहीही नाही"],
    answer: "A",
    explanation: "A saloon (also known as a Sedan) is a passenger car with a three-box configuration (engine, passenger, and cargo compartments). The classic Premier Padmini is a saloon car.",
    explanationMarathi: "सलून (ज्याला सेडान देखील म्हणतात) ही थ्री-बॉक्स कॉन्फिगरेशन (इंजिन, प्रवासी आणि मालवाहू कप्पे) असलेली प्रवासी कार आहे. क्लासिक प्रीमियर पद्मिनी ही सलून कार आहे."
  },
  {
    id: 6,
    chapterId: 1,
    question: "The first automobile powered by a steam engine was built in France by...",
    questionMarathi: "फ्रान्समध्ये स्टीम इंजिनवर चालणारे पहिले ऑटोमोबाईल कोणाद्वारे बनवले गेले होते?",
    options: ["Nicholas-Joseph Cugnot", "Elwood J. Haynes", "Henry Ford", "Daimler Benz"],
    optionsMarathi: ["निकोलस-जोसेफ कुग्नॉट (Nicholas-Joseph Cugnot)", "एलवुड जे. हेन्स (Elwood J. Haynes)", "हेन्री फोर्ड (Henry Ford)", "डेमलर बेंझ (Daimler Benz)"],
    answer: "A",
    explanation: "The first self-propelled mechanical vehicle, powered by a steam engine, was built by Nicholas-Joseph Cugnot in France in 1769.",
    explanationMarathi: "फ्रान्समध्ये १७६९ मध्ये निकोलस-जोसेफ कुग्नॉट यांनी स्टीम इंजिनवर चालणारे पहिले स्वयं-चालित यांत्रिक वाहन बनवले होते."
  },

  // --- CHAPTER 2: Chassis Construction ---
  {
    id: 7,
    chapterId: 2,
    question: "The number of points at which the engine-clutch-gearbox unit is supported on the chassis frame is...",
    questionMarathi: "इंजिन-क्लच-गिअरबॉक्स युनिट चेसिस फ्रेमवर साधारणपणे किती बिंदूंवर (points) सपोर्ट केले जाते?",
    options: ["One", "Two", "Three", "Four"],
    optionsMarathi: ["एक", "दोन", "तीन", "चार"],
    answer: "C",
    explanation: "Typically, the combined engine-clutch-gearbox assembly is supported at three points on the chassis frame (three-point suspension layout) to absorb vibration and align correctly.",
    explanationMarathi: "सामान्यतः, संयुक्त इंजिन-क्लच-गिअरबॉक्स असेंबली चेसिस फ्रेमवर तीन बिंदूंवर समर्थित असते जेणेकरून कंपने शोषली जावीत आणि योग्य संरेखन मिळावे."
  },
  {
    id: 8,
    chapterId: 2,
    question: "Weight of the vehicle produces what in the side members of the Frame?",
    questionMarathi: "वाहनाच्या वजनामुळे फ्रेमच्या बाजूच्या भागांवर (side members) कोणत्या प्रकारचा ताण येतो?",
    options: ["Vertical bending", "Horizontal bending", "Torsion", "All of these"],
    optionsMarathi: ["उभे वाकणे (Vertical bending)", "आडवे वाकणे (Horizontal bending)", "पिळणे (Torsion)", "हे सर्व"],
    answer: "A",
    explanation: "The heavy dead-weight of the vehicle's components, cargo, and passengers causes vertical bending moment on the longitudinal side members of the frame.",
    explanationMarathi: "वाहनाचे घटक, माल आणि प्रवाशांच्या वजनामुळे फ्रेमच्या लांब बाजूच्या भागांवर उभे वाकणे (vertical bending) ताण येतो."
  },
  {
    id: 9,
    chapterId: 2,
    question: "The frame may get distorted to a parallelogram shape due to...",
    questionMarathi: "खालीलपैकी कशामुळे चेसिस फ्रेम वाकडी होऊन समांतरभुज चौकोनाचा आकार (parallelogram shape) घेऊ शकते?",
    options: ["Weight of vehicle", "Weight of passengers", "Cornering force", "Wheel impact with road obstacle"],
    optionsMarathi: ["वाहनाचे वजन", "प्रवाशांचे वजन", "कॉर्नरिंग फोर्स (Cornering force)", "रस्त्यावरील अडथळ्याशी चाकाचा झालेला आघात"],
    answer: "D",
    explanation: "When one wheel hits a severe road obstacle or pothole, the heavy impact shifts the axle longitudinally, which can distort the frame into a parallelogram shape.",
    explanationMarathi: "जेव्हा एक चाक मोठ्या रस्त्यावरील अडथळ्यावर किंवा खड्ड्यावर आदळते, तेव्हा जोराचा आघात अ‍ॅक्सलला लांब दिशेने हलवतो, ज्यामुळे फ्रेम समांतरभुज चौकोनी आकारात बदलू शकते."
  },
  {
    id: 10,
    chapterId: 2,
    question: "What is fitted at the front of the vehicles by means of spring assemblies?",
    questionMarathi: "स्प्रिंग असेंबलीच्या मदतीने वाहनाच्या समोरील बाजूस काय जोडलेले असते?",
    options: ["Gear Box", "Engine", "Rear axle", "Front axle"],
    optionsMarathi: ["गिअर बॉक्स (Gear Box)", "इंजिन (Engine)", "मागील अ‍ॅक्सल (Rear axle)", "पुढील अ‍ॅक्सल (Front axle)"],
    answer: "D",
    explanation: "The front axle is mounted at the front of the vehicle under the chassis frame using suspension spring assemblies.",
    explanationMarathi: "सस्पेंशन स्प्रिंग असेंबलीच्या मदतीने पुढील अ‍ॅक्सल वाहनाच्या समोर चेसिस फ्रेमखाली जोडलेला असतो."
  },
  {
    id: 11,
    chapterId: 2,
    question: "The most effective cross-section of frame members against bending load is...",
    questionMarathi: "बेंडिंग लोड (वाकवणाऱ्या ताणाविरुद्ध) रोखण्यासाठी चेसिस फ्रेमसाठी सर्वात प्रभावी क्रॉस-सेक्शन कोणता ठरतो?",
    options: ["Rectangular bar", "Round bar", "Round hollow tube", "Square hollow section"],
    optionsMarathi: ["आयताकृती बार (Rectangular bar)", "गोल बार (Round bar)", "गोल पोकळ नळी (Round hollow tube)", "चौकोनी पोकळ विभाग (Square hollow section)"],
    answer: "D",
    explanation: "A square hollow section or box-type side section provides the maximum resistance to bending and torsional forces compared to solid or circular configurations of similar weight.",
    explanationMarathi: "चौकोनी पोकळ विभाग किंवा बॉक्स-प्रकारचा बाजूचा विभाग समान वजनाच्या घन किंवा वर्तुळाकार रचनेच्या तुलनेत बेंडिंग आणि टॉर्शिनल बलांना सर्वाधिक प्रतिकार प्रदान करतो."
  },

  // --- CHAPTER 3: Transmission ---
  {
    id: 12,
    chapterId: 3,
    question: "The main purpose of a gearbox in an automobile is to...",
    questionMarathi: "ऑटोमोबाईलमध्ये गिअरबॉक्सचा मुख्य हेतू काय आहे?",
    options: ["Vary speed", "Vary torque", "Provide permanent speed reduction", "Disconnect road wheels"],
    optionsMarathi: ["वेग बदलणे (Vary speed)", "टॉर्क बदलणे (Vary torque)", "कायमस्वरूपी वेग कमी करणे", "रस्त्यावरील चाके वेगळी करणे"],
    answer: "B",
    explanation: "While a gearbox changes speed, its primary mechanical function is to vary the torque available at the wheels depending on road load and incline requirements.",
    explanationMarathi: "गिअरबॉक्स वेग बदलत असला तरी, रस्त्यावरील लोड आणि चढ-उतारांच्या गरजेनुसार चाकांवर उपलब्ध टॉर्क बदलणे हे त्याचे primaire यांत्रिक कार्य आहे."
  },
  {
    id: 13,
    chapterId: 3,
    question: "The central gear of an epicyclic gear set is called a...",
    questionMarathi: "इपिसायक्लिक गिअर संचाच्या (epicyclic gear set) मध्यवर्ती गिअरला काय म्हणतात?",
    options: ["Ring gear", "Sun gear", "Planet gear", "Internal gear"],
    optionsMarathi: ["रिंग गिअर (Ring gear)", "सन गिअर (Sun gear)", "प्लॅनेट गिअर (Planet gear)", "अंतर्गत गिअर (Internal gear)"],
    answer: "B",
    explanation: "In a planetary/epicyclic gear system, the central gear is called the Sun gear, around which the planet gears rotate, enclosed by an outer ring gear.",
    explanationMarathi: "प्लॅनेटरी/इपिसायक्लिक गिअर सिस्टममध्ये, मध्यवर्ती गिअरला सन गिअर म्हणतात, ज्याच्या भोवती प्लॅनेट गिअर्स फिरतात आणि तो बाहेरील रिंग गिअरने वेढलेला असतो."
  },
  {
    id: 14,
    chapterId: 3,
    question: "A two-speed reverse gear arrangement is generally provided in case of...",
    questionMarathi: "दोन-स्पीड रिव्हर्स गिअर व्यवस्था (two-speed reverse gear) सामान्यतः कोणत्या वाहनात दिली जाते?",
    options: ["Passenger cars", "Metadors", "Tractors", "Trucks"],
    optionsMarathi: ["प्रवासी कार (Passenger cars)", "मेटाडोर (Metadors)", "ट्रॅक्टर (Tractors)", "ट्रक (Trucks)"],
    answer: "C",
    explanation: "Tractors often work on fields where moving backwards requires varying torque limits. Therefore, they are designed with dual reverse speed ratios.",
    explanationMarathi: "ट्रॅक्टर सहसा शेतात काम करतात जिथे मागे जाताना वेगवेगळ्या टॉर्क मर्यादांची आवश्यकता असते. म्हणून, ते दुहेरी रिव्हर्स स्पीड रेशोसह डिझाइन केले आहेत."
  },
  {
    id: 15,
    chapterId: 3,
    question: "The transfer case is essentially a...",
    questionMarathi: "ट्रान्सफर केस (transfer case) हे प्रामुख्याने काय आहे?",
    options: ["One speed transmission", "Two speed transmission", "Three speed transmission", "Four speed transmission"],
    optionsMarathi: ["वन-स्पीड ट्रान्समिशन", "टू-स्पीड ट्रान्समिशन", "थ्री-स्पीड ट्रान्समिशन", "फोर-स्पीड ट्रान्समिशन"],
    answer: "B",
    explanation: "A transfer case in 4WD vehicles acts as an auxiliary gear unit, offering two speeds: High range (normal road driving) and Low range (maximum torque for off-roading).",
    explanationMarathi: "4WD वाहनांमधील ट्रान्सफर केस एक सहाय्यक गिअर युनिट म्हणून काम करते, जे दोन वेग ऑफर करते: हाय रेंज (सामान्य रोड ड्रायव्हिंग) आणि लो रेंज (ऑफ-रोडिंगसाठी जास्तीत जास्त टॉर्क)."
  },

  // --- CHAPTER 4: Clutch ---
  {
    id: 16,
    chapterId: 4,
    question: "A clutch is usually designed to transmit maximum torque which is...",
    questionMarathi: "क्लच सामान्यतः जास्तीत जास्त टॉर्क ट्रान्समिट करण्यासाठी डिझाइन केला जातो जो की:",
    options: [
      "Equal to the maximum engine torque",
      "80 percent of the maximum engine torque",
      "150 percent of the maximum engine torque",
      "None of the above"
    ],
    optionsMarathi: [
      "इंजिनच्या कमाल टॉर्क एवढाच",
      "इंजिनच्या कमाल टॉर्कच्या ८० टक्के",
      "इंजिनच्या कमाल टॉर्कच्या १५० टक्के",
      "यांपैकी काहीही नाही"
    ],
    answer: "C",
    explanation: "Clutches are designed to handle about 150% (1.5 times) of the maximum engine torque to provide a safety margin and prevent slippage under heavy load conditions.",
    explanationMarathi: "जड लोडच्या परिस्थितीत घसरणे रोखण्यासाठी आणि सुरक्षा मार्जिन प्रदान करण्यासाठी क्लच इंजिनच्या कमाल टॉर्कच्या १५०% (१.५ पट) हाताळण्यासाठी डिझाइन केलेले आहेत."
  },
  {
    id: 17,
    chapterId: 4,
    question: "The inertia of the rotating parts of the clutch should be...",
    questionMarathi: "क्लचच्या फिरणाऱ्या भागांचे जडत्व (inertia) कसे असावे?",
    options: ["Minimum", "Maximum", "Zero", "None of the above"],
    optionsMarathi: ["किमान (Minimum)", "कमाल (Maximum)", "शून्य (Zero)", "यांपैकी काहीही नाही"],
    answer: "A",
    explanation: "The inertia of rotating clutch parts should be kept to a minimum to facilitate easier gear shifting without causing grinding or severe gear clashes.",
    explanationMarathi: "गिअर बदलणे सोपे व्हावे आणि आवाज किंवा मोठे झटके टाळता यावेत म्हणून क्लचच्या फिरणाऱ्या भागांचे जडत्व किमान (minimum) ठेवले पाहिजे."
  },
  {
    id: 18,
    chapterId: 4,
    question: "The driving member of a clutch usually consists of two...",
    questionMarathi: "क्लचच्या ड्रायव्हिंग मेंबरमध्ये (driving member) सामान्यतः कोणत्या दोन प्लेट्स असतात?",
    options: ["Aluminium plates", "Copper plates", "Cast iron plates", "None of these"],
    optionsMarathi: ["अ‍ॅल्युमिनियम प्लेट्स", "तांब्याच्या (Copper) प्लेट्स", "कास्ट आयर्न (Cast iron) प्लेट्स", "यांपैकी काहीही नाही"],
    answer: "C",
    explanation: "The driving member of a clutch consists of the flywheel and the pressure plate, both of which are usually made of high-quality Cast Iron for excellent heat dissipation and wear resistance.",
    explanationMarathi: "क्लचच्या ड्रायव्हिंग मेंबरमध्ये फ्लायव्हील आणि pressure प्लेट यांचा समावेश होतो, जे दोन्ही उत्कृष्ट उष्णता विसर्जन आणि पोशाख प्रतिकारासाठी उच्च-गुणवत्तेच्या कास्ट आयर्नने बनवलेले असतात."
  },
  {
    id: 19,
    chapterId: 4,
    question: "The clutch is located between the...",
    questionMarathi: "क्लच कोणामध्ये स्थित असतो?",
    options: [
      "Engine and Transmission",
      "Transmission and Rear Axle",
      "Propeller Shaft and Differential",
      "Differential and Wheels"
    ],
    optionsMarathi: [
      "इंजिन आणि ट्रान्समिशन (गिअरबॉक्स)",
      "ट्रान्समिशन आणि मागील अ‍ॅक्सल",
      "प्रोपेलर शाफ्ट आणि डिफरेंशियल",
      "डिफरेंशियल आणि चाके"
    ],
    answer: "A",
    explanation: "The clutch is positioned between the engine and the gearbox (transmission) to engage or disengage engine power at the driver's will.",
    explanationMarathi: "चालकाच्या इच्छेनुसार इंजिनची शक्ती जोडण्यासाठी किंवा काढून घेण्यासाठी क्लच इंजिन आणि गिअरबॉक्स (ट्रान्समिशन) यांच्यामध्ये ठेवलेला असतो."
  },
  {
    id: 20,
    chapterId: 4,
    question: "Cushioning springs in clutch plate are used to reduce...",
    questionMarathi: "क्लच प्लेटमधील कुशनिंग स्प्रिंग्स (Cushioning springs) काय कमी करण्यासाठी वापरले जातात?",
    options: ["Vehicle speed", "Torsional vibrations", "Jerky starts", "None of these"],
    optionsMarathi: ["वाहनाचा वेग", "टॉर्शिनल कंपन (Torsional vibrations)", "झटकेदार सुरुवात (Jerky starts)", "यांपैकी काहीही नाही"],
    answer: "C",
    explanation: "Cushioning springs (and axial dampening springs) allow smooth engagement of clutch surfaces, reducing jerky takeoffs and dampening shocks.",
    explanationMarathi: "कुशनिंग स्प्रिंग्स क्लचच्या पृष्ठभागांना सहजपणे जोडण्याची परवानगी देतात, ज्यामुळे झटकेदार सुरुवात कमी होते आणि धक्के शोषले जातात."
  },

  // --- CHAPTER 6: Front Axle & Rear Axle ---
  {
    id: 21,
    chapterId: 6,
    question: "The type of rear axle used on heavy duty trucks is...",
    questionMarathi: "अवजड ट्रकमध्ये कोणत्या प्रकारचा मागील अ‍ॅक्सल (rear axle) वापरला जातो?",
    options: ["Semi-floating", "Fully-floating", "Three-quarter floating", "None of these"],
    optionsMarathi: ["सेमी-फ्लोटिंग (Semi-floating)", "फुल्ली-फ्लोटिंग (Fully-floating)", "थ्री-क्वार्टर फ्लोटिंग", "यांपैकी काहीही नाही"],
    answer: "B",
    explanation: "Fully-floating axles are used in commercial and heavy vehicles because they only transmit torque, while the entire weight of the vehicle is supported by the axle housing/casing.",
    explanationMarathi: "व्यावसायिक आणि अवजड वाहनांमध्ये फुल्ली-फ्लोटिंग अ‍ॅक्सल्सचा वापर केला जातो कारण ते केवळ टॉर्क ट्रान्समिट करतात, तर वाहनाचे संपूर्ण वजन अ‍ॅक्सल हाउसिंग/केसिंगद्वारे पेलले जाते."
  },

  // --- CHAPTER 7: Suspension system ---
  {
    id: 22,
    chapterId: 7,
    question: "The function of a shackle with a leaf spring is to...",
    questionMarathi: "लीफ स्प्रिंग सोबत असलेल्या शॅकल (shackle) चे कार्य काय असते?",
    options: [
      "Allow pivoting of spring end",
      "Allow spring length to change",
      "Control side-sway",
      "Control rear torque"
    ],
    optionsMarathi: [
      "स्प्रिंगच्या टोकाला फिरण्यास अनुमती देणे",
      "विक्षेपानुसार स्प्रिंगची लांबी बदलण्यास अनुमती देणे",
      "बाजूचा बदल नियंत्रित करणे",
      "मागील टॉर्क नियंत्रित करणे"
    ],
    answer: "B",
    explanation: "As a leaf spring deflects and flattens under load, its straight-line length changes. The shackle provides a swinging link that allows this length variation.",
    explanationMarathi: "भार असताना लीफ स्प्रिंग खाली दबल्यामुळे आणि सरळ झाल्यामुळे तिची सरळ रेषेतील लांबी बदलते. शॅकल एक हलणारी लिंक प्रदान करते जी लांबीतील बदलाला सामावून घेते."
  },
  {
    id: 23,
    chapterId: 7,
    question: "Panhard rod is used to absorb...",
    questionMarathi: "पॅनहार्ड रॉड (Panhard rod) चा उपयोग काय शोषून घेण्यासाठी होतो?",
    options: ["Vertical loading", "Driving thrust", "Side thrust", "Braking torque"],
    optionsMarathi: ["उभ्या दिशांचे वजन", "ड्रायव्हिंग थ्रस्ट (शॉक)", "बाजूचा धक्का (Side thrust)", "ब्रेकिंग टॉर्क"],
    answer: "C",
    explanation: "A Panhard rod (track bar) is a suspension link that provides lateral (side-to-side) location of the axle relative to the vehicle frame, absorbing lateral/side thrust.",
    explanationMarathi: "पॅनहार्ड रॉड ही सस्पेंशन लिंक आहे जी वाहनाच्या फ्रेमच्या संदर्भात अ‍ॅक्सलची बाजूकडील स्थिती प्रदान करते आणि बाजूचा धक्का (side thrust) शोषून घेते."
  },

  // --- CHAPTER 8: Tyres and wheels ---
  {
    id: 24,
    chapterId: 8,
    question: "Mag wheels are called as such because they are cast from...",
    questionMarathi: "मॅग व्हील्सना 'मॅग' (Mag wheels) का म्हणतात?",
    options: ["Magnesium alloy", "Magnetized iron", "Manganese steel", "None of these"],
    optionsMarathi: ["मॅग्नेशियम अ‍ॅलॉय (Magnesium alloy) पासन बनवलेले असतात", "चुंबकीय लोखंड", "मँगनीज स्टील", "यांपैकी काहीही नाही"],
    answer: "A",
    explanation: "Mag wheels are named after Magnesium because early lightweight racing alloy wheels were cast predominantly from magnesium alloys.",
    explanationMarathi: "मॅग्नेशियम धातूवरून मॅग व्हील्सला हे नाव मिळाले आहे कारण सुरुवातीचे हलके रेसिंग अलॉय व्हील्स प्रामुख्याने मॅग्नेशियम मिश्रधातूपासून बनवले जात असत."
  },
  {
    id: 25,
    chapterId: 8,
    question: "The type of wheel which cannot be used with a tubeless tyre is...",
    questionMarathi: "खालीलपैकी कोणत्या प्रकारचा व्हील ट्युबलेस टायर सोबत वापरला जाऊ शकत नाही?",
    options: ["Disc wheel", "Wire wheel", "Light alloy wheel", "Composite wheel"],
    optionsMarathi: ["डिस्क व्हील (Disc wheel)", "वायर व्हील (Wire/Spoke wheel)", "लाईट अलॉय व्हील", "कंपोझिट व्हील"],
    answer: "B",
    explanation: "Wire spoke wheels cannot hold air inside without a tube because of the spoke penetration holes in the wheel rim. Hence, they are not suited for tubeless tyres.",
    explanationMarathi: "चाकाच्या रिममध्ये स्पोक्स जाण्यासाठी छिद्रे असल्यामुळे वायरचे स्पोक व्हील ट्यूबशिवाय हवा रोखून धरू शकत नाहीत. म्हणून, ते ट्यूबलेस टायरसाठी योग्य नाहीत."
  },
  {
    id: 26,
    chapterId: 8,
    question: "The purpose of tyre sipes is to...",
    questionMarathi: "टायरच्या पृष्ठभागावर असलेल्या लहान खोबणी म्हणजेच साईप्स (sipes) चा मुख्य हेतू काय असतो?",
    options: ["Increase tread life", "Decrease noise level", "Provide softer ride", "Increase traction"],
    optionsMarathi: ["ट्रेडचे आयुष्य वाढवणे", "आवाज कमी करणे", "मऊ प्रवास प्रदान करणे", "कर्षण/रस्त्यावरील पकड (traction) वाढवणे"],
    answer: "D",
    explanation: "Sipes are small slits inside tread blocks that open up to expel water on wet surfaces, preventing hydroplaning and significantly increasing wet traction.",
    explanationMarathi: "साईप्स ही ट्रेड ब्लॉकच्या आतील लहान छिद्रे असतात जी ओल्या रस्त्यांवर पाणी बाहेर काढण्यासाठी उघडतात, ज्यामुळे पाणी साचणे टळते आणि ओल्या रस्त्यावर पकड वाढते."
  },
  {
    id: 27,
    chapterId: 8,
    question: "An under-inflated tyre will wear out most near the...",
    questionMarathi: "कमी हवेचा दाब (under-inflated) असलेला टायर खालीलपैकी कोणत्या भागात जास्त झिजेल?",
    options: ["Centre", "Edges", "Lateral direction", "All of the above"],
    optionsMarathi: ["मध्यभागी (Centre)", "कडांवर (Edges)", "लॅटरल बाजूंनी", "वरील सर्व"],
    answer: "B",
    explanation: "Under-inflation causes the center of the tread to cave inward slightly, throwing the load onto the shoulders (edges) of the tyre, leading to rapid edge wear.",
    explanationMarathi: "कमी हवेच्या दाबामुळे ट्रेडचा मध्यभाग थोडा आत दबला जातो, ज्यामुळे संपूर्ण भार टायरच्या कडांवर पडतो आणि कडा वेगाने झिजतात."
  },

  // --- CHAPTER 9: Braking System ---
  {
    id: 28,
    chapterId: 9,
    question: "The brakes employed in modern passenger cars are usually operated...",
    questionMarathi: "आधुनिक प्रवासी कारमध्ये वापरले जाणारे ब्रेक्स सामान्यतः कसे चालवले जातात?",
    options: ["Mechanically", "Hydraulically", "By engine vacuum", "By compressed air"],
    optionsMarathi: ["मेकॅनिकली (Mechanically)", "हायड्रॉलिकली (Hydraulically)", "इंजिन व्हॅक्यूमद्वारे", "कॉम्प्रेस्ड एअरद्वारे"],
    answer: "B",
    explanation: "Passenger cars utilize hydraulic brake fluids to transmit power from the brake pedal evenly to wheel calipers/cylinders.",
    explanationMarathi: "प्रवासी कारमध्ये ब्रेक पेडलवरून चाकांच्या कॅलिपर/सिलेंडरवर समान रीतीने शक्ती प्रसारित करण्यासाठी हायड्रॉलिक ब्रेक ऑईलचा वापर केला जातो."
  },
  {
    id: 29,
    chapterId: 9,
    question: "The operation of removing trapped air from a hydraulic braking system is known as...",
    questionMarathi: "हायड्रॉलिक ब्रेक सिस्टमधून अडकलेली हवा बाहेर काढण्याच्या प्रक्रियेला काय म्हणतात?",
    options: ["Trapping", "Tapping", "Bleeding", "Cleaning"],
    optionsMarathi: ["ट्रॅपिंग (Trapping)", "टॅपिंग (Tapping)", "ब्लीडिंग (Bleeding)", "क्लीनिंग (Cleaning)"],
    answer: "C",
    explanation: "Bleeding is the process of pumping hydraulic brake fluid through the system to purge any trapped air bubbles, ensuring firm brake pedal pressure.",
    explanationMarathi: "सिस्टीममधील अडकलेले हवेचे बुडबुडे काढून टाकण्यासाठी आणि ब्रेक पेडल दाब मजबूत करण्यासाठी हायड्रॉलिक ब्रेक ऑईल बाहेर काढण्याच्या प्रक्रियेला ब्लीडिंग म्हणतात."
  },
  {
    id: 30,
    chapterId: 9,
    question: "The function of an antilock brake system (ABS) is to...",
    questionMarathi: "अँटी-लॉक ब्रेक सिस्टम (ABS) चे मुख्य कार्य काय असते?",
    options: [
      "Reduce the stopping distance to absolute minimum",
      "Minimize brake fade",
      "Maintain directional control during braking by preventing wheel lockup",
      "Prevent nose dives during braking"
    ],
    optionsMarathi: [
      "थांबण्याचे अंतर कमालीचे कमी करणे",
      "ब्रेक फेड (brake fade) कमी करणे",
      "चाके लॉक होण्यापासून रोखून ब्रेकिंग दरम्यान स्टिअरिंग नियंत्रण राखणे",
      "ब्रेकिंग दरम्यान समोर झुकणे (nose dive) रोखणे"
    ],
    answer: "C",
    explanation: "ABS prevents wheels from locking up under heavy braking, enabling the driver to steer the vehicle and maintain directional control.",
    explanationMarathi: "ABS जोरदार ब्रेकिंगच्या वेळी चाके लॉक होण्यापासून रोखते, ज्यामुळे चालकाला वाहन चालवण्यास आणि नियंत्रण राखण्यास मदत होते."
  },

  // --- CHAPTER 16: Cooling system ---
  {
    id: 31,
    chapterId: 16,
    question: "The purpose of a thermostat valve in an engine cooling system is to...",
    questionMarathi: "इंजिन कूलिंग सिस्टममध्ये थर्मोस्टॅट व्हॉल्व्ह (thermostat valve) चे कार्य काय असते?",
    options: [
      "Prevent the coolant from boiling",
      "Allow the engine to warm up quickly",
      "Indicate the coolant temperature",
      "Keep the radiator fan running"
    ],
    optionsMarathi: [
      "कूलंटला उकळण्यापासून रोखणे",
      "इंजिन लवकर तापण्यास (operating temperature गाठण्यास) मदत करणे",
      "कूलंटचे तापमान दर्शवणे",
      "रेडिएटर फॅन चालू ठेवणे"
    ],
    answer: "B",
    explanation: "The thermostat remains closed when the engine is cold, blocking coolant flow to the radiator. This allows the engine to warm up quickly to its efficient operating temperature.",
    explanationMarathi: "इंजिन थंड असताना थर्मोस्टॅट बंद राहतो, ज्यामुळे रेडिएटरकडे कुलंटचा प्रवाह रोखला जातो. यामुळे इंजिनला त्याच्या कार्यक्षम तापमानापर्यंत लवकर गरम होण्यास मदत होते."
  },

  // --- CHAPTER 18: Lubricants & lubrication ---
  {
    id: 32,
    chapterId: 18,
    question: "The most important characteristic of a lubricating oil is its...",
    questionMarathi: "लुब्रिकेटिंग ऑईल (इंजिन ऑईल) चे सर्वात महत्त्वाचे वैशिष्ट्य कोणते असते?",
    options: ["Viscosity", "Physical stability", "Chemical stability", "Resistance against corrosion"],
    optionsMarathi: ["व्हिस्कोसिटी (Viscosity/घट्टपणा)", "भौतिक स्थिरता", "रासायनिक स्थिरता", "गंज रोखण्याची क्षमता"],
    answer: "A",
    explanation: "Viscosity (the measure of resistance to flow) is the most critical property of engine oil, as it ensures a protective fluid barrier film remains between moving engine parts.",
    explanationMarathi: "इंजिन ऑईलचा घट्टपणा (Viscosity) हा त्याचा सर्वात महत्त्वाचा गुणधर्म आहे, कारण यामुळे हलणाऱ्या भागांमध्ये संरक्षणात्मक थर टिकून राहतो."
  },

  // --- CHAPTER 30: Storage batteries ---
  {
    id: 33,
    chapterId: 30,
    question: "The specific gravity of a fully charged lead-acid battery electrolyte is about...",
    questionMarathi: "पूर्णपणे charge झालेल्या लेड-अ‍ॅसिड बॅटरीच्या इलेक्ट्रोलाईटची specific gravity किती असते?",
    options: ["1.00", "1.15", "1.28", "2.80"],
    optionsMarathi: ["१.००", "१.१५", "१.२८", "२.८०"],
    answer: "C",
    explanation: "A fully charged battery has a specific gravity of approximately 1.280 (often measured between 1.260 and 1.280 using a hydrometer).",
    explanationMarathi: "पूर्णपणे चार्ज झालेल्या बॅटरीच्या इलेक्ट्रोलाईटचे विशिष्ट गुरुत्व (specific gravity) सुमारे १.२८० असते."
  },
  {
    id: 34,
    chapterId: 30,
    question: "The instrument used to check the specific gravity of battery acid is...",
    questionMarathi: "बॅटरी अ‍ॅसिडची विशिष्ट गुरुत्व (specific gravity) तपासण्यासाठी कोणते उपकरण वापरले जाते?",
    options: ["Anemometer", "Hygrometer", "Hydrometer", "Multimeter"],
    optionsMarathi: ["अ‍ॅनेमोमीटर (Anemometer)", "हायग्रोमीटर (Hygrometer)", "हायड्रोमीटर (Hydrometer)", "मल्टीमीटर (Multimeter)"],
    answer: "C",
    explanation: "A hydrometer is used to measure the specific gravity of liquids, which directly reveals the state of charge of a lead-acid battery.",
    explanationMarathi: "द्रवांचे विशिष्ट गुरुत्व मोजण्यासाठी हायड्रोमीटरचा वापर केला जातो, जे लेड-अ‍ॅसिड बॅटरीच्या charge ची स्थिती थेट स्पष्ट करते."
  },
  {
    id: 35,
    chapterId: 30,
    question: "How many cells are used in a 12-volt lead-acid car battery?",
    questionMarathi: "१२-व्होल्टच्या कार बॅटरीमध्ये किती सेल्स जोडलेले असतात?",
    options: ["2 cells", "4 cells", "6 cells", "8 cells"],
    optionsMarathi: ["२ सेल्स", "४ सेल्स", "६ सेल्स", "८ सेल्स"],
    answer: "C",
    explanation: "A standard 12V automotive battery consists of 6 cells connected in series, each producing approximately 2.1 volts.",
    explanationMarathi: "मानक १२V ऑटोमोटिव्ह बॅटरीमध्ये सिरीजमध्ये ६ सेल्स जोडलेले असतात, ज्यांपैकी प्रत्येक सुमारे २.१ व्होल्ट निर्माण करतो."
  }
];

// Generates exactly 40 bilingual questions for each of the 31 chapters (total = 1240 questions)
function generateProceduralQuestions(): Question[] {
  const result: Question[] = [];
  const targetPerChapter = 40;

  for (let chId = 1; chId <= 31; chId++) {
    const baseForCh = BASE_QUESTIONS.filter((q) => q.chapterId === chId);
    let added = 0;

    // Add base questions first
    for (const bq of baseForCh) {
      result.push({ ...bq });
      added++;
    }

    // Procedurally generate remaining questions up to targetPerChapter
    const seed = chId * 100;
    while (added < targetPerChapter) {
      const idx = seed + added;
      let q: Omit<Question, "id">;

      // Define different custom templates based on chapter ID
      switch (chId) {
        case 1: { // Introduction
          const drives = [
            { w: 4, d: 2, desc: "Total of 4 wheels on the ground, with 2 driving wheels", descM: "एकूण ४ चाके आणि २ शक्ती देणारी (driving) चाके" },
            { w: 4, d: 4, desc: "Four-wheel drive with torque delivered to all 4 wheels", descM: "फोर-व्हील ड्राईव्ह, सर्व ४ चाकांना शक्ती प्रदान केली जाते" },
            { w: 6, d: 4, desc: "Total of 6 wheels with 4 receiving engine power", descM: "एकूण ६ चाके आणि ४ चाके इंजिनच्या शक्तीने फिरणारी" }
          ];
          const dItem = drives[idx % drives.length];
          q = {
            chapterId: 1,
            question: "In automotive terminology, a layout designated as " + dItem.w + "x" + dItem.d + " represents:",
            questionMarathi: "ऑटोमोबाईल शब्दावलीमध्ये, " + dItem.w + "x" + dItem.d + " म्हणून दर्शवलेले कॉन्फिगरेशन म्हणजे:",
            options: [dItem.desc, "A specific transmission ratio of gears", "Vehicle chassis overall dimensions factor", "Piston engine stroke-to-bore diameter limit"],
            optionsMarathi: [dItem.descM, "गिअरचे एक विशिष्ट ट्रान्समिशन रेशो", "चेसिसच्या एकूण आकारमानाचा घटक", "इंजिन पिस्टनचा स्ट्रोक आणि बोअर व्यास"],
            answer: "A",
            explanation: "The classification code shows total wheels (" + dItem.w + ") and powered wheels (" + dItem.d + ").",
            explanationMarathi: "वर्गीकरण कोड एकूण चाके (" + dItem.w + ") आणि पॉवर मिळवणारी चाके (" + dItem.d + ") दर्शवतो."
          };
          break;
        }
        case 2: { // Chassis Construction
          const sects = [
            { sec: "Channel section", secM: "चॅनेल सेक्शन", load: "vertical bending forces", loadM: "उभ्या दिशांचे वाकवणारे ताण" },
            { sec: "Box section", secM: "बॉक्स सेक्शन", load: "torsional (twisting) stresses", loadM: "पिळण्याचे ताण (torsion)" },
            { sec: "Tubular section", secM: "ट्युब्युलर (पोकळ नळी) सेक्शन", load: "high strength-to-weight demands in racing cars", loadM: "कमी वजनात अधिक मजबुतीची रेसिंग वाहनांची गरज" }
          ];
          const sItem = sects[idx % sects.length];
          q = {
            chapterId: 2,
            question: "Which structural advantage makes the " + sItem.sec + " a highly preferred choice for vehicle frame side rails?",
            questionMarathi: "चेसिस फ्रेमच्या साईड रेल्ससाठी " + sItem.secM + " ची निवड प्रामुख्याने कोणत्या ताणामुळे केली जाते?",
            options: ["It offers excellent resistance to " + sItem.load, "It reduces steering wheel play significantly", "It eliminates tire balancing needs", "It provides direct aerodynamic stabilization"],
            optionsMarathi: ["ते " + sItem.loadM + " विरुद्ध उत्कृष्ट मजबुती प्रदान करते", "ते स्टिअरिंग व्हीलचे प्ले लक्षणीयरीत्या कमी करते", "ते टायर बॅलन्सिंगची गरज पूर्णपणे संपवते", "ते थेट एरोडायनामिक स्थैर्य प्रदान करते"],
            answer: "A",
            explanation: "The frame members are shaped specifically to resist expected operational stresses like " + sItem.load + ".",
            explanationMarathi: sItem.secM + " रचना चेसिसवर येणाऱ्या " + sItem.loadM + " ला यशस्वीपणे तोंड देण्यासाठी अत्यंत फायदेशीर ठरते."
          };
          break;
        }
        case 3: { // Transmission
          const gears = [
            { type: "Helical gears", typeM: "हेलिकल गिअर", feature: "inclined teeth that engage gradually for quiet operation", featureM: "तिरपे दाते जे हळूहळू आणि शांतपणे कार्यरत होतात" },
            { type: "Spur gears", typeM: "स्पर गिअर", feature: "straight-cut teeth that are easy to manufacture but loud at high speeds", featureM: "सरळ दाते जे बनवण्यास सोपे परंतु वेगात अधिक आवाज करतात" }
          ];
          const gItem = gears[idx % gears.length];
          q = {
            chapterId: 3,
            question: "In standard manual transmissions, why are " + gItem.type + " widely utilized for constant mesh operations?",
            questionMarathi: "मॅन्युअल ट्रान्समिशनमध्ये, कॉन्स्टंट मेश गिअरबॉक्ससाठी " + gItem.typeM + " चा वापर प्रामुख्याने का केला जातो?",
            options: [
              "They have " + gItem.feature,
              "They completely eliminate the necessity of using a clutch",
              "They automatically vary speed ratio without any driver input",
              "They decrease the overall lubricant temperature inside case"
            ],
            optionsMarathi: [
              "कारण त्यांचे " + gItem.featureM,
              "ते क्लच वापरण्याची गरज पूर्णपणे संपवतात",
              "ते ड्रायव्हरच्या हस्तक्षेपाशिवाय ऑटोमॅटिक वेग बदलतात",
              "ते गिअरबॉक्समधील ऑईलचे तापमान कमी ठेवतात"
            ],
            answer: "A",
            explanation: "Designers choose helical profiles for quietness and spur profiles for cost-efficiency.",
            explanationMarathi: "गिअरचा प्रकार आणि त्याचे दाते यांवर गिअरबॉक्सचा आवाज आणि कार्यक्षमता अवलंबून असते."
          };
          break;
        }
        case 4: { // Clutch
          const plates = [
            { n1: 5, n2: 4, ans: 8 },
            { n1: 6, n2: 5, ans: 10 }
          ];
          const pItem = plates[idx % plates.length];
          q = {
            chapterId: 4,
            question: "A multi-plate clutch assembly consists of " + pItem.n1 + " driving discs and " + pItem.n2 + " driven discs. Calculate the total number of active friction surfaces.",
            questionMarathi: "एका मल्टि-प्लेट क्लच असेंबलीमध्ये " + pItem.n1 + " ड्रायव्हिंग प्लेट्स आणि " + pItem.n2 + " ड्रायव्हन प्लेट्स आहेत. तर एकूण सक्रिय घर्षण पृष्ठभागांची संख्या काढा.",
            options: [String(pItem.ans), String(pItem.n1 + pItem.n2), String(pItem.ans - 2), String(pItem.ans + 1)],
            optionsMarathi: [String(pItem.ans), String(pItem.n1 + pItem.n2), String(pItem.ans - 2), String(pItem.ans + 1)],
            answer: "A",
            explanation: "The formula for friction surfaces in a multi-plate clutch is: n = n1 + n2 - 1. Thus, " + pItem.n1 + " + " + pItem.n2 + " - 1 = " + pItem.ans + ".",
            explanationMarathi: "सक्रिय घर्षण पृष्ठभागांचे सूत्र: n = n१ + n२ - १. त्यानुसार " + pItem.n1 + " + " + pItem.n2 + " - १ = " + pItem.ans + " सक्रिय पृष्ठभाग मिळतात."
          };
          break;
        }
        case 5: { // Drive Line
          const components = [
            { comp: "Slip Joint", compM: "स्लिप जॉइंट", func: "allows small changes in the length of the propeller shaft", funcM: "प्रोपेलर शाफ्टच्या लांबीमधील तात्पुरत्या बदलांना सामावून घेणे" },
            { comp: "Universal Joint", compM: "युनिव्हर्सल जॉइंट", func: "transmits torque at varying angles of drive line", funcM: "वेगवेगळ्या कोनांवर (angles) फिरणारा टॉर्क यशस्वीपणे प्रसारित करणे" }
          ];
          const cItem = components[idx % components.length];
          q = {
            chapterId: 5,
            question: "What is the critical mechanical function performed by the " + cItem.comp + " in a vehicle's drive line?",
            questionMarathi: "वाहनाच्या ड्राईव्ह लाईनमध्ये " + cItem.compM + " चे मुख्य यांत्रिक कार्य कोणते असते?",
            options: ["It " + cItem.func, "It increases engine compression ratio at high speeds", "It acts as a permanent mechanical speed lock", "It prevents tire wear during hard braking on sharp corners"],
            optionsMarathi: ["ते " + cItem.funcM, "ते वेगात असताना इंजिनचा कॉम्प्रेशन रेशो वाढवते", "ते कायमस्वरूपी स्पीड लॉक म्हणून काम करते", "ते वळणावर ब्रेक लावताना टायरची झीज रोखते"],
            answer: "A",
            explanation: "Drive line parts accommodate rear axle vertical travel during vehicle motion using joints.",
            explanationMarathi: "सस्पेंशनच्या हालचालींमुळे प्रोपेलर शाफ्टची लांबी आणि कोन बदलतात, जे सांधे (joints) सांभाळतात."
          };
          break;
        }
        case 6: { // Front axle & rear axle
          const axles = [
            { type: "Fully-floating axle", typeM: "फुल्ली-फ्लोटिंग अ‍ॅक्सल", load: "driving torque only, as the axle housing bears all vehicle weight", loadM: "केवळ टॉर्क (torque), कारण वाहनाचे वजन संपूर्णपणे अ‍ॅक्सल हाउसिंग उचलते" },
            { type: "Semi-floating axle", typeM: "सेमी-फ्लोटिंग अ‍ॅक्सल", load: "both torque transmission and supporting the vehicle weight and bending loads", loadM: "ड्रायव्हिंग टॉर्क सोबतच वाहनाचे वजन आणि बाजूने येणारे वाकवणारे बल" }
          ];
          const axItem = axles[idx % axles.length];
          q = {
            chapterId: 6,
            question: "What primary mechanical loads are supported directly by the shaft of a " + axItem.type + "?",
            questionMarathi: "ऑटोमोबाईल डिझाइनमध्ये, " + axItem.typeM + " च्या शाफ्टद्वारे प्रामुख्याने कोणते बल (loads) सहन केले जातात?",
            options: ["It transmits " + axItem.load, "It supports steering linkage forces exclusively", "It resists engine exhaust gases backpressure only", "It supports direct lateral spring aerodynamic pressure"],
            optionsMarathi: ["ते " + axItem.loadM + " सहन करते", "ते केवळ स्टिअरिंग लिंकेजच्या फोर्सेसना सांभाळते", "ते केवळ इंजिन एक्झॉस्ट वायूंचा दाब रोखते", "ते थेट बाजूच्या सस्पेंशनचा दाब सांभाळते"],
            answer: "A",
            explanation: "Axle designs vary depending on load distributions between axle shaft and housing.",
            explanationMarathi: "अ‍ॅक्सलच्या प्रकारानुसार त्याचे कार्य आणि भार वाहून नेण्याची क्षमता बदलते."
          };
          break;
        }
        case 7: { // Suspension system
          const springs = [
            { name: "Leaf spring", nameM: "लीफ स्प्रिंग", usage: "heavy commercial trucks to bear large weights", usageM: "अवजड मालवाहू वाहनांमध्ये जास्त भार सहन करणे" },
            { name: "Coil spring", nameM: "कॉइल स्प्रिंग", usage: "light passenger cars for higher riding comfort", usageM: "प्रवासी वाहनांमध्ये अधिक आरामदायी प्रवासाचा अनुभव देणे" }
          ];
          const sItem = springs[idx % springs.length];
          q = {
            chapterId: 7,
            question: "For which application is a " + sItem.name + " most commonly chosen in automotive suspension structures?",
            questionMarathi: "सस्पेंशन सिस्टीममध्ये " + sItem.nameM + " चा मुख्यत्वे कशासाठी उपयोग केला जातो?",
            options: ["In " + sItem.usage, "In preventing RTO pollution measurement failures", "In cooling radiator water through convective fluid movement", "In transmitting starting motor torque to flywheel ring gear"],
            optionsMarathi: [sItem.usageM, "प्रदूषण चाचणीमध्ये अपयश टाळण्यासाठी", "रेडिएटरचे पाणी थंड राखण्यासाठी", "स्टार्टर मोटरची शक्ती फ्लायव्हीलकडे पाठवण्यासाठी"],
            answer: "A",
            explanation: "Spring choices dictate payload capability and ride comfort characteristics.",
            explanationMarathi: "वाहनाचा प्रकार आणि वजन वाहून नेण्याची क्षमता यांवर सस्पेंशन स्प्रिंगची निवड ठरते."
          };
          break;
        }
        case 8: { // Tyres and wheels
          const aligns = [
            { param: "Camber", paramM: "कॅम्बर", purpose: "outward or inward tilt of the front wheels from vertical line", purposeM: "समोरील चाकांचे उभ्या रेषेपासून बाहेर किंवा आत असणारे झुकणे" },
            { param: "Caster", paramM: "कॅस्टर", purpose: "backward or forward tilt of steering axis from vertical", purposeM: "स्टिअरिंग अ‍ॅक्सिसचे उभ्या रेषेपासून मागे किंवा पुढे झुकणे" }
          ];
          const alItem = aligns[idx % aligns.length];
          q = {
            chapterId: 8,
            question: "In wheel alignment procedures, the parameter '" + alItem.param + "' specifically refers to:",
            questionMarathi: "व्हील अलाईनमेंट प्रक्रियेत, '" + alItem.paramM + "' हा मापदंड काय दर्शवतो?",
            options: [alItem.purpose, "The total width of the rim flange in inches", "The depth of tire thread grooving in millimeters", "The relative play inside steering gear rack-and-pinion"],
            optionsMarathi: [alItem.purposeM, "रिम फ्लॅंजची एकूण रुंदी इंचमध्ये", "टायरच्या थ्रेडच्या खोबणीची खोली मिलिमीटरमध्ये", "स्टिअरिंग गिअर रॅक-आणि-पिनियनमधील एकूण प्ले"],
            answer: "A",
            explanation: "Correct wheel alignment is essential for tire tread life and vehicle handling.",
            explanationMarathi: "चाकांचे योग्य अलाईनमेंट केल्यास गाडी चालवणे सुलभ होते आणि टायरचे आयुष्य वाढते."
          };
          break;
        }
        case 9: { // Braking System
          const cylinders = [
            { name: "Tandem Master Cylinder", nameM: "टँडम मास्टर सिलेंडर", safety: "provides dual independent braking circuits for safety in case of fluid leaks", safetyM: "द्रव गळती झाल्यास सुरक्षेसाठी दोन स्वतंत्र ब्रेकिंग सर्किट्स पुरवणे" }
          ];
          const cyItem = cylinders[idx % cylinders.length];
          q = {
            chapterId: 9,
            question: "What critical safety feature does a " + cyItem.name + " bring to modern hydraulic brake networks?",
            questionMarathi: "आधुनिक हायड्रॉलिक ब्रेक यंत्रणेमध्ये " + cyItem.nameM + " मुळे कोणती महत्त्वाची सुरक्षा मिळते?",
            options: [cyItem.safety, "It increases maximum engine fuel economy automatically", "It replaces the mechanical emergency brake cable entirely", "It adjusts tire aspect ratio based on road surface texture"],
            optionsMarathi: [cyItem.safetyM, "ते इंजिनची इंधन कार्यक्षमता वाढवते", "ते इमर्जन्सी ब्रेक केबलची गरज पूर्णपणे संपवते", "ते रस्त्याप्रमाणे टायरची उंची बदलून चालवते"],
            answer: "A",
            explanation: "A tandem master cylinder isolates front and rear brake circuits to guarantee braking control in failures.",
            explanationMarathi: "टँडम मास्टर सिलेंडरमध्ये दोन पिस्टन सिरीजमध्ये जोडलेले असतात, ज्यामुळे एका पाईपमधील गळतीने सर्व ब्रेक निकामी होत नाहीत."
          };
          break;
        }
        case 10: { // Electrical System
          const fuses = [10, 15, 20, 30];
          const rating = fuses[idx % fuses.length];
          q = {
            chapterId: 10,
            question: "A fuse rated at " + rating + "A in an automobile's electrical harness is designed specifically to:",
            questionMarathi: "ऑटोमोबाईल इलेक्ट्रिकल वायरिंगमधील " + rating + "A क्षमतेचा फ्युज (Fuse) प्रामुख्याने काय कार्य करतो?",
            options: [
              "Protect the circuit components by melting if the current exceeds " + rating + " Amperes",
              "Charge the secondary storage battery unit using electromagnetic induction",
              "Measure the specific gravity of the liquid electrolyte inside cells",
              "Regulate alternator charging output voltage limits precisely"
            ],
            optionsMarathi: [
              "प्रवाहाची तीव्रता " + rating + " अँपिअरपेक्षा जास्त झाल्यास वितळून सर्किटचे नुकसान टाळणे",
              "इलेक्ट्रोमॅग्नेटिक इंडक्शनद्वारे दुय्यम स्टोरेज बॅटरी चार्ज करणे",
              "इलेक्ट्रोलाईट द्रवाचे विशिष्ट गुरुत्व मोजणे",
              "अल्टरनेटरच्या व्होल्टेज मर्यादेचे अचूक नियंत्रण करणे"
            ],
            answer: "A",
            explanation: "Fuses act as weak sacrificial elements to protect expensive wiring harnesses from fire or damage.",
            explanationMarathi: "Fuses ची वायर कमी वितळण बिंदूची असते, जी अतिप्रवाहाच्या वेळी वितळून संपूर्ण यंत्रणेचे संरक्षण करते."
          };
          break;
        }
        case 11: { // Automobile equipments & tests
          const tests = [
            { test: "Chassis Dynamometer", testM: "चेसिस डायनॅमोमीटर", output: "the actual tractive effort and wheel brake power of a complete vehicle", outputM: "संपूर्ण वाहनाचे चाकांवर मिळणारे प्रत्यक्ष ट्रॅक्टिव्ह बल आणि ब्रेक पॉवर मोजणे" }
          ];
          const tItem = tests[idx % tests.length];
          q = {
            chapterId: 11,
            question: "What measurement output is obtained by conducting a test on a " + tItem.test + "?",
            questionMarathi: tItem.testM + " चाचणीद्वारे मुख्यत्वे काय मोजले जाते?",
            options: [tItem.output, "The accurate specific gravity of diesel engine fuel", "The maximum compression ratio of cylinder block", "The absolute viscosity rating of lubricating oil"],
            optionsMarathi: [tItem.outputM, "डिझेल इंधनाचे अचूक विशिष्ट गुरुत्व", "सिलेंडर ब्लॉकचा जास्तीत जास्त कॉम्प्रेशन रेशो", "लुब्रिकेटिंग ऑईलचे व्हिस्कोसिटी रेटिंग"],
            answer: "A",
            explanation: "A chassis dynamometer measures power delivered to the drive wheels under simulated road loads.",
            explanationMarathi: "डायनॅमोमीटर चाकांवर मिळणारी प्रत्यक्ष शक्ती आणि इंजिनचे कार्य मोजण्यासाठी वापरतात."
          };
          break;
        }
        case 12: { // Automotive Body
          const bodies = [
            { style: "Sedan", styleM: "सेडान", feature: "a distinct three-box layout with separate compartments for engine, passengers, and cargo", featureM: "इंजिन, प्रवासी आणि सामान यांसाठी स्वतंत्र कम्पार्टमेंट असलेली थ्री-बॉक्स रचना" },
            { style: "Hatchback", styleM: "हॅचबॅक", feature: "a two-box layout with a rear door that swings upward to access cargo", featureM: "मागील दरवाजा वर उघडणारा आणि कमी लांबीची टू-बॉक्स रचना" }
          ];
          const bItem = bodies[idx % bodies.length];
          q = {
            chapterId: 12,
            question: "A vehicle body styled as a '" + bItem.style + "' is physically characterized by:",
            questionMarathi: "'" + bItem.styleM + "' प्रकारच्या वाहनाची बॉडी रचना प्रामुख्याने कशी ओळखली जाते?",
            options: [bItem.feature, "Having no safety seat belts installed in front seats", "Relying purely on heavy wooden chassis structures", "An open loading tray at the rear with no roof covering"],
            optionsMarathi: [bItem.featureM, "पुढील सीटवर एकही seat belt नसणे", "पूर्णपणे लाकडी चेसिसवर आधारित असणे", "छप्पर नसलेली मागील बाजू केवळ मालाच्या वाहतुकीसाठी असणे"],
            answer: "A",
            explanation: "Automotive body configurations dictate vehicle categorization and aerodynamic profiles.",
            explanationMarathi: "वाहन बॉडीच्या प्रकारानुसार त्याचे वर्गीकरण आणि डिझाइन ठरवले जाते."
          };
          break;
        }
        case 13: { // Automotive material
          const materials = [
            { item: "Cast Iron", itemM: "कास्ट आयर्न (लोखंड)", part: "Engine Cylinder Block", partM: "इंजिनचा मुख्य सिलेंडर ब्लॉक" },
            { item: "Aluminium Alloy", itemM: "अ‍ॅल्युमिनियम मिश्रधातू", part: "Engine Piston", partM: "इंजिनचा पिस्टन" }
          ];
          const mItem = materials[idx % materials.length];
          q = {
            chapterId: 13,
            question: "Why is " + mItem.item + " commonly chosen for manufacturing a " + mItem.part + "?",
            questionMarathi: "ऑटोमोबाईलमध्ये " + mItem.partM + " बनवण्यासाठी " + mItem.itemM + " चा प्रामुख्याने वापर का केला जातो?",
            options: [
              "It possesses excellent material properties suitable for " + mItem.part,
              "It has the highest electrical insulation capacity of all metals",
              "It completely eliminates fuel evaporation inside the fuel tank",
              "It permits magnetic braking forces to operate without heating"
            ],
            optionsMarathi: [
              "कारण त्यामध्ये " + mItem.partM + " साठी आवश्यक असणारे सर्वोत्तम भौतिक गुणधर्म असतात",
              "त्यामध्ये सर्व धातूंपेक्षा जास्त इलेक्ट्रिकल इन्सुलेशन क्षमता असते",
              "ते इंधन टाकीतील पेट्रोलचे बाष्पीभवन पूर्णपणे थांबवते",
              "ते चुंबकीय ब्रेकिंग बल उष्णतेशिवाय चालवण्यास मदत करते"
            ],
            answer: "A",
            explanation: "Component material choices depend on operating temperatures, pressures, and stress factors.",
            explanationMarathi: "घटकांच्या वजनाचा आणि सहन करायच्या दाबाचा विचार करून ऑटोमोबाईलमध्ये धातूंची निवड केली जाते."
          };
          break;
        }
        case 14: { // Safety consideration
          const safeties = [
            { type: "Crumple Zones", typeM: "क्रंपल झोन", feature: "absorb the impact energy during a front collision by deforming structurally", featureM: "अपघाताच्या वेळी स्वतः चेपून आघाताची तीव्रता प्रवाशांपर्यंत पोहोचण्यापूर्वी शोषून घेणे" },
            { type: "Airbags", typeM: "एअरबॅग्ज", feature: "provide soft cushion barriers to prevent passenger head contact with hard structures", featureM: "प्रवाशांचे डोके आणि कडक रचना यांच्यात फुगलेला मऊ थर प्रदान करून आघात रोखणे" }
          ];
          const sfItem = safeties[idx % safeties.length];
          q = {
            chapterId: 14,
            question: "In automotive passenger safety systems, how do " + sfItem.type + " function to reduce injury risks?",
            questionMarathi: "प्रवासी सुरक्षेचा विचार करता, वाहनातील " + sfItem.typeM + " प्रामुख्याने कशा प्रकारे कार्य करतात?",
            options: [sfItem.feature, "They automatically reduce fuel injector flow rate during high speeds", "They provide instant cooling to radiator water during braking", "They lock the vehicle's transmission from reversing on hills"],
            optionsMarathi: ["ते " + sfItem.featureM, "ते वेगात असताना इंधन प्रवाहाचे प्रमाण आपोआप कमी करतात", "ते ब्रेकिंग दरम्यान रेडिएटरमधील कुलंटला थंड करतात", "ते टेकडीवर गाडी मागे जाण्यास रोखतात"],
            answer: "A",
            explanation: "Passive safety elements activate during collisions to minimize force transferred to vehicle occupants.",
            explanationMarathi: "अपघातातील शक्तीचा मानवी शरीरावर होणारा परिणाम कमी करणे हा या उपकरणांचा मुख्य उद्देश असतो."
          };
          break;
        }
        case 15: { // Vehicle chassis specifications
          const specs = [
            { name: "Ground Clearance", nameM: "ग्राउंड क्लीअरन्स", desc: "the vertical distance between the lowest point of the vehicle chassis and the road", descM: "रस्ता आणि वाहनाचा सर्वात खालचा भाग यांच्यातील उभे अंतर" },
            { name: "Wheel Track", nameM: "व्हील ट्रॅक (ट्रॅक विड्थ)", desc: "the center-to-center distance between two wheels on the same axle", descM: "एकाच अ‍ॅक्सलवरील डाव्या आणि उजव्या चाकांच्या मध्यभागांमधील अंतर" }
          ];
          const spItem = specs[idx % specs.length];
          q = {
            chapterId: 15,
            question: "The automotive dimension designated as '" + spItem.name + "' is defined as:",
            questionMarathi: "ऑटोमोबाईल तांत्रिक निर्देशामध्ये '" + spItem.nameM + "' म्हणजे:",
            options: [spItem.desc, "The length of the passenger seating area inside cabin", "The total displacement volume of the engine block in cubic units", "The thickness of the friction material lining on brake shoe"],
            optionsMarathi: [spItem.descM, "प्रवासी बसण्याच्या जागेची एकूण लांबी", "इंजिनमधील एकूण ज्वलन क्षेत्राचे घनफळ", "ब्रेक शूवरील घर्षण पट्टीची जाडी"],
            answer: "A",
            explanation: "Chassis specifications outline the physical clearance, stability, and handling geometry of the vehicle.",
            explanationMarathi: "चेसिसचे भौतिक आकारमान वाहनाची स्थिरता आणि चालवण्याची सुलभता निश्चित करते."
          };
          break;
        }
        case 16: { // Cooling system
          const cooling = [
            { param: "wax pellet thermostat", paramM: "थर्मोस्टॅट व्हॉल्व्ह", func: "controls coolant flow to radiator based on temperature", funcM: "तापमानानुसार इंजिन ऑईल किंवा कुलंटचा रेडिएटरकडे जाणारा प्रवाह नियंत्रित करणे" }
          ];
          const coItem = cooling[idx % cooling.length];
          q = {
            chapterId: 16,
            question: "In a pressurized water-cooling system, the " + coItem.param + " serves to:",
            questionMarathi: "इंजिनच्या कुलिंग सिस्टीममधील " + coItem.paramM + " चा मुख्य उद्देश काय असतो?",
            options: ["Regulate the flow of coolant to radiator based on engine warmth", "Increase the absolute speed of water pump rotor on steep hills", "Monitor the amount of sulfur content inside fuel supply line", "Prevent starting motor from overloading during cold starts"],
            optionsMarathi: ["तापमानानुसार कुलंटचा रेडिएटरकडे जाणारा प्रवाह नियंत्रित करणे", "टेकडीवर पाण्याच्या पंपाची फिरण्याची गती वाढवणे", "इंधन पुरवठा लाईन मधील गंधकाचे प्रमाण मोजणे", "थंड हवामानात स्टार्टर मोटर ओव्हरलोड होण्यापासून वाचवणे"],
            answer: "A",
            explanation: "Thermostats bypass the radiator when the engine is cold to speed up warming to correct working temperatures.",
            explanationMarathi: "इंजिन थंड असताना थर्मोस्टॅट व्हॉल्व्ह बंद राहतो, ज्यामुळे कुलंट रेडिएटरकडे न जाता थेट इंजिनमध्येच फिरतो."
          };
          break;
        }
        case 17: { // Engine service
          const service = [
            { task: "Cylinder Honing", taskM: "होनिंग (Honing)", reason: "produce a cross-hatch surface pattern to retain oil on the cylinder walls", reasonM: "सिलेंडरच्या भिंतीवर ऑईल टिकवून ठेवण्यासाठी सूक्ष्म क्रॉस-हॅच पॅटर्न तयार करणे" },
            { task: "Valve Grinding", taskM: "व्हॉल्व्ह ग्राइंडिंग", reason: "restore correct seating contact surfaces to prevent compression leaks", reasonM: "व्हॉल्व्हची गळती रोखण्यासाठी आणि कॉम्प्रेशन टिकवण्यासाठी संपर्क पृष्ठभाग पुन्हा घासून गुळगुळीत करणे" }
          ];
          const svItem = service[idx % service.length];
          q = {
            chapterId: 17,
            question: "During engine overhaul, what is the primary objective of performing " + svItem.task + "?",
            questionMarathi: "इंजिन दुरुस्तीच्या वेळी, " + svItem.taskM + " ही प्रक्रिया प्रामुषणे का केली जाते?",
            options: ["To " + svItem.reason, "To increase steering gearbox maximum ratio", "To reduce wear on the differential planet gears", "To balance wheel rim mass distribution"],
            optionsMarathi: [svItem.reasonM, "स्टिअरिंग गिअरबॉक्सचा रेशो वाढवण्यासाठी", "डिफरेंशियलमधील प्लॅनेट गिअरची झीज रोखण्यासाठी", "चाकाच्या रिमचे वजन संतुलित करण्यासाठी"],
            answer: "A",
            explanation: "Overhauling restores correct mechanical sealing, tolerancing, and surface characteristics for optimum power.",
            explanationMarathi: "इंजिनचे मूळ कार्यक्षमतेचे स्तर पुन्हा प्राप्त करण्यासाठी विविध भागांची लेथ किंवा ग्राइंडिंग मशीनवर दुरुस्ती केली जाते."
          };
          break;
        }
        case 18: { // Lubricants & lubrication
          const lubes = [
            { pump: "Gear pump", pumpM: "गिअर टाईप ऑईल पंप", feature: "uses two meshing gears to build constant positive oil pressure", featureM: "दोन एकमेकांत गुंतलेले गिअर वापरून ऑईलचा सतत आणि सकारात्मक दाब तयार करणे" }
          ];
          const lbItem = lubes[idx % lubes.length];
          q = {
            chapterId: 18,
            question: "In full pressure engine lubrication systems, a " + lbItem.pump + " operates by:",
            questionMarathi: "फुल प्रेशर लुब्रिकेशन सिस्टीममध्ये, " + lbItem.pumpM + " प्रामुख्याने कशा प्रकारे कार्य करतो?",
            options: [
              "Using meshing gears to build constant positive oil pressure",
              "Relying purely on heavy exhaust gas backpressure driving forces",
              "Utilizing magnetic fields to propel lubrication molecules",
              "Sucking oil directly from fuel injectors using high vacuum lines"
            ],
            optionsMarathi: [
              "दोन एकमेकांत फिरणारे गिअर वापरून दाब निर्माण करतो",
              "पूर्णपणे एक्झॉस्ट वायूंच्या दाबावर फिरतो",
              "ऑईलचे कण पुढे ढकलण्यासाठी चुंबकीय लहरींचा वापर करतो",
              "हाय-व्हॅक्यूम लाईनच्या मदतीने ऑईल थेट ओढून घेतो"
            ],
            answer: "A",
            explanation: "Oil pumps drive lubricating oil through narrow galleries to keep critical rotating components separated by fluid film.",
            explanationMarathi: "ऑईल पंप इंजिन ऑईलचा दाब वाढवून ते इंजिनच्या सर्व फिरणाऱ्या आणि घासणाऱ्या भागांपर्यंत पोहोचवतो."
          };
          break;
        }
        case 19: { // Fuels
          const fuels = [
            { param: "Octane rating", paramM: "ऑक्टेन रेटिंग", target: "Petrol (SI) engine fuel anti-knock capability", targetM: "पेट्रोल इंधनाची नॉकिंग (ठोकणे) रोखण्याची क्षमता" },
            { param: "Cetane rating", paramM: "सिटेन रेटिंग", target: "Diesel (CI) engine fuel ignition delay performance", targetM: "डिझेल इंधनाचा पेट घेण्याचा वेग (Ignition Delay)" }
          ];
          const fItem = fuels[idx % fuels.length];
          q = {
            chapterId: 19,
            question: "In automotive fuel quality parameters, what does the '" + fItem.param + "' evaluate?",
            questionMarathi: "इंधनाच्या गुणवत्तेचा विचार करता, '" + fItem.paramM + "' द्वारे प्रामुख्याने काय मोजले जाते?",
            options: [fItem.target, "The temperature inside the catalytic converter exhaust", "The moisture absorption percentage of radiator cooling fluid", "The magnetic flow resistance through clean oil filter"],
            optionsMarathi: [fItem.targetM, "कॅटॅलिटिक कन्व्हर्टरमधील गॅसचे तापमान", "रेडिएटर कुलंटमध्ये असलेले पाण्याचे प्रमाण", "फिल्टरमधून ऑईल वाहून जाण्याचा एकूण वेग"],
            answer: "A",
            explanation: "Fuel ignition qualities indicate how uniformly the combustion charge burns under pressure inside the cylinders.",
            explanationMarathi: "इंधनाच्या ज्वलनशीलतेचा थेट संबंध इंजिनच्या कामगिरीशी आणि आवाजाशी (knocking) असतो."
          };
          break;
        }
        case 20: { // Combustion and combustion chamber
          const chambers = [
            { type: "Knocking in petrol engines", typeM: "पेट्रोल इंजिनमधील नॉकिंग (Detonation)", cause: "auto-ignition of the unburnt end-charge due to heat and pressure", causeM: "उष्णता आणि दाबामुळे उर्वरित इंधन न जळता अचानक एकाच वेळी पेट घेणे" },
            { type: "Diesel knock", typeM: "डिझेल इंजिनमधील नॉकिंग (Diesel Knock)", cause: "excessive accumulation of fuel due to a long ignition delay period", causeM: "इग्निशन डिले जास्त असल्यामुळे सिलेंडरमध्ये इंधन साचून अचानक मोठा आवाज होणे" }
          ];
          const cbItem = chambers[idx % chambers.length];
          q = {
            chapterId: 20,
            question: "What is the physical root cause behind the occurrence of " + cbItem.type + "?",
            questionMarathi: cbItem.typeM + " होण्यामागील मुख्य भौतिक कारण कोणते असते?",
            options: ["It is caused by " + cbItem.cause, "It is caused by low water level in engine cooling radiator", "It is due to tire air pressure exceeding limits", "It is caused by starter motor solenoid failure"],
            optionsMarathi: ["ते " + cbItem.causeM + " मुळे होते", "ते साहाय्यक कुलंटची पातळी कमी असल्यामुळे होते", "ते टायरमध्ये मर्यादेपेक्षा जास्त हवा भरल्यामुळे होते", "ते स्टार्टर मोटरच्या खराब रिलेमुळे होते"],
            answer: "A",
            explanation: "Uniform flame propagation prevents rapid spikes in cylinder pressure which produce metallic knocking sounds.",
            explanationMarathi: "सिलेंडरमधील ज्वलन वेळेत आणि शांतपणे न झाल्यास मोठा दाब निर्माण होतो, ज्यामुळे इंजिनमध्ये धातू आदळण्याचा आवाज येतो."
          };
          break;
        }
        case 21: { // Diesel engine fuel supply system
          const components = [
            { comp: "Fuel Injector", compM: "इंधन इंजेक्टर (Fuel Injector)", func: "atomizes the fuel into fine spray inside cylinder block", funcM: "इंधनाचे अत्यंत सूक्ष्म थेंबांमध्ये (atomization) रूपांतर करून ज्वलन कक्षात फवारणे" }
          ];
          const dpItem = components[idx % components.length];
          q = {
            chapterId: 21,
            question: "What is the function of the " + dpItem.comp + " in a high-pressure diesel fuel circuit?",
            questionMarathi: "डिझेल इंजिन इंधन पुरवठा प्रणालीमध्ये " + dpItem.compM + " चे मुख्य कार्य कोणते असते?",
            options: ["It " + dpItem.func, "It filters water particles from diesel before fuel pump", "It regulates cooling water velocity across bypass line", "It controls battery charging amperage limits dynamically"],
            optionsMarathi: ["ते " + dpItem.funcM, "ते डिझेल पंपापूर्वी इंधनातील पाण्याचे कण वेगळे करते", "ते कुलंट पाण्याच्या प्रवाहाचा वेग नियंत्रित करते", "ते बॅटरी चार्जिंगचा विद्युत प्रवाह बदलण्याचे काम करते"],
            answer: "A",
            explanation: "Injectors atomize fuel under extreme pressure (often >150 bar) to ensure complete combustion.",
            explanationMarathi: "फ्यूल इंजेक्टर डिझेलची बारीक फुकट फवारणी करतो, जेणेकरून हवेसोबत मिळून त्याचे संपूर्ण ज्वलन व्हावे."
          };
          break;
        }
        case 22: { // Petrol engine fuel supply system
          const petrols = [
            { comp: "Carburetors", compM: "कार्बोरेटर", function: "atomizing and mixing petrol with air in correct stoichiometric ratios", functionM: "योग्य प्रमाणात हवेचा आणि पेट्रोलचा प्रवाह एकत्र करून मिश्रण तयार करणे" }
          ];
          const ptItem = petrols[idx % petrols.length];
          q = {
            chapterId: 22,
            question: "In conventional petrol engines, " + ptItem.comp + " are primarily used for:",
            questionMarathi: "पारंपारिक पेट्रोल इंजिनमध्ये " + ptItem.compM + " का वापर केला जातो?",
            options: ["The process of " + ptItem.function, "Controlling the starter motor gear engagement timing", "Dampening suspension coil spring vertical vibrations", "Increasing specific gravity of standard battery lead-acid"],
            optionsMarathi: [ptItem.functionM, "स्टार्टर मोटर गिअर जोडण्याची वेळ ठरवणे", "सस्पेंशन स्प्रिंगमधील कंपने शांत करणे", "बॅटरी अ‍ॅसिडचे विशिष्ट गुरुत्व मोजणे"],
            answer: "A",
            explanation: "Carburetors meter air-fuel mixture proportions depending on engine load and speed demands.",
            explanationMarathi: "कार्बोरेटर इंजिनच्या गतीनुसार हवेचे आणि पेट्रोलचे प्रमाण (Air-Fuel Ratio) अचूकपणे नियंत्रित करतो."
          };
          break;
        }
        case 23: { // Engine performance
          const metrics = [
            { name: "Indicated Power (IP)", nameM: "इंडिकेटर पॉवर (IP)", def: "the theoretical power developed inside engine cylinders by fuel combustion", defM: "इंधनाच्या ज्वलनामुळे सिलेंडरमध्ये निर्माण होणारी एकूण अंतर्गत यांत्रिक शक्ती" },
            { name: "Brake Power (BP)", nameM: "ब्रेक पॉवर (BP)", def: "the actual useful power available at the engine crankshaft output shaft", defM: "घर्षण वजा करून इंजिनच्या क्रँकशाफ्टवर (बाहेर) मिळणारी प्रत्यक्ष उपयुक्त शक्ती" }
          ];
          const mItem = metrics[idx % metrics.length];
          q = {
            chapterId: 23,
            question: "In engine testing and performance evaluation, '" + mItem.name + "' refers to:",
            questionMarathi: "इंजिन कामगिरी चाचणीच्या संदर्भात, '" + mItem.nameM + "' म्हणजे:",
            options: [mItem.def, "The speed of the engine measured in steering lock directions", "The electrical storage capacity of lead-acid starter pack", "The amount of carbon particles filtered from exhaust stream"],
            optionsMarathi: [mItem.defM, "स्टिअरिंग फिरवण्याचा कमाल कोनीय वेग", "बॅटरीमध्ये साठवून ठेवलेली एकूण वीज क्षमता", "एक्झॉस्ट गॅसमधून फिल्टर केलेल्या कार्बनचे प्रमाण"],
            answer: "A",
            explanation: "Engine performance metrics quantify mechanical output limits and thermal efficiency factors.",
            explanationMarathi: "इंजिनच्या क्रँकशाफ्टवर मिळणारी शक्ती ही अंतर्गत शक्तीपेक्षा कमी असते कारण काही शक्ती स्वतः इंजिनचे भाग फिरवण्याच्या घर्षणात संपते."
          };
          break;
        }
        case 24: { // Electronic ignition system
          const electronic = [
            { comp: "Distributorless Ignition System (DIS)", compM: "डिस्ट्रिब्युटरलेस इग्निशन सिस्टीम (DIS)", feature: "uses electronic sensors and ECU to directly trigger coil packs per cylinder", featureM: "यांत्रिक डिस्ट्रिब्युटरशिवाय इलेक्ट्रॉनिक सेन्सर्स आणि ईसीयूच्या मदतीने थेट स्पार्क प्लगला वीज देणे" }
          ];
          const elItem = electronic[idx % electronic.length];
          q = {
            chapterId: 24,
            question: "A modern automotive " + elItem.comp + " operates by:",
            questionMarathi: "आधुनिक वाहनातील " + elItem.compM + " प्रामुख्याने कशा प्रकारे कार्य करते?",
            options: [
              "Using electronic sensors and ECU to directly trigger coil packs",
              "Using mechanical contact breaker points with a heavy condenser capacitor",
              "Relying on direct compression ignition of standard petrol fuel cells",
              "Connecting battery cells dynamically in series to increase current limits"
            ],
            optionsMarathi: [
              "इलेक्ट्रॉनिक सेन्सर्स आणि ईसीयू वापरून स्पार्क अचूक नियंत्रित करते",
              "यांत्रिक ब्रेकर पॉईंट आणि कंडेन्सरचा वापर करून चालते",
              "पेट्रोलच्या थेट कॉम्प्रेषण इग्निशनवर अवलंबून असते",
              "बॅटरी सेल्स सिरीजमध्ये जोडून प्रवाह वाढवण्याचे काम करते"
            ],
            answer: "A",
            explanation: "Electronic ignition eliminates moving wear parts like contact breaker points, ensuring precise timings.",
            explanationMarathi: "इलेक्ट्रॉनिक सिस्टीममध्ये यांत्रिक भाग झिजण्याची भीती नसते, ज्यामुळे अत्यंत अचूक वेळेत स्पार्क प्लग ठिणगी देतो."
          };
          break;
        }
        case 25: { // Conventional ignition system
          const conventional = [
            { comp: "Contact Breaker Points", compM: "कॉन्टॅक्ट ब्रेकर पॉईंट्स (CB Points)", func: "make and break primary circuit current to induce high voltage in secondary coil", funcM: "प्रायमरी सर्किट मधील प्रवाह चालू-बंद करून सेकंडरी कॉईलमध्ये उच्च व्होल्टेज निर्माण करणे" }
          ];
          const cvItem = conventional[idx % conventional.length];
          q = {
            chapterId: 25,
            question: "What is the mechanical purpose of the " + cvItem.comp + " in battery ignition systems?",
            questionMarathi: "बॅटरी इग्निशन सिस्टीममधील " + cvItem.compM + " चे मुख्य कार्य कोणते असते?",
            options: ["To " + cvItem.func, "To adjust wheel alignment caster angles automatically on sharp turns", "To filter sulfur impurities from petrol before standard carburetor float chamber", "To balance mechanical vibrations produced by engine flywheel rotating weight"],
            optionsMarathi: ["ते " + cvItem.funcM, "चाकांचे कॅस्टर अलाईनमेंट आपोआप दुरुस्त करणे", "कार्बोरेटरपूर्वी पेट्रोलमधील गंधकाची अशुद्धता काढणे", "फ्लायव्हील फिरताना होणारी यांत्रिक कंपने संतुलित करणे"],
            answer: "A",
            explanation: "The breaker points interrupt primary current, inducing high voltage (>20,000V) in the secondary coil.",
            explanationMarathi: "सीबी पॉईंट इग्निशन कॉईलमधील प्रायमरी करंट तोडण्याचे काम करतो, ज्यामुळे सेकंडरी कॉईलमध्ये तीव्र दाबाची वीज तयार होते."
          };
          break;
        }
        case 26: { // Charging system
          const charging = [
            { comp: "Alternator Rectifier (Diodes)", compM: "अल्टरनेटर रेक्टिफायर (डायोड्स)", func: "converts generated AC current to DC current to charge battery and run electronics", funcM: "अल्टरनेटरने तयार केलेली एसी वीज डीसी विजेमध्ये रूपांतरित करून बॅटरी चार्ज करणे" }
          ];
          const chItem = charging[idx % charging.length];
          q = {
            chapterId: 26,
            question: "In automotive charging networks, what is the role played by the " + chItem.comp + "?",
            questionMarathi: "वाहनाच्या चार्जिंग सिस्टीममधील " + chItem.compM + " चे मुख्य कार्य काय असते?",
            options: ["It " + chItem.func, "It decreases engine temperature dynamically using current control", "It senses exhaust pollution percentage to shut down fuel line", "It locks transmission shifting shafts during starting attempts"],
            optionsMarathi: ["ते " + chItem.funcM, "ते इंजिनचे तापमान विजेच्या मदतीने कमी करते", "ते सायलेन्सरमधील धूर तपासून इंधन पुरवठा बंद करते", "ते इंजिन सुरू करताना गिअर लॉक ठेवण्याचे काम करते"],
            answer: "A",
            explanation: "Alternators generate AC current, but vehicle electrical loads require DC current.",
            explanationMarathi: "गाडीचा अल्टरनेटर एसी विद्युत प्रवाह बनवतो, परंतु बॅटरीसाठी डीसी प्रवाहाची गरज असते, जी डायोड पूर्ण करतात."
          };
          break;
        }
        case 27: { // Starting system
          const starting = [
            { comp: "Starter Solenoid Switch", compM: "सोलेनोइड स्विच", func: "engages starter pinion with flywheel and connects high current battery terminal to motor", funcM: "पिनियन गिअरला फ्लायव्हीलशी जोडणे आणि स्टार्टर मोटरला थेट बॅटरीची वीज पुरवणे" }
          ];
          const stItem = starting[idx % starting.length];
          q = {
            chapterId: 27,
            question: "What critical task is accomplished by the " + stItem.comp + " during vehicle starting operations?",
            questionMarathi: "गाडी सुरू करताना (Self-Start) " + stItem.compM + " खालीलपैकी कोणते महत्त्वाचे कार्य करतो?",
            options: ["It " + stItem.func, "It increases the specific gravity of acid dynamically inside cell", "It balances tire wheel tracking alignments across front steering links", "It injects diesel directly into combustion chambers of cylinder block"],
            optionsMarathi: ["ते " + stItem.funcM, "ते बॅटरीमधील अ‍ॅसिडचे विशिष्ट गुरुत्व तात्पुरते वाढवते", "ते चाकांचा ट्रॅक आणि अलाईनमेंट संतुलित राखते", "ते सिलेंडर ब्लॉकमध्ये डिझेल थेट फवारण्याचे काम करते"],
            answer: "A",
            explanation: "The solenoid switch acts as a heavy-duty relay that shifts the drive pinion and closes the starting motor circuit.",
            explanationMarathi: "सोलेनोइड स्विच एका शक्तिशाली इलेक्ट्रोमॅग्नेटिक स्विचसारखा काम करतो, जो पिनियन गिअर पुढे ढकलून क्रँकिंग शक्य करतो."
          };
          break;
        }
        case 28: { // Emission control
          const emissions = [
            { comp: "Catalytic Converter", compM: "कॅटॅलिटिक कन्व्हर्टर (सायलेन्सर मधील)", func: "converts harmful CO, HC, and NOx emissions into harmless CO2, H2O, and N2 gases", funcM: "घातक कार्बन मोनॉक्साइड आणि नायट्रोजन ऑक्साइडला बिनविषारी वायूंमध्ये बदलणे" }
          ];
          const emItem = emissions[idx % emissions.length];
          q = {
            chapterId: 28,
            question: "What is the chemical function performed by the " + emItem.comp + " inside the exhaust pipeline?",
            questionMarathi: "सायलेन्सर पाईपच्या आतील " + emItem.compM + " चा मुख्य रासायनिक उद्देश काय असतो?",
            options: ["It " + emItem.func, "It increases engine compression chamber volume under load", "It acts as a fuel water separator unit in diesel cars", "It measures viscosity index of engine oil dynamically during travel"],
            optionsMarathi: ["ते " + emItem.funcM, "ते लोड असताना इंजिनमधील कंबशन चेंबरचे आकारमान वाढवते", "ते डिझेल कारमधील पाण्याचे कण फिल्टर करते", "ते गाडी चालताना ऑईलचे विशिष्ट गुरुत्व मोजण्याचे काम करते"],
            answer: "A",
            explanation: "Catalytic converters use noble metals (platinum, palladium, rhodium) to oxidize and reduce toxic exhaust gases.",
            explanationMarathi: "कॅटॅलिटिक कन्व्हर्टर मौल्यवान धातूंच्या (उदा. प्लॅटिनम) मदतीने रासायनिक प्रक्रिया घडवून सायलेन्सरमधून येणारा विषारी धूर स्वच्छ करतो."
          };
          break;
        }
        case 29: { // Automotive engine specification
          const engines = [
            { term: "Compression Ratio (CR)", termM: "कॉम्प्रेशन रेशो (CR)", ratio: "Total Volume (Vs + Vc) to Clearance Volume (Vc)", ratioM: "एकूण सिलेंडरचे आकारमान (Vs + Vc) आणि क्लिअरन्स आकारमान (Vc) यांचे गुणोत्तर" }
          ];
          const egItem = engines[idx % engines.length];
          q = {
            chapterId: 29,
            question: "The engine technical specification designated as '" + egItem.term + "' is mathematically defined as:",
            questionMarathi: "इंजिनच्या तांत्रिक तपशीलामध्ये '" + egItem.termM + "' चे सूत्र खालीलपैकी कोणते असते?",
            options: ["Ratio of " + egItem.ratio, "Bore diameter multiplied by total number of active cylinders", "Viscosity index of SAE engine oil divided by crankcase weight", "The maximum distance travel limits of vehicle suspension before bump limiters"],
            optionsMarathi: [egItem.ratioM, "सिलेंडरचा एकूण व्यास गुणिले सिलेंडर्सची संख्या", "ऑईलचे व्हिस्कोसिटी रेटिंग भागिले इंजिनचे एकूण वजन", "सस्पेंशन स्प्रिंग दाबण्याची कमाल मर्यादा"],
            answer: "A",
            explanation: "Compression ratio is the ratio of maximum cylinder volume (piston at BDC) to clearance volume (piston at TDC).",
            explanationMarathi: "कॉम्प्रेशन रेशो जितका जास्त असेल, तितके इंजिन अधिक शक्ती आणि कार्यक्षमता देते. पेट्रोल इंजिनमध्ये हा रेशो सुमारे ८ ते १२ आणि डिझेल इंजिनमध्ये १५ ते २२ असतो."
          };
          break;
        }
        case 30: { // Storage batteries
          const batteries = [
            { test: "Hydrometer Test", testM: "हायड्रोमीटर चाचणी", value: "measures the electrolyte's specific gravity to check state of charge", valueM: "इलेक्ट्रोलाईटचे विशिष्ट गुरुत्व मोजून बॅटरीमधील चार्जची पातळी तपासणे" }
          ];
          const btItem = batteries[idx % batteries.length];
          q = {
            chapterId: 30,
            question: "In secondary lead-acid battery diagnosis, what does a standard " + btItem.test + " accomplish?",
            questionMarathi: "लेड-अ‍ॅसिड बॅटरी तपासणी दरम्यान, " + btItem.testM + " प्रामुख्याने काय कार्य करते?",
            options: ["It " + btItem.value, "It registers alternator charging voltage fluctuations precisely", "It measures engine oil viscosity index at low startup temp", "It verifies wheel tracking alignments of front tires during tests"],
            optionsMarathi: ["ते " + btItem.valueM, "ते अल्टरनेटरच्या व्होल्टेजमधील चढ-उतार मोजते", "ते कमी तापमानाला इंजिन ऑईलचा घट्टपणा तपासते", "ते पुढील चाकांचे ट्रॅक अलाईनमेंट मोजण्याचे काम करते"],
            answer: "A",
            explanation: "The chemical density of lead-acid electrolyte correlates directly with its state of charge.",
            explanationMarathi: "हायड्रोमीटरच्या मदतीने द्रवाचे विशिष्ट गुरुत्व मोजून बॅटरी चार्ज आहे की नाही हे सहज ओळखता येते."
          };
          break;
        }
        case 31: { // Motor Vehicle Act
          const rules = [
            { topic: "Section 4 of Motor Vehicle Act", topicM: "मोटार वाहन कायद्याचे कलम ४", rule: "stipulates the minimum legal age limit of 18 years to drive a motor vehicle in public places", ruleM: "सार्वजनिक ठिकाणी वाहन चालवण्यासाठी कायदेशीर वयोमर्यादा १८ वर्षे पूर्ण असणे आवश्यक आहे" },
            { topic: "Section 146 of Motor Vehicle Act", topicM: "मोटार वाहन कायद्याचे कलम १४६", rule: "makes third-party vehicle liability insurance mandatory for public road use", ruleM: "रस्त्यावर वाहन चालवण्यासाठी थर्ड-पार्टी विमा (Third-Party Insurance) असणे अनिवार्य आहे" }
          ];
          const rlItem = rules[idx % rules.length];
          q = {
            chapterId: 31,
            question: "According to standard regulatory guidelines under the " + rlItem.topic + ", which rule is specified?",
            questionMarathi: rlItem.topicM + " नुसार खालीलपैकी कोणता महत्त्वाचा नियम ठरवून दिला आहे?",
            options: [rlItem.rule, "All wheels must possess alloy rims of Magnesium only", "Vehicle bumpers must be crafted from high grade carbon composite", "The engine must undergo oil replacement after every starting attempt"],
            optionsMarathi: [rlItem.ruleM, "गाडीच्या सर्व चाकांना अलॉय रिम असणे बंधनकारक आहे", "गाडीचे बंपर फक्त महागड्या कार्बन फायबरने बनवले पाहिजेत", "गाडी सुरू केल्यावर प्रत्येक वेळी इंजिन ऑईल बदलणे आवश्यक आहे"],
            answer: "A",
            explanation: "The Motor Vehicle Act of India sets the unified statutory rules governing road safety, licensing, and insurance.",
            explanationMarathi: "आर.टी.ओ. चे नियम आणि रस्ता सुरक्षा कायदे हे मोटार वाहन कायद्यानुसार देशभरात लागू केले जातात."
          };
          break;
        }
        default: {
          q = {
            chapterId: chId,
            question: "What is a primary engineering design target of Chapter " + chId + " systems?",
            questionMarathi: "धडा " + chId + " मधील अभ्यासक्रमाचा मुख्य तांत्रिक उद्देश कोणता आहे?",
            options: ["Optimizing vehicle performance and safety", "Reducing tire tread width significantly", "Exceeding battery voltage ratings without safety regulators", "Eliminating leaf spring brackets completely"],
            optionsMarathi: ["वाहनाची कामगिरी आणि प्रवासी सुरक्षितता वाढवणे", "टायरच्या ट्रॅकची रुंदी अत्यंत कमी करणे", "व्होल्टेज कंट्रोलरशिवाय बॅटरी चार्ज करणे", "लीफ स्प्रिंगचे सर्व सपोर्ट काढून टाकणे"],
            answer: "A",
            explanation: "Each specific sub-assembly inside automotive engineering is balanced carefully between structural strength, safety margins, and cost limits.",
            explanationMarathi: "ऑटोमोबाईल मधील प्रत्येक सिस्टीम ही वाहनाची कार्यक्षमता, प्रवासी सुरक्षा आणि उत्पादन खर्च यांचा समतोल साधून बनवली जाते."
          };
        }
      }

      result.push({
        ...q,
        id: idx
      });
      added++;
    }
  }

  // Final re-indexing to ensure sequential IDs from 1 to 1240
  return result.map((q, idx) => ({
    ...q,
    id: idx + 1
  }));
}

export const QUESTIONS: Question[] = generateProceduralQuestions();
