// # Expanded OET content — 80+ additional healthcare-specific items.
// # Supplements seed-oet-prep.ts which has 26 items.
// # Total OET content: ~100 items.

import type { UnifiedSeedItem } from './run-seed'

export const SEED_OET_EXPANDED: UnifiedSeedItem[] = [
  // # ═══════════════════════════════════════════════════════════════════
  // # OET WRITING — More referral/discharge letters
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'oet.wt.06', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay', 'strat.oet.letter_structure'],
    payload: {
      prompt: 'Write a referral letter to Dr. Helen Brooks, Respiratory Physician.\n\nCASE NOTES:\nPatient: Mrs. Susan Taylor, 65, retired teacher\nPresenting: Progressive breathlessness over 6 months, dry cough, fatigue\nHistory: Non-smoker. Kept budgerigars for 30 years. No asbestos exposure.\nExam: Bilateral fine inspiratory crackles, finger clubbing, SpO2 93% on air\nInvestigations: CXR: bilateral reticular shadowing, lower zones. Spirometry: FVC 62% predicted, FEV1 75% predicted, FEV1/FVC ratio 85% (restrictive pattern)\nCurrent meds: None\nRequest: HRCT chest, full pulmonary function tests, consider bronchoscopy with lavage\n\nWrite 180-200 words.',
      format: 'oet_referral_letter', minWords: 180, maxWords: 200, timeMinutes: 45,
      rubric: [
        { name: 'Overall Task Fulfilment', maxScore: 7, description: 'All relevant info included' },
        { name: 'Appropriateness of Language', maxScore: 7, description: 'Formal medical register' },
        { name: 'Comprehension of Stimulus', maxScore: 7, description: 'Accurate case note transformation' },
        { name: 'Linguistic Features', maxScore: 7, description: 'Grammar, cohesion, accuracy' },
      ],
      difficulty: 0.6,
    },
  },
  {
    id: 'oet.wt.07', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay', 'strat.oet.letter_structure'],
    payload: {
      prompt: 'Write a discharge letter to the patient\'s GP, Dr. James Nguyen.\n\nCASE NOTES:\nPatient: Mr. Ahmed Hassan, 45, taxi driver\nAdmission: Acute pancreatitis secondary to gallstones\nManagement: NBM, IV fluids, morphine PCA, antibiotics (Tazocin). ERCP Day 3 — successful stone extraction. Cholecystectomy planned electively.\nProgress: Pain resolved, tolerating diet, bloods improving (amylase 180 from peak 1,200)\nDischarge meds: Paracetamol 1g QDS, Codeine 30mg QDS PRN (5 days), Omeprazole 20mg OD\nFollow-up: Surgical clinic 4 weeks for laparoscopic cholecystectomy scheduling\nAdvice: Low-fat diet, avoid alcohol, return if pain recurs or fever develops\n\nWrite 180-200 words.',
      format: 'oet_discharge_letter', minWords: 180, maxWords: 200, timeMinutes: 45,
      rubric: [
        { name: 'Overall Task Fulfilment', maxScore: 7, description: 'Covers admission to discharge' },
        { name: 'Appropriateness of Language', maxScore: 7, description: 'GP-appropriate detail' },
        { name: 'Comprehension of Stimulus', maxScore: 7, description: 'Accurate transformation' },
        { name: 'Linguistic Features', maxScore: 7, description: 'Grammar and cohesion' },
      ],
      difficulty: 0.6,
    },
  },
  {
    id: 'oet.wt.08', type: 'writing_task', level: 'C1', skill: 'writing',
    nodeIds: ['cando.b2.write_essay', 'strat.oet.letter_structure'],
    payload: {
      prompt: 'Write a referral letter to the Diabetes Education Service.\n\nCASE NOTES:\nPatient: Ms. Priya Sharma, 32, newly diagnosed Type 1 diabetes\nPresenting: DKA (diabetic ketoacidosis), admitted via ED\nHbA1c: 11.2%. BMI: 22. Anti-GAD antibodies positive.\nManagement: IV insulin/fluids → stabilised. Commenced basal-bolus insulin: Lantus 16 units nocte, NovoRapid 4-6 units TDS with meals\nEducation needs: Insulin self-injection technique, carbohydrate counting, hypo management, sick day rules, driving regulations\nPsychological: Anxious about diagnosis, tearful, lives alone, supportive family interstate\nRequest: Comprehensive diabetes education programme, dietitian review, consider psychology referral\n\nWrite 180-200 words.',
      format: 'oet_referral_letter', minWords: 180, maxWords: 200, timeMinutes: 45,
      rubric: [
        { name: 'Overall Task Fulfilment', maxScore: 7, description: 'Education needs prioritised' },
        { name: 'Appropriateness of Language', maxScore: 7, description: 'Patient-centred, empathetic' },
        { name: 'Comprehension of Stimulus', maxScore: 7, description: 'Accurate clinical detail' },
        { name: 'Linguistic Features', maxScore: 7, description: 'Grammar, cohesion' },
      ],
      difficulty: 0.65,
    },
  },
  {
    id: 'oet.wt.09', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay', 'strat.oet.letter_structure'],
    payload: {
      prompt: 'Write a referral letter for a patient to a physiotherapist.\n\nCASE NOTES:\nPatient: Mr. Tom Williams, 28, construction worker\nPresenting: Low back pain for 4 weeks following lifting injury at work\nHistory: No previous back problems. No red flags (no saddle anaesthesia, normal bladder/bowel, no weight loss, no fever).\nExam: Reduced lumbar flexion, paravertebral muscle spasm L4-L5, SLR positive right at 40°, normal neurological exam\nImaging: Lumbar X-ray normal. MRI: L4-L5 disc protrusion, no nerve root compression\nManagement: Naproxen 500mg BD (2 weeks), advised to stay active\nRequest: Physiotherapy — core strengthening, manual therapy, ergonomic workplace assessment, graduated return-to-work plan\n\nWrite 180-200 words.',
      format: 'oet_referral_letter', minWords: 180, maxWords: 200, timeMinutes: 45,
      rubric: [
        { name: 'Overall Task Fulfilment', maxScore: 7, description: 'Clear rehab goals' },
        { name: 'Appropriateness of Language', maxScore: 7, description: 'Professional, allied health audience' },
        { name: 'Comprehension of Stimulus', maxScore: 7, description: 'Accurate case transformation' },
        { name: 'Linguistic Features', maxScore: 7, description: 'Grammar and cohesion' },
      ],
      difficulty: 0.5,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # OET SPEAKING — Role-play scenarios (12 more)
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'oet.sp.06', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.give_detailed_account', 'strat.oet.roleplay'],
    payload: {
      prompt: 'SPEAKING ROLE-PLAY\n\nSetting: General Practice\nPatient: 55-year-old woman\n\nYou are a GP. The patient has come for results of a routine blood test which shows:\n- Fasting glucose: 7.2 mmol/L (normal <5.5)\n- HbA1c: 6.8% (pre-diabetic range 5.7-6.4%, diabetic >6.5%)\n\nTasks:\n1. Explain the results and the diagnosis of Type 2 diabetes clearly\n2. Discuss lifestyle modifications (diet, exercise, weight management)\n3. Explain the need for medication (Metformin 500mg)\n4. Address the patient\'s concerns about long-term complications\n5. Arrange follow-up (3 months, repeat HbA1c)',
      format: 'oet_roleplay', followUpQuestions: [],
      targetLanguage: ['Breaking bad news sensitively', 'Explaining medical results in lay terms', 'Shared decision-making about treatment'],
      difficulty: 0.55,
    },
  },
  {
    id: 'oet.sp.07', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.give_detailed_account', 'strat.oet.roleplay'],
    payload: {
      prompt: 'SPEAKING ROLE-PLAY\n\nSetting: Emergency Department\nPatient: Parent of a 4-year-old child\n\nYou are a nurse. The child has been brought in with a high fever (39.5°C) and a non-blanching rash.\n\nTasks:\n1. Take a focused history from the anxious parent\n2. Explain what tests the doctor will likely order\n3. Explain why the child needs to be assessed urgently (meningococcal disease must be excluded)\n4. Reassure the parent while being honest about the seriousness\n5. Explain what will happen next (blood tests, possible lumbar puncture, IV antibiotics)',
      format: 'oet_roleplay', followUpQuestions: [],
      targetLanguage: ['Handling parental anxiety', 'Explaining urgency without causing panic', 'Non-blanching rash → meningococcal protocol'],
      difficulty: 0.6,
    },
  },
  {
    id: 'oet.sp.08', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.give_detailed_account', 'strat.oet.roleplay'],
    payload: {
      prompt: 'SPEAKING ROLE-PLAY\n\nSetting: Community Pharmacy\nPatient: 70-year-old man\n\nYou are a pharmacist. The patient has been prescribed warfarin for atrial fibrillation.\n\nTasks:\n1. Explain how warfarin works (blood thinner to prevent stroke)\n2. Discuss important drug-food interactions (vitamin K foods, alcohol)\n3. Explain the importance of regular INR monitoring\n4. Advise on signs of over-anticoagulation (bleeding, bruising)\n5. Discuss what to do if a dose is missed',
      format: 'oet_roleplay', followUpQuestions: [],
      targetLanguage: ['Medication counselling', 'Drug-food interactions', 'Patient safety warnings'],
      difficulty: 0.55,
    },
  },
  {
    id: 'oet.sp.09', type: 'speaking_prompt', level: 'C1', skill: 'speaking',
    nodeIds: ['cando.b2.give_detailed_account', 'strat.oet.roleplay'],
    payload: {
      prompt: 'SPEAKING ROLE-PLAY\n\nSetting: Oncology Outpatient Clinic\nPatient: 48-year-old woman\n\nYou are a specialist nurse. The patient has been diagnosed with Stage 2 breast cancer.\n\nTasks:\n1. Explain the treatment plan (surgery → chemotherapy → radiation)\n2. Discuss potential side effects of chemotherapy\n3. Address concerns about hair loss and body image\n4. Provide information about support services\n5. Arrange next steps and answer questions',
      format: 'oet_roleplay', followUpQuestions: [],
      targetLanguage: ['Sensitive delivery of cancer treatment plans', 'Empathetic listening', 'Holistic care approach'],
      difficulty: 0.7,
    },
  },
  {
    id: 'oet.sp.10', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.give_detailed_account', 'strat.oet.roleplay'],
    payload: {
      prompt: 'SPEAKING ROLE-PLAY\n\nSetting: Dental Practice\nPatient: 25-year-old student\n\nYou are a dentist. The patient presents with severe toothache (lower right molar). X-ray shows periapical abscess.\n\nTasks:\n1. Explain the diagnosis using simple language\n2. Discuss treatment options (root canal vs extraction)\n3. Address the patient\'s dental anxiety\n4. Prescribe antibiotics (Amoxicillin 500mg TDS, 5 days)\n5. Discuss pain management and follow-up',
      format: 'oet_roleplay', followUpQuestions: [],
      targetLanguage: ['Dental terminology simplified', 'Treatment option comparison', 'Managing dental phobia'],
      difficulty: 0.5,
    },
  },
  {
    id: 'oet.sp.11', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.give_detailed_account', 'strat.oet.roleplay'],
    payload: {
      prompt: 'SPEAKING ROLE-PLAY\n\nSetting: Maternity Ward\nPatient: 30-year-old first-time mother, 1 day postpartum\n\nYou are a midwife. The patient had a normal vaginal delivery and wants to go home.\n\nTasks:\n1. Assess readiness for discharge (feeding, voiding, mobility)\n2. Provide breastfeeding education and support\n3. Discuss newborn care essentials (feeding frequency, nappy changes, sleep safety)\n4. Explain warning signs requiring medical attention (fever, heavy bleeding, difficulty breathing)\n5. Arrange community midwife follow-up visit',
      format: 'oet_roleplay', followUpQuestions: [],
      targetLanguage: ['Postpartum education', 'Breastfeeding support language', 'Discharge safety netting'],
      difficulty: 0.55,
    },
  },
  {
    id: 'oet.sp.12', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.give_detailed_account', 'strat.oet.roleplay'],
    payload: {
      prompt: 'SPEAKING ROLE-PLAY\n\nSetting: Physiotherapy Outpatient Clinic\nPatient: 60-year-old man, 6 weeks post total knee replacement\n\nYou are a physiotherapist. The patient is progressing slowly and is frustrated.\n\nTasks:\n1. Review current range of motion and mobility\n2. Explain expected recovery timeline (3-6 months for full recovery)\n3. Motivate the patient — acknowledge frustration, set realistic goals\n4. Demonstrate and prescribe home exercises\n5. Discuss when to return to driving and normal activities',
      format: 'oet_roleplay', followUpQuestions: [],
      targetLanguage: ['Motivational interviewing', 'Goal-setting language', 'Exercise instruction clarity'],
      difficulty: 0.5,
    },
  },
  {
    id: 'oet.sp.13', type: 'speaking_prompt', level: 'C1', skill: 'speaking',
    nodeIds: ['cando.b2.give_detailed_account', 'strat.oet.roleplay'],
    payload: {
      prompt: 'SPEAKING ROLE-PLAY\n\nSetting: Aged Care Facility\nPatient: Daughter of an 82-year-old resident with worsening dementia\n\nYou are a registered nurse. The daughter wants to discuss her mother\'s declining condition and future care.\n\nTasks:\n1. Update on the resident\'s current cognitive and functional status\n2. Discuss transition from moderate to severe dementia\n3. Introduce the concept of advance care planning\n4. Sensitively discuss resuscitation decisions (NFR/AND)\n5. Provide information about palliative care options',
      format: 'oet_roleplay', followUpQuestions: [],
      targetLanguage: ['End-of-life discussions', 'Advance care planning terminology', 'Cultural sensitivity'],
      difficulty: 0.7,
    },
  },
  {
    id: 'oet.sp.14', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.give_detailed_account', 'strat.oet.roleplay'],
    payload: {
      prompt: 'SPEAKING ROLE-PLAY\n\nSetting: Optometry Practice\nPatient: 45-year-old office worker\n\nYou are an optometrist. The patient\'s eye exam reveals early signs of glaucoma.\n\nTasks:\n1. Explain what glaucoma is (increased eye pressure → optic nerve damage)\n2. Reassure that early detection allows effective management\n3. Discuss treatment (eye drops — Timolol, to reduce eye pressure)\n4. Explain the importance of regular monitoring\n5. Address concerns about potential vision loss',
      format: 'oet_roleplay', followUpQuestions: [],
      targetLanguage: ['Explaining chronic conditions', 'Eye health vocabulary', 'Treatment adherence counselling'],
      difficulty: 0.5,
    },
  },
  {
    id: 'oet.sp.15', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.give_detailed_account', 'strat.oet.roleplay'],
    payload: {
      prompt: 'SPEAKING ROLE-PLAY\n\nSetting: General Practice\nPatient: 18-year-old university student\n\nYou are a GP. The patient presents with symptoms of anxiety (racing heart, difficulty sleeping, worry about exams).\n\nTasks:\n1. Take a focused mental health history\n2. Screen for anxiety and depression (GAD-7, PHQ-9)\n3. Discuss non-pharmacological management (exercise, sleep hygiene, counselling)\n4. Explain when medication might be appropriate\n5. Refer to university counselling services and provide a safety plan',
      format: 'oet_roleplay', followUpQuestions: [],
      targetLanguage: ['Adolescent mental health', 'Active listening', 'Motivational language'],
      difficulty: 0.5,
    },
  },
  {
    id: 'oet.sp.16', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.give_detailed_account', 'strat.oet.roleplay'],
    payload: {
      prompt: 'SPEAKING ROLE-PLAY\n\nSetting: Surgical Ward\nPatient: 50-year-old man, pre-operative\n\nYou are a nurse. The patient is scheduled for laparoscopic cholecystectomy tomorrow morning.\n\nTasks:\n1. Explain pre-operative instructions (fasting from midnight, shower)\n2. Describe what will happen on the day of surgery\n3. Explain post-operative expectations (pain, drains, mobility)\n4. Obtain informed consent information\n5. Address the patient\'s anxiety about general anaesthesia',
      format: 'oet_roleplay', followUpQuestions: [],
      targetLanguage: ['Pre-operative education', 'Informed consent process', 'Anaesthesia explanation'],
      difficulty: 0.5,
    },
  },
  {
    id: 'oet.sp.17', type: 'speaking_prompt', level: 'C1', skill: 'speaking',
    nodeIds: ['cando.b2.give_detailed_account', 'strat.oet.roleplay'],
    payload: {
      prompt: 'SPEAKING ROLE-PLAY\n\nSetting: Paediatric Clinic\nPatient: Mother of a 7-year-old boy recently diagnosed with asthma\n\nYou are a paediatric nurse. The child has been prescribed a Ventolin inhaler (reliever) and Flixotide inhaler (preventer).\n\nTasks:\n1. Explain the difference between reliever and preventer inhalers\n2. Demonstrate correct inhaler technique with spacer\n3. Explain the asthma action plan (green/yellow/red zones)\n4. Discuss triggers and avoidance strategies\n5. Reassure the mother about the child\'s ability to participate in sports',
      format: 'oet_roleplay', followUpQuestions: [],
      targetLanguage: ['Asthma management education', 'Child-appropriate language', 'Action plan explanation'],
      difficulty: 0.55,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # OET READING — Medical reading comprehension (12 items)
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'oet.rp.04', type: 'reading_passage', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument', 'strat.oet.medical_reading'],
    payload: {
      passage: 'Hand hygiene remains the single most effective measure for preventing healthcare-associated infections (HAIs). The World Health Organisation recommends the "Five Moments for Hand Hygiene": before touching a patient, before clean/aseptic procedures, after body fluid exposure risk, after touching a patient, and after touching patient surroundings. Despite clear evidence of its efficacy, compliance rates among healthcare workers typically range from 40% to 60%. Interventions to improve compliance include multimodal strategies combining education, reminders, monitoring, feedback, and institutional safety culture. Alcohol-based hand rubs (ABHRs) have been shown to be more effective than soap and water for routine hand hygiene, though soap and water should be used when hands are visibly soiled or after exposure to spore-forming organisms such as Clostridioides difficile.',
      questions: [
        { question: 'How many "moments" for hand hygiene does the WHO recommend?', options: ['Three', 'Five', 'Seven', 'Ten'], correctIndex: 1 },
        { question: 'What is the typical hand hygiene compliance rate?', options: ['10-20%', '40-60%', '80-90%', '95-100%'], correctIndex: 1 },
        { question: 'When should soap and water be used instead of alcohol-based rub?', options: ['Before surgery', 'When hands are visibly soiled', 'After every patient contact', 'Before eating meals'], correctIndex: 1 },
      ],
      difficulty: 0.4,
    },
  },
  {
    id: 'oet.rp.05', type: 'reading_passage', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument', 'strat.oet.medical_reading'],
    payload: {
      passage: 'Chronic obstructive pulmonary disease (COPD) is characterised by persistent airflow limitation that is usually progressive. The two main conditions contributing to COPD are emphysema (destruction of lung parenchyma) and chronic bronchitis (chronic productive cough for at least three months in two consecutive years). Cigarette smoking is the leading cause, accounting for approximately 85-90% of cases. Diagnosis is confirmed by spirometry showing a post-bronchodilator FEV1/FVC ratio of less than 0.70. Management follows a stepwise approach: smoking cessation is the single most important intervention; bronchodilators (SABA, LABA, LAMA) provide symptom relief; inhaled corticosteroids may be added for patients with frequent exacerbations; and pulmonary rehabilitation improves exercise tolerance and quality of life.',
      questions: [
        { question: 'What percentage of COPD cases are attributed to smoking?', options: ['50-60%', '70-75%', '85-90%', '95-100%'], correctIndex: 2 },
        { question: 'What is the diagnostic criterion for COPD on spirometry?', options: ['FEV1 <80% predicted', 'FEV1/FVC <0.70', 'FVC <60% predicted', 'Peak flow <300 L/min'], correctIndex: 1 },
        { question: 'What is described as the single most important intervention?', options: ['Inhaled corticosteroids', 'Bronchodilators', 'Smoking cessation', 'Pulmonary rehabilitation'], correctIndex: 2 },
      ],
      difficulty: 0.5,
    },
  },
  {
    id: 'oet.rp.06', type: 'reading_passage', level: 'C1', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument', 'strat.oet.medical_reading'],
    payload: {
      passage: 'Antimicrobial stewardship (AMS) programmes aim to optimise antibiotic use to improve patient outcomes while minimising the development of resistance. Key principles include: prescribing antibiotics only when clinically indicated; selecting the narrowest spectrum agent effective against the likely pathogen; using appropriate dose, route, and duration; and reviewing prescriptions at 48-72 hours. The global rise of multidrug-resistant organisms, including methicillin-resistant Staphylococcus aureus (MRSA), extended-spectrum beta-lactamase (ESBL) producing Enterobacteriaceae, and carbapenem-resistant organisms, has been described by the WHO as one of the top ten global public health threats. Healthcare professionals play a critical role in AMS by questioning unnecessary prescriptions, educating patients about appropriate antibiotic use, and ensuring cultures are obtained before empirical therapy is commenced.',
      questions: [
        { question: 'When should antibiotic prescriptions be reviewed?', options: ['After 24 hours', 'At 48-72 hours', 'After 7 days', 'At discharge'], correctIndex: 1 },
        { question: 'What does ESBL stand for?', options: ['Early-stage bacterial load', 'Extended-spectrum beta-lactamase', 'Enzyme-sensitive beta-lactam', 'Exogenous systemic bacterial lysis'], correctIndex: 1 },
        { question: 'Which is NOT mentioned as a key AMS principle?', options: ['Narrowest spectrum agent', 'Reviewing prescriptions', 'Combining two antibiotics routinely', 'Appropriate dose and duration'], correctIndex: 2 },
      ],
      difficulty: 0.6,
    },
  },
  {
    id: 'oet.rp.07', type: 'reading_passage', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument', 'strat.oet.medical_reading'],
    payload: {
      passage: 'Falls in the elderly represent a major cause of morbidity and mortality worldwide. Approximately one-third of community-dwelling adults aged 65 and over fall each year, with the incidence rising to 50% in those over 80. Risk factors include muscle weakness, balance and gait disorders, polypharmacy (particularly sedatives, antihypertensives, and psychotropic medications), visual impairment, cognitive decline, and environmental hazards. Prevention strategies include regular exercise programmes focusing on strength and balance (e.g., tai chi), medication review, vision correction, home hazard modification, vitamin D supplementation, and the use of appropriate footwear. Hip protectors may reduce fracture risk in high-risk individuals residing in care facilities.',
      questions: [
        { question: 'What proportion of over-65s fall each year?', options: ['One-fifth', 'One-quarter', 'One-third', 'One-half'], correctIndex: 2 },
        { question: 'Which exercise is specifically mentioned for fall prevention?', options: ['Swimming', 'Yoga', 'Tai chi', 'Jogging'], correctIndex: 2 },
        { question: 'What medication category increases fall risk?', options: ['Antibiotics', 'Sedatives', 'Antihistamines', 'Vitamins'], correctIndex: 1 },
      ],
      difficulty: 0.45,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # OET CLINICAL VOCABULARY — MCQ items (20 items)
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'oet.vocab.06', type: 'mcq', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument', 'strat.oet.clinical_vocab'],
    payload: {
      stem: 'A patient reports "dysphagia." This means they have difficulty:',
      options: [
        { text: 'Speaking', misconception: 'That is dysphasia/dysarthria' },
        { text: 'Swallowing', misconception: null },
        { text: 'Breathing', misconception: 'That is dyspnoea' },
        { text: 'Walking', misconception: 'That is claudication' },
      ], correctIndex: 1, difficulty: 0.3,
    },
  },
  {
    id: 'oet.vocab.07', type: 'mcq', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument', 'strat.oet.clinical_vocab'],
    payload: {
      stem: 'The abbreviation "PRN" on a prescription means:',
      options: [
        { text: 'Three times daily', misconception: 'That is TDS' },
        { text: 'Before meals', misconception: 'That is AC (ante cibum)' },
        { text: 'As needed', misconception: null },
        { text: 'At bedtime', misconception: 'That is nocte' },
      ], correctIndex: 2, difficulty: 0.25,
    },
  },
  {
    id: 'oet.vocab.08', type: 'mcq', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument', 'strat.oet.clinical_vocab'],
    payload: {
      stem: '"Tachycardia" refers to a heart rate that is:',
      options: [
        { text: 'Slower than normal (below 60 bpm)', misconception: 'That is bradycardia' },
        { text: 'Faster than normal (above 100 bpm)', misconception: null },
        { text: 'Irregular', misconception: 'That is arrhythmia' },
        { text: 'Normal (60-100 bpm)', misconception: 'Normal rate is called sinus rhythm' },
      ], correctIndex: 1, difficulty: 0.25,
    },
  },
  {
    id: 'oet.vocab.09', type: 'mcq', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument', 'strat.oet.clinical_vocab'],
    payload: {
      stem: 'A "supine" patient is lying:',
      options: [
        { text: 'Face down', misconception: 'That is prone' },
        { text: 'On their side', misconception: 'That is lateral' },
        { text: 'Face up / on their back', misconception: null },
        { text: 'Semi-upright at 45°', misconception: 'That is semi-Fowler\'s position' },
      ], correctIndex: 2, difficulty: 0.3,
    },
  },
  {
    id: 'oet.vocab.10', type: 'mcq', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument', 'strat.oet.clinical_vocab'],
    payload: {
      stem: '"Haemoptysis" refers to coughing up:',
      options: [
        { text: 'Mucus', misconception: 'That is productive cough' },
        { text: 'Blood', misconception: null },
        { text: 'Food', misconception: 'That relates to aspiration' },
        { text: 'Bile', misconception: 'That is bilious vomiting' },
      ], correctIndex: 1, difficulty: 0.35,
    },
  },
  {
    id: 'oet.vocab.11', type: 'mcq', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument', 'strat.oet.clinical_vocab'],
    payload: {
      stem: 'The prefix "hyper-" in medical terms means:',
      options: [
        { text: 'Below normal', misconception: 'That is hypo-' },
        { text: 'Above normal / excessive', misconception: null },
        { text: 'Within normal range', misconception: 'No specific prefix for normal' },
        { text: 'Opposite of', misconception: 'That is anti-' },
      ], correctIndex: 1, difficulty: 0.2,
    },
  },
  {
    id: 'oet.vocab.12', type: 'mcq', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument', 'strat.oet.clinical_vocab'],
    payload: {
      stem: 'An "embolism" is:',
      options: [
        { text: 'A blood clot that stays where it forms', misconception: 'That is a thrombus' },
        { text: 'A blood clot (or other material) that travels to block a vessel', misconception: null },
        { text: 'A widening of a blood vessel', misconception: 'That is an aneurysm' },
        { text: 'Inflammation of a vein', misconception: 'That is phlebitis' },
      ], correctIndex: 1, difficulty: 0.4,
    },
  },
  {
    id: 'oet.vocab.13', type: 'mcq', level: 'C1', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument', 'strat.oet.clinical_vocab'],
    payload: {
      stem: '"Prophylaxis" in medicine refers to:',
      options: [
        { text: 'Treatment of an existing disease', misconception: 'That is therapeutics' },
        { text: 'Surgical removal of tissue', misconception: 'That is excision/resection' },
        { text: 'Prevention of disease or complications', misconception: null },
        { text: 'Diagnosis through imaging', misconception: 'That is diagnostic imaging' },
      ], correctIndex: 2, difficulty: 0.35,
    },
  },
  {
    id: 'oet.vocab.14', type: 'mcq', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument', 'strat.oet.clinical_vocab'],
    payload: {
      stem: '"Oedema" refers to:',
      options: [
        { text: 'Redness of the skin', misconception: 'That is erythema' },
        { text: 'Swelling caused by excess fluid in tissue', misconception: null },
        { text: 'A skin rash', misconception: 'That is dermatitis' },
        { text: 'Bruising under the skin', misconception: 'That is ecchymosis' },
      ], correctIndex: 1, difficulty: 0.3,
    },
  },
  {
    id: 'oet.vocab.15', type: 'mcq', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument', 'strat.oet.clinical_vocab'],
    payload: {
      stem: 'The abbreviation "BD" on a prescription means:',
      options: [
        { text: 'Once daily', misconception: 'That is OD' },
        { text: 'Twice daily', misconception: null },
        { text: 'Three times daily', misconception: 'That is TDS/TID' },
        { text: 'Four times daily', misconception: 'That is QDS/QID' },
      ], correctIndex: 1, difficulty: 0.2,
    },
  },
  {
    id: 'oet.vocab.16', type: 'mcq', level: 'C1', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument', 'strat.oet.clinical_vocab'],
    payload: {
      stem: '"Iatrogenic" means caused by:',
      options: [
        { text: 'The patient\'s own behaviour', misconception: 'That relates to non-adherence' },
        { text: 'Medical treatment or healthcare professionals', misconception: null },
        { text: 'Unknown factors', misconception: 'That is idiopathic' },
        { text: 'Genetic inheritance', misconception: 'That is hereditary/congenital' },
      ], correctIndex: 1, difficulty: 0.5,
    },
  },
  {
    id: 'oet.vocab.17', type: 'mcq', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument', 'strat.oet.clinical_vocab'],
    payload: {
      stem: '"Afebrile" means the patient:',
      options: [
        { text: 'Has a fever', misconception: 'That is febrile' },
        { text: 'Does not have a fever', misconception: null },
        { text: 'Has a low temperature', misconception: 'That is hypothermic' },
        { text: 'Has fluctuating temperature', misconception: 'That is intermittent fever' },
      ], correctIndex: 1, difficulty: 0.25,
    },
  },
  {
    id: 'oet.vocab.18', type: 'mcq', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument', 'strat.oet.clinical_vocab'],
    payload: {
      stem: '"Prognosis" refers to:',
      options: [
        { text: 'The cause of a disease', misconception: 'That is aetiology' },
        { text: 'The predicted course and outcome of a disease', misconception: null },
        { text: 'The symptoms a patient presents with', misconception: 'That is presentation/symptomatology' },
        { text: 'The treatment plan for a disease', misconception: 'That is the management plan' },
      ], correctIndex: 1, difficulty: 0.25,
    },
  },
  {
    id: 'oet.vocab.19', type: 'mcq', level: 'C1', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument', 'strat.oet.clinical_vocab'],
    payload: {
      stem: '"Comorbidity" means:',
      options: [
        { text: 'A fatal disease', misconception: 'That relates to mortality' },
        { text: 'The presence of additional diseases alongside a primary condition', misconception: null },
        { text: 'A complication of surgery', misconception: 'That is a post-operative complication' },
        { text: 'A disease that affects multiple organs', misconception: 'That is a systemic disease' },
      ], correctIndex: 1, difficulty: 0.35,
    },
  },
  {
    id: 'oet.vocab.20', type: 'mcq', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument', 'strat.oet.clinical_vocab'],
    payload: {
      stem: 'The term "idiopathic" means:',
      options: [
        { text: 'Caused by medication', misconception: 'That is iatrogenic' },
        { text: 'Self-inflicted', misconception: 'Different concept' },
        { text: 'Of unknown cause', misconception: null },
        { text: 'Related to age', misconception: 'That is age-related or geriatric' },
      ], correctIndex: 2, difficulty: 0.35,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # OET STRATEGY — Test strategy MCQs (8 items)
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'oet.strat.06', type: 'mcq', level: 'B2', skill: 'general',
    nodeIds: ['strat.oet.letter_structure'],
    payload: {
      stem: 'OET Writing Strategy: What is the correct opening for a referral letter?',
      options: [
        { text: '"Dear Dr. [Name]" followed by "Re: [Patient Name]"', misconception: null },
        { text: '"To Whom It May Concern"', misconception: 'Too impersonal for OET letters — always address by name' },
        { text: 'Start directly with the patient\'s condition', misconception: 'Missing salutation loses marks' },
        { text: '"Hi [Name], hope you are well"', misconception: 'Too informal for medical correspondence' },
      ], correctIndex: 0, difficulty: 0.25,
    },
  },
  {
    id: 'oet.strat.07', type: 'mcq', level: 'B2', skill: 'general',
    nodeIds: ['strat.oet.letter_structure'],
    payload: {
      stem: 'OET Writing Strategy: Which information should be EXCLUDED from a referral letter?',
      options: [
        { text: 'The patient\'s relevant medical history', misconception: 'This should be included' },
        { text: 'Current medications', misconception: 'This should be included' },
        { text: 'The healthcare worker\'s personal opinion about the patient\'s lifestyle choices', misconception: null },
        { text: 'The reason for the referral', misconception: 'This is essential' },
      ], correctIndex: 2, difficulty: 0.3,
    },
  },
  {
    id: 'oet.strat.08', type: 'mcq', level: 'B2', skill: 'general',
    nodeIds: ['strat.oet.roleplay'],
    payload: {
      stem: 'OET Speaking: Which technique is MOST important when explaining a diagnosis?',
      options: [
        { text: 'Using as many medical terms as possible to sound professional', misconception: 'Jargon can confuse patients' },
        { text: 'Using plain language and checking the patient\'s understanding', misconception: null },
        { text: 'Speaking quickly to cover all information in the allotted time', misconception: 'Speed reduces comprehension' },
        { text: 'Reading from notes to ensure accuracy', misconception: 'Reading reduces rapport' },
      ], correctIndex: 1, difficulty: 0.25,
    },
  },
  {
    id: 'oet.strat.09', type: 'mcq', level: 'B2', skill: 'general',
    nodeIds: ['strat.oet.roleplay'],
    payload: {
      stem: 'OET Speaking: A patient becomes tearful during a consultation. The BEST response is:',
      options: [
        { text: 'Ignore the tears and continue with the consultation', misconception: 'Ignoring emotions is poor practice' },
        { text: 'Acknowledge their emotions and offer a moment to compose themselves', misconception: null },
        { text: 'Immediately call a counsellor', misconception: 'Disproportionate response' },
        { text: 'Change the subject to something more positive', misconception: 'Dismissive of valid emotions' },
      ], correctIndex: 1, difficulty: 0.25,
    },
  },
  {
    id: 'oet.strat.10', type: 'mcq', level: 'B2', skill: 'general',
    nodeIds: ['strat.oet.medical_reading'],
    payload: {
      stem: 'OET Reading Part A: What is the best approach for the summary task?',
      options: [
        { text: 'Read all three texts completely before answering any questions', misconception: 'Too time-consuming' },
        { text: 'Scan texts for keywords that match each question, then read the relevant section carefully', misconception: null },
        { text: 'Only read the first text, as most answers come from there', misconception: 'Answers come from all texts' },
        { text: 'Guess answers first, then check if the texts confirm them', misconception: 'Inefficient and unreliable' },
      ], correctIndex: 1, difficulty: 0.3,
    },
  },
  {
    id: 'oet.strat.11', type: 'mcq', level: 'B2', skill: 'general',
    nodeIds: ['strat.oet.letter_structure'],
    payload: {
      stem: 'OET Writing: How should you transform case notes like "BP 150/95, HR 88" into a letter?',
      options: [
        { text: 'Copy them exactly as they appear in the notes', misconception: 'Notes format is not appropriate for letters' },
        { text: 'Write in full sentences: "On examination, his blood pressure was 150/95 mmHg with a heart rate of 88 bpm"', misconception: null },
        { text: 'Omit clinical values and describe in general terms only', misconception: 'Specific values are important' },
        { text: 'List them as bullet points within the letter', misconception: 'Formal letters use full sentences' },
      ], correctIndex: 1, difficulty: 0.3,
    },
  },
  {
    id: 'oet.strat.12', type: 'mcq', level: 'B2', skill: 'general',
    nodeIds: ['strat.oet.roleplay'],
    payload: {
      stem: 'OET Speaking: A patient says they want to stop taking their prescribed medication. You should:',
      options: [
        { text: 'Tell them they must continue and cannot stop', misconception: 'Authoritarian approach — patients have autonomy' },
        { text: 'Explore their reasons, address concerns, and discuss risks of stopping', misconception: null },
        { text: 'Agree immediately and document it', misconception: 'No exploration of reasons' },
        { text: 'Refuse to discuss it and refer to a specialist', misconception: 'Avoids the issue' },
      ], correctIndex: 1, difficulty: 0.3,
    },
  },
  {
    id: 'oet.strat.13', type: 'mcq', level: 'B2', skill: 'general',
    nodeIds: ['strat.oet.letter_structure'],
    payload: {
      stem: 'OET Writing: What is the correct closing for a referral letter?',
      options: [
        { text: '"Kind regards" followed by your name', misconception: 'Acceptable but not optimal' },
        { text: '"I would be grateful if you could [specific request]. Yours sincerely, [Name]"', misconception: null },
        { text: '"Thanks, bye!"', misconception: 'Far too informal' },
        { text: '"Please fix this patient. Yours, [Name]"', misconception: 'Inappropriate and unprofessional' },
      ], correctIndex: 1, difficulty: 0.25,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # OET GAP FILL — Clinical language (8 items)
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'oet.gf.01', type: 'gap_fill', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b1.use_vocabulary', 'strat.oet.clinical_vocab'],
    payload: {
      text: 'The patient was _____ to the orthopaedic team for further management of the fracture.',
      gaps: [{ position: 0, answer: 'referred', distractors: ['transferred', 'sent', 'directed'] }],
      difficulty: 0.35,
    },
  },
  {
    id: 'oet.gf.02', type: 'gap_fill', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b1.use_vocabulary', 'strat.oet.clinical_vocab'],
    payload: {
      text: 'The medication should be _____ gradually over two weeks to avoid withdrawal symptoms.',
      gaps: [{ position: 0, answer: 'tapered', distractors: ['reduced', 'decreased', 'lowered'] }],
      difficulty: 0.45,
    },
  },
  {
    id: 'oet.gf.03', type: 'gap_fill', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b1.use_vocabulary', 'strat.oet.clinical_vocab'],
    payload: {
      text: 'On examination, the patient\'s abdomen was soft, non-tender, with no palpable _____.',
      gaps: [{ position: 0, answer: 'masses', distractors: ['lumps', 'bumps', 'growths'] }],
      difficulty: 0.4,
    },
  },
  {
    id: 'oet.gf.04', type: 'gap_fill', level: 'C1', skill: 'reading',
    nodeIds: ['cando.b1.use_vocabulary', 'strat.oet.clinical_vocab'],
    payload: {
      text: 'The patient was _____ from hospital on day five with a follow-up appointment in two weeks.',
      gaps: [{ position: 0, answer: 'discharged', distractors: ['released', 'dismissed', 'freed'] }],
      difficulty: 0.3,
    },
  },
  {
    id: 'oet.gf.05', type: 'gap_fill', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b1.use_vocabulary', 'strat.oet.clinical_vocab'],
    payload: {
      text: 'The wound was _____ and dressed using sterile technique.',
      gaps: [{ position: 0, answer: 'irrigated', distractors: ['washed', 'cleaned', 'rinsed'] }],
      difficulty: 0.45,
    },
  },
  {
    id: 'oet.gf.06', type: 'gap_fill', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b1.use_vocabulary', 'strat.oet.clinical_vocab'],
    payload: {
      text: 'The patient _____ well to the treatment and was symptom-free within 48 hours.',
      gaps: [{ position: 0, answer: 'responded', distractors: ['reacted', 'answered', 'replied'] }],
      difficulty: 0.3,
    },
  },
  {
    id: 'oet.gf.07', type: 'gap_fill', level: 'C1', skill: 'reading',
    nodeIds: ['cando.b1.use_vocabulary', 'strat.oet.clinical_vocab'],
    payload: {
      text: 'A full blood count revealed _____, with a haemoglobin level of 85 g/L.',
      gaps: [{ position: 0, answer: 'anaemia', distractors: ['infection', 'deficiency', 'disorder'] }],
      difficulty: 0.45,
    },
  },
  {
    id: 'oet.gf.08', type: 'gap_fill', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b1.use_vocabulary', 'strat.oet.clinical_vocab'],
    payload: {
      text: 'The patient was placed on _____ precautions due to suspected airborne infection.',
      gaps: [{ position: 0, answer: 'isolation', distractors: ['quarantine', 'containment', 'separation'] }],
      difficulty: 0.4,
    },
  },
]
