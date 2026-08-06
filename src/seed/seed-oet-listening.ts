// # OET Listening — fills the complete gap in OET listening content.
// # All content is original and copyright-free, modelled on OET format:
// # Part A: consultation extracts (gap-fill note completion)
// # Part B: workplace communication (MCQ)
// # Part C: professional presentation/lecture (MCQ)
// # Topics use realistic but fictional healthcare scenarios.

import type { UnifiedSeedItem } from './run-seed'

export const SEED_OET_LISTENING: UnifiedSeedItem[] = [
  // # ─── PART A: Consultation Note Completion (10) ─────────────────────
  // # Learner listens to a doctor-patient consultation and fills gaps
  // # in clinical notes. Tests extraction of key medical details.
  {
    id: 'item.oet.l.01', type: 'gap_fill', level: 'B2', skill: 'listening',
    nodeIds: ['strat.oet.listening_notes'],
    payload: {
      stem: 'Patient consultation notes — Presenting complaint: The patient reports persistent ______ in the lower back for the past three weeks.',
      gaps: [{ index: 0, acceptedAnswers: ['pain', 'aching', 'discomfort', 'soreness'], hint: 'A symptom — an unpleasant physical sensation' }],
      difficulty: 0.3,
    },
  },
  {
    id: 'item.oet.l.02', type: 'gap_fill', level: 'B2', skill: 'listening',
    nodeIds: ['strat.oet.listening_notes'],
    payload: {
      stem: 'Patient consultation notes — Medical history: The patient was diagnosed with Type 2 ______ approximately five years ago and is currently managed with metformin.',
      gaps: [{ index: 0, acceptedAnswers: ['diabetes', 'diabetes mellitus'], hint: 'A chronic metabolic condition' }],
      difficulty: 0.25,
    },
  },
  {
    id: 'item.oet.l.03', type: 'gap_fill', level: 'B2', skill: 'listening',
    nodeIds: ['strat.oet.listening_notes'],
    payload: {
      stem: 'Patient consultation notes — Allergies: The patient reports a known allergy to ______, which causes a skin rash and mild swelling.',
      gaps: [{ index: 0, acceptedAnswers: ['penicillin', 'amoxicillin'], hint: 'A common antibiotic' }],
      difficulty: 0.3,
    },
  },
  {
    id: 'item.oet.l.04', type: 'gap_fill', level: 'B2', skill: 'listening',
    nodeIds: ['strat.oet.listening_notes'],
    payload: {
      stem: 'Patient consultation notes — Vital signs: Blood pressure recorded at 145/92, which is classified as Stage ______ hypertension.',
      gaps: [{ index: 0, acceptedAnswers: ['1', 'one', 'I'], hint: 'A number — the stage of hypertension (140-159/90-99)' }],
      difficulty: 0.4,
    },
  },
  {
    id: 'item.oet.l.05', type: 'gap_fill', level: 'B2', skill: 'listening',
    nodeIds: ['strat.oet.listening_notes'],
    payload: {
      stem: 'Patient consultation notes — Social history: The patient reports smoking approximately ______ cigarettes per day for the past twelve years.',
      gaps: [{ index: 0, acceptedAnswers: ['ten', '10', 'fifteen', '15', 'twenty', '20'], hint: 'A number — daily cigarette consumption' }],
      difficulty: 0.25,
    },
  },
  {
    id: 'item.oet.l.06', type: 'gap_fill', level: 'B2', skill: 'listening',
    nodeIds: ['strat.oet.listening_notes'],
    payload: {
      stem: 'Patient consultation notes — Current medication: The patient takes ______ 10mg once daily for cholesterol management, started six months ago.',
      gaps: [{ index: 0, acceptedAnswers: ['atorvastatin', 'simvastatin', 'rosuvastatin'], hint: 'A statin medication for cholesterol' }],
      difficulty: 0.45,
    },
  },
  {
    id: 'item.oet.l.07', type: 'gap_fill', level: 'B2', skill: 'listening',
    nodeIds: ['strat.oet.listening_notes'],
    payload: {
      stem: 'Patient consultation notes — Symptoms: The patient describes episodes of ______ and lightheadedness, particularly when standing up quickly.',
      gaps: [{ index: 0, acceptedAnswers: ['dizziness', 'vertigo', 'faintness'], hint: 'A sensation of unsteadiness or spinning' }],
      difficulty: 0.3,
    },
  },
  {
    id: 'item.oet.l.08', type: 'gap_fill', level: 'B2', skill: 'listening',
    nodeIds: ['strat.oet.listening_notes'],
    payload: {
      stem: 'Patient consultation notes — Investigation plan: The doctor has ordered a full ______ count and thyroid function tests to rule out underlying causes.',
      gaps: [{ index: 0, acceptedAnswers: ['blood', 'blood cell'], hint: 'A routine laboratory test — full ___ count (FBC)' }],
      difficulty: 0.3,
    },
  },
  {
    id: 'item.oet.l.09', type: 'gap_fill', level: 'B2', skill: 'listening',
    nodeIds: ['strat.oet.listening_notes'],
    payload: {
      stem: 'Patient consultation notes — Referral: The GP is referring the patient to the ______ department for further assessment of the persistent joint swelling.',
      gaps: [{ index: 0, acceptedAnswers: ['rheumatology', 'orthopaedic', 'orthopedic'], hint: 'A medical specialty dealing with joints and musculoskeletal conditions' }],
      difficulty: 0.4,
    },
  },
  {
    id: 'item.oet.l.10', type: 'gap_fill', level: 'B2', skill: 'listening',
    nodeIds: ['strat.oet.listening_notes'],
    payload: {
      stem: 'Patient consultation notes — Follow-up: The patient is advised to return in ______ weeks for a review appointment and repeat blood pressure measurement.',
      gaps: [{ index: 0, acceptedAnswers: ['two', '2', 'four', '4', 'six', '6'], hint: 'A number — the follow-up interval in weeks' }],
      difficulty: 0.2,
    },
  },

  // # ─── PART B: Workplace Communication MCQ (8) ──────────────────────
  // # Short workplace exchanges between healthcare professionals.
  // # Tests understanding of instructions, handover information, protocols.
  {
    id: 'item.oet.l.11', type: 'mcq', level: 'B2', skill: 'listening',
    nodeIds: ['strat.oet.listening_notes', 'cando.b2.understand_discussion'],
    payload: {
      stem: 'A nurse says to a colleague during handover: "Mrs Patel in bed 4 is nil by mouth from midnight — she\'s first on the list for a cholecystectomy tomorrow morning. Her bloods are back and all within normal range, but she\'s quite anxious so I\'ve documented that in her care plan." What is Mrs Patel having done tomorrow?',
      options: [
        { text: 'Gallbladder removal surgery', misconception: null },
        { text: 'A blood transfusion', misconception: 'Confuses blood test results with a transfusion' },
        { text: 'A mental health assessment', misconception: 'Misinterprets "anxious" as the primary concern rather than a secondary note' },
        { text: 'A dietary consultation', misconception: 'Misinterprets "nil by mouth" as a nutrition issue rather than pre-surgical protocol' },
      ],
      correctIndex: 0,
      difficulty: 0.4,
    },
  },
  {
    id: 'item.oet.l.12', type: 'mcq', level: 'B2', skill: 'listening',
    nodeIds: ['strat.oet.listening_notes'],
    payload: {
      stem: 'A pharmacist tells a nurse: "The patient in Room 12 has been prescribed tramadol 50mg four times daily, but given his reduced renal function, I\'d recommend reducing that to twice daily and monitoring for sedation." The pharmacist is concerned about:',
      options: [
        { text: 'The dose being too high for the patient\'s kidney function', misconception: null },
        { text: 'The medication being the wrong type entirely', misconception: 'The pharmacist recommends dose reduction, not a medication change' },
        { text: 'The nurse administering the medication incorrectly', misconception: 'The concern is about the prescription, not administration technique' },
        { text: 'The patient refusing the medication', misconception: 'No mention of patient refusal' },
      ],
      correctIndex: 0,
      difficulty: 0.35,
    },
  },
  {
    id: 'item.oet.l.13', type: 'mcq', level: 'B2', skill: 'listening',
    nodeIds: ['strat.oet.listening_notes'],
    payload: {
      stem: 'A senior doctor says: "We need to escalate Mr Thompson\'s care. His oxygen saturations have dropped to 88% on room air, his respiratory rate is 28, and he\'s becoming increasingly confused. Can you put out a call to the medical emergency team?" What is the most concerning aspect?',
      options: [
        { text: 'The patient is deteriorating with multiple abnormal observations', misconception: null },
        { text: 'The patient needs a routine check-up', misconception: 'Emergency team escalation is not routine' },
        { text: 'The patient wants to leave the hospital', misconception: 'Confusion here is a clinical sign, not a discharge request' },
        { text: 'The doctor is asking for a second opinion on a diagnosis', misconception: 'This is an emergency escalation, not a consultation request' },
      ],
      correctIndex: 0,
      difficulty: 0.35,
    },
  },
  {
    id: 'item.oet.l.14', type: 'mcq', level: 'B2', skill: 'listening',
    nodeIds: ['strat.oet.listening_notes'],
    payload: {
      stem: 'A physiotherapist says to a patient: "I know it\'s uncomfortable, but I need you to try bending your knee a little further each day. The goal is to reach 90 degrees of flexion by your next appointment in two weeks. If you experience any sharp pain or swelling, stop immediately and contact us." What should the patient do if there is sharp pain?',
      options: [
        { text: 'Stop the exercise and contact the physiotherapy team', misconception: null },
        { text: 'Push through the pain to reach the target', misconception: 'Directly contradicts the safety instruction' },
        { text: 'Wait until the next appointment to report it', misconception: 'The instruction says to contact them immediately, not wait' },
        { text: 'Apply ice and continue exercising', misconception: 'The instruction is to stop, not continue with modification' },
      ],
      correctIndex: 0,
      difficulty: 0.25,
    },
  },
  {
    id: 'item.oet.l.15', type: 'mcq', level: 'B2', skill: 'listening',
    nodeIds: ['strat.oet.listening_notes', 'strat.oet.clinical_vocab'],
    payload: {
      stem: 'A ward manager announces: "Just a reminder that the infection control audit is next Thursday. Please ensure all hand hygiene stations are fully stocked, clinical waste bins are not overflowing, and personal protective equipment is being used in accordance with the protocol. Any areas of non-compliance will need an action plan within 48 hours." What happens if non-compliance is found?',
      options: [
        { text: 'An action plan must be submitted within 48 hours', misconception: null },
        { text: 'Staff will be immediately suspended', misconception: 'The consequence is an action plan, not suspension' },
        { text: 'The audit will be postponed', misconception: 'Non-compliance triggers action plans, not postponement' },
        { text: 'Nothing — it is just a reminder', misconception: 'The 48-hour action plan requirement is a concrete consequence' },
      ],
      correctIndex: 0,
      difficulty: 0.3,
    },
  },
  {
    id: 'item.oet.l.16', type: 'mcq', level: 'B2', skill: 'listening',
    nodeIds: ['strat.oet.listening_notes'],
    payload: {
      stem: 'A doctor tells a medical student: "When taking a history from an elderly patient, remember to ask about falls. It\'s one of the most commonly overlooked areas. Ask how many falls they\'ve had in the past twelve months, whether they\'ve sustained any injuries, and what their home environment is like — loose rugs, poor lighting, stairs without handrails." Why does the doctor mention home environment?',
      options: [
        { text: 'Environmental hazards at home are common causes of falls in elderly patients', misconception: null },
        { text: 'The patient needs to move to a care home', misconception: 'The question is about risk assessment, not relocation' },
        { text: 'The doctor wants to visit the patient\'s home', misconception: 'The purpose is history-taking, not a home visit' },
        { text: 'It is a legal requirement to inspect the home', misconception: 'It is clinical best practice, not a legal requirement' },
      ],
      correctIndex: 0,
      difficulty: 0.3,
    },
  },
  {
    id: 'item.oet.l.17', type: 'mcq', level: 'B2', skill: 'listening',
    nodeIds: ['strat.oet.listening_notes'],
    payload: {
      stem: 'A dietitian explains to a colleague: "I\'ve assessed the patient in bed 7. She\'s been on total parenteral nutrition for five days post-operatively, but her bowel sounds have returned and she tolerated sips of water yesterday. I\'m recommending we transition her to a clear fluid diet today and advance as tolerated." What indicates the patient is ready to eat again?',
      options: [
        { text: 'Her bowel sounds have returned and she tolerated water', misconception: null },
        { text: 'She has been on parenteral nutrition long enough', misconception: 'Duration alone is not the clinical indicator — bowel function is' },
        { text: 'She asked for food', misconception: 'Patient request is not the clinical indicator mentioned' },
        { text: 'Her surgery wound has healed', misconception: 'Wound healing is not mentioned as the deciding factor' },
      ],
      correctIndex: 0,
      difficulty: 0.4,
    },
  },
  {
    id: 'item.oet.l.18', type: 'mcq', level: 'B2', skill: 'listening',
    nodeIds: ['strat.oet.listening_notes'],
    payload: {
      stem: 'A charge nurse says during a briefing: "We\'ve had two incidents of medication errors this month — both involved look-alike, sound-alike drugs. From today, I want every nurse to use the full generic name when requesting medications, not abbreviations, and to perform the five rights check at the bedside, not at the medication trolley." What change is being implemented?',
      options: [
        { text: 'Using full generic drug names and doing safety checks at the bedside', misconception: null },
        { text: 'Stopping all medication administration temporarily', misconception: 'The instruction is to improve the process, not halt it' },
        { text: 'Replacing all medications with different brands', misconception: 'The change is about naming and checking procedures, not medications themselves' },
        { text: 'Adding a pharmacist to every medication round', misconception: 'Pharmacist involvement is not mentioned in the new procedure' },
      ],
      correctIndex: 0,
      difficulty: 0.35,
    },
  },

  // # ─── PART C: Professional Presentation MCQ (6) ────────────────────
  // # Longer academic-style healthcare presentations. Tests understanding
  // # of main ideas, supporting details, and speaker attitude.
  {
    id: 'item.oet.l.19', type: 'mcq', level: 'B2', skill: 'listening',
    nodeIds: ['strat.oet.listening_notes', 'cando.b2.understand_discussion'],
    payload: {
      stem: 'A consultant says in a teaching session: "Antibiotic resistance is arguably the greatest threat to modern medicine. We\'re seeing infections that would have been easily treated twenty years ago now requiring last-resort antibiotics. The problem is largely driven by overprescription — prescribing antibiotics for viral infections where they have no therapeutic value — and incomplete courses, where patients stop taking the medication once they feel better." According to the speaker, what are the two main causes of antibiotic resistance?',
      options: [
        { text: 'Overprescription for viral infections and patients not finishing courses', misconception: null },
        { text: 'Manufacturing defects and storage problems', misconception: 'Not mentioned — the causes are behavioural, not manufacturing-related' },
        { text: 'Too few new antibiotics being developed and high costs', misconception: 'While true, these are not the causes the speaker identifies' },
        { text: 'Patients taking too many vitamins and poor diet', misconception: 'Unrelated to the antibiotic resistance mechanisms described' },
      ],
      correctIndex: 0,
      difficulty: 0.35,
    },
  },
  {
    id: 'item.oet.l.20', type: 'mcq', level: 'B2', skill: 'listening',
    nodeIds: ['strat.oet.listening_notes', 'cando.b2.understand_discussion'],
    payload: {
      stem: 'A public health researcher presents: "Our study followed 12,000 participants over eight years. Those who engaged in at least 150 minutes of moderate physical activity per week had a 35% lower risk of cardiovascular events compared to the sedentary group. Interestingly, the benefit plateaued beyond 300 minutes — additional exercise did not confer proportionally greater protection." What does "plateaued" mean in this context?',
      options: [
        { text: 'The benefit stopped increasing beyond a certain point', misconception: null },
        { text: 'The risk of heart disease increased dramatically', misconception: 'Opposite — the benefit levelled off but risk did not increase' },
        { text: 'The participants stopped exercising', misconception: 'Plateau refers to the benefit curve, not participant behaviour' },
        { text: 'The study ended prematurely', misconception: 'Plateau describes a data finding, not the study timeline' },
      ],
      correctIndex: 0,
      difficulty: 0.4,
    },
  },
  {
    id: 'item.oet.l.21', type: 'mcq', level: 'B2', skill: 'listening',
    nodeIds: ['strat.oet.listening_notes', 'cando.b2.understand_discussion'],
    payload: {
      stem: 'A mental health specialist says: "We need to move away from the idea that recovery from depression is linear. Patients often experience setbacks, and these are a normal part of the recovery process, not a sign of failure. Our role is to help patients understand that a bad week doesn\'t erase months of progress." The speaker\'s main message is:',
      options: [
        { text: 'Recovery from depression involves setbacks which are normal and expected', misconception: null },
        { text: 'Depression cannot be treated effectively', misconception: 'The speaker advocates recovery, not hopelessness' },
        { text: 'Patients should not seek help during setbacks', misconception: 'The opposite — professionals should support patients through setbacks' },
        { text: 'Linear recovery is the most common pattern', misconception: 'The speaker explicitly says recovery is NOT linear' },
      ],
      correctIndex: 0,
      difficulty: 0.3,
    },
  },
  {
    id: 'item.oet.l.22', type: 'mcq', level: 'B2', skill: 'listening',
    nodeIds: ['strat.oet.listening_notes', 'cando.b2.understand_discussion'],
    payload: {
      stem: 'A geriatric specialist presents: "Polypharmacy — defined as the concurrent use of five or more medications — affects approximately 40% of patients over 65. While each medication may be individually justified, the cumulative risk of adverse drug interactions increases exponentially with each additional drug. A thorough medication review, ideally conducted annually, can often identify medications that are no longer necessary or that could be consolidated." What does the speaker recommend?',
      options: [
        { text: 'Annual medication reviews to identify unnecessary or combinable drugs', misconception: null },
        { text: 'Stopping all medications for elderly patients', misconception: 'The recommendation is targeted review, not blanket cessation' },
        { text: 'Limiting all patients to exactly five medications', misconception: 'The definition of polypharmacy is not a prescribed limit' },
        { text: 'Prescribing more medications to cover interaction risks', misconception: 'Adding more drugs would worsen the problem the speaker describes' },
      ],
      correctIndex: 0,
      difficulty: 0.35,
    },
  },
  {
    id: 'item.oet.l.23', type: 'mcq', level: 'B2', skill: 'listening',
    nodeIds: ['strat.oet.listening_notes'],
    payload: {
      stem: 'A nurse educator says: "Cultural competence in healthcare isn\'t about memorising facts about different cultures — it\'s about developing an attitude of humility and curiosity. Every patient is an individual, and making assumptions based on their cultural background can be just as harmful as ignoring culture altogether. The key skill is asking open-ended questions and truly listening to the answers." The speaker believes cultural competence is primarily about:',
      options: [
        { text: 'An attitude of humility, curiosity, and active listening', misconception: null },
        { text: 'Learning facts about every world culture', misconception: 'The speaker explicitly says it is NOT about memorising cultural facts' },
        { text: 'Treating all patients exactly the same regardless of background', misconception: 'The speaker advocates acknowledging culture, not ignoring it' },
        { text: 'Only working with patients from your own culture', misconception: 'Contradicts the entire point about cross-cultural care' },
      ],
      correctIndex: 0,
      difficulty: 0.3,
    },
  },
  {
    id: 'item.oet.l.24', type: 'mcq', level: 'B2', skill: 'listening',
    nodeIds: ['strat.oet.listening_notes', 'cando.b2.understand_discussion'],
    payload: {
      stem: 'A surgeon explains in a ward round: "The CT scan shows a 3-centimetre mass in the right lobe of the liver. The margins are well-defined, and there\'s no evidence of vascular invasion. Given the patient\'s age and overall fitness, I\'m recommending a partial hepatectomy. We\'ll need to discuss this with the MDT on Thursday before proceeding." What must happen before surgery?',
      options: [
        { text: 'The case must be discussed at a multidisciplinary team meeting', misconception: null },
        { text: 'The patient must have another CT scan', misconception: 'A scan has already been done — the next step is MDT discussion' },
        { text: 'The surgeon needs to consult a more senior colleague', misconception: 'MDT is a team meeting, not an individual senior consultation' },
        { text: 'The patient must be transferred to another hospital', misconception: 'No transfer is mentioned — the MDT meets at the same hospital' },
      ],
      correctIndex: 0,
      difficulty: 0.4,
    },
  },
]
