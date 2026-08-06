// # OET Reading boost — adds healthcare-themed reading passages and MCQs.
// # OET Reading Part A: expeditious reading (skimming healthcare texts)
// # OET Reading Part C: careful reading (detailed comprehension)
// # All content is original and copyright-free, using realistic but
// # fictional medical scenarios and healthcare topics.

import type { UnifiedSeedItem } from './run-seed'

export const SEED_OET_READING_BOOST: UnifiedSeedItem[] = [
  // # ─── Part A Style: Healthcare Information Texts (4) ────────────────
  // # Short factual healthcare texts testing ability to locate specific
  // # information quickly (expeditious reading).
  {
    id: 'item.oet.rb.01', type: 'reading_passage', level: 'B2', skill: 'reading',
    nodeIds: ['strat.oet.medical_reading', 'cando.b2.understand_argument'],
    payload: {
      title: 'Patient Information: Managing Type 2 Diabetes',
      passage: 'Type 2 diabetes is a chronic condition in which the body becomes resistant to insulin or does not produce enough of it. Unlike Type 1 diabetes, which is an autoimmune condition typically diagnosed in childhood, Type 2 diabetes develops gradually and is strongly associated with lifestyle factors including obesity, physical inactivity, and poor diet.\n\nManagement of Type 2 diabetes typically involves a combination of lifestyle modifications and medication. Patients are advised to maintain a balanced diet rich in whole grains, vegetables, and lean protein while limiting refined sugars and saturated fats. Regular physical activity — at least 150 minutes of moderate exercise per week — has been shown to improve insulin sensitivity significantly.\n\nFirst-line pharmacological treatment is usually metformin, which works by reducing glucose production in the liver and improving the body\'s sensitivity to insulin. Common side effects include gastrointestinal disturbance, particularly during the first few weeks of treatment. If metformin alone is insufficient to achieve target blood glucose levels, additional medications such as sulfonylureas, DPP-4 inhibitors, or GLP-1 receptor agonists may be prescribed.\n\nBlood glucose monitoring is essential. Patients are typically advised to have their HbA1c levels tested every three to six months. An HbA1c level below 48 mmol/mol (6.5%) is generally considered well-controlled. Levels consistently above 58 mmol/mol (7.5%) may indicate the need for treatment adjustment.\n\nComplications of poorly controlled diabetes include cardiovascular disease, nephropathy, retinopathy, and peripheral neuropathy. Annual screening for these complications — including eye examinations, kidney function tests, and foot assessments — is recommended for all patients with diabetes.',
      questions: [
        { id: 'q1', questionType: 'mcq', text: 'What is the first-line medication for Type 2 diabetes?', options: ['Insulin injections', 'Sulfonylureas', 'Metformin', 'GLP-1 receptor agonists'], correctAnswer: 2, explanation: 'The passage states "first-line pharmacological treatment is usually metformin."' },
        { id: 'q2', questionType: 'mcq', text: 'How often should HbA1c be tested?', options: ['Weekly', 'Monthly', 'Every 3-6 months', 'Once a year'], correctAnswer: 2, explanation: 'Patients are advised to have HbA1c tested "every three to six months."' },
        { id: 'q3', questionType: 'tfng', text: 'An HbA1c level of 55 mmol/mol indicates poorly controlled diabetes.', options: ['True', 'False', 'Not Given'], correctAnswer: 2, explanation: 'The passage gives thresholds of 48 (well-controlled) and 58 (needs adjustment). 55 falls between — the passage does not classify this specific level.' },
        { id: 'q4', questionType: 'mcq', text: 'Which annual screenings are recommended?', options: ['Only eye examinations', 'Eye examinations, kidney function tests, and foot assessments', 'Blood pressure checks only', 'Lung function tests'], correctAnswer: 1, explanation: 'The passage lists "eye examinations, kidney function tests, and foot assessments."' },
      ],
      difficulty: 0.4,
    },
  },
  {
    id: 'item.oet.rb.02', type: 'reading_passage', level: 'B2', skill: 'reading',
    nodeIds: ['strat.oet.medical_reading'],
    payload: {
      title: 'Clinical Guidelines: Post-Operative Pain Management',
      passage: 'Effective post-operative pain management is essential for patient recovery, early mobilisation, and prevention of chronic pain syndromes. Current evidence supports a multimodal approach combining pharmacological and non-pharmacological strategies.\n\nThe World Health Organisation\'s analgesic ladder provides a framework for pharmacological management. Step 1 involves non-opioid analgesics such as paracetamol (1g four times daily, maximum 4g in 24 hours) and NSAIDs such as ibuprofen (400mg three times daily with food). Step 2 adds weak opioids such as codeine or tramadol for moderate pain. Step 3 employs strong opioids such as morphine or oxycodone for severe pain.\n\nRegional anaesthesia techniques, including nerve blocks and epidural analgesia, offer targeted pain relief while reducing systemic opioid requirements. These techniques are particularly valuable in orthopaedic, thoracic, and abdominal surgery.\n\nNon-pharmacological interventions should be integrated from the outset. These include positioning and elevation of the affected area, application of ice packs (20 minutes on, 20 minutes off), guided breathing exercises, and early mobilisation where clinically appropriate.\n\nPain assessment should be conducted regularly using a validated tool such as the Numerical Rating Scale (NRS), where the patient rates their pain from 0 (no pain) to 10 (worst possible pain). Pain at rest should ideally be maintained below 3/10 and pain on movement below 5/10. All pain scores and interventions should be documented in the patient\'s clinical record.\n\nPatients should be educated about the importance of reporting pain early, the expected trajectory of post-operative pain, and the potential side effects of analgesic medications, including constipation, nausea, and drowsiness with opioid use.',
      questions: [
        { id: 'q1', questionType: 'mcq', text: 'What is the maximum daily dose of paracetamol?', options: ['1g', '2g', '4g', '8g'], correctAnswer: 2, explanation: 'The passage states "maximum 4g in 24 hours."' },
        { id: 'q2', questionType: 'mcq', text: 'On the NRS pain scale, what should pain at rest ideally be below?', options: ['1/10', '3/10', '5/10', '7/10'], correctAnswer: 1, explanation: 'The passage states "pain at rest should ideally be maintained below 3/10."' },
        { id: 'q3', questionType: 'mcq', text: 'What is the recommended ice pack application pattern?', options: ['Continuous application', '20 minutes on, 20 minutes off', '10 minutes every hour', 'Once daily for 30 minutes'], correctAnswer: 1, explanation: 'The passage recommends "20 minutes on, 20 minutes off."' },
        { id: 'q4', questionType: 'tfng', text: 'Regional anaesthesia eliminates the need for all other pain medication.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'Regional anaesthesia reduces "systemic opioid requirements" but does not eliminate all medication — a multimodal approach is recommended.' },
      ],
      difficulty: 0.45,
    },
  },
  {
    id: 'item.oet.rb.03', type: 'reading_passage', level: 'B2', skill: 'reading',
    nodeIds: ['strat.oet.medical_reading', 'cando.b2.understand_argument'],
    payload: {
      title: 'Antimicrobial Stewardship in Hospitals',
      passage: 'Antimicrobial stewardship programmes aim to optimise the use of antimicrobial agents in healthcare settings. The central objective is to ensure that patients receive the right antibiotic, at the right dose, via the right route, for the right duration — while minimising the development of resistance and reducing unnecessary costs.\n\nThe scale of the problem is considerable. Studies estimate that up to 50% of antibiotic prescriptions in hospitals are unnecessary or inappropriate. Common errors include prescribing broad-spectrum antibiotics when a narrow-spectrum agent would suffice, continuing intravenous antibiotics when oral alternatives are available, and failing to review antibiotic prescriptions after 48-72 hours when culture and sensitivity results become available.\n\nEffective stewardship programmes typically include several key components. Prospective audit and feedback involves a specialist team reviewing antibiotic prescriptions and providing real-time recommendations to prescribers. Formulary restriction limits the availability of certain high-risk antibiotics to specialist approval only. Clinical guidelines provide evidence-based recommendations for common infections.\n\nEducation is a cornerstone of stewardship. Studies consistently show that educational interventions — including interactive workshops, case-based learning, and regular feedback on prescribing patterns — produce sustained improvements in antibiotic use. In one multicentre trial, a combined educational and feedback programme reduced broad-spectrum antibiotic use by 22% over twelve months without any increase in treatment failure rates.\n\nThe role of nursing staff in stewardship is increasingly recognised. Nurses are often the first to identify signs of infection, can prompt the collection of appropriate specimens before antibiotics are started, and play a vital role in ensuring timely administration and appropriate duration of therapy.',
      questions: [
        { id: 'q1', questionType: 'mcq', text: 'What percentage of hospital antibiotic prescriptions may be unnecessary?', options: ['10%', '25%', 'Up to 50%', '75%'], correctAnswer: 2, explanation: 'Studies estimate "up to 50% of antibiotic prescriptions in hospitals are unnecessary or inappropriate."' },
        { id: 'q2', questionType: 'mcq', text: 'When should antibiotic prescriptions be reviewed?', options: ['After 24 hours', 'After 48-72 hours', 'After one week', 'Only at discharge'], correctAnswer: 1, explanation: 'The passage says failing to review "after 48-72 hours when culture and sensitivity results become available" is a common error.' },
        { id: 'q3', questionType: 'mcq', text: 'In the multicentre trial mentioned, what was the result of the combined programme?', options: ['Treatment failures increased by 22%', 'Broad-spectrum use reduced by 22% with no increase in treatment failure', 'All antibiotics were stopped', 'Nurses replaced doctors in prescribing'], correctAnswer: 1, explanation: 'The programme "reduced broad-spectrum antibiotic use by 22% over twelve months without any increase in treatment failure rates."' },
        { id: 'q4', questionType: 'tfng', text: 'Nursing staff have no role in antimicrobial stewardship.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'The passage explicitly states "the role of nursing staff in stewardship is increasingly recognised."' },
      ],
      difficulty: 0.45,
    },
  },
  {
    id: 'item.oet.rb.04', type: 'reading_passage', level: 'B2', skill: 'reading',
    nodeIds: ['strat.oet.medical_reading'],
    payload: {
      title: 'Falls Prevention in Older Adults',
      passage: 'Falls are the leading cause of injury-related hospital admissions among adults aged 65 and over. In the United Kingdom, approximately one in three people over 65 and one in two over 80 experience at least one fall per year. The consequences can be severe: hip fractures, head injuries, loss of independence, and a pervasive fear of falling that itself increases the risk of subsequent falls.\n\nRisk factors for falls are multifactorial. Intrinsic factors include muscle weakness, impaired balance and gait, visual impairment, cognitive decline, and polypharmacy — particularly the use of sedatives, antihypertensives, and psychotropic medications. Extrinsic factors include environmental hazards such as loose rugs, poor lighting, slippery floors, and the absence of grab rails in bathrooms.\n\nEvidence-based prevention strategies focus on addressing modifiable risk factors. Exercise programmes that include strength training and balance exercises — such as tai chi or targeted physiotherapy — have been shown to reduce falls by up to 30%. Medication reviews to identify and reduce drugs that increase fall risk are recommended at least annually. Home hazard assessments conducted by occupational therapists can identify and remediate environmental risks.\n\nVision correction is an often-overlooked intervention. Multifocal glasses, while convenient, can impair depth perception on stairs and uneven surfaces. Some studies recommend that older adults at risk of falls use single-vision distance glasses for walking outdoors.\n\nHip protectors — padded undergarments designed to absorb the impact of a fall — have shown mixed results. They appear effective in residential care settings where adherence can be supported, but poor compliance in community-dwelling older adults limits their utility.\n\nA comprehensive falls risk assessment should be conducted for any patient who presents with a fall, reports recurrent falls, or demonstrates gait or balance abnormalities during clinical examination.',
      questions: [
        { id: 'q1', questionType: 'mcq', text: 'What proportion of people over 80 fall at least once per year?', options: ['One in five', 'One in three', 'One in two', 'All of them'], correctAnswer: 2, explanation: 'The passage states "one in two over 80 experience at least one fall per year."' },
        { id: 'q2', questionType: 'mcq', text: 'By how much can exercise programmes reduce falls?', options: ['Up to 10%', 'Up to 30%', 'Up to 50%', 'Up to 80%'], correctAnswer: 1, explanation: 'Exercise programmes "have been shown to reduce falls by up to 30%."' },
        { id: 'q3', questionType: 'mcq', text: 'Why might multifocal glasses increase fall risk?', options: ['They are too heavy', 'They impair depth perception on stairs and uneven surfaces', 'They cause headaches', 'They reduce colour vision'], correctAnswer: 1, explanation: 'Multifocal glasses "can impair depth perception on stairs and uneven surfaces."' },
        { id: 'q4', questionType: 'tfng', text: 'Hip protectors are equally effective in all settings.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'They "appear effective in residential care settings" but have "poor compliance in community-dwelling older adults."' },
      ],
      difficulty: 0.4,
    },
  },

  // # ─── MCQ — Healthcare Reading Comprehension (8) ───────────────────
  // # Standalone MCQs testing key healthcare concepts.
  {
    id: 'item.oet.rb.05', type: 'mcq', level: 'B2', skill: 'reading',
    nodeIds: ['strat.oet.medical_reading', 'strat.oet.clinical_vocab'],
    payload: {
      stem: 'A clinical guideline states: "Patients with a confirmed diagnosis of community-acquired pneumonia who are haemodynamically stable and able to tolerate oral medication may be suitable for outpatient management." Which patient would be suitable for outpatient treatment?',
      options: [
        { text: 'A patient with stable blood pressure who can swallow tablets', misconception: null },
        { text: 'Any patient with pneumonia regardless of condition', misconception: 'The guideline specifies haemodynamic stability and oral tolerance' },
        { text: 'A patient requiring intravenous antibiotics', misconception: 'IV requirement means they cannot tolerate oral medication' },
        { text: 'A patient with dangerously low blood pressure', misconception: 'Low blood pressure = haemodynamically unstable' },
      ],
      correctIndex: 0,
      difficulty: 0.35,
    },
  },
  {
    id: 'item.oet.rb.06', type: 'mcq', level: 'B2', skill: 'reading',
    nodeIds: ['strat.oet.medical_reading'],
    payload: {
      stem: 'A drug information sheet states: "Contraindicated in patients with severe hepatic impairment, known hypersensitivity to the active substance, or concomitant use of MAO inhibitors." Which of these patients should NOT receive this medication?',
      options: [
        { text: 'A patient currently taking an MAO inhibitor for depression', misconception: null },
        { text: 'A patient with mild knee pain', misconception: 'Knee pain is not a contraindication' },
        { text: 'A patient with a history of headaches', misconception: 'Headache history is not listed as a contraindication' },
        { text: 'A patient who is over 65 years old', misconception: 'Age alone is not a contraindication here' },
      ],
      correctIndex: 0,
      difficulty: 0.35,
    },
  },
  {
    id: 'item.oet.rb.07', type: 'mcq', level: 'B2', skill: 'reading',
    nodeIds: ['strat.oet.medical_reading', 'strat.oet.clinical_vocab'],
    payload: {
      stem: 'A research summary states: "The intervention group showed a statistically significant reduction in readmission rates (p < 0.01) compared to the control group, with an absolute risk reduction of 8.3%." What does "statistically significant" mean in this context?',
      options: [
        { text: 'The difference is unlikely to be due to chance alone', misconception: null },
        { text: 'The result is clinically important', misconception: 'Statistical significance relates to probability, not clinical importance' },
        { text: 'All patients in the study improved', misconception: 'Significance refers to group differences, not universal improvement' },
        { text: 'The study had a large number of participants', misconception: 'Sample size affects power but is not what statistical significance means' },
      ],
      correctIndex: 0,
      difficulty: 0.45,
    },
  },
  {
    id: 'item.oet.rb.08', type: 'mcq', level: 'B2', skill: 'reading',
    nodeIds: ['strat.oet.medical_reading'],
    payload: {
      stem: 'A hospital policy states: "All sharps injuries must be reported immediately to the line manager and the occupational health department. The affected area should be encouraged to bleed under running water without squeezing. The incident must be documented on an IR1 form within 24 hours." What should you do FIRST after a needlestick injury?',
      options: [
        { text: 'Encourage bleeding under running water without squeezing', misconception: null },
        { text: 'Complete the IR1 form', misconception: 'Form completion is required within 24 hours, not as the first action' },
        { text: 'Apply a tourniquet to stop bleeding', misconception: 'The policy says to encourage bleeding, not stop it' },
        { text: 'Continue working and report at the end of the shift', misconception: 'The policy says report immediately, not at end of shift' },
      ],
      correctIndex: 0,
      difficulty: 0.3,
    },
  },
  {
    id: 'item.oet.rb.09', type: 'mcq', level: 'B2', skill: 'reading',
    nodeIds: ['strat.oet.medical_reading'],
    payload: {
      stem: 'A discharge summary reads: "Patient to continue warfarin 5mg daily. INR to be checked weekly for the first month, then monthly once stable. Target INR range: 2.0–3.0. Patient to avoid significant changes in vitamin K intake and to report any unusual bleeding or bruising." Why should the patient avoid changing vitamin K intake?',
      options: [
        { text: 'Vitamin K affects how warfarin works, potentially making it too strong or too weak', misconception: null },
        { text: 'Vitamin K causes allergic reactions with warfarin', misconception: 'The interaction is pharmacological, not allergic' },
        { text: 'Vitamin K is a type of blood thinner that adds to warfarin\'s effect', misconception: 'Vitamin K actually counteracts warfarin by promoting clotting' },
        { text: 'Vitamin K makes blood tests inaccurate', misconception: 'The concern is about drug effectiveness, not test accuracy' },
      ],
      correctIndex: 0,
      difficulty: 0.4,
    },
  },
  {
    id: 'item.oet.rb.10', type: 'mcq', level: 'B2', skill: 'reading',
    nodeIds: ['strat.oet.medical_reading'],
    payload: {
      stem: 'A physiotherapy report states: "The patient demonstrates a positive Trendelenburg sign on the left side, indicating weakness of the left hip abductors. Gait analysis reveals a compensatory lateral trunk lean to the left during the stance phase of the left leg." The compensatory trunk lean occurs because:',
      options: [
        { text: 'The patient shifts their weight to compensate for weak hip muscles', misconception: null },
        { text: 'The patient has a spinal injury', misconception: 'The report attributes the finding to hip abductor weakness, not spinal injury' },
        { text: 'The patient\'s right leg is shorter than the left', misconception: 'Leg length discrepancy is not mentioned' },
        { text: 'The patient is leaning to look at something on the left', misconception: 'The lean is a compensatory mechanism during walking, not voluntary' },
      ],
      correctIndex: 0,
      difficulty: 0.45,
    },
  },
  {
    id: 'item.oet.rb.11', type: 'mcq', level: 'B2', skill: 'reading',
    nodeIds: ['strat.oet.medical_reading', 'strat.oet.clinical_vocab'],
    payload: {
      stem: 'A clinical note reads: "Auscultation of the chest reveals bilateral basal crepitations. Chest X-ray shows bilateral pulmonary infiltrates consistent with pulmonary oedema. The patient has an elevated JVP and peripheral oedema." These findings are most consistent with:',
      options: [
        { text: 'Heart failure with fluid overload', misconception: null },
        { text: 'A chest infection such as pneumonia', misconception: 'Elevated JVP and peripheral oedema point to cardiac cause, not infection' },
        { text: 'An asthma attack', misconception: 'Asthma presents with wheeze, not crepitations and oedema' },
        { text: 'A broken rib', misconception: 'Rib fracture would not cause bilateral changes or peripheral oedema' },
      ],
      correctIndex: 0,
      difficulty: 0.5,
    },
  },
  {
    id: 'item.oet.rb.12', type: 'mcq', level: 'B2', skill: 'reading',
    nodeIds: ['strat.oet.medical_reading'],
    payload: {
      stem: 'A mental health care plan states: "The patient should be assessed using the PHQ-9 questionnaire at each review. A score of 10-14 indicates moderate depression; 15-19 indicates moderately severe depression; 20-27 indicates severe depression. Scores of 15 or above should prompt consideration of referral to secondary mental health services." A patient scores 17 on the PHQ-9. What should happen?',
      options: [
        { text: 'Consider referral to secondary mental health services', misconception: null },
        { text: 'Discharge the patient as their score is acceptable', misconception: '17 is "moderately severe" — well above the referral threshold of 15' },
        { text: 'Repeat the test next year', misconception: 'A score of 17 requires action now, not a year later' },
        { text: 'No action needed — moderate depression is normal', misconception: '17 indicates moderately severe depression, and the threshold for referral is 15' },
      ],
      correctIndex: 0,
      difficulty: 0.35,
    },
  },
]
