// # OET (Occupational English Test) exam preparation content —
// # healthcare-specific items covering Writing (referral letters),
// # Speaking (role-play consultations), Reading (medical texts),
// # clinical vocabulary, and test strategy.

import type { UnifiedSeedItem } from './run-seed'

export const SEED_OET_PREP: UnifiedSeedItem[] = [
  // # ═══════════════════════════════════════════════════════════════════
  // # OET WRITING — Referral/Discharge Letters from Case Notes
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'oet.wt.01', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay', 'strat.oet.letter_structure'],
    payload: {
      prompt: 'Using the case notes below, write a letter of referral to Dr. Sarah Mitchell, Cardiologist, Royal Melbourne Hospital.\n\nCASE NOTES:\nPatient: Mr. James Chen, 58 years old\nDiagnosis: Suspected unstable angina\nHistory: Chest pain on exertion for 3 weeks, worsening. Pain radiates to left arm. Relieved by rest. History of hypertension (10 years), type 2 diabetes (5 years). Non-smoker. BMI 29.\nCurrent medications: Metformin 500mg BD, Lisinopril 10mg OD, Aspirin 100mg OD\nExaminations: BP 150/95, HR 88 regular, ECG: ST depression in leads V4-V6\nTests: Troponin: 0.08 ng/mL (borderline), Total cholesterol: 6.2 mmol/L\nRequest: Urgent cardiology review, consider stress test and angiography\n\nWrite 180-200 words.',
      format: 'oet_referral_letter',
      minWords: 180, maxWords: 200, timeMinutes: 45,
      rubric: [
        { name: 'Overall Task Fulfilment', description: 'All relevant case notes included, appropriate purpose', maxScore: 7 },
        { name: 'Appropriateness of Language', description: 'Formal register, patient-centred, professional tone', maxScore: 7 },
        { name: 'Comprehension of Stimulus', description: 'Accurate selection and transformation of case notes', maxScore: 7 },
        { name: 'Linguistic Features', description: 'Grammar, spelling, punctuation, cohesion', maxScore: 7 },
      ],
      modelAnswer: 'Dear Dr. Mitchell,\n\nRe: Mr. James Chen, DOB: [date], 58 years old\n\nI am writing to refer Mr. Chen for urgent cardiology review regarding suspected unstable angina.\n\nMr. Chen has presented with a three-week history of exertional chest pain that radiates to his left arm and is relieved by rest. The pain has been progressively worsening. His medical history is significant for hypertension, which has been managed for ten years, and type 2 diabetes diagnosed five years ago. He is a non-smoker with a BMI of 29.\n\nOn examination, his blood pressure was elevated at 150/95 mmHg with a regular heart rate of 88 bpm. His ECG revealed ST depression in leads V4-V6, which is concerning for myocardial ischaemia. His troponin level was borderline at 0.08 ng/mL, and his total cholesterol was elevated at 6.2 mmol/L.\n\nMr. Chen is currently taking Metformin 500mg twice daily, Lisinopril 10mg daily, and Aspirin 100mg daily.\n\nI would be grateful if you could review Mr. Chen at your earliest convenience and consider arranging a stress test and coronary angiography to confirm the diagnosis and guide further management.\n\nYours sincerely,',
      difficulty: 0.6,
    },
  },
  {
    id: 'oet.wt.02', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay', 'strat.oet.letter_structure'],
    payload: {
      prompt: 'Using the case notes below, write a discharge letter to the patient\'s GP, Dr. Robert Liu, Greenhill Medical Centre.\n\nCASE NOTES:\nPatient: Mrs. Amara Obi, 72 years old\nAdmission: Fall at home → right neck of femur fracture\nSurgery: Dynamic hip screw fixation (Day 2 of admission)\nPost-op: Uncomplicated recovery, mobilising with frame, weight-bearing as tolerated\nComorbidities: Osteoporosis (DEXA T-score -3.1), mild cognitive impairment, hypothyroidism\nMedications on discharge: Paracetamol 1g QDS PRN, Enoxaparin 40mg SC OD (28 days), Alendronate 70mg weekly (NEW), Calcium/Vitamin D 500mg/400IU BD (NEW), Levothyroxine 75mcg OD\nFollow-up: Orthopaedic clinic 6 weeks, falls prevention assessment, bone density follow-up 12 months\nAdvice: Continue physio exercises, home hazard assessment recommended\n\nWrite 180-200 words.',
      format: 'oet_discharge_letter',
      minWords: 180, maxWords: 200, timeMinutes: 45,
      rubric: [
        { name: 'Overall Task Fulfilment', description: 'Covers admission, treatment, discharge plan', maxScore: 7 },
        { name: 'Appropriateness of Language', description: 'Formal, GP-appropriate, clear action points', maxScore: 7 },
        { name: 'Comprehension of Stimulus', description: 'Accurate transformation of case notes', maxScore: 7 },
        { name: 'Linguistic Features', description: 'Grammar, spelling, punctuation, cohesion', maxScore: 7 },
      ],
      modelAnswer: 'Dear Dr. Liu,\n\nRe: Mrs. Amara Obi, DOB: [date], 72 years old\n\nI am writing to inform you of Mrs. Obi\'s recent admission and discharge following surgical management of a right neck of femur fracture sustained in a fall at home.\n\nMrs. Obi underwent dynamic hip screw fixation on day two of her admission. Her post-operative recovery was uncomplicated, and she is now mobilising independently with a walking frame, bearing weight as tolerated.\n\nGiven her significant osteoporosis (DEXA T-score -3.1), Alendronate 70mg weekly and Calcium/Vitamin D supplementation have been commenced. She will continue Enoxaparin 40mg subcutaneously for 28 days for thromboprophylaxis. Her Levothyroxine has been continued unchanged.\n\nMrs. Obi has been advised to continue her physiotherapy exercises at home. I would recommend arranging a home hazard assessment given her history of falls and mild cognitive impairment.\n\nFollow-up has been arranged at the orthopaedic clinic in six weeks, with a bone density review scheduled for twelve months. A falls prevention assessment has also been recommended.\n\nPlease do not hesitate to contact us should you require any further information.\n\nYours sincerely,',
      difficulty: 0.6,
    },
  },
  {
    id: 'oet.wt.03', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay', 'strat.oet.letter_structure'],
    payload: {
      prompt: 'Using the case notes below, write a referral letter to Ms. Angela Torres, Community Mental Health Team, Northern District Health Service.\n\nCASE NOTES:\nPatient: Mr. David Park, 34 years old, software engineer\nPresenting complaint: Persistent low mood, insomnia, loss of appetite for 2 months\nHistory: First episode of depression. No previous psychiatric history. Recent job loss (redundancy) 3 months ago. Relationship breakdown 1 month ago. Lives alone.\nRisk assessment: Denies suicidal ideation or self-harm. No substance use. PHQ-9 score: 18 (moderately severe)\nManagement to date: Started Sertraline 50mg OD 2 weeks ago. Brief supportive counselling in clinic.\nRequest: Psychological therapy (CBT), social support, monitoring during medication titration\n\nWrite 180-200 words.',
      format: 'oet_referral_letter',
      minWords: 180, maxWords: 200, timeMinutes: 45,
      rubric: [
        { name: 'Overall Task Fulfilment', description: 'Covers presentation, risk, management, request', maxScore: 7 },
        { name: 'Appropriateness of Language', description: 'Sensitive, professional, non-stigmatising', maxScore: 7 },
        { name: 'Comprehension of Stimulus', description: 'Accurate use of mental health terminology', maxScore: 7 },
        { name: 'Linguistic Features', description: 'Grammar, spelling, punctuation, cohesion', maxScore: 7 },
      ],
      modelAnswer: 'Dear Ms. Torres,\n\nRe: Mr. David Park, DOB: [date], 34 years old\n\nI am writing to refer Mr. Park for community mental health support regarding a first episode of moderate-to-severe depression.\n\nMr. Park has presented with a two-month history of persistent low mood, insomnia, and loss of appetite. These symptoms appear to have been precipitated by significant life stressors, including redundancy from his position as a software engineer three months ago and a subsequent relationship breakdown. He currently lives alone.\n\nHis PHQ-9 score is 18, indicating moderately severe depression. Importantly, Mr. Park denies any suicidal ideation or self-harm intent, and there is no history of substance use. He has no previous psychiatric history.\n\nI commenced Sertraline 50mg daily two weeks ago and have provided brief supportive counselling in our clinic. However, I believe Mr. Park would benefit significantly from cognitive behavioural therapy and social support to address the psychosocial factors contributing to his presentation.\n\nI would be grateful if your team could assess Mr. Park for psychological therapy and provide monitoring support during the medication titration period.\n\nYours sincerely,',
      difficulty: 0.6,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # OET SPEAKING — Role-Play Consultations
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'oet.sp.01', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.discuss_abstract', 'strat.oet.roleplay'],
    payload: {
      prompt: 'ROLE-PLAY: You are a nurse in a general practice clinic.\n\nSETTING: Consultation room\n\nPATIENT: Mrs. Elena Vasquez, 45 years old. Has been diagnosed with type 2 diabetes one week ago. She is anxious and confused about the diagnosis. She has come for a follow-up appointment.\n\nTASK:\n- Explain the diagnosis in simple, reassuring terms\n- Discuss lifestyle modifications (diet, exercise)\n- Address her concerns about medication (Metformin)\n- Emphasise the importance of regular monitoring\n- Show empathy throughout the consultation',
      format: 'oet_roleplay',
      cueCardPoints: [
        'Explain what type 2 diabetes means in patient-friendly language',
        'Recommend specific dietary changes and exercise goals',
        'Explain how Metformin works and common side effects',
        'Discuss blood glucose monitoring and regular check-ups',
        'Address emotional concerns with empathy and reassurance',
      ],
      followUpQuestions: [
        'What should I eat? Can I still have rice?',
        'Will I need insulin injections?',
        'My mother had diabetes and lost her eyesight. Will that happen to me?',
        'How often do I need to check my blood sugar?',
      ],
      prepTimeSeconds: 120,
      speakTimeSeconds: 300,
      targetLanguage: [
        'Patient-friendly explanations: "Your body has trouble processing sugar from food..."',
        'Empathy markers: "I understand this must be worrying for you...", "It\'s completely normal to feel..."',
        'Hedging for medication: "You may experience some...", "Most people find that..."',
        'Checking understanding: "Does that make sense?", "Do you have any questions about that?"',
      ],
      modelAnswerNotes: 'OET Speaking assesses: intelligibility, fluency, appropriateness of language, and management of the interaction. Key skills: use laypeople\'s terms (not jargon), show empathy at transition points, check understanding frequently, address concerns directly without dismissing them. Structure: greeting → agenda setting → information giving → concern addressing → summary → close.',
      difficulty: 0.6,
    },
  },
  {
    id: 'oet.sp.02', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.give_detailed_account', 'strat.oet.roleplay'],
    payload: {
      prompt: 'ROLE-PLAY: You are a physiotherapist in a rehabilitation unit.\n\nSETTING: Physiotherapy gym\n\nPATIENT: Mr. Thomas Wright, 65 years old. Had a total knee replacement 5 days ago. Reluctant to do exercises due to pain. Wants to be discharged home early.\n\nTASK:\n- Acknowledge his pain and frustration\n- Explain the importance of post-operative exercises for recovery\n- Demonstrate pain management strategies during exercise\n- Discuss realistic recovery timeline and milestones\n- Address his request for early discharge sensitively',
      format: 'oet_roleplay',
      cueCardPoints: [
        'Validate pain experience before discussing exercises',
        'Explain that movement prevents stiffness and blood clots',
        'Offer pain management options: ice, timing exercises with medication',
        'Set realistic milestones: bend to 90°, walk with frame, climb stairs',
        'Explain discharge criteria — safety requirements, not arbitrary dates',
      ],
      followUpQuestions: [
        'But it hurts when I bend my knee. How is that helping?',
        'My friend had this surgery and was home in 3 days. Why can\'t I go?',
        'What exercises should I do at home?',
        'Will I be able to play golf again?',
      ],
      prepTimeSeconds: 120,
      speakTimeSeconds: 300,
      targetLanguage: [
        'Acknowledging pain: "I can see you\'re in quite a bit of discomfort..."',
        'Motivational language: "Each small movement is progress...", "Your body is healing well..."',
        'Setting expectations: "Most patients find that by week two...", "It\'s normal to feel..."',
        'Negotiation: "What if we try...", "Would you be willing to...", "Let\'s set a goal together..."',
      ],
      modelAnswerNotes: 'This scenario tests your ability to handle a reluctant patient. Key: validate first, educate second. Never dismiss pain. Use motivational interviewing techniques: open questions, affirmation, reflective listening, summary (OARS). Frame exercises as the patient\'s pathway to their goal (going home), not as a hospital requirement.',
      difficulty: 0.6,
    },
  },
  {
    id: 'oet.sp.03', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.discuss_abstract', 'strat.oet.roleplay'],
    payload: {
      prompt: 'ROLE-PLAY: You are a pharmacist in a community pharmacy.\n\nSETTING: Pharmacy counter, private consultation area\n\nPATIENT: Ms. Priya Sharma, 28 years old. Has been prescribed a new antidepressant (Escitalopram 10mg) by her GP. She is worried about side effects and stigma. This is her first time taking psychiatric medication.\n\nTASK:\n- Explain how the medication works in simple terms\n- Discuss common initial side effects and when they typically resolve\n- Address her concerns about dependency and stigma\n- Advise on timing, food interactions, and what to avoid\n- Encourage follow-up with her GP',
      format: 'oet_roleplay',
      cueCardPoints: [
        'Explain SSRIs in accessible language: "helps restore balance of serotonin"',
        'Common early side effects: nausea, headache, sleep changes (usually settle in 1-2 weeks)',
        'Reassure: SSRIs are not addictive, should not be stopped suddenly',
        'Practical advice: take in the morning, avoid alcohol, allow 2-4 weeks for full effect',
        'Normalise treatment: "depression is a medical condition, medication is one tool"',
      ],
      followUpQuestions: [
        'Will I become addicted to these pills?',
        'I don\'t want anyone to know I\'m on antidepressants.',
        'What happens if I forget to take a dose?',
        'Can I drink alcohol while taking this?',
      ],
      prepTimeSeconds: 120,
      speakTimeSeconds: 300,
      targetLanguage: [
        'Destigmatising: "Just as you\'d take medication for high blood pressure..."',
        'Informed consent: "It\'s important you know that...", "Your doctor has chosen this because..."',
        'Safety information: "If you experience... please contact your GP immediately"',
        'Confidentiality: "Everything we discuss here is completely confidential..."',
      ],
      modelAnswerNotes: 'This tests sensitivity around mental health. Key: normalise medication for depression without minimising concerns. Don\'t lecture — involve the patient in the conversation. Acknowledge stigma as a real concern without reinforcing it. Provide written information to supplement verbal explanation. End by ensuring she has a follow-up appointment.',
      difficulty: 0.55,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # OET READING — Healthcare Passages
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'oet.rd.01', type: 'reading_passage', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument', 'strat.oet.medical_reading'],
    payload: {
      title: 'Antimicrobial Stewardship in Hospitals',
      passage: 'Antimicrobial stewardship programmes have become an essential component of modern hospital management, driven by the urgent need to combat the growing threat of antibiotic resistance. These programmes aim to optimise antibiotic prescribing by ensuring that patients receive the right drug, at the right dose, for the right duration.\n\nThe World Health Organization estimates that by 2050, antimicrobial resistance could cause 10 million deaths annually if current trends continue. In hospital settings, inappropriate antibiotic use — including unnecessary prescriptions, suboptimal dosing, and excessive treatment duration — contributes significantly to the development of resistant organisms.\n\nEffective stewardship programmes typically include several key components. Prospective audit and feedback involves infectious disease specialists reviewing antibiotic prescriptions and providing recommendations to prescribers within 24-48 hours. Formulary restriction limits the use of certain broad-spectrum antibiotics to approved indications. Clinical guidelines provide evidence-based pathways for common infections.\n\nStudies have consistently demonstrated the benefits of these programmes. A systematic review of 32 hospital-based stewardship interventions found that they reduced antibiotic consumption by an average of 22%, while simultaneously decreasing rates of Clostridioides difficile infection by 32%. Importantly, these reductions were achieved without any adverse impact on patient mortality or length of hospital stay.\n\nDespite these successes, implementing stewardship programmes faces challenges. Physician resistance to perceived restrictions on clinical autonomy, lack of trained infectious disease pharmacists, and insufficient laboratory infrastructure for rapid diagnostics remain significant barriers, particularly in low-resource settings.',
      source: 'Adapted from clinical pharmacy journal',
      questions: [
        { stem: 'According to the passage, what is the primary goal of antimicrobial stewardship?', options: ['To reduce hospital costs by using fewer medications', 'To ensure optimal antibiotic prescribing: right drug, dose, and duration', 'To prevent all hospital-acquired infections', 'To replace antibiotics with alternative therapies'], correctIndex: 1 },
        { stem: 'The systematic review mentioned in the passage found that stewardship programmes:', options: ['Increased patient mortality slightly but reduced antibiotic use', 'Reduced antibiotic consumption without harming patient outcomes', 'Were only effective in high-resource hospital settings', 'Eliminated Clostridioides difficile infections entirely'], correctIndex: 1 },
        { stem: 'Which of the following is NOT mentioned as a component of stewardship programmes?', options: ['Prospective audit and feedback', 'Patient education workshops', 'Formulary restriction', 'Clinical guidelines'], correctIndex: 1 },
        { stem: 'What is identified as a key barrier to implementing stewardship?', options: ['Patient refusal to take antibiotics', 'Physician concern about restricted clinical autonomy', 'Government regulations prohibiting stewardship', 'Excessive numbers of infectious disease pharmacists'], correctIndex: 1 },
      ],
      difficulty: 0.6,
    },
  },
  {
    id: 'oet.rd.02', type: 'reading_passage', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument', 'strat.oet.medical_reading'],
    payload: {
      title: 'Patient-Centred Care in Chronic Disease Management',
      passage: 'The shift from a disease-centred to a patient-centred model of care represents one of the most significant paradigm changes in modern healthcare. Rather than focusing exclusively on the biomedical aspects of illness, patient-centred care recognises the whole person — their values, preferences, social circumstances, and emotional needs.\n\nIn chronic disease management, this approach is particularly important. Patients with conditions such as diabetes, heart failure, or chronic obstructive pulmonary disease must manage their health on a daily basis, often for the rest of their lives. The traditional model, in which clinicians prescribe treatments and patients passively comply, has been shown to produce suboptimal outcomes.\n\nShared decision-making is a cornerstone of patient-centred chronic care. This involves clinicians presenting treatment options along with their risks and benefits, then working collaboratively with patients to reach decisions that align with individual goals and values. Research demonstrates that patients who participate in shared decision-making show better medication adherence, improved self-management behaviours, and greater satisfaction with their care.\n\nSelf-management support is another critical element. Effective programmes go beyond simply educating patients about their condition — they build confidence and practical skills through goal-setting, action planning, and problem-solving techniques. The Stanford Chronic Disease Self-Management Programme, for example, has shown improvements in exercise, symptom management, and health status across diverse populations.\n\nCritically, patient-centred care also requires attention to health literacy. Many patients struggle to understand medical information, navigate the healthcare system, or act on health advice. Clinicians must assess health literacy and adapt their communication accordingly, using plain language, teach-back methods, and visual aids to ensure understanding.',
      source: 'Adapted from healthcare management textbook',
      questions: [
        { stem: 'What is the key difference between disease-centred and patient-centred care?', options: ['Patient-centred care avoids using medical treatments', 'Patient-centred care considers values, preferences, and social context', 'Disease-centred care is always more effective clinically', 'Patient-centred care is only suitable for acute conditions'], correctIndex: 1 },
        { stem: 'Why is the traditional prescribe-and-comply model considered inadequate for chronic diseases?', options: ['Because chronic diseases cannot be treated with medication', 'Because patients must actively manage their health daily, not just follow orders', 'Because clinicians lack knowledge about chronic diseases', 'Because patients prefer not to take medication'], correctIndex: 1 },
        { stem: 'According to the passage, the "teach-back" method is used to:', options: ['Train healthcare students in clinical skills', 'Assess and improve patient understanding of health information', 'Teach patients to become healthcare professionals', 'Evaluate clinician communication skills'], correctIndex: 1 },
        { stem: 'The Stanford programme focuses on building:', options: ['Medical knowledge equivalent to a nursing degree', 'Confidence and practical self-management skills', 'Physical fitness through intensive exercise', 'Social networks among patients with similar conditions'], correctIndex: 1 },
      ],
      difficulty: 0.55,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # OET CLINICAL VOCABULARY — Gap Fill, Word Formation, MCQ
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'oet.gf.01', type: 'gap_fill', level: 'B2', skill: 'writing',
    nodeIds: ['strat.oet.clinical_vocab', 'strat.oet.letter_structure'],
    payload: {
      stem: 'I am writing to ______ Mr. Chen for ______ cardiology review. He has ______ with a three-week history of exertional chest pain. On ______, his ECG showed ST depression.',
      gaps: [
        { correctAnswer: 'refer', acceptedAlternatives: [], hint: 'verb: send a patient to a specialist' },
        { correctAnswer: 'urgent', acceptedAlternatives: ['immediate'], hint: 'adjective: needing prompt attention' },
        { correctAnswer: 'presented', acceptedAlternatives: ['attended'], hint: 'verb: came to the clinic with symptoms' },
        { correctAnswer: 'examination', acceptedAlternatives: ['assessment', 'investigation'], hint: 'noun: clinical check' },
      ],
      difficulty: 0.45,
    },
  },
  {
    id: 'oet.gf.02', type: 'gap_fill', level: 'B2', skill: 'writing',
    nodeIds: ['strat.oet.clinical_vocab', 'strat.oet.letter_structure'],
    payload: {
      stem: 'Mrs. Obi\'s post-operative ______ was uncomplicated. She is now ______ with a walking frame, bearing weight as ______. I have ______ Alendronate for her osteoporosis.',
      gaps: [
        { correctAnswer: 'recovery', acceptedAlternatives: ['course'], hint: 'noun: healing process' },
        { correctAnswer: 'mobilising', acceptedAlternatives: ['ambulating', 'walking'], hint: 'verb: moving around' },
        { correctAnswer: 'tolerated', acceptedAlternatives: [], hint: 'as much as the patient can manage' },
        { correctAnswer: 'commenced', acceptedAlternatives: ['initiated', 'started', 'prescribed'], hint: 'verb: started (formal medical)' },
      ],
      difficulty: 0.5,
    },
  },
  {
    id: 'oet.gf.03', type: 'gap_fill', level: 'B1', skill: 'general',
    nodeIds: ['strat.oet.clinical_vocab'],
    payload: {
      stem: 'The patient ______ suicidal ideation. His PHQ-9 score of 18 ______ moderately severe depression. I have ______ supportive counselling and ______ Sertraline 50mg daily.',
      gaps: [
        { correctAnswer: 'denies', acceptedAlternatives: ['denied'], hint: 'verb: says he does not have (clinical)' },
        { correctAnswer: 'indicates', acceptedAlternatives: ['suggests', 'reflects'], hint: 'verb: shows/points to' },
        { correctAnswer: 'provided', acceptedAlternatives: ['offered'], hint: 'verb: given (counselling)' },
        { correctAnswer: 'commenced', acceptedAlternatives: ['initiated', 'prescribed', 'started'], hint: 'verb: started (medication)' },
      ],
      difficulty: 0.45,
    },
  },

  {
    id: 'oet.wf.01', type: 'word_formation', level: 'B2', skill: 'writing',
    nodeIds: ['strat.oet.clinical_vocab'],
    payload: {
      stem: 'The patient\'s ______ has been managed conservatively with analgesia and physiotherapy.',
      rootWord: 'present',
      acceptedAnswers: ['presentation'],
      explanation: 'present → presentation (noun). "The patient\'s presentation" is standard medical language for describing how a patient\'s condition manifests. Used frequently in OET letters.',
      difficulty: 0.4,
    },
  },
  {
    id: 'oet.wf.02', type: 'word_formation', level: 'B2', skill: 'writing',
    nodeIds: ['strat.oet.clinical_vocab'],
    payload: {
      stem: 'A home hazard ______ has been recommended to reduce the risk of further falls.',
      rootWord: 'assess',
      acceptedAnswers: ['assessment'],
      explanation: 'assess → assessment (noun). "Assessment" is one of the most common nouns in OET writing. Home hazard assessment, risk assessment, pain assessment — learn the collocations.',
      difficulty: 0.35,
    },
  },
  {
    id: 'oet.wf.03', type: 'word_formation', level: 'B2', skill: 'writing',
    nodeIds: ['strat.oet.clinical_vocab'],
    payload: {
      stem: 'The ______ of antibiotics should be guided by culture and sensitivity results.',
      rootWord: 'prescribe',
      acceptedAnswers: ['prescription', 'prescribing'],
      explanation: 'prescribe → prescription/prescribing (noun). Both are correct: "prescription of antibiotics" (the act) or "prescribing of antibiotics" (the gerund). Used in OET reading passages about stewardship.',
      difficulty: 0.4,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # OET STRATEGY — MCQ
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'oet.strat.01', type: 'mcq', level: 'B2', skill: 'writing',
    nodeIds: ['strat.oet.letter_structure'],
    payload: {
      stem: 'In an OET referral letter, the opening paragraph should:',
      options: [
        { text: 'List all the patient\'s medications and test results', misconception: 'Medications belong in the body of the letter, not the opening' },
        { text: 'State the purpose of the letter and the main diagnosis or concern', misconception: null },
        { text: 'Include a detailed social history of the patient', misconception: 'Social history is supporting detail for the body paragraphs' },
        { text: 'Copy the case notes verbatim to ensure accuracy', misconception: 'Case notes must be transformed into connected prose, not copied' },
      ],
      correctIndex: 1,
      difficulty: 0.35,
    },
  },
  {
    id: 'oet.strat.02', type: 'mcq', level: 'B2', skill: 'speaking',
    nodeIds: ['strat.oet.roleplay'],
    payload: {
      stem: 'When an OET role-play patient expresses anxiety about their diagnosis, the BEST initial response is:',
      options: [
        { text: 'Immediately provide detailed medical information to educate them', misconception: 'Information overload when a patient is anxious worsens the situation' },
        { text: 'Tell them not to worry because the condition is common', misconception: 'Dismissing concerns with "don\'t worry" fails to validate their feelings' },
        { text: 'Acknowledge their feelings first, then provide reassurance and information', misconception: null },
        { text: 'Redirect the conversation to the physical examination results', misconception: 'Ignoring emotional cues is a major communication failure in OET' },
      ],
      correctIndex: 2,
      difficulty: 0.35,
    },
  },
  {
    id: 'oet.strat.03', type: 'mcq', level: 'B2', skill: 'writing',
    nodeIds: ['strat.oet.letter_structure'],
    payload: {
      stem: 'Which of the following is the MOST appropriate way to transform "BP 150/95, HR 88" in an OET letter?',
      options: [
        { text: 'BP 150/95, HR 88', misconception: 'Abbreviations from case notes should be expanded into full sentences' },
        { text: 'His blood pressure was elevated at 150 over 95 mmHg with a heart rate of 88 beats per minute', misconception: null },
        { text: 'The patient\'s blood pressure and heart rate were abnormal', misconception: 'Too vague — the letter needs specific values for the receiving clinician' },
        { text: 'Blood pressure: high. Heart rate: normal.', misconception: 'Fragment style is not acceptable in formal medical correspondence' },
      ],
      correctIndex: 1,
      difficulty: 0.4,
    },
  },
  {
    id: 'oet.strat.04', type: 'mcq', level: 'B1', skill: 'general',
    nodeIds: ['strat.oet.clinical_vocab'],
    payload: {
      stem: 'In medical correspondence, "commenced" is the formal equivalent of:',
      options: [
        { text: 'Completed', misconception: '"Completed" means finished, not started' },
        { text: 'Started', misconception: null },
        { text: 'Discontinued', misconception: '"Discontinued" means stopped, the opposite of commenced' },
        { text: 'Increased', misconception: '"Increased" means raised the dose, not started' },
      ],
      correctIndex: 1,
      difficulty: 0.25,
    },
  },
  {
    id: 'oet.strat.05', type: 'mcq', level: 'B2', skill: 'reading',
    nodeIds: ['strat.oet.medical_reading'],
    payload: {
      stem: 'In OET Reading Part A, the key skill being tested is:',
      options: [
        { text: 'Memorising medical terminology from textbooks', misconception: 'Part A tests information location skills, not memorisation' },
        { text: 'Quickly locating specific information across multiple short texts', misconception: null },
        { text: 'Writing detailed summaries of medical research articles', misconception: 'Writing is tested in a separate OET sub-test' },
        { text: 'Critically analysing the methodology of research studies', misconception: 'Critical analysis is more relevant to Part C, not Part A' },
      ],
      correctIndex: 1,
      difficulty: 0.3,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # OET ERROR CORRECTION — Common Clinical Writing Mistakes
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'oet.ec.01', type: 'error_correction', level: 'B2', skill: 'writing',
    nodeIds: ['strat.oet.letter_structure', 'strat.oet.clinical_vocab'],
    payload: {
      sentence: 'I am writing to refer the above mentioned patient who is having diabetes since 10 years.',
      errorPart: 'is having diabetes since 10 years',
      correction: 'has had diabetes for ten years',
      explanation: '"Is having" is incorrect — diabetes is a state, not an action (stative verb rule). Use present perfect: "has had". "Since" requires a point in time (since 2016), while "for" is used with a duration (for ten years). Both errors are extremely common in OET writing.',
      difficulty: 0.45,
    },
  },
  {
    id: 'oet.ec.02', type: 'error_correction', level: 'B2', skill: 'writing',
    nodeIds: ['strat.oet.letter_structure'],
    payload: {
      sentence: 'Kindly do the needful and arrange an appointment at your earliest convenience.',
      errorPart: 'Kindly do the needful',
      correction: 'I would be grateful if you could',
      explanation: '"Do the needful" is considered outdated and overly informal in modern medical correspondence. The appropriate formal request uses: "I would be grateful if you could..." or "I would appreciate it if you could..." — these are standard OET letter register.',
      difficulty: 0.4,
    },
  },
  {
    id: 'oet.ec.03', type: 'error_correction', level: 'B2', skill: 'writing',
    nodeIds: ['strat.oet.clinical_vocab'],
    payload: {
      sentence: 'The patient was prescribed with Metformin and was adviced to follow a low-sugar diet.',
      errorPart: 'adviced',
      correction: 'advised',
      explanation: '"Adviced" does not exist in English — "advise" is the verb, "advice" is the noun. Also: "prescribed with" should be "prescribed" (no preposition needed with this verb). Two common OET errors in one sentence.',
      difficulty: 0.35,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # OET MATCHING — Medical Terminology
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'oet.mt.01', type: 'matching', level: 'B1', skill: 'general',
    nodeIds: ['strat.oet.clinical_vocab'],
    payload: {
      stem: 'Match each medical abbreviation with its full form as used in clinical correspondence.',
      pairs: [
        { left: 'OD', right: 'Once daily' },
        { left: 'BD', right: 'Twice daily' },
        { left: 'QDS', right: 'Four times daily' },
        { left: 'PRN', right: 'As required' },
        { left: 'SC', right: 'Subcutaneous' },
      ],
      difficulty: 0.3,
    },
  },
  {
    id: 'oet.mt.02', type: 'matching', level: 'B2', skill: 'general',
    nodeIds: ['strat.oet.clinical_vocab'],
    payload: {
      stem: 'Match each clinical term with its patient-friendly equivalent — the language you would use when speaking to patients.',
      pairs: [
        { left: 'Hypertension', right: 'High blood pressure' },
        { left: 'Myocardial infarction', right: 'Heart attack' },
        { left: 'Dyspnoea', right: 'Difficulty breathing' },
        { left: 'Pyrexia', right: 'Fever / high temperature' },
        { left: 'Oedema', right: 'Swelling' },
      ],
      difficulty: 0.35,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # OET DIALOGUE COMPLETION — Clinical Conversations
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'oet.dc.01', type: 'dialogue_completion', level: 'B2', skill: 'speaking',
    nodeIds: ['strat.oet.roleplay', 'strat.oet.clinical_vocab'],
    payload: {
      stem: 'Complete the missing lines in this nurse-patient consultation about medication side effects.',
      lines: [
        { speaker: 'Patient', text: 'Nurse, I\'ve been feeling nauseous since I started this new medication. Is that normal?' },
        { speaker: 'Nurse', text: null, acceptedAnswers: ['I understand that must be unpleasant', 'I\'m sorry to hear that', 'That must be uncomfortable for you'], hint: 'Acknowledge the patient\'s concern with empathy' },
        { speaker: 'Patient', text: 'Yes, it\'s really bothering me. Should I stop taking it?' },
        { speaker: 'Nurse', text: null, acceptedAnswers: ['I wouldn\'t recommend stopping without speaking to your doctor', 'It\'s important not to stop suddenly', 'Please don\'t stop taking it without consulting your doctor first'], hint: 'Advise against stopping medication independently' },
        { speaker: 'Patient', text: 'Okay, but how long will the nausea last?' },
        { speaker: 'Nurse', text: null, acceptedAnswers: ['These side effects usually settle within the first one to two weeks', 'Most patients find it improves after a week or two', 'It typically gets better as your body adjusts'], hint: 'Provide reassurance about the timeline' },
      ],
      difficulty: 0.5,
    },
  },
  {
    id: 'oet.dc.02', type: 'dialogue_completion', level: 'B2', skill: 'speaking',
    nodeIds: ['strat.oet.roleplay'],
    payload: {
      stem: 'Complete the missing lines in this physiotherapist-patient consultation about post-surgical rehabilitation.',
      lines: [
        { speaker: 'Patient', text: 'I don\'t want to do the exercises today. My knee is killing me.' },
        { speaker: 'Physiotherapist', text: null, acceptedAnswers: ['I can see you\'re in a lot of pain', 'I understand the pain must be very frustrating', 'I appreciate that it\'s very painful right now'], hint: 'Validate the patient\'s pain experience' },
        { speaker: 'Patient', text: 'Why can\'t I just rest until it heals?' },
        { speaker: 'Physiotherapist', text: null, acceptedAnswers: ['Movement is actually essential for healing', 'Gentle exercise helps prevent stiffness and promotes blood flow', 'Rest alone can cause the joint to stiffen'], hint: 'Explain why movement helps recovery' },
        { speaker: 'Patient', text: 'But it hurts every time I bend it.' },
        { speaker: 'Physiotherapist', text: null, acceptedAnswers: ['What if we try some gentle exercises with ice afterwards', 'We could time the exercises with your pain medication', 'Let\'s start with smaller movements and build up gradually'], hint: 'Offer a pain management strategy' },
      ],
      difficulty: 0.5,
    },
  },
]
