import { useState, useEffect, useRef, useCallback } from "react";

// ─── CURRICULUM DATA ─────────────────────────────────────────────────────────
const CURRICULUM = [
  // WEEKS 1-4: GENERAL FOUNDATIONS
  {
    week: 1, title: "Everyday Life & Opinions",
    category: "general",
    color: "#3B82F6",
    icon: "💬",
    phrases: [
      "I'd like to point out that…", "As far as I'm concerned…", "It goes without saying that…",
      "I couldn't agree more.", "That's not entirely true.", "To be honest with you…",
      "What I mean is…", "Let me put it another way.", "I see what you mean, but…",
      "On the other hand…", "It depends on the situation.", "Generally speaking…",
      "In my experience…", "I'm not sure I follow.", "Could you elaborate on that?",
      "That makes a lot of sense.", "I hadn't thought of it that way.", "To sum up…",
      "All things considered…", "The thing is…"
    ],
    vocabulary: [
      { word: "perspective", def: "punto de vista" },
      { word: "circumstances", def: "circunstancias" },
      { word: "assumption", def: "suposición" },
      { word: "implication", def: "implicación" },
      { word: "significant", def: "significativo" },
      { word: "relevant", def: "relevante" },
      { word: "straightforward", def: "directo/sencillo" },
      { word: "acknowledge", def: "reconocer" },
      { word: "regarding", def: "en cuanto a" },
      { word: "moreover", def: "además" },
      { word: "consequently", def: "en consecuencia" },
      { word: "whereas", def: "mientras que" },
      { word: "despite", def: "a pesar de" },
      { word: "throughout", def: "a lo largo de" },
      { word: "worthwhile", def: "que vale la pena" }
    ],
    grammar: [
      { title: "Present Perfect vs Past Simple", explanation: "Usa el Present Perfect para experiencias o acciones pasadas con conexión al presente. Usa el Past Simple para acciones terminadas con un momento concreto en el tiempo.", example: "I have visited many countries. / I visited France last year." },
      { title: "Modal verbs for opinion", explanation: "Usa 'should', 'ought to', 'must' para opiniones fuertes o consejos firmes; 'might' y 'could' para sugerencias más suaves o inciertas.", example: "You should see a doctor. / You might want to reconsider." },
      { title: "Relative clauses", explanation: "Who/which/that añaden información sobre un sustantivo. Si van entre comas, la información es adicional (no esencial). Sin comas, la información es necesaria para identificar de qué se habla.", example: "The doctor who treated me was excellent. / Madrid, which I love, is very hot in summer." },
      { title: "Conditionals (1st & 2nd)", explanation: "1ª condicional: situación real o probable en el futuro (if + presente → will). 2ª condicional: situación hipotética o irreal en el presente (if + pasado → would).", example: "If it rains, I'll stay home. / If I were rich, I'd travel more." },
      { title: "Adverbs of frequency placement", explanation: "Van antes del verbo principal, pero después del verbo 'to be'. Con verbos modales, van entre el modal y el verbo principal.", example: "I usually eat late. / She is always on time. / You should never lie." }
    ],
    speaking_prompt: "Tell me about your typical working day. What do you do, when, and how do you feel about it?",
    scenario: { type: "conversation", title: "Small talk with a colleague", setup: "Acabas de llegar al trabajo. Saluda a tu compañero/a angloparlante y charla sobre el fin de semana. Habla en inglés con naturalidad, como si fuera una conversación real." }
  },
  {
    week: 2, title: "Work & Professional Life",
    category: "general",
    color: "#8B5CF6",
    icon: "💼",
    phrases: [
      "I'd like to schedule a meeting.", "Could we discuss this further?", "I'll follow up on that.",
      "Let's touch base later.", "I need to escalate this issue.", "We're on a tight deadline.",
      "Could you clarify what you mean?", "I'll keep you posted.", "Let me check my availability.",
      "We need to align on this.", "That's outside my scope.", "I'll delegate that task.",
      "Let's circle back to that.", "I need some clarification.", "That's a valid concern.",
      "We should prioritize this.", "I'll get back to you by end of day.", "Can we revisit this?",
      "Let's move forward with that.", "I appreciate your input."
    ],
    vocabulary: [
      { word: "workload", def: "carga de trabajo" },
      { word: "colleague", def: "compañero de trabajo" },
      { word: "deadline", def: "fecha límite" },
      { word: "feedback", def: "retroalimentación" },
      { word: "efficient", def: "eficiente" },
      { word: "productive", def: "productivo" },
      { word: "reliable", def: "fiable/de confianza" },
      { word: "expertise", def: "experiencia/especialización" },
      { word: "negotiate", def: "negociar" },
      { word: "implement", def: "implementar" },
      { word: "collaborate", def: "colaborar" },
      { word: "outstanding", def: "pendiente/sobresaliente" },
      { word: "proactive", def: "proactivo" },
      { word: "initiative", def: "iniciativa" },
      { word: "accountable", def: "responsable (de algo)" }
    ],
    grammar: [
      { title: "Passive voice in professional contexts", explanation: "Usa la voz pasiva cuando la acción importa más que quién la realiza. Muy habitual en textos profesionales y emails formales en inglés.", example: "The report was submitted on time. / The meeting has been rescheduled." },
      { title: "Gerunds vs Infinitives", explanation: "Algunos verbos van seguidos de gerundio (-ing), otros de infinitivo (to + verbo), y algunos admiten ambas formas. No existe una regla única: hay que aprenderlos por grupos.", example: "I enjoy working late. / I need to finish this report. / I like working / to work from home." },
      { title: "Reported speech", explanation: "Al reportar lo que alguien dijo, el tiempo verbal retrocede un paso: presente → pasado, pasado → past perfect, will → would.", example: "She said she would call. / He told me he had finished the project." },
      { title: "Future forms: will vs going to vs present continuous", explanation: "Will = decisión en el momento / predicción sin evidencia. Going to = plan ya decidido o evidencia visible. Present continuous = acuerdo o cita ya fijada.", example: "I'll help you. / I'm going to apply for the job. / I'm meeting the director at 3pm." },
      { title: "Polite requests with modals", explanation: "Usa 'could', 'would' y 'may' para sonar educado y profesional. Son equivalentes pero con matices de formalidad: may > could > can.", example: "Could you send me the file? / Would you mind reviewing this? / May I ask a question?" }
    ],
    speaking_prompt: "Describe your job. What are your main responsibilities? What do you enjoy most and least about it?",
    scenario: { type: "meeting", title: "Virtual meeting", setup: "Estás en una reunión online con compañeros angloparlantes. Preséntate brevemente y explica tu rol y en qué estás trabajando ahora mismo. El diálogo debe ser en inglés." }
  },
  {
    week: 3, title: "Technology & Digital Life",
    category: "general",
    color: "#10B981",
    icon: "💻",
    phrases: [
      "Could you repeat that? The connection is bad.", "Can you share your screen?",
      "I think you're on mute.", "Let me google that quickly.", "Have you tried restarting it?",
      "The system is down at the moment.", "I need to update my password.", "Could you send me the link?",
      "This app is really user-friendly.", "My internet keeps dropping.", "Let me send you a screenshot.",
      "Do you use any project management tools?", "I prefer working offline.", "The software crashed again.",
      "Have you backed up your files?", "I'll share it via cloud storage.", "Can you access this remotely?",
      "The interface is quite intuitive.", "I'm getting an error message.", "It works seamlessly."
    ],
    vocabulary: [
      { word: "interface", def: "interfaz" },
      { word: "bandwidth", def: "ancho de banda" },
      { word: "encryption", def: "cifrado" },
      { word: "algorithm", def: "algoritmo" },
      { word: "seamless", def: "sin interrupciones/fluido" },
      { word: "intuitive", def: "intuitivo" },
      { word: "integrated", def: "integrado" },
      { word: "compatible", def: "compatible" },
      { word: "troubleshoot", def: "diagnosticar problemas" },
      { word: "streamline", def: "optimizar/simplificar" },
      { word: "automate", def: "automatizar" },
      { word: "debug", def: "depurar/corregir errores" },
      { word: "deploy", def: "desplegar/implementar" },
      { word: "vulnerability", def: "vulnerabilidad" },
      { word: "scalable", def: "escalable" }
    ],
    grammar: [
      { title: "Present Perfect Continuous", explanation: "Se usa para acciones que empezaron en el pasado y continúan hasta ahora, especialmente para explicar una situación presente. La duración es importante.", example: "I've been working on this app for 6 months. / She's been studying English since January." },
      { title: "Contrast connectors", explanation: "However, although, even though, nevertheless, despite conectan ideas opuestas. 'Although/even though' van al inicio de cláusula; 'however/nevertheless' van al inicio de oración nueva.", example: "Although it's complex, it's very useful. / However, the system has some limitations." },
      { title: "It + passive constructions", explanation: "Construcción impersonal muy formal para presentar información sin mencionar a quién la da. Muy habitual en textos científicos y periodísticos en inglés.", example: "It is believed that AI will change everything. / It has been reported that the system failed." },
      { title: "Compound adjectives", explanation: "Dos palabras unidas con guion forman un adjetivo compuesto que modifica a un sustantivo. El orden siempre es adjetivo-compuesto + sustantivo.", example: "A user-friendly interface. / A well-designed app. / A cutting-edge system." },
      { title: "Expressing purpose: to/in order to/so that", explanation: "Las tres expresan finalidad. 'To' es la más corta y común. 'In order to' es más formal. 'So that' va seguido de sujeto + verbo.", example: "I use this app to track patients. / I encrypted the data so that it's secure." }
    ],
    speaking_prompt: "How has technology changed your work in the last 5 years? Give specific examples.",
    scenario: { type: "tech_support", title: "Tech support call", setup: "Llamas al soporte técnico porque el software del hospital no funciona. Explica el problema con claridad. El técnico no habla español — toda la conversación debe ser en inglés." }
  },
  {
    week: 4, title: "Culture, Media & Free Time",
    category: "general",
    color: "#F59E0B",
    icon: "🎭",
    phrases: [
      "Have you seen the latest series on Netflix?", "I'm a big fan of documentaries.",
      "What kind of music are you into?", "I read mostly non-fiction.", "I've been getting into podcasts lately.",
      "I don't really follow sport.", "That film got great reviews.", "It's not really my thing.",
      "I'd highly recommend it.", "It's a bit of an acquired taste.", "I'm quite into photography.",
      "I spend a lot of time outdoors.", "What do you do to unwind?", "I find it really relaxing.",
      "It's a great way to switch off.", "I used to play an instrument.", "I'm learning to cook.",
      "My weekends are pretty packed.", "I prefer doing something active.", "I'm quite a homebody."
    ],
    vocabulary: [
      { word: "leisure", def: "ocio/tiempo libre" },
      { word: "enthusiast", def: "entusiasta/aficionado" },
      { word: "genre", def: "género" },
      { word: "contemporary", def: "contemporáneo" },
      { word: "stimulating", def: "estimulante" },
      { word: "captivating", def: "cautivador" },
      { word: "mainstream", def: "corriente principal/popular" },
      { word: "niche", def: "nicho/minoritario" },
      { word: "pastime", def: "pasatiempo" },
      { word: "immersive", def: "inmersivo" },
      { word: "unwind", def: "relajarse/desconectar" },
      { word: "binge-watch", def: "ver maratón de series" },
      { word: "thought-provoking", def: "que invita a la reflexión" },
      { word: "compelling", def: "convincente/apasionante" },
      { word: "versatile", def: "versátil/polivalente" }
    ],
    grammar: [
      { title: "Used to / Would for past habits", explanation: "'Used to' expresa hábitos o estados pasados que ya no existen (puede ser acción o estado). 'Would' solo describe acciones repetidas en el pasado, nunca estados.", example: "I used to play football every week. / We would always stop for coffee on the way." },
      { title: "Wish + past simple / past perfect", explanation: "'Wish + past simple' expresa un deseo o lamento sobre el presente. 'Wish + past perfect' expresa arrepentimiento por algo que ocurrió (o no) en el pasado.", example: "I wish I spoke better English. / I wish I had studied harder at school." },
      { title: "Causative have/get", explanation: "Have/get + objeto + participio pasado. Indica que alguien hace algo por ti, no tú mismo. 'Get' es más informal que 'have'.", example: "I had my car repaired. / She got her hair cut. / I need to get this checked." },
      { title: "Emphasising with cleft sentences", explanation: "Construcciones como 'It was... that/who...' o 'What I need is...' ponen énfasis en una parte concreta de la frase. Muy naturales en inglés hablado.", example: "It was the film that made me cry. / What I love is the music." },
      { title: "Expressing preferences: prefer, would rather, would sooner", explanation: "Las tres expresan preferencia. 'Prefer' + -ing/sustantivo. 'Would rather' + infinitivo sin 'to'. 'Would sooner' es más formal.", example: "I prefer reading to watching TV. / I'd rather stay in tonight. / I'd sooner walk than drive." }
    ],
    speaking_prompt: "What do you do in your free time? Do you think hobbies are important for wellbeing?",
    scenario: { type: "conversation", title: "Chat about weekend plans", setup: "Un compañero/a británico te pregunta qué hiciste el fin de semana. Cuéntale algo sobre una excursión en autocaravana o alguna actividad que hagas. Habla en inglés con naturalidad." }
  },

  // WEEKS 5-8: HEALTH & MEDICINE
  {
    week: 5, title: "Healthcare: Patient Communication",
    category: "health",
    color: "#EF4444",
    icon: "🏥",
    phrases: [
      "Could you describe your symptoms?", "How long have you been feeling this way?",
      "Have you had any previous episodes?", "Are you currently taking any medication?",
      "I need to examine you.", "This might feel a little uncomfortable.", "Please take a deep breath.",
      "We'll need to run some tests.", "The results should be back shortly.", "I'd like to refer you to a specialist.",
      "Please follow up with your GP.", "Make sure to stay hydrated.", "Take one tablet twice a day.",
      "Let me know if it gets worse.", "Do you have any allergies?", "Is there any family history of this?",
      "We'll monitor this closely.", "There's nothing to worry about.", "I'll explain the procedure.",
      "Do you have any questions?"
    ],
    vocabulary: [
      { word: "symptom", def: "síntoma" },
      { word: "diagnosis", def: "diagnóstico" },
      { word: "prognosis", def: "pronóstico" },
      { word: "chronic", def: "crónico" },
      { word: "acute", def: "agudo" },
      { word: "referral", def: "derivación/remisión" },
      { word: "prescription", def: "receta médica" },
      { word: "dosage", def: "dosis" },
      { word: "contraindication", def: "contraindicación" },
      { word: "complication", def: "complicación" },
      { word: "informed consent", def: "consentimiento informado" },
      { word: "follow-up", def: "seguimiento" },
      { word: "outpatient", def: "paciente ambulatorio" },
      { word: "discharge", def: "alta médica" },
      { word: "triage", def: "triaje" }
    ],
    grammar: [
      { title: "Imperatives in medical instructions", explanation: "Los imperativos dan instrucciones directas y claras. En contexto médico, añadir 'please' los suaviza sin perder precisión.", example: "Please remove your jacket. / Don't eat anything after midnight. / Take two tablets with water." },
      { title: "Explaining procedures: sequencing", explanation: "Para explicar procedimientos paso a paso, usa first / then / next / after that / finally. Ayudan al paciente a seguir y reduce su ansiedad.", example: "First, I'll clean the area. Then I'll apply a local anaesthetic. After that, I'll take the sample." },
      { title: "Hedging language in medical contexts", explanation: "En medicina, la prudencia lingüística es clave. Usa frases tentativas cuando no hay certeza: 'it appears', 'it seems', 'this could be'. Evita afirmaciones tajantes sin base.", example: "It appears there may be an infection. / This could be related to stress." },
      { title: "Questions for clarification", explanation: "Hay dos tipos: preguntas abiertas (qué, cómo, cuándo — permiten al paciente explicarse) y cerradas (sí/no — confirman datos concretos). Combínalas estratégicamente.", example: "When exactly did this start? / Can you describe the pain — is it sharp or dull? / On a scale of 1 to 10?" },
      { title: "Expressing necessity: must/need to/have to", explanation: "'Must' suena más imperativo y personal. 'Have to' implica obligación externa. 'Need to' es más suave y neutro. Los tres son útiles en instrucciones médicas.", example: "You must avoid alcohol while taking this. / You'll need to rest for a week. / You have to come back if it worsens." }
    ],
    speaking_prompt: "Imagine explaining a radiological procedure to a nervous patient who doesn't speak Spanish well. What would you say?",
    scenario: { type: "consultation", title: "Patient consultation", setup: "Un paciente extranjero angloparlante viene a revisión tras una prueba de imagen. Está nervioso y no entiende bien los resultados. Tranquilízale y explícale los próximos pasos en inglés sencillo." }
  },
  {
    week: 6, title: "Medical Imaging & Radiology",
    category: "health",
    color: "#6366F1",
    icon: "🩻",
    phrases: [
      "We're going to perform an ultrasound.", "Please lie still during the scan.",
      "The CT scan will take about 15 minutes.", "You may hear some loud noises — that's normal.",
      "We'll inject a contrast agent.", "Are you claustrophobic?", "Please remove any metal objects.",
      "The images show a small anomaly.", "The findings appear to be benign.", "We need to compare with previous images.",
      "I'll send the report to your consultant.", "The density is higher than expected.", "The margin looks irregular.",
      "There's no significant change since the last scan.", "We'll need a follow-up in 6 months.",
      "The contrast enhanced the lesion.", "The scan was inconclusive.", "We found an incidental finding.",
      "The resolution on this image is excellent.", "I'll annotate the areas of concern."
    ],
    vocabulary: [
      { word: "lesion", def: "lesión" },
      { word: "density", def: "densidad" },
      { word: "benign", def: "benigno" },
      { word: "malignant", def: "maligno" },
      { word: "incidental", def: "incidental/hallazgo casual" },
      { word: "anomaly", def: "anomalía" },
      { word: "contrast agent", def: "medio de contraste" },
      { word: "resolution", def: "resolución" },
      { word: "margin", def: "margen" },
      { word: "protocol", def: "protocolo" },
      { word: "acquisition", def: "adquisición (de imagen)" },
      { word: "artefact", def: "artefacto" },
      { word: "slice", def: "corte/plano de imagen" },
      { word: "calibration", def: "calibración" },
      { word: "workstation", def: "estación de trabajo" }
    ],
    grammar: [
      { title: "Describing images: adjective order", explanation: "En inglés existe un orden fijo para los adjetivos antes del sustantivo: opinión > tamaño > edad > forma > color > origen > material. Saltarse este orden suena artificial.", example: "A small, round, dark mass. / A large, irregular, hyperdense lesion." },
      { title: "Present simple for describing findings", explanation: "Para describir lo que ves en una imagen médica, usa presente simple — es una observación actual y directa. El presente continuo no es apropiado aquí.", example: "The scan shows a 2cm nodule. / There is evidence of calcification. / The liver appears enlarged." },
      { title: "Comparison structures", explanation: "Para comparar con estudios previos usa comparativos ('larger than', 'less dense') y estructuras como 'compared to' o 'in comparison with'. Muy frecuentes en informes radiológicos.", example: "The lesion is slightly larger than before. / It appears less dense compared to the previous study." },
      { title: "Passive voice for reporting", explanation: "Los informes médicos usan pasiva para sonar objetivos e impersonales. El profesional desaparece del texto y el foco está en los hallazgos.", example: "A lesion was identified in the right lobe. / The scan was performed without complications. / Contrast was administered intravenously." },
      { title: "Quantifying: approximate language", explanation: "En radiología, las medidas son frecuentemente estimaciones. Usa 'approximately', 'roughly', 'around', 'measuring about' para ser preciso sin parecer más seguro de lo que eres.", example: "Approximately 3cm in diameter. / Roughly 2-3 nodules visible. / Measuring around 1.5cm." }
    ],
    speaking_prompt: "Explain to a medical colleague (in English) what you do in your radiology department and what a typical working day involves.",
    scenario: { type: "radiology_report", title: "Explaining scan results", setup: "Un paciente angloparlante necesita que le expliques los resultados de su radiografía de tórax. Está preocupado. Sé claro, tranquilo y evita el lenguaje técnico innecesario. Habla en inglés." }
  },
  {
    week: 7, title: "Emergencies & Clinical Situations",
    category: "health",
    color: "#DC2626",
    icon: "🚨",
    phrases: [
      "Call for assistance immediately.", "The patient is unresponsive.", "Check for a pulse.",
      "We need to act fast.", "Clear the airway.", "Start chest compressions.",
      "Get the crash cart.", "What's the patient's blood pressure?", "Administer oxygen now.",
      "We're losing them — increase the dosage.", "Alert the surgical team.", "This is a code blue.",
      "The patient is deteriorating rapidly.", "Prepare for intubation.", "Is the IV line patent?",
      "Monitor their vitals every 5 minutes.", "We need consent from next of kin.", "Keep the patient calm.",
      "Secure the area.", "Document everything."
    ],
    vocabulary: [
      { word: "resuscitation", def: "reanimación" },
      { word: "deteriorate", def: "deteriorarse/empeorar" },
      { word: "stabilise", def: "estabilizar" },
      { word: "intubation", def: "intubación" },
      { word: "haemorrhage", def: "hemorragia" },
      { word: "tachycardia", def: "taquicardia" },
      { word: "vital signs", def: "signos vitales" },
      { word: "seizure", def: "convulsión/ataque" },
      { word: "unconscious", def: "inconsciente" },
      { word: "defibrillator", def: "desfibrilador" },
      { word: "anaphylaxis", def: "anafilaxia" },
      { word: "trauma", def: "traumatismo" },
      { word: "rupture", def: "rotura/ruptura" },
      { word: "blockage", def: "obstrucción/bloqueo" },
      { word: "life-threatening", def: "que pone en peligro la vida" }
    ],
    grammar: [
      { title: "Imperatives in emergencies", explanation: "En situaciones de urgencia, los imperativos son cortos y sin rodeos. No hay lugar para suavizarlos — la claridad salva vidas. Omite el 'please' en emergencias reales.", example: "Call 999 now! / Don't move the patient! / Apply pressure to the wound!" },
      { title: "Reporting urgent information", explanation: "Para comunicar una situación urgente, usa present continuous para describir lo que está pasando ahora y presente simple para datos estables (constantes, valores).", example: "The patient is having a seizure. / Blood pressure is dropping. / She's not breathing." },
      { title: "Time expressions in medical records", explanation: "Los registros clínicos requieren precisión temporal. Estas expresiones son estándar en notas de urgencias y partes de incidencias en inglés.", example: "At 14:32, the patient collapsed. / Within 5 minutes of arrival. / Prior to the incident." },
      { title: "Must have / can't have (past deduction)", explanation: "'Must have + participio' = deducción casi segura de que algo ocurrió. 'Can't have + participio' = deducción casi segura de que algo NO ocurrió. Se usan mucho en análisis clínico retrospectivo.", example: "She must have fallen. / He can't have taken his medication. / They must have been here for hours." },
      { title: "Conditional 3rd (past regrets in medicine)", explanation: "La 3ª condicional expresa cómo habría sido diferente el resultado si se hubiera actuado de otro modo. Fundamental en debriefings clínicos y análisis de incidentes.", example: "If we had acted sooner, the outcome might have been different. / Had we known, we would have intervened." }
    ],
    speaking_prompt: "Describe a difficult or challenging situation at work (without patient-identifying details). How did you handle it?",
    scenario: { type: "emergency", title: "Emergency communication", setup: "Estás haciendo el traspaso de guardia a un compañero angloparlante durante una urgencia. Usa el formato SBAR (Situation-Background-Assessment-Recommendation) en inglés para comunicar el caso de forma clara y estructurada." }
  },
  {
    week: 8, title: "Medical Conferences & Research",
    category: "health",
    color: "#0EA5E9",
    icon: "🔬",
    phrases: [
      "I'd like to present our findings.", "Our study focused on…", "The data suggests that…",
      "We recruited 200 participants.", "The control group showed…", "The results were statistically significant.",
      "There are some limitations to this study.", "Further research is needed.", "I'll take questions at the end.",
      "Could you repeat your question?", "That's a very interesting point.", "Our methodology was based on…",
      "We used a randomised controlled trial.", "The confidence interval was…", "Our hypothesis was that…",
      "The sample size was sufficient.", "We observed a correlation between…", "This challenges the current consensus.",
      "I'd be happy to share our data.", "We hope to publish this next year."
    ],
    vocabulary: [
      { word: "hypothesis", def: "hipótesis" },
      { word: "methodology", def: "metodología" },
      { word: "sample size", def: "tamaño de muestra" },
      { word: "randomised", def: "aleatorizado" },
      { word: "placebo", def: "placebo" },
      { word: "statistically significant", def: "estadísticamente significativo" },
      { word: "correlation", def: "correlación" },
      { word: "bias", def: "sesgo" },
      { word: "peer-reviewed", def: "revisado por pares" },
      { word: "publication", def: "publicación" },
      { word: "outcome", def: "resultado/desenlace" },
      { word: "variable", def: "variable" },
      { word: "evidence-based", def: "basado en evidencia" },
      { word: "cohort", def: "cohorte" },
      { word: "consent", def: "consentimiento" }
    ],
    grammar: [
      { title: "Academic writing: nominalization", explanation: "La nominalización convierte verbos en sustantivos. Hace el lenguaje más formal y abstracto. Es un rasgo característico del inglés académico y científico.", example: "We decided → Our decision. We analysed → The analysis revealed. They developed → The development of." },
      { title: "Impersonal structures in research", explanation: "El lenguaje académico evita el 'I/we' personal. En su lugar usa construcciones impersonales que dan objetividad al texto y siguen convenciones editoriales internacionales.", example: "It was found that… / It is argued that… / Results indicate that…" },
      { title: "Presenting data with hedging", explanation: "En ciencia, la certeza absoluta es poco frecuente. Usa lenguaje tentativo para presentar resultados: señala correlación sin afirmar causalidad. Esto da credibilidad científica.", example: "The results suggest… / This may indicate… / There appears to be a relationship between…" },
      { title: "Concession clauses: although/even though/while/whilst", explanation: "Reconocer limitaciones o puntos contrarios refuerza tu argumento, no lo debilita. 'Although' y 'even though' son equivalentes; 'whilst' es más formal y típicamente británico.", example: "Although the sample was small, the findings are promising. / While further research is needed, this study contributes to…" },
      { title: "Tense consistency in presentations", explanation: "Usa past simple para describir lo que hiciste (metodología, reclutamiento). Usa presente simple para conclusiones generales y lo que los datos muestran ahora.", example: "We recruited 200 patients. (past) / The data shows a clear pattern. (present)" }
    ],
    speaking_prompt: "Imagine you've just won a prize for your app DiagnoGuide. Give a 3-minute acceptance speech in English, explaining what it does and why it matters.",
    scenario: { type: "presentation", title: "Conference Q&A", setup: "Acabas de presentar tu investigación en un congreso internacional. Un asistente hace una pregunta difícil sobre tu metodología. Responde con calma y profesionalidad en inglés." }
  },

  // WEEKS 9-12: TRAVEL & CAMPERVAN
  {
    week: 9, title: "Travel Planning & Booking",
    category: "travel",
    color: "#F97316",
    icon: "✈️",
    phrases: [
      "I'd like to book a pitch for two nights.", "Is there availability for next weekend?",
      "Do you accept walk-ins?", "What facilities do you have?", "Is there a hookup for electricity?",
      "How far is it to the nearest town?", "Can I extend my stay?", "What's your cancellation policy?",
      "Are pets allowed?", "Is the site suitable for large vehicles?", "Do you have WiFi on site?",
      "We'll be arriving late — is that okay?", "Can you recommend places to visit nearby?",
      "Is there a dump station on site?", "What are the check-in and check-out times?",
      "Is there a shop or restaurant on site?", "We'd prefer a quieter pitch.", "Is the road accessible for a T6?",
      "How much is it per night?", "Can I pay by card?"
    ],
    vocabulary: [
      { word: "campsite", def: "camping/campamento" },
      { word: "pitch", def: "parcela (en camping)" },
      { word: "hookup", def: "conexión eléctrica" },
      { word: "facilities", def: "instalaciones" },
      { word: "amenities", def: "comodidades/servicios" },
      { word: "itinerary", def: "itinerario" },
      { word: "route", def: "ruta" },
      { word: "detour", def: "desvío/rodeo" },
      { word: "scenic", def: "pintoresco/con vistas" },
      { word: "off-grid", def: "sin conexión a la red" },
      { word: "wild camping", def: "acampada libre" },
      { word: "toll road", def: "autopista de peaje" },
      { word: "border crossing", def: "paso fronterizo" },
      { word: "overnight parking", def: "pernocta en aparcamiento" },
      { word: "freedom camping", def: "camping libre" }
    ],
    grammar: [
      { title: "Asking polite questions: indirect questions", explanation: "Las preguntas indirectas suenan más educadas que las directas. Se introducen con 'Could you tell me…', 'Do you know if…', 'I was wondering if…'. El orden de la frase cambia: no se invierte el sujeto.", example: "Could you tell me where the nearest campsite is? / Do you know if they accept large vehicles?" },
      { title: "Future arrangements: present continuous", explanation: "En inglés, el present continuous se usa para planes ya acordados y reservas confirmadas. No es un error — es una forma natural de hablar de planes fijos futuros.", example: "We're arriving on Friday evening. / We're staying for three nights. / We're driving through France next week." },
      { title: "Conditional 1st for plans", explanation: "La 1ª condicional expresa situaciones reales y posibles: if + presente simple → will + infinitivo. Muy útil para hablar de planes de viaje con variables.", example: "If the weather is good, we'll wild camp. / If there's no pitch available, we'll move on." },
      { title: "Prepositions of movement", explanation: "Las preposiciones de movimiento son esenciales para dar y entender indicaciones: along (a lo largo de), through (a través), across (al otro lado), past (pasando por), around (alrededor).", example: "Drive along the coast. / Turn right past the petrol station. / Go through the tunnel." },
      { title: "Expressing preferences when booking", explanation: "Al hacer reservas en inglés, usar 'would prefer', 'would rather' o 'I'd like... if possible' suena natural y educado sin ser exigente.", example: "We'd prefer a pitch with shade. / I'd rather not be near the road, if possible." }
    ],
    speaking_prompt: "Describe your Volkswagen California T6 and how you travel. What do you love most about campervan travel?",
    scenario: { type: "booking", title: "Booking a campsite by phone", setup: "Llamas por teléfono a un camping en el sur de Francia para reservar dos noches para tu T6. Pregunta por instalaciones, precio, si tienen conexión eléctrica y cómo llegar. Toda la llamada en inglés." }
  },
  {
    week: 10, title: "On the Road: Directions & Problems",
    category: "travel",
    color: "#84CC16",
    icon: "🚐",
    phrases: [
      "Excuse me, how do I get to…?", "Is this the right way to…?",
      "The GPS has stopped working.", "I think we're lost.", "Can you show me on the map?",
      "How long does it take from here?", "The road is closed ahead.", "Is there an alternative route?",
      "We've broken down.", "Can you call a mechanic?", "The engine warning light is on.",
      "We've run out of gas.", "We've got a flat tyre.", "Is there a garage nearby?",
      "I need to find a filling station.", "The van won't start.", "We had a minor accident.",
      "We need to report this to our insurance.", "How do I get back to the motorway?",
      "Is there a rest area soon?"
    ],
    vocabulary: [
      { word: "roundabout", def: "glorieta/rotonda" },
      { word: "junction", def: "cruce/intersección" },
      { word: "lay-by", def: "área de descanso/apartadero" },
      { word: "motorway", def: "autopista" },
      { word: "carriageway", def: "calzada" },
      { word: "breakdown", def: "avería" },
      { word: "tow truck", def: "grúa" },
      { word: "tyre", def: "neumático" },
      { word: "bonnet", def: "capó" },
      { word: "clutch", def: "embrague" },
      { word: "accelerator", def: "acelerador" },
      { word: "handbrake", def: "freno de mano" },
      { word: "insurance claim", def: "reclamación al seguro" },
      { word: "traffic jam", def: "atasco" },
      { word: "diversion", def: "desvío" }
    ],
    grammar: [
      { title: "Imperatives for giving directions", explanation: "Para dar indicaciones usa imperativos directos con verbos de movimiento: take (toma), turn (gira), go (ve), follow (sigue), continue (continúa), pass (pasa). Sin sujeto, sin rodeos.", example: "Take the second exit at the roundabout. / Follow the signs for the motorway. / Turn left at the traffic lights." },
      { title: "Explaining problems: past continuous + past simple", explanation: "Usa past continuous para la acción en curso (contexto) y past simple para el evento que la interrumpió. Esta combinación es natural para contar lo que pasó en un viaje.", example: "I was driving along the motorway when the engine light came on. / We were looking for the campsite when we got a flat tyre." },
      { title: "Need + gerund / need + to be + past participle", explanation: "Ambas estructuras indican que algo requiere atención. 'Needs changing' (activo) y 'needs to be changed' (pasivo) significan lo mismo. Son muy usadas al hablar de averías y mantenimiento.", example: "The tyre needs changing. / The van needs to be repaired. / The oil needs topping up." },
      { title: "Sequencing past events clearly", explanation: "Para narrar un problema ocurrido en ruta, usa conectores temporales que ordenan los hechos: first, then, after that, eventually, finally. Hacen el relato fácil de seguir.", example: "First, the engine started making a noise. Then, the temperature light came on. Eventually, I had to pull over." },
      { title: "Modals for advice: should/ought to/had better", explanation: "'Should' y 'ought to' dan un consejo. 'Had better' tiene más urgencia e implica consecuencias si no se sigue — úsalo cuando la situación es seria.", example: "You should call the breakdown service. / You'd better not drive it like that. / You ought to get it checked." }
    ],
    speaking_prompt: "Tell me about the most memorable road trip you've done in your T6. Where did you go and what happened?",
    scenario: { type: "breakdown", title: "Breakdown assistance call", setup: "Tu T6 ha tenido una avería en una carretera de Alemania. Llama al servicio de asistencia en carretera, describe el problema técnico y explica dónde estás. La llamada es en inglés." }
  },
  {
    week: 11, title: "Accommodation, Restaurants & Shopping",
    category: "travel",
    color: "#EC4899",
    icon: "🍽️",
    phrases: [
      "I'd like to order, please.", "What do you recommend?", "I have a food allergy.",
      "Is this dish suitable for vegetarians?", "Could I see the menu, please?", "The bill, please.",
      "Is service included?", "This is not what I ordered.", "Could you bring some more bread?",
      "I'd like to return this.", "It doesn't fit.", "Have you got this in a larger size?",
      "Do you offer a discount?", "Can I pay by contactless?", "Could you wrap it as a gift?",
      "Where's the changing room?", "Is there a market nearby?", "Do you take reservations?",
      "We'd like a table for two.", "I'm afraid we're full this evening."
    ],
    vocabulary: [
      { word: "reservation", def: "reserva" },
      { word: "starter", def: "entrante/primer plato" },
      { word: "main course", def: "plato principal" },
      { word: "dessert", def: "postre" },
      { word: "complimentary", def: "gratuito/de cortesía" },
      { word: "portion", def: "porción/ración" },
      { word: "savoury", def: "salado (no dulce)" },
      { word: "cutlery", def: "cubiertos" },
      { word: "receipt", def: "recibo/tique" },
      { word: "refund", def: "reembolso" },
      { word: "exchange", def: "cambio/intercambio" },
      { word: "fitting room", def: "probador" },
      { word: "checkout", def: "caja/mostrador de pago" },
      { word: "bargain", def: "ganga/chollo" },
      { word: "souvenir", def: "recuerdo/suvenir" }
    ],
    grammar: [
      { title: "Polite requests in service situations", explanation: "En tiendas y restaurantes angloparlantes, las peticiones directas pueden sonar bruscas. Usa 'Could I…', 'I'd like…', 'Would it be possible to…' para sonar natural y educado.", example: "Could I have the bill? / I'd like to change this, please. / Would it be possible to see a different colour?" },
      { title: "Expressing dissatisfaction politely", explanation: "Quejarse sin sonar agresivo es un arte en inglés. Usa frases que reconocen que puede haber un error sin acusar directamente: 'I'm afraid…', 'I believe there may be a mistake'.", example: "I'm afraid this isn't what I ordered. / I believe there's a mistake on the bill." },
      { title: "Countable vs uncountable: food language", explanation: "Algunos alimentos son incontables en inglés (bread, water, rice, pasta). No puedes decir 'a bread' — necesitas 'a piece/slice/portion of'. En cambio, otros sí son contables (an apple, two eggs).", example: "Could I have some water? / A piece of bread, please. / I'd like a portion of chips." },
      { title: "Using 'just' in conversation", explanation: "'Just' tiene varios usos muy comunes: suavizar peticiones (just wanted to check…), indicar inmediatez (I've just arrived) o restricción (only). Aprender a usarlo da naturalidad.", example: "I just wanted to check the price. / I've just arrived. / Could I just ask one question?" },
      { title: "Responding to recommendations: so/such", explanation: "'So + adjetivo' y 'such a + sustantivo' añaden énfasis emocional. Son muy frecuentes en inglés conversacional para expresar entusiasmo o sorpresa.", example: "The food was so good! / It's such a beautiful place! / We had such a great time!" }
    ],
    speaking_prompt: "Describe the best meal you've had on a road trip. Where was it? What did you eat?",
    scenario: { type: "restaurant", title: "Ordering food with dietary requirements", setup: "Estás en un restaurante en Irlanda con un amigo/a que tiene alergia al gluten. Pide la comida y comunica claramente la alergia al camarero. La conversación es en inglés." }
  },
  {
    week: 12, title: "Border Crossings & Travel Admin",
    category: "travel",
    color: "#14B8A6",
    icon: "🛂",
    phrases: [
      "Here is my passport.", "How long can I stay?", "I'm just passing through.",
      "I have nothing to declare.", "Is this the right queue for EU citizens?", "My visa is valid until…",
      "I've lost my travel documents.", "I need to register my vehicle.", "Do I need a vignette?",
      "What documents do I need at the border?", "Is my European Health Insurance Card accepted here?",
      "I need to contact my embassy.", "My travel insurance covers this.", "I'm a EU resident.",
      "Do I need to purchase a motorway sticker?", "Is my driving licence valid here?",
      "I'd like to report a stolen item.", "Can you help me fill in this form?",
      "I'm travelling for leisure.", "How long does the crossing take?"
    ],
    vocabulary: [
      { word: "customs", def: "aduana" },
      { word: "declaration", def: "declaración" },
      { word: "vignette", def: "viñeta/pegatina de autopista" },
      { word: "valid", def: "válido" },
      { word: "expire", def: "caducar/expirar" },
      { word: "registration", def: "matrícula/registro" },
      { word: "insurance certificate", def: "certificado de seguro" },
      { word: "authority", def: "autoridad" },
      { word: "prohibited", def: "prohibido" },
      { word: "duty-free", def: "libre de impuestos" },
      { word: "transit", def: "tránsito" },
      { word: "temporary import", def: "importación temporal" },
      { word: "seizure", def: "confiscación/incautación" },
      { word: "fine", def: "multa" },
      { word: "embassy", def: "embajada" }
    ],
    grammar: [
      { title: "Modal verbs for rules and obligations", explanation: "'Must/have to' expresan obligación legal o normativa. 'Must not/can't' expresan prohibición. 'Don't have to' indica que algo no es obligatorio (no es prohibición). Esta distinción es clave en contextos de fronteras y aduanas.", example: "You must carry your passport. / You don't have to pay if you're EU. / You must not bring in meat products." },
      { title: "Passive for rules and regulations", explanation: "Las normas oficiales y reglamentos suelen estar escritas en pasiva en inglés: elimina el sujeto activo y da un tono impersonal y autoritario.", example: "Vehicles must be registered. / Passports are required. / All goods must be declared." },
      { title: "Asking for clarification formally", explanation: "Al tratar con funcionarios o autoridades en otro idioma, saber pedir aclaraciones con educación es esencial. Evita responder sin entender — siempre mejor preguntar.", example: "Could you clarify what is required? / I'm not sure I understood — could you repeat that? / Would you mind explaining?" },
      { title: "Expressing duration: for/since/how long", explanation: "'For' + período de tiempo. 'Since' + punto de inicio específico. 'How long' pregunta por la duración. Los tres van con present perfect o past simple según el contexto.", example: "I've been in Spain for 3 weeks. / I've been travelling since January. / How long will the crossing take?" },
      { title: "Future perfect: will have + past participle", explanation: "El future perfect expresa lo que ya habrá ocurrido en un momento futuro determinado. Útil para hablar de lo que habrás conseguido o recorrido al llegar a tu destino.", example: "By the time I reach Germany, I will have driven over 2000km. / We will have crossed four borders." }
    ],
    speaking_prompt: "Have you ever had a problem at a border or with travel documents? What happened? If not, imagine it.",
    scenario: { type: "border", title: "Border control conversation", setup: "Cruzas la frontera de Francia a Suiza en tu T6. El agente de control fronterizo te pregunta sobre tu viaje, cuánto tiempo te quedas y qué llevas. Responde con naturalidad y confianza en inglés." }
  },

  // WEEKS 13-16: ADVANCED B2
  {
    week: 13, title: "Debates & Critical Thinking",
    category: "advanced",
    color: "#7C3AED",
    icon: "🎯",
    phrases: [
      "I'd argue that…", "There's a strong case for…", "On balance, I believe…",
      "The evidence clearly shows…", "This is a complex issue.", "You can't generalise.",
      "That's a simplistic view.", "It's not as black and white as that.", "We need to consider all sides.",
      "I take your point, but…", "To a certain extent, yes, but…", "That's debatable.",
      "The flip side is…", "That's the crux of the matter.", "I'd push back on that.",
      "The counterargument would be…", "That's a fair point.", "I'm not entirely convinced.",
      "Where do you draw the line?", "That begs the question…"
    ],
    vocabulary: [
      { word: "controversial", def: "controvertido/polémico" },
      { word: "scrutinise", def: "examinar/escudriñar" },
      { word: "refute", def: "refutar" },
      { word: "substantiate", def: "fundamentar/respaldar" },
      { word: "nuanced", def: "matizado" },
      { word: "ambiguous", def: "ambiguo" },
      { word: "consensus", def: "consenso" },
      { word: "rhetoric", def: "retórica" },
      { word: "assertion", def: "afirmación/aseveración" },
      { word: "premise", def: "premisa" },
      { word: "impartial", def: "imparcial" },
      { word: "oversimplify", def: "simplificar en exceso" },
      { word: "implication", def: "implicación" },
      { word: "dilemma", def: "dilema" },
      { word: "ethical", def: "ético" }
    ],
    grammar: [
      { title: "Inversion for emphasis", explanation: "En inglés formal y en debates, invertir sujeto y auxiliar añade énfasis dramático. Se usa con adverbios negativos o restrictivos al inicio de frase: not only, never, rarely, hardly.", example: "Not only does it save time, but it also saves money. / Never have I seen such dedication. / Rarely is this approach used." },
      { title: "Subjunctive in formal English", explanation: "El subjuntivo formal en inglés se usa después de verbos como suggest, recommend, insist, demand + that. El verbo de la cláusula that va en infinitivo (sin conjugar), independientemente del sujeto.", example: "I suggest that he reconsider his position. / It's essential that this be discussed. / They demanded that it be reviewed." },
      { title: "Discourse markers for debate", explanation: "Los marcadores discursivos estructuran tu argumento y señalan tu posición. Son imprescindibles para hablar de forma ordenada y persuasiva en debates y presentaciones.", example: "Firstly… / Furthermore… / Nevertheless… / By contrast… / In spite of this… / Ultimately…" },
      { title: "Participle clauses for concision", explanation: "Las cláusulas de participio (-ing o -ed) comprimen dos ideas en una. Dan sofisticación al inglés escrito y hablado. El sujeto de la cláusula de participio debe coincidir con el de la frase principal.", example: "Having considered all options, I believe… / Faced with this evidence, we must… / Looking at the data, it seems clear that…" },
      { title: "Expressing doubt and certainty", explanation: "En debates, gradúa tu seguridad con precisión: desde certeza absoluta hasta mera posibilidad. Elegir el grado correcto es señal de madurez lingüística.", example: "I'm absolutely convinced that… / It's quite likely that… / There's a possibility that… / I have some reservations about…" }
    ],
    speaking_prompt: "Do you think AI should be used in clinical diagnosis? Argue both sides of the debate.",
    scenario: { type: "debate", title: "Ethics of AI in healthcare", setup: "Participas en una mesa redonda sobre IA en hospitales. Alguien afirma que la IA debería sustituir a los radiólogos. Responde de forma razonada, defendiendo la postura contraria. Todo en inglés." }
  },
  {
    week: 14, title: "Formal Writing & Emails",
    category: "advanced",
    color: "#0F766E",
    icon: "✉️",
    phrases: [
      "I am writing to enquire about…", "With reference to your email dated…",
      "I would be grateful if you could…", "Please find attached…", "I look forward to hearing from you.",
      "Should you require any further information…", "As per our previous conversation…",
      "I would like to draw your attention to…", "Further to our meeting…", "Please do not hesitate to contact me.",
      "I regret to inform you that…", "I am pleased to confirm…", "I would appreciate your prompt response.",
      "In accordance with…", "As agreed…", "I am afraid I have to decline.",
      "Thank you for your consideration.", "I would welcome the opportunity to discuss this further.",
      "Please accept my apologies for…", "I can confirm receipt of…"
    ],
    vocabulary: [
      { word: "enquiry", def: "consulta/pregunta formal" },
      { word: "correspondence", def: "correspondencia" },
      { word: "recipient", def: "destinatario" },
      { word: "acknowledge", def: "acusar recibo / reconocer" },
      { word: "comply", def: "cumplir con" },
      { word: "rectify", def: "rectificar" },
      { word: "liability", def: "responsabilidad legal" },
      { word: "confidential", def: "confidencial" },
      { word: "aforementioned", def: "antes mencionado" },
      { word: "pursuant to", def: "de conformidad con" },
      { word: "hereby", def: "por medio de la presente" },
      { word: "undersigned", def: "el abajo firmante" },
      { word: "notwithstanding", def: "no obstante" },
      { word: "appendix", def: "apéndice/anexo" },
      { word: "ratify", def: "ratificar" }
    ],
    grammar: [
      { title: "Formal vs informal register", explanation: "El registro depende del destinatario y el contexto. En inglés formal: sin contracciones, vocabulario avanzado, frases más largas. En informal: contracciones, vocabulario cotidiano, frases cortas.", example: "Informal: I can't come. / Formal: I am unable to attend. / Informal: Can you send it? / Formal: Could you kindly forward it?" },
      { title: "Nominalisation in formal writing", explanation: "La nominalización (verbo → sustantivo) es el rasgo más característico del inglés formal y escrito. Hace el texto más objetivo y compacto. Es especialmente común en cartas, informes y propuestas.", example: "We decided → Our decision. / We investigated → Our investigation found. / They agreed → Their agreement." },
      { title: "Complex sentence structures", explanation: "Las frases complejas combinan cláusulas subordinadas, participiales y coordinadas. En un email formal bien construido, una sola frase puede transmitir mucha información con precisión.", example: "Having reviewed the documentation, I believe that, notwithstanding the current limitations, the proposal merits serious consideration." },
      { title: "Conditional perfect for formal proposals", explanation: "El condicional perfecto (would/could/might + have + participio) sirve para sugerir lo que debería haberse hecho o lo que habría ocurrido bajo otras circunstancias. Tono reflexivo y profesional.", example: "Had the procedure been followed, this could have been avoided. / If the guidelines had been clearer, the error would not have occurred." },
      { title: "Hedging and cautious language in formal writing", explanation: "En comunicación profesional evita afirmaciones demasiado directas o rotundas. El lenguaje tentativo reduce el riesgo de conflicto y protege tu posición si los hechos cambian.", example: "It would appear that… / There may be some concern about… / It is possible that this could lead to…" }
    ],
    speaking_prompt: "You need to write a formal email requesting funding for a training course. What key points would you include?",
    scenario: { type: "email_writing", title: "Writing a formal complaint", setup: "El proveedor angloparlante de equipos de tu hospital te ha enviado el artículo equivocado. Redacta o dicta en inglés un email de reclamación profesional pidiendo la sustitución del pedido." }
  },
  {
    week: 15, title: "Interviews & Presentations",
    category: "advanced",
    color: "#B45309",
    icon: "🎤",
    phrases: [
      "Thank you for the opportunity to speak today.", "I'd like to take you through our main findings.",
      "Let me start with a brief overview.", "As you can see from this slide…",
      "I'd like to highlight three key points.", "Moving on to the next point…",
      "This brings me to my next point.", "To put this in context…", "In summary…",
      "I'm happy to take questions now.", "That's a great question.", "I'll come back to that if I may.",
      "Could you tell me about your biggest challenge?", "How do you handle pressure?",
      "What motivates you professionally?", "I'd say my main strength is…",
      "I'm particularly proud of…", "My long-term goal is…", "I thrive in…",
      "I'm looking for an opportunity to…"
    ],
    vocabulary: [
      { word: "competency", def: "competencia/aptitud" },
      { word: "aptitude", def: "aptitud/talento" },
      { word: "initiative", def: "iniciativa" },
      { word: "resilience", def: "resiliencia" },
      { word: "articulate", def: "expresar con claridad / elocuente" },
      { word: "persuasive", def: "persuasivo" },
      { word: "concise", def: "conciso" },
      { word: "credibility", def: "credibilidad" },
      { word: "rapport", def: "buena relación/sintonía" },
      { word: "benchmark", def: "referencia/punto de comparación" },
      { word: "track record", def: "historial/trayectoria" },
      { word: "deliverable", def: "entregable" },
      { word: "stakeholder", def: "parte interesada" },
      { word: "impact", def: "impacto" },
      { word: "contribution", def: "contribución/aportación" }
    ],
    grammar: [
      { title: "STAR technique in English", explanation: "STAR (Situation-Task-Action-Result) es la técnica estándar en entrevistas anglosajonas para responder preguntas de competencia. Usa past simple para describir cada parte y sé concreto en el resultado.", example: "When I was working in radiology (situation), I needed to improve triage (task). I developed an app (action) which reduced errors by 30% (result)." },
      { title: "Signposting language for presentations", explanation: "El signposting guía al público por tu presentación. Sin estas señales, el oyente pierde el hilo. Son fórmulas que debes tener automatizadas antes de hablar en público en inglés.", example: "First of all… / Moving on… / As I mentioned earlier… / To recap… / Before I conclude…" },
      { title: "Rhetorical questions", explanation: "Las preguntas retóricas no esperan respuesta — crean implicación emocional y hacen pensar al oyente. Son una herramienta de persuasión muy efectiva en presentaciones y discursos.", example: "So why does this matter? / What would you do in this situation? / Can we really afford to ignore this?" },
      { title: "Sentence stress for persuasion", explanation: "En inglés hablado, el énfasis en ciertas palabras cambia el significado y la convicción. Practica poniendo el acento en palabras clave de tus argumentos para sonar más seguro y persuasivo.", example: "The DATA clearly SHOWS that… / THIS is the most IMPORTANT finding. / We NEED to act NOW." },
      { title: "Using examples effectively: for instance / such as / take ... for example", explanation: "Los ejemplos concretos hacen los argumentos más creíbles. 'For instance' y 'for example' introducen ejemplos completos; 'such as' va seguido de lista; 'take X for example' funciona bien en presentaciones orales.", example: "Take AI in radiology, for instance — it has already shown remarkable accuracy. / Hospitals such as ours have benefited greatly." }
    ],
    speaking_prompt: "Practise a 3-minute pitch for DiagnoGuide in English. Explain what it does, why it matters, and what makes it unique.",
    scenario: { type: "interview", title: "Job interview in English", setup: "Te están entrevistando para un programa internacional de innovación en salud. Te preguntan: 'Tell me about yourself and your most significant professional achievement.' Responde con la técnica STAR en inglés." }
  },
  {
    week: 16, title: "B2 Final Review & Consolidation",
    category: "advanced",
    color: "#1D4ED8",
    icon: "🏆",
    phrases: [
      "I've come a long way since I started.", "My English has improved significantly.",
      "I feel more confident when speaking.", "I still find it hard to…", "I need to work on my…",
      "I'm much better at listening now.", "Reading English texts is easier than it used to be.",
      "I can follow most conversations.", "I sometimes struggle with phrasal verbs.",
      "I'd like to continue improving.", "I'm planning to take the B2 exam soon.",
      "Consistency has been key for me.", "I've enjoyed learning through real contexts.",
      "I'd recommend this method to others.", "Language learning is a lifelong journey.",
      "I use English at work now.", "I'm not afraid to make mistakes anymore.",
      "I learn from my errors.", "Every little practice session counts.",
      "I'm proud of what I've achieved."
    ],
    vocabulary: [
      { word: "proficiency", def: "dominio/competencia" },
      { word: "fluency", def: "fluidez" },
      { word: "articulation", def: "articulación" },
      { word: "acquisition", def: "adquisición" },
      { word: "immersion", def: "inmersión" },
      { word: "consolidate", def: "consolidar" },
      { word: "reinforce", def: "reforzar" },
      { word: "milestone", def: "hito/logro" },
      { word: "assessment", def: "evaluación" },
      { word: "certificate", def: "certificado" },
      { word: "authentic", def: "auténtico" },
      { word: "spontaneous", def: "espontáneo" },
      { word: "confidence", def: "confianza" },
      { word: "persistence", def: "perseverancia" },
      { word: "progress", def: "progreso" }
    ],
    grammar: [
      { title: "Review: all tense forms", explanation: "Repaso completo de todos los tiempos en inglés y sus usos principales. Referencia rápida para el examen B2: simple / continuous / perfect / perfect continuous en pasado, presente y futuro.", example: "Simple/Continuous/Perfect/Perfect Continuous — past, present, future. Each has a clear communicative purpose." },
      { title: "Review: modal verbs overview", explanation: "Repaso de todos los modales: can/could (capacidad/posibilidad), will/would (futuro/condicional), shall/should (consejo), may/might (posibilidad), must/have to (obligación). Cada uno tiene matices importantes.", example: "I can do it. / I could try. / I should go. / I might be late. / I must attend." },
      { title: "Review: complex sentences", explanation: "Para el B2 necesitas combinar cláusulas con subordinadores (although, because, unless), pronombres relativos (who, which, that) y marcadores discursivos para construir frases fluidas y cohesionadas.", example: "Although I was tired, I attended the conference, which turned out to be extremely worthwhile." },
      { title: "Review: reported speech & conditionals", explanation: "Ambas estructuras son esenciales en el B2. El estilo indirecto requiere retroceder los tiempos. Los condicionales mixtos (2ª/3ª) expresan matices de realidad e hipótesis combinados.", example: "She told me she had applied. / If I had known, I would have come. / Unless you study, you won't pass." },
      { title: "Review: register and appropriacy", explanation: "Saber adaptar el lenguaje al contexto es una competencia B2 clave. El examinador valora que sepas cuándo usar formal/informal, vocabulario preciso, y estructuras adecuadas al tipo de texto.", example: "Email to boss: 'I would like to request…' / Text to friend: 'Can you help me with…?'" }
    ],
    speaking_prompt: "Look back over 16 weeks of learning. What has been the most useful thing you've learned? What are your goals for the next 3 months?",
    scenario: { type: "reflection", title: "Final speaking assessment", setup: "Evaluación final oral. Da un discurso de 3 minutos en inglés sobre ti mismo: tu trabajo, tu pasión por la tecnología, tus aventuras en autocaravana y tus planes de futuro. Intenta usar la mayor variedad posible de estructuras." }
  },

  // WEEKS 17-20: PREVENTIVE MEDICINE — VACCINATION CLINIC
  {
    week: 17, title: "Vaccine Clinic: Reviewing Vaccination History",
    category: "prevention",
    color: "#059669",
    icon: "📋",
    phrases: [
      "Do you have your vaccination record with you?", "Could I see your vaccination card, please?",
      "Which vaccines have you had in the past?", "When was your last tetanus jab?",
      "Have you ever had a bad reaction to a vaccine?", "Are you allergic to anything — food, medicines or latex?",
      "Are you feeling unwell today?", "Have you had a fever in the last few days?",
      "Are you pregnant, or is there any chance you could be?", "Are you taking any medication at the moment?",
      "Do you have any condition that affects your immune system?", "I can't find that dose in our records.",
      "Let me check your records on the system.", "You're up to date with your vaccines.",
      "You're missing one dose of this vaccine.", "Do you remember roughly when you had it?",
      "Did you have it here or in another country?", "Do you work with patients?",
      "Today we can give you this vaccine.", "I'll update your record after the vaccine."
    ],
    vocabulary: [
      { word: "vaccination record", def: "cartilla / registro de vacunación" },
      { word: "immunisation", def: "inmunización" },
      { word: "dose", def: "dosis" },
      { word: "booster", def: "dosis de recuerdo" },
      { word: "schedule", def: "calendario / pauta" },
      { word: "up to date", def: "al día" },
      { word: "overdue", def: "pendiente / atrasado" },
      { word: "contraindication", def: "contraindicación" },
      { word: "precaution", def: "precaución" },
      { word: "immunocompromised", def: "inmunodeprimido" },
      { word: "serology", def: "serología" },
      { word: "antibody levels", def: "niveles de anticuerpos" },
      { word: "catch-up", def: "pauta de actualización / rescate" },
      { word: "risk group", def: "grupo de riesgo" },
      { word: "eligible", def: "candidato / que cumple criterios" }
    ],
    grammar: [
      { title: "Present Perfect for vaccination history", explanation: "Para preguntar por vacunas pasadas sin fecha concreta usa Present Perfect ('Have you ever had…?', 'Have you had your flu jab this year?'). Cuando el paciente da una fecha concreta, la respuesta pasa a Past Simple.", example: "Have you ever had the hepatitis B vaccine? / Yes, I had it in 2019." },
      { title: "Yes/No questions with do / are / have", explanation: "En español preguntamos solo con la entonación ('¿Tiene alergias?'). En inglés necesitas un auxiliar delante del sujeto: do/does para verbos normales, are/is con 'be', have con Present Perfect. Es el error más típico en las preguntas de cribado.", example: "Do you have any allergies? / Are you feeling well today? / Have you had a fever recently?" },
      { title: "Asking about time: When / How long ago / the last time", explanation: "'When…?' pide una fecha. 'How long ago…?' pide cuánto tiempo ha pasado. 'When was the last time…?' sirve para la última dosis. Útil cuando el paciente no trae la cartilla.", example: "When was your last tetanus jab? / How long ago did you have it? / When was the last time you had a booster?" },
      { title: "'Any' in questions and negatives", explanation: "Usa 'any' en preguntas y frases negativas con sustantivos en plural o incontables. 'Some' se usa en frases afirmativas. En el cribado de vacunas casi todas las preguntas llevan 'any'.", example: "Do you have any allergies? / I don't take any medication. / I have some questions." },
      { title: "Asking sensitive questions tactfully", explanation: "Preguntas como el embarazo o la inmunodepresión pueden resultar incómodas. Suavízalas con 'Could I ask…', 'Is there any chance…' o explicando el motivo: 'I need to ask this before any vaccine'.", example: "I need to ask everyone this: is there any chance you could be pregnant? / Could I ask if you have any problems with your immune system?" }
    ],
    speaking_prompt: "Explain in English how a vaccination appointment works in your preventive medicine unit, from the moment the patient arrives until they leave.",
    scenario: { type: "vaccine_screening", title: "Pre-vaccination screening", setup: "Un paciente angloparlante llega a la consulta de vacunas sin su cartilla. Revisa qué vacunas recuerda haber recibido, hazle las preguntas de cribado (alergias, fiebre, embarazo, medicación, problemas de inmunidad) y explícale qué vacuna se puede poner hoy. Todo en inglés. (El profesor hará de paciente.)" }
  },
  {
    week: 18, title: "Giving Vaccines: Consent & Procedure",
    category: "prevention",
    color: "#0D9488",
    icon: "💉",
    phrases: [
      "Today you're getting the flu vaccine.", "This vaccine protects you against…",
      "Do you have any questions before we start?", "Are you happy to go ahead?",
      "Which arm would you prefer?", "Are you right- or left-handed?",
      "Could you roll up your sleeve, please?", "Please sit down and relax your arm.",
      "You'll feel a small scratch.", "Try to keep your arm still.",
      "That's it — all done.", "Press gently on the cotton wool for a minute.",
      "Would you like a plaster?", "We're giving you two vaccines today, one in each arm.",
      "Do you tend to feel faint with needles?", "Let me know if you feel dizzy.",
      "Would you prefer to lie down?", "Take a deep breath and breathe out slowly.",
      "Please wait in the waiting room for 15 minutes.", "I'm just writing down the batch number."
    ],
    vocabulary: [
      { word: "jab", def: "pinchazo / vacuna (informal, UK)" },
      { word: "injection site", def: "zona de punción" },
      { word: "intramuscular", def: "intramuscular" },
      { word: "subcutaneous", def: "subcutáneo" },
      { word: "deltoid", def: "deltoides" },
      { word: "needle", def: "aguja" },
      { word: "syringe", def: "jeringa" },
      { word: "sleeve", def: "manga" },
      { word: "plaster", def: "tirita" },
      { word: "cotton wool", def: "algodón" },
      { word: "batch number", def: "número de lote" },
      { word: "expiry date", def: "fecha de caducidad" },
      { word: "cold chain", def: "cadena de frío" },
      { word: "to faint", def: "desmayarse" },
      { word: "verbal consent", def: "consentimiento verbal" }
    ],
    grammar: [
      { title: "'Will' to say what the patient will feel", explanation: "Usa 'will' ('ll) para anticipar lo que va a notar el paciente. Anticipar la sensación reduce la ansiedad y es muy natural en inglés clínico.", example: "You'll feel a small scratch. / It'll only take a second. / You won't feel much." },
      { title: "'Be going to' for what you are about to do", explanation: "Usa 'going to' para anunciar lo que ya has decidido hacer ahora mismo. Explicar cada paso antes de hacerlo es buena práctica con pacientes que no conocen el sistema.", example: "I'm going to clean your arm first. / I'm going to give you the vaccine in your left arm." },
      { title: "Softening instructions: could / just / please", explanation: "Un imperativo seco ('Roll up your sleeve') puede sonar brusco en inglés. Suavízalo con 'Could you…?', 'just' o 'please'. 'Just' indica que es algo rápido y sencillo.", example: "Could you roll up your sleeve, please? / Just relax your arm. / Just a moment, please." },
      { title: "Offering choices: Would you like / Would you prefer", explanation: "'Would you like…?' ofrece algo. 'Would you prefer…?' pide elegir entre opciones. Implicar al paciente en pequeñas decisiones (brazo, tumbarse) aumenta la confianza.", example: "Would you like a plaster? / Would you prefer your left or right arm? / Would you prefer to lie down?" },
      { title: "No obligation: don't need to / don't have to", explanation: "'Don't need to' y 'don't have to' indican que algo NO es necesario (no es una prohibición). Muy útiles para tranquilizar. Ojo: 'mustn't' significa prohibición, no 'no hace falta'.", example: "You don't need to take your shirt off. / You don't have to fast before the vaccine. / You mustn't rub the area hard." }
    ],
    speaking_prompt: "Explain to a patient which vaccine they are getting today, why it is recommended for them, and what you are going to do, step by step.",
    scenario: { type: "vaccine_administration", title: "Vaccinating a nervous patient", setup: "Un paciente angloparlante con miedo a las agujas viene a vacunarse. Explícale qué vacuna le vas a poner y para qué sirve, pide su consentimiento verbal, tranquilízale durante la técnica e indícale que debe esperar en la sala después. Habla en inglés. (El profesor hará de paciente.)" }
  },
  {
    week: 19, title: "After the Vaccine: Side Effects & Reactions",
    category: "prevention",
    color: "#16A34A",
    icon: "🩹",
    phrases: [
      "Your arm might feel sore for a day or two.", "Some people get a mild fever afterwards.",
      "You may feel tired or have a headache.", "These side effects usually go away on their own.",
      "You can take paracetamol if you need to.", "Put a cold compress on your arm if it's swollen.",
      "Keep moving your arm — it helps with the soreness.", "If you feel unwell, come back or call us.",
      "How are you feeling now?", "Do you feel dizzy or sick?",
      "Do you have any itching or a rash?", "Are you having any trouble breathing?",
      "Tell me straight away if your throat feels tight.", "Lie down and I'll raise your legs.",
      "I'm calling for help now.", "This is a normal reaction — there's nothing to worry about.",
      "We'll keep an eye on you for a bit longer.", "We'll report this reaction.",
      "Seek medical attention if it gets worse.", "Here's a leaflet with all the information."
    ],
    vocabulary: [
      { word: "side effect", def: "efecto secundario" },
      { word: "adverse reaction", def: "reacción adversa" },
      { word: "soreness", def: "dolor (a la palpación)" },
      { word: "swelling", def: "hinchazón" },
      { word: "redness", def: "enrojecimiento" },
      { word: "rash", def: "erupción / sarpullido" },
      { word: "hives", def: "urticaria / ronchas" },
      { word: "itching", def: "picor" },
      { word: "light-headed", def: "mareado / aturdido" },
      { word: "shortness of breath", def: "falta de aire / disnea" },
      { word: "adrenaline", def: "adrenalina" },
      { word: "observation period", def: "periodo de observación" },
      { word: "leaflet", def: "folleto informativo" },
      { word: "cold compress", def: "compresa fría" },
      { word: "to report", def: "notificar" }
    ],
    grammar: [
      { title: "Probability: may / might / could", explanation: "Para hablar de efectos secundarios posibles, no seguros, usa may, might o could + infinitivo. Transmite la información con honestidad sin alarmar al paciente.", example: "Your arm might feel sore. / You may have a mild fever. / It could feel a bit stiff tomorrow." },
      { title: "First conditional for aftercare advice", explanation: "If + presente → imperativo o will. Es la estructura típica para dar instrucciones al alta: si pasa X, haz Y.", example: "If your arm gets red and swollen, put a cold compress on it. / If you feel unwell, call us. / If it gets worse, you'll need to see a doctor." },
      { title: "Frequency words to explain risk", explanation: "Usually, often, sometimes, rarely y very rarely ayudan a explicar cuánto de frecuente es un efecto. Van antes del verbo principal y después de 'be'.", example: "Side effects are usually mild. / Some people sometimes feel tired. / Serious reactions are very rare." },
      { title: "Present continuous for symptoms right now", explanation: "Para preguntar o describir lo que el paciente nota en este momento usa Present Continuous. Es clave durante el periodo de observación.", example: "Are you feeling dizzy? / My neck is itching. / Is it getting worse?" },
      { title: "Urgency: straight away / immediately / as soon as", explanation: "'Straight away' e 'immediately' significan 'inmediatamente'. 'As soon as' + presente significa 'en cuanto'. Útiles para indicar cuándo pedir ayuda.", example: "Tell me straight away if you feel unwell. / Call 112 immediately if you can't breathe. / Come back as soon as you notice a rash." }
    ],
    speaking_prompt: "Explain the common side effects of a vaccine to a patient, what they can do at home, and when they should seek medical help.",
    scenario: { type: "vaccine_reaction", title: "Reaction in the waiting room", setup: "Una paciente angloparlante, 10 minutos después de vacunarse, dice que se siente mareada y que le pica el cuello. Pregúntale por sus síntomas, valora cómo está y comunícate con claridad y calma. Todo en inglés. (El profesor hará de paciente.)" }
  },
  {
    week: 20, title: "Appointments, Follow-up & Travel Vaccines",
    category: "prevention",
    color: "#0891B2",
    icon: "📅",
    phrases: [
      "You'll need another dose in a few weeks.", "Let's book your next appointment.",
      "Does next Tuesday at ten suit you?", "Is morning or afternoon better for you?",
      "I'll write the date on your card.", "You'll get a reminder by text message.",
      "If you can't make it, please call to cancel.", "Please bring your vaccination card next time.",
      "You missed your last appointment — shall we rebook it?", "That's the last dose of the schedule.",
      "You won't need another dose for now.", "When are you travelling?",
      "Which countries are you visiting?", "Some vaccines need to be given weeks before you travel.",
      "Could you spell your surname, please?", "What's your date of birth?",
      "Could I have a contact phone number?", "Let me just double-check the date.",
      "So that's Thursday the twelfth at half past nine.", "Is there anything else I can help you with?"
    ],
    vocabulary: [
      { word: "appointment", def: "cita" },
      { word: "to book", def: "reservar / citar" },
      { word: "to reschedule", def: "cambiar la cita" },
      { word: "to cancel", def: "anular" },
      { word: "reminder", def: "recordatorio" },
      { word: "availability", def: "disponibilidad" },
      { word: "slot", def: "hueco (en la agenda)" },
      { word: "follow-up", def: "seguimiento" },
      { word: "second dose", def: "segunda dosis" },
      { word: "surname", def: "apellido" },
      { word: "date of birth", def: "fecha de nacimiento" },
      { word: "no-show", def: "paciente que no acude a la cita" },
      { word: "waiting list", def: "lista de espera" },
      { word: "certificate", def: "certificado" },
      { word: "travel clinic", def: "consulta del viajero" }
    ],
    grammar: [
      { title: "Prepositions of time: at / on / in", explanation: "'At' para horas (at 10:30), 'on' para días y fechas (on Monday, on the 12th), 'in' para meses, años y partes del día (in March, in the morning). Excepción: 'at night', 'at the weekend'.", example: "Your appointment is on Tuesday at 10:30. / You'll need the next dose in March." },
      { title: "Saying dates and times", explanation: "Las fechas usan ordinales: 'the twelfth of March' o 'March the twelfth'. Para la hora: 'half past nine' (9:30), 'quarter to ten' (9:45), 'quarter past ten' (10:15). Repetir la fecha en voz alta evita errores.", example: "So that's Thursday the twelfth at half past nine. / Is the twenty-first OK for you?" },
      { title: "Suggesting options: How about / Would … suit you / Shall we", explanation: "Estas estructuras proponen una fecha de forma amable sin imponerla. 'Shall we…?' propone hacer algo juntos.", example: "How about Monday morning? / Would Wednesday at eleven suit you? / Shall we book it now?" },
      { title: "Present continuous vs will for future plans", explanation: "Present Continuous para citas ya fijadas ('You're coming back on the 5th'). 'Will' para decisiones o promesas en el momento ('I'll send you a reminder').", example: "You're coming back on the fifth of May. / I'll write it on your card. / We'll call you if anything changes." },
      { title: "Checking information: spelling and question tags", explanation: "Para confirmar datos pide deletrear ('Could you spell that?') y usa question tags: afirmación + auxiliar negativo ('…, isn't it?'). Sirven para comprobar sin sonar a interrogatorio.", example: "Could you spell your surname, please? / Your date of birth is the third of June, isn't it? / You're travelling in August, aren't you?" }
    ],
    speaking_prompt: "Book a follow-up appointment for a patient who needs another dose: agree on a date and time, confirm their details and explain what they need to bring.",
    scenario: { type: "appointment_booking", title: "Rescheduling a dose by phone", setup: "Un paciente angloparlante llama por teléfono porque no puede venir a su cita para la siguiente dosis. Busca una nueva fecha y hora, confirma sus datos (nombre, fecha de nacimiento, teléfono) y recuérdale qué debe traer. Todo en inglés. (El profesor hará de paciente.)" }
  }
];

const CATEGORIES = {
  general: { label: "Inglés General", color: "#3B82F6", bg: "#EFF6FF" },
  health: { label: "Sanidad y Medicina", color: "#EF4444", bg: "#FEF2F2" },
  travel: { label: "Viajes y Autocaravana", color: "#F97316", bg: "#FFF7ED" },
  advanced: { label: "B2 Avanzado", color: "#7C3AED", bg: "#F5F3FF" },
  prevention: { label: "Medicina Preventiva · Vacunas", color: "#059669", bg: "#ECFDF5" }
};

// ─── SPEECH UTILITIES ────────────────────────────────────────────────────────
const speak = (text, rate = 0.9, onEnd = null) => {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-GB";
  u.rate = rate;
  u.pitch = 1;
  const voices = window.speechSynthesis.getVoices();
  const pref = voices.find(v => v.lang === "en-GB" && v.name.toLowerCase().includes("daniel"))
    || voices.find(v => v.lang.startsWith("en"));
  if (pref) u.voice = pref;
  if (onEnd) u.onend = onEnd;
  window.speechSynthesis.speak(u);
};

const stopSpeaking = () => { if (window.speechSynthesis) window.speechSynthesis.cancel(); };

// ─── QUIZ GENERATOR ──────────────────────────────────────────────────────────
const generateQuiz = (week) => {
  const w = CURRICULUM[week - 1];
  return [
    {
      q: `What does "${w.vocabulary[0].word}" mean in Spanish?`,
      options: [w.vocabulary[0].def, w.vocabulary[3].def, w.vocabulary[7].def, w.vocabulary[11].def],
      correct: 0,
      type: "vocab"
    },
    {
      q: `Complete the phrase: "I'd like to _____ that…" (expressing disagreement)`,
      options: ["point out", "make sure", "look after", "come along"],
      correct: 0,
      type: "phrase"
    },
    {
      q: `Which is correct? (${w.grammar[0].title})`,
      options: [
        w.grammar[0].example.split(".")[0] + ".",
        w.grammar[0].example.split(".")[0].replace(/have|has/, "had") + ".",
        "I been working here for years.",
        "I working here since 2020."
      ],
      correct: 0,
      type: "grammar"
    },
    {
      q: `What is the meaning of "${w.vocabulary[5].word}"?`,
      options: [w.vocabulary[5].def, w.vocabulary[2].def, w.vocabulary[9].def, w.vocabulary[13].def],
      correct: 0,
      type: "vocab"
    },
    {
      q: `Choose the best formal phrase to start a work email:`,
      options: ["I am writing to enquire about…", "Hey, can you help me?", "What's up with your report?", "Send me the stuff ASAP."],
      correct: 0,
      type: "register"
    }
  ];
};

// ─── STORAGE ─────────────────────────────────────────────────────────────────
const STORAGE_KEY = "b2english_progress_v1";
const API_KEY_STORAGE = "b2english_apikey_v1";

const loadProgress = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
};
const saveProgress = (data) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch { }
};
const loadApiKey = () => {
  try { return localStorage.getItem(API_KEY_STORAGE) || ""; } catch { return ""; }
};
const saveApiKey = (key) => {
  try { localStorage.setItem(API_KEY_STORAGE, key); } catch { }
};

// ─── API CALL ─────────────────────────────────────────────────────────────────
const CLAUDE_MODEL = "claude-sonnet-5-5";

const callClaude = async (messages, systemPrompt) => {
  const apiKey = loadApiKey();
  if (!apiKey) throw new Error("NO_API_KEY");
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true"
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 1000,
      system: systemPrompt,
      messages
    })
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error ${response.status}`);
  }
  const data = await response.json();
  return data.content?.[0]?.text || "No response generated.";
};

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function ProgressBar({ value, max, color = "#3B82F6" }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div style={{ background: "#E5E7EB", borderRadius: 8, height: 8, overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, background: color, height: "100%", borderRadius: 8, transition: "width 0.5s ease" }} />
    </div>
  );
}

function AudioButton({ text, label = "🔊", size = 14 }) {
  const [playing, setPlaying] = useState(false);
  return (
    <button
      onClick={() => {
        if (playing) { stopSpeaking(); setPlaying(false); return; }
        setPlaying(true);
        speak(text, 0.85, () => setPlaying(false));
      }}
      style={{
        background: playing ? "#DBEAFE" : "#F3F4F6",
        border: "1px solid " + (playing ? "#93C5FD" : "#D1D5DB"),
        borderRadius: 6, padding: "2px 8px", cursor: "pointer",
        fontSize: size, color: playing ? "#1D4ED8" : "#4B5563",
        transition: "all 0.2s"
      }}
      title={playing ? "Stop" : "Listen"}
    >
      {playing ? "⏹" : label}
    </button>
  );
}

function WeekCard({ week, progress, onClick }) {
  const w = CURRICULUM[week - 1];
  const cat = CATEGORIES[w.category];
  const done = progress?.quizScore !== undefined;
  const started = progress?.phrasesDone || progress?.vocabDone || progress?.grammarDone;

  return (
    <div
      onClick={onClick}
      style={{
        background: "#FFFFFF",
        border: `2px solid ${done ? w.color : started ? "#D1D5DB" : "#F3F4F6"}`,
        borderRadius: 14,
        padding: "16px",
        cursor: "pointer",
        transition: "all 0.2s",
        position: "relative",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
      }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
    >
      {done && (
        <div style={{
          position: "absolute", top: 8, right: 8,
          background: w.color, color: "#fff",
          borderRadius: "50%", width: 22, height: 22,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 700
        }}>✓</div>
      )}
      <div style={{ fontSize: 24, marginBottom: 6 }}>{w.icon}</div>
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: 1,
        color: cat.color, textTransform: "uppercase", marginBottom: 4
      }}>{cat.label}</div>
      <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 4 }}>Week {week}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", lineHeight: 1.3 }}>{w.title}</div>
      {done && (
        <div style={{ marginTop: 8 }}>
          <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 4 }}>
            Quiz: {progress.quizScore}/5
          </div>
          <ProgressBar value={progress.quizScore} max={5} color={w.color} />
        </div>
      )}
    </div>
  );
}

function PhrasesTab({ week }) {
  const w = CURRICULUM[week - 1];
  const [translated, setTranslated] = useState(new Set());
  const [translations, setTranslations] = useState({});
  const [loadingIdx, setLoadingIdx] = useState(null);

  const getTranslation = async (phrase, i) => {
    if (translations[i]) {
      // toggle off if already loaded
      setTranslated(prev => { const s = new Set(prev); s.has(i) ? s.delete(i) : s.add(i); return s; });
      return;
    }
    setLoadingIdx(i);
    try {
      const res = await callClaude(
        [{ role: "user", content: `Translate this English phrase to Spanish. Return ONLY the Spanish translation, nothing else: "${phrase}"` }],
        "You are a translator. Return only the Spanish translation of the phrase given, with no extra text, no quotes, no explanation."
      );
      setTranslations(prev => ({ ...prev, [i]: res.trim() }));
      setTranslated(prev => { const s = new Set(prev); s.add(i); return s; });
    } catch {
      setTranslations(prev => ({ ...prev, [i]: "🔑 API key necesaria para traducir" }));
      setTranslated(prev => { const s = new Set(prev); s.add(i); return s; });
    }
    setLoadingIdx(null);
  };

  return (
    <div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 4 }}>
        20 Frases Clave
      </h3>
      <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 16 }}>
        🔊 para escuchar · 🇪🇸 para ver la traducción al español
      </p>
      <div style={{ display: "grid", gap: 8 }}>
        {w.phrases.map((phrase, i) => (
          <div
            key={i}
            style={{
              background: translated.has(i) ? "#F0F9FF" : "#F9FAFB",
              border: `1px solid ${translated.has(i) ? "#BAE6FD" : "#E5E7EB"}`,
              borderRadius: 10,
              padding: "10px 14px",
              transition: "all 0.2s"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{
                background: w.color, color: "#fff",
                borderRadius: 6, width: 22, height: 22,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700, flexShrink: 0
              }}>{i + 1}</span>
              <span style={{ fontSize: 14, color: "#1F2937", flex: 1, fontStyle: "italic" }}>
                "{phrase}"
              </span>
              <AudioButton text={phrase} />
              <button
                onClick={() => getTranslation(phrase, i)}
                disabled={loadingIdx === i}
                title="Ver traducción"
                style={{
                  background: translated.has(i) ? "#DBEAFE" : "#F3F4F6",
                  border: `1px solid ${translated.has(i) ? "#93C5FD" : "#D1D5DB"}`,
                  borderRadius: 6, padding: "2px 8px", cursor: "pointer",
                  fontSize: 13, transition: "all 0.2s",
                  opacity: loadingIdx === i ? 0.5 : 1
                }}
              >
                {loadingIdx === i ? "⏳" : "🇪🇸"}
              </button>
            </div>
            {translated.has(i) && translations[i] && (
              <div style={{
                marginTop: 8, paddingTop: 8,
                borderTop: "1px dashed #BAE6FD",
                fontSize: 13, color: "#0369A1", fontStyle: "normal",
                display: "flex", alignItems: "center", gap: 6
              }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#0EA5E9" }}>ES</span>
                {translations[i]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function VocabTab({ week }) {
  const w = CURRICULUM[week - 1];
  const [flipped, setFlipped] = useState(new Set());
  const [mode, setMode] = useState("cards"); // cards | list

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "center" }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", flex: 1 }}>
          15 Key Words
        </h3>
        {["cards", "list"].map(m => (
          <button key={m} onClick={() => setMode(m)} style={{
            padding: "4px 12px", borderRadius: 8, border: "1px solid",
            borderColor: mode === m ? w.color : "#E5E7EB",
            background: mode === m ? w.color : "#fff",
            color: mode === m ? "#fff" : "#6B7280",
            fontSize: 12, cursor: "pointer", fontWeight: 600
          }}>{m === "cards" ? "🃏 Cards" : "📋 List"}</button>
        ))}
      </div>

      {mode === "cards" ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {w.vocabulary.map((v, i) => (
            <div
              key={i}
              onClick={() => setFlipped(prev => { const s = new Set(prev); s.has(i) ? s.delete(i) : s.add(i); return s; })}
              style={{
                background: flipped.has(i) ? w.color : "#fff",
                border: `2px solid ${flipped.has(i) ? w.color : "#E5E7EB"}`,
                borderRadius: 12, padding: "14px 10px",
                cursor: "pointer", textAlign: "center",
                minHeight: 80, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                transition: "all 0.3s", gap: 6
              }}
            >
              {flipped.has(i) ? (
                <>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>Español</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{v.def}</span>
                </>
              ) : (
                <>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#1F2937" }}>{v.word}</span>
                  <AudioButton text={v.word} size={12} />
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: "grid", gap: 6 }}>
          {w.vocabulary.map((v, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12,
              background: "#F9FAFB", borderRadius: 10, padding: "10px 14px",
              border: "1px solid #E5E7EB"
            }}>
              <AudioButton text={v.word} />
              <span style={{ fontSize: 14, fontWeight: 700, color: "#1F2937", minWidth: 140 }}>{v.word}</span>
              <span style={{ fontSize: 13, color: "#6B7280" }}>{v.def}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function GrammarTab({ week }) {
  const w = CURRICULUM[week - 1];
  const [open, setOpen] = useState(null);

  return (
    <div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 4 }}>5 Reglas de Gramática</h3>
      <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 16 }}>
        Toca cada regla para ver la explicación en español y el ejemplo en inglés.
      </p>
      <div style={{ display: "grid", gap: 10 }}>
        {w.grammar.map((g, i) => (
          <div key={i} style={{
            background: "#fff", border: `1px solid ${open === i ? w.color : "#E5E7EB"}`,
            borderRadius: 12, overflow: "hidden", transition: "all 0.2s"
          }}>
            <div
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                padding: "14px 16px", cursor: "pointer", display: "flex",
                alignItems: "center", gap: 12
              }}
            >
              <div style={{
                background: w.color, color: "#fff", borderRadius: "50%",
                width: 28, height: 28, display: "flex", alignItems: "center",
                justifyContent: "center", fontWeight: 800, fontSize: 13, flexShrink: 0
              }}>{i + 1}</div>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#1F2937", flex: 1 }}>{g.title}</span>
              <span style={{ color: "#9CA3AF", fontSize: 16 }}>{open === i ? "▲" : "▼"}</span>
            </div>
            {open === i && (
              <div style={{ padding: "0 16px 16px", borderTop: "1px solid #F3F4F6" }}>
                <p style={{ fontSize: 13, color: "#4B5563", margin: "12px 0 10px", lineHeight: 1.6 }}>
                  {g.explanation}
                </p>
                <div style={{
                  background: "#F0F9FF", border: "1px solid #BAE6FD",
                  borderRadius: 8, padding: "10px 14px",
                  display: "flex", alignItems: "flex-start", gap: 8
                }}>
                  <span style={{ fontSize: 12, color: "#0369A1", fontWeight: 700, flexShrink: 0 }}>Ejemplo:</span>
                  <span style={{ fontSize: 13, color: "#0C4A6E", fontStyle: "italic", lineHeight: 1.5 }}>{g.example}</span>
                  <AudioButton text={g.example} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SpeakingTab({ week }) {
  const w = CURRICULUM[week - 1];
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const recRef = useRef(null);
  const intervalRef = useRef(null);

  const startRecording = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser. Try Chrome.");
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR();
    rec.lang = "en-US";
    rec.continuous = true;
    rec.interimResults = true;
    let final = "";
    rec.onresult = (e) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) final += e.results[i][0].transcript;
        else interim += e.results[i][0].transcript;
      }
      setTranscript(final + interim);
    };
    rec.onerror = () => stopRec();
    rec.start();
    recRef.current = rec;
    setRecording(true);
    setTimer(0);
    intervalRef.current = setInterval(() => setTimer(t => t + 1), 1000);
  };

  const stopRec = () => {
    recRef.current?.stop();
    clearInterval(intervalRef.current);
    setRecording(false);
  };

  const getFeedback = async () => {
    if (!transcript.trim()) return;
    setLoading(true);
    setFeedback("");
    try {
      const sys = `You are an expert B2 English teacher. The student just answered a speaking prompt for Week ${week}: "${w.title}".
      
The prompt was: "${w.speaking_prompt}"

Analyse their response and give structured feedback in Spanish (explanation) + English (corrections). Be encouraging but precise.

Format your response with:
1. 🎯 **Puntuación general** (X/10) — brief overall comment in Spanish
2. ✅ **Lo que hiciste bien** — 2-3 things they did well
3. 🔧 **Para mejorar** — 2-3 specific corrections with the improved version
4. 💡 **Consejo de esta semana** — one focused tip related to Week ${week} grammar or vocabulary

Keep it concise and motivating. Max 250 words.`;

      const res = await callClaude([{ role: "user", content: `My answer: "${transcript}"` }], sys);
      setFeedback(res);
    } catch (e) {
      if (e.message === "NO_API_KEY") {
        setFeedback("🔑 Necesitas configurar tu API key de Anthropic. Pulsa el botón 'IA ✗' en la pantalla principal.");
      } else {
        setFeedback("Error al obtener feedback. Revisa tu conexión o API key.");
      }
    }
    setLoading(false);
  };

  const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 4 }}>Práctica Oral</h3>
      <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 16 }}>3 minutos de expresión oral. Graba tu respuesta y recibe feedback de IA.</p>

      <div style={{
        background: "#FFF7ED", border: "1px solid #FED7AA",
        borderRadius: 12, padding: "16px", marginBottom: 16
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <span style={{ fontSize: 20 }}>🎯</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#9A3412", marginBottom: 4 }}>Tema de expresión oral</div>
            <p style={{ fontSize: 14, color: "#1F2937", margin: 0, lineHeight: 1.6 }}>{w.speaking_prompt}</p>
          </div>
          <AudioButton text={w.speaking_prompt} />
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 16, alignItems: "center" }}>
        <button
          onClick={recording ? stopRec : startRecording}
          style={{
            background: recording ? "#EF4444" : w.color,
            color: "#fff", border: "none", borderRadius: 10,
            padding: "12px 20px", cursor: "pointer", fontSize: 14,
            fontWeight: 700, display: "flex", alignItems: "center", gap: 8
          }}
        >
          {recording ? "⏹ Parar" : "🎙 Empezar a grabar"}
        </button>
        {recording && (
          <div style={{
            background: "#FEF2F2", border: "1px solid #FECACA",
            borderRadius: 8, padding: "8px 14px", fontSize: 13,
            color: "#DC2626", fontWeight: 700, display: "flex", alignItems: "center", gap: 6
          }}>
            <span style={{ width: 8, height: 8, background: "#EF4444", borderRadius: "50%", animation: "pulse 1s infinite" }} />
            {fmt(timer)} / 3:00
          </div>
        )}
      </div>

      {transcript && (
        <div style={{
          background: "#F9FAFB", border: "1px solid #E5E7EB",
          borderRadius: 10, padding: 14, marginBottom: 14
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#6B7280", marginBottom: 6 }}>Lo que has dicho:</div>
          <p style={{ fontSize: 13, color: "#1F2937", margin: 0, lineHeight: 1.7 }}>{transcript}</p>
        </div>
      )}

      {transcript && !loading && !feedback && (
        <button
          onClick={getFeedback}
          style={{
            background: w.color, color: "#fff", border: "none",
            borderRadius: 10, padding: "12px 20px", cursor: "pointer",
            fontSize: 14, fontWeight: 700, width: "100%"
          }}
        >
          🤖 Obtener feedback de IA
        </button>
      )}

      {loading && (
        <div style={{ textAlign: "center", padding: 20, color: "#6B7280", fontSize: 14 }}>
          ⏳ Analizando tu inglés...
        </div>
      )}

      {feedback && (
        <div style={{
          background: "#F0FDF4", border: "1px solid #BBF7D0",
          borderRadius: 12, padding: 16
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#166534", marginBottom: 10 }}>FEEDBACK DE IA</div>
          <div style={{ fontSize: 13, color: "#1F2937", whiteSpace: "pre-wrap", lineHeight: 1.8 }}>{feedback}</div>
        </div>
      )}
    </div>
  );
}

function ScenarioTab({ week }) {
  const w = CURRICULUM[week - 1];
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [recording, setRecording] = useState(false);
  const messagesEndRef = useRef(null);
  const recRef = useRef(null);

  const systemPrompt = `You are playing a role in a realistic B2 English practice scenario.

SCENARIO: ${w.scenario.title}
SETUP: ${w.scenario.setup}
WEEK THEME: ${w.title}
STUDENT LEVEL: B2 English learner — Spanish speaker, medical professional

YOUR ROLE:
- Play the other character naturally (colleague, patient, official, waiter, etc.)
- Use natural B2-appropriate English
- After 3-4 exchanges, gently note 1-2 errors the student made using this format at the end of your message:
  📝 *Tip: [original] → [corrected]* 
- Keep corrections brief and non-intrusive — don't interrupt the flow of the scene
- Ask follow-up questions to keep the conversation active
- Be encouraging and realistic

Start the scenario now with a brief opening line from your character.`;

  const start = async () => {
    setStarted(true);
    setLoading(true);
    try {
      const res = await callClaude([{ role: "user", content: "Start the scenario" }], systemPrompt);
      setMessages([{ role: "assistant", content: res }]);
      speak(res.replace(/📝.*?→.*?(\n|$)/g, "").trim());
    } catch (e) { setMessages([{ role: "assistant", content: e.message === "NO_API_KEY" ? "🔑 Configura tu API key pulsando el botón 'IA ✗' en la pantalla principal." : "Error al iniciar el escenario. Revisa tu conexión." }]); }
    setLoading(false);
  };

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    const newMessages = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const res = await callClaude(newMessages, systemPrompt);
      setMessages([...newMessages, { role: "assistant", content: res }]);
      speak(res.replace(/📝.*?→.*?(\n|$)/g, "").trim());
    } catch (e) { setMessages([...newMessages, { role: "assistant", content: e.message === "NO_API_KEY" ? "🔑 Configura tu API key pulsando el botón 'IA ✗' en la pantalla principal." : "Error. Inténtalo de nuevo." }]); }
    setLoading(false);
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const startVoice = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech recognition not available. Try Chrome.");
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR();
    rec.lang = "en-US";
    rec.onresult = (e) => setInput(e.results[0][0].transcript);
    rec.onend = () => setRecording(false);
    rec.start();
    recRef.current = rec;
    setRecording(true);
  };

  return (
    <div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 4 }}>
        Simulación Real
      </h3>
      <div style={{
        background: "#F5F3FF", border: "1px solid #DDD6FE",
        borderRadius: 12, padding: 14, marginBottom: 16
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#6D28D9", marginBottom: 6 }}>
          🎭 {w.scenario.title}
        </div>
        <p style={{ fontSize: 13, color: "#1F2937", margin: 0, lineHeight: 1.6 }}>{w.scenario.setup}</p>
      </div>

      {!started ? (
        <button
          onClick={start}
          style={{
            background: w.color, color: "#fff", border: "none",
            borderRadius: 12, padding: "14px 24px", cursor: "pointer",
            fontSize: 15, fontWeight: 700, width: "100%"
          }}
        >
          🎬 Iniciar simulación
        </button>
      ) : (
        <>
          <div style={{
            background: "#F9FAFB", borderRadius: 12, border: "1px solid #E5E7EB",
            padding: 14, minHeight: 200, maxHeight: 380, overflowY: "auto",
            marginBottom: 12
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                display: "flex", gap: 8, marginBottom: 12,
                flexDirection: m.role === "user" ? "row-reverse" : "row"
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                  background: m.role === "user" ? w.color : "#6B7280",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, color: "#fff"
                }}>
                  {m.role === "user" ? "👤" : "🤖"}
                </div>
                <div style={{
                  background: m.role === "user" ? w.color : "#fff",
                  color: m.role === "user" ? "#fff" : "#1F2937",
                  border: m.role === "user" ? "none" : "1px solid #E5E7EB",
                  borderRadius: 12, padding: "10px 14px",
                  fontSize: 13, lineHeight: 1.6, maxWidth: "80%",
                  whiteSpace: "pre-wrap"
                }}>
                  {m.content}
                  {m.role === "assistant" && (
                    <button
                      onClick={() => speak(m.content.replace(/📝.*?→.*?(\n|$)/g, "").trim())}
                      style={{
                        display: "block", marginTop: 6, background: "none",
                        border: "none", cursor: "pointer", fontSize: 12,
                        color: "#6B7280", padding: 0
                      }}>🔊 Listen</button>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ textAlign: "center", color: "#9CA3AF", fontSize: 13, padding: 8 }}>
                Escribiendo…
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Escribe tu respuesta en inglés…"
              style={{
                flex: 1, padding: "10px 14px", borderRadius: 10,
                border: "1px solid #D1D5DB", fontSize: 14,
                outline: "none", background: "#fff"
              }}
            />
            <button
              onClick={startVoice}
              style={{
                background: recording ? "#EF4444" : "#F3F4F6",
                border: "1px solid #D1D5DB", borderRadius: 10,
                padding: "10px 14px", cursor: "pointer", fontSize: 16
              }}
              title="Voice input"
            >
              {recording ? "⏹" : "🎙"}
            </button>
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              style={{
                background: w.color, color: "#fff", border: "none",
                borderRadius: 10, padding: "10px 16px", cursor: "pointer",
                fontSize: 14, fontWeight: 700,
                opacity: !input.trim() || loading ? 0.5 : 1
              }}
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function QuizTab({ week, onComplete }) {
  const w = CURRICULUM[week - 1];
  const [quiz] = useState(() => generateQuiz(week));
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  const select = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === quiz[current].correct;
    if (correct) speak("Correct! Well done.");
    else speak("Not quite. " + quiz[current].options[quiz[current].correct]);
    setTimeout(() => {
      const newAnswers = [...answers, { selected: idx, correct }];
      if (current + 1 >= quiz.length) {
        const s = newAnswers.filter(a => a.correct).length;
        setScore(s);
        setFinished(true);
        onComplete(s);
      } else {
        setAnswers(newAnswers);
        setCurrent(current + 1);
        setSelected(null);
      }
    }, 1500);
  };

  if (finished) {
    return (
      <div style={{ textAlign: "center", padding: 32 }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>
          {score >= 4 ? "🏆" : score >= 3 ? "⭐" : "💪"}
        </div>
        <h3 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 8 }}>
          {score}/5
        </h3>
        <p style={{ fontSize: 15, color: "#4B5563", marginBottom: 4 }}>
          {score >= 4 ? "¡Excelente! Semana completada con éxito." :
            score >= 3 ? "¡Bien hecho! Repasa los puntos más flojos." :
              "Sigue practicando — repasa las lecciones e inténtalo de nuevo."}
        </p>
        <div style={{
          marginTop: 20, background: score >= 4 ? "#F0FDF4" : "#FFF7ED",
          border: `1px solid ${score >= 4 ? "#BBF7D0" : "#FED7AA"}`,
          borderRadius: 12, padding: 16, display: "inline-block"
        }}>
          <p style={{ margin: 0, fontSize: 14, color: "#374151" }}>
            {score >= 4
              ? `✅ Semana ${week} marcada como completada. ¡Bien hecho, Diego!`
              : `📚 Semana ${week} guardada. Repasa y vuelve a intentar el examen.`}
          </p>
        </div>
      </div>
    );
  }

  const q = quiz[current];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, alignItems: "center" }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: 0 }}>Mini Examen</h3>
        <span style={{ fontSize: 13, color: "#6B7280" }}>{current + 1} / {quiz.length}</span>
      </div>
      <ProgressBar value={current + 1} max={quiz.length} color={w.color} />

      <div style={{
        background: "#F9FAFB", border: "1px solid #E5E7EB",
        borderRadius: 12, padding: 18, margin: "16px 0"
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", marginBottom: 8, textTransform: "uppercase" }}>
          {q.type === "vocab" ? "Vocabulario" : q.type === "grammar" ? "Gramática" : q.type === "phrase" ? "Frases" : "Registro"}
        </div>
        <p style={{ fontSize: 15, color: "#1F2937", margin: 0, lineHeight: 1.6, fontWeight: 600 }}>{q.q}</p>
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        {q.options.map((opt, i) => {
          let bg = "#fff", border = "#E5E7EB", color = "#1F2937";
          if (selected !== null) {
            if (i === q.correct) { bg = "#F0FDF4"; border = "#86EFAC"; }
            else if (i === selected && i !== q.correct) { bg = "#FEF2F2"; border = "#FECACA"; }
          }
          return (
            <div
              key={i}
              onClick={() => select(i)}
              style={{
                background: bg, border: `2px solid ${border}`,
                borderRadius: 10, padding: "12px 16px", cursor: selected !== null ? "default" : "pointer",
                fontSize: 14, color, display: "flex", alignItems: "center", gap: 10,
                transition: "all 0.2s"
              }}
            >
              <span style={{
                background: selected !== null && i === q.correct ? "#86EFAC" : "#F3F4F6",
                borderRadius: "50%", width: 24, height: 24, display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700
              }}>
                {selected !== null && i === q.correct ? "✓" : String.fromCharCode(65 + i)}
              </span>
              {opt}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ConversationTab({ week }) {
  const w = CURRICULUM[week - 1];
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const recRef = useRef(null);
  const endRef = useRef(null);

  const systemPrompt = `You are an expert, warm B2 English teacher having a natural conversation in English with Diego, a Spanish-speaking medical professional and developer. 

Current week theme: "${w.title}" (Week ${week})

Your style:
- Speak like an intelligent friend, not a textbook
- Correct errors gently WITHOUT interrupting the flow: use 📝 *Better: [correction]* briefly at end of response
- Ask follow-up questions to keep conversation going
- Introduce vocabulary and structures from week ${week} naturally
- Encourage and motivate
- Never translate (keep the conversation in English, but corrections can briefly note the Spanish)
- Keep responses to 2-4 sentences + question + optional correction

Related topics for this week: ${w.title}. Subtopics include ${w.phrases.slice(0, 3).join(", ")}.`;

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    const newMessages = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const res = await callClaude(newMessages, systemPrompt);
      const full = [...newMessages, { role: "assistant", content: res }];
      setMessages(full);
      speak(res.replace(/📝.*?(\n|$)/g, "").trim());
    } catch (e) {
      setMessages([...newMessages, { role: "assistant", content: e.message === "NO_API_KEY" ? "🔑 Configura tu API key pulsando el botón 'IA ✗' en la pantalla principal." : "Error de conexión. Revisa tu internet." }]);
    }
    setLoading(false);
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const startVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert("Speech recognition needs Chrome."); return; }
    const rec = new SR();
    rec.lang = "en-US";
    rec.onresult = e => setInput(e.results[0][0].transcript);
    rec.onend = () => setRecording(false);
    rec.start();
    recRef.current = rec;
    setRecording(true);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 4 }}>
        Conversación Libre
      </h3>
      <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 12 }}>
        Habla con naturalidad en inglés. Claude corrige sin interrumpir y mantiene la conversación activa.
      </p>

      {messages.length === 0 && (
        <div style={{
          background: "#F5F3FF", border: "1px solid #DDD6FE",
          borderRadius: 12, padding: 14, marginBottom: 12
        }}>
          <p style={{ fontSize: 13, color: "#4C1D95", margin: 0 }}>
            💬 Empieza diciendo hola, o habla sobre: <em>{w.speaking_prompt}</em>
          </p>
        </div>
      )}

      <div style={{
        flex: 1, overflowY: "auto", marginBottom: 12,
        background: "#F9FAFB", borderRadius: 12,
        border: "1px solid #E5E7EB", padding: 14, minHeight: 240, maxHeight: 400
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            display: "flex", gap: 8, marginBottom: 12,
            flexDirection: m.role === "user" ? "row-reverse" : "row"
          }}>
            <div style={{
              width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
              background: m.role === "user" ? w.color : "#6366F1",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, color: "#fff"
            }}>
              {m.role === "user" ? "D" : "🤖"}
            </div>
            <div style={{
              background: m.role === "user" ? w.color : "#fff",
              color: m.role === "user" ? "#fff" : "#1F2937",
              border: m.role === "user" ? "none" : "1px solid #E5E7EB",
              borderRadius: 12, padding: "10px 14px",
              fontSize: 13, lineHeight: 1.7, maxWidth: "80%",
              whiteSpace: "pre-wrap"
            }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && <div style={{ color: "#9CA3AF", fontSize: 13, padding: 4 }}>El profesor está escribiendo…</div>}
        <div ref={endRef} />
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Escribe en inglés…"
          style={{
            flex: 1, padding: "10px 14px", borderRadius: 10,
            border: "1px solid #D1D5DB", fontSize: 14, outline: "none"
          }}
        />
        <button
          onClick={startVoice}
          style={{
            background: recording ? "#EF4444" : "#F3F4F6",
            border: "1px solid #D1D5DB", borderRadius: 10,
            padding: "10px 12px", cursor: "pointer", fontSize: 16
          }}
        >
          {recording ? "⏹" : "🎙"}
        </button>
        <button
          onClick={send}
          disabled={!input.trim() || loading}
          style={{
            background: w.color, color: "#fff", border: "none",
            borderRadius: 10, padding: "10px 16px", cursor: "pointer",
            fontSize: 14, fontWeight: 700, opacity: !input.trim() || loading ? 0.5 : 1
          }}
        >
          →
        </button>
      </div>
    </div>
  );
}

// ─── WEEK VIEW ────────────────────────────────────────────────────────────────
function WeekView({ week, progress, onSaveProgress, onBack }) {
  const w = CURRICULUM[week - 1];
  const cat = CATEGORIES[w.category];
  const [tab, setTab] = useState("phrases");

  const tabs = [
    { id: "phrases", label: "📜 Frases" },
    { id: "vocab", label: "📖 Vocabulario" },
    { id: "grammar", label: "📐 Gramática" },
    { id: "speaking", label: "🎙 Expresión oral" },
    { id: "scenario", label: "🎭 Simulación" },
    { id: "conversation", label: "💬 Charla libre" },
    { id: "quiz", label: "✅ Examen" }
  ];

  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "12px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, maxWidth: 700, margin: "0 auto" }}>
          <button
            onClick={onBack}
            style={{
              background: "#F3F4F6", border: "none", borderRadius: 8,
              padding: "6px 12px", cursor: "pointer", fontSize: 13,
              color: "#374151", fontWeight: 600
            }}
          >
            ← Back
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: cat.color, fontWeight: 700, textTransform: "uppercase" }}>
              {cat.label} · Week {week}
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#111827" }}>
              {w.icon} {w.title}
            </div>
          </div>
          {progress?.quizScore !== undefined && (
            <div style={{
              background: w.color, color: "#fff",
              borderRadius: 8, padding: "4px 10px", fontSize: 12, fontWeight: 700
            }}>
              {progress.quizScore}/5 ✓
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        background: "#fff", borderBottom: "1px solid #E5E7EB",
        overflowX: "auto", whiteSpace: "nowrap"
      }}>
        <div style={{ display: "flex", padding: "0 16px", maxWidth: 700, margin: "0 auto" }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: "10px 12px", border: "none", background: "none",
                cursor: "pointer", fontSize: 12, fontWeight: 700,
                color: tab === t.id ? w.color : "#6B7280",
                borderBottom: `3px solid ${tab === t.id ? w.color : "transparent"}`,
                transition: "all 0.2s", whiteSpace: "nowrap"
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "20px 16px" }}>
        {tab === "phrases" && <PhrasesTab week={week} />}
        {tab === "vocab" && <VocabTab week={week} />}
        {tab === "grammar" && <GrammarTab week={week} />}
        {tab === "speaking" && <SpeakingTab week={week} />}
        {tab === "scenario" && <ScenarioTab week={week} />}
        {tab === "conversation" && <ConversationTab week={week} />}
        {tab === "quiz" && (
          <QuizTab
            week={week}
            onComplete={(score) => onSaveProgress(week, { ...progress, quizScore: score })}
          />
        )}
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "12px 0 24px", fontSize: 11, color: "#9CA3AF" }}>
        Desarrollado por DoncelProject ·{" "}
        <a href="mailto:doncel.project@gmail.com" style={{ color: "#9CA3AF" }}>
          doncel.project@gmail.com
        </a>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [progress, setProgress] = useState(() => loadProgress());
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [filter, setFilter] = useState("all");
  const [apiKey, setApiKey] = useState(() => loadApiKey());
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [showApiPanel, setShowApiPanel] = useState(false);

  const handleSaveKey = () => {
    const trimmed = apiKeyInput.trim();
    if (trimmed) { saveApiKey(trimmed); setApiKey(trimmed); setApiKeyInput(""); setShowApiPanel(false); }
  };
  const handleClearKey = () => { saveApiKey(""); setApiKey(""); setApiKeyInput(""); };

  const saveProgressForWeek = useCallback((week, data) => {
    setProgress(prev => {
      const updated = { ...prev, [week]: data };
      saveProgress(updated);
      return updated;
    });
  }, []);

  const completedWeeks = Object.values(progress).filter(p => p?.quizScore !== undefined).length;
  const totalScore = Object.values(progress).reduce((s, p) => s + (p?.quizScore || 0), 0);

  if (selectedWeek) {
    return (
      <WeekView
        week={selectedWeek}
        progress={progress[selectedWeek]}
        onSaveProgress={saveProgressForWeek}
        onBack={() => setSelectedWeek(null)}
      />
    );
  }

  const filteredWeeks = CURRICULUM.filter(w =>
    filter === "all" || w.category === filter
  );

  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh", fontFamily: "'Inter', -apple-system, sans-serif" }}>
      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, #1E40AF 0%, #3B82F6 50%, #06B6D4 100%)",
        padding: "32px 16px 28px",
        color: "#fff"
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <a href="mailto:doncel.project@gmail.com" style={{ textDecoration: "none" }}>
              <span style={{ fontSize: 28 }}>🎓</span>
            </a>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, opacity: 0.8, fontWeight: 700, letterSpacing: 1.5 }}>
                DONCELPROJECT
              </div>
              <h1 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>B2 English Coach</h1>
            </div>
            {/* API key indicator */}
            <button
              onClick={() => setShowApiPanel(p => !p)}
              title={apiKey ? "API key configurada — pulsa para cambiar" : "Configurar API key"}
              style={{
                background: apiKey ? "rgba(34,197,94,0.25)" : "rgba(239,68,68,0.25)",
                border: `1px solid ${apiKey ? "rgba(34,197,94,0.5)" : "rgba(239,68,68,0.5)"}`,
                borderRadius: 8, padding: "5px 10px", cursor: "pointer",
                fontSize: 11, fontWeight: 700, color: "#fff",
                display: "flex", alignItems: "center", gap: 5
              }}
            >
              🔑 {apiKey ? "IA ✓" : "IA ✗"}
            </button>
          </div>

          {/* API key panel */}
          {showApiPanel && (
            <div style={{
              background: "rgba(255,255,255,0.15)", borderRadius: 12,
              padding: 14, marginBottom: 12, backdropFilter: "blur(8px)"
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>
                🔑 API Key de Anthropic
              </div>
              {apiKey ? (
                <div>
                  <div style={{ fontSize: 12, opacity: 0.9, marginBottom: 8 }}>
                    ✅ Key configurada: <code style={{ background: "rgba(0,0,0,0.2)", padding: "1px 6px", borderRadius: 4 }}>
                      {apiKey.slice(0, 8)}…{apiKey.slice(-4)}
                    </code>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={handleClearKey} style={{
                      background: "rgba(239,68,68,0.3)", border: "1px solid rgba(239,68,68,0.5)",
                      borderRadius: 8, padding: "6px 12px", cursor: "pointer",
                      fontSize: 12, color: "#fff", fontWeight: 600
                    }}>🗑 Eliminar key</button>
                    <button onClick={() => setShowApiPanel(false)} style={{
                      background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)",
                      borderRadius: 8, padding: "6px 12px", cursor: "pointer",
                      fontSize: 12, color: "#fff", fontWeight: 600
                    }}>Cerrar</button>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: 12, opacity: 0.85, marginBottom: 8 }}>
                    Sin key, las pestañas de IA (Expresión oral, Simulación, Charla libre, Traducción) no funcionan.
                    Obtén tu key en <strong>console.anthropic.com</strong>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input
                      type="password"
                      value={apiKeyInput}
                      onChange={e => setApiKeyInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleSaveKey()}
                      placeholder="sk-ant-..."
                      style={{
                        flex: 1, padding: "7px 12px", borderRadius: 8,
                        border: "1px solid rgba(255,255,255,0.4)",
                        background: "rgba(255,255,255,0.15)", color: "#fff",
                        fontSize: 13, outline: "none"
                      }}
                    />
                    <button onClick={handleSaveKey} disabled={!apiKeyInput.trim()} style={{
                      background: "#fff", color: "#1E40AF",
                      border: "none", borderRadius: 8, padding: "7px 14px",
                      cursor: "pointer", fontSize: 13, fontWeight: 700,
                      opacity: !apiKeyInput.trim() ? 0.5 : 1
                    }}>Guardar</button>
                  </div>
                </div>
              )}
            </div>
          )}

          <p style={{ fontSize: 13, opacity: 0.9, margin: "8px 0 16px", lineHeight: 1.6 }}>
            {CURRICULUM.length} módulos · Sanidad · Vacunas · Autocaravana · Habla con audio · IA integrada
          </p>

          {/* Progress stats */}
          <div style={{ display: "flex", gap: 10 }}>
            {[
              { label: "Módulos", value: `${completedWeeks}/${CURRICULUM.length}`, icon: "📅" },
              { label: "Quiz pts.", value: totalScore, icon: "⭐" },
              { label: "Nivel objetivo", value: "B2", icon: "🎯" }
            ].map((s, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.2)", borderRadius: 12,
                padding: "10px 14px", flex: 1, textAlign: "center"
              }}>
                <div style={{ fontSize: 16, marginBottom: 2 }}>{s.icon}</div>
                <div style={{ fontSize: 18, fontWeight: 800 }}>{s.value}</div>
                <div style={{ fontSize: 10, opacity: 0.8 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", overflowX: "auto" }}>
        <div style={{ display: "flex", padding: "0 16px", maxWidth: 700, margin: "0 auto" }}>
          <button
            onClick={() => setFilter("all")}
            style={{
              padding: "10px 14px", border: "none", background: "none",
              cursor: "pointer", fontSize: 12, fontWeight: 700,
              color: filter === "all" ? "#1D4ED8" : "#6B7280",
              borderBottom: `3px solid ${filter === "all" ? "#1D4ED8" : "transparent"}`,
              whiteSpace: "nowrap"
            }}
          >
            🗂 All
          </button>
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              style={{
                padding: "10px 14px", border: "none", background: "none",
                cursor: "pointer", fontSize: 12, fontWeight: 700,
                color: filter === key ? cat.color : "#6B7280",
                borderBottom: `3px solid ${filter === key ? cat.color : "transparent"}`,
                whiteSpace: "nowrap"
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Week grid */}
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "20px 16px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12
        }}>
          {filteredWeeks.map(w => (
            <WeekCard
              key={w.week}
              week={w.week}
              progress={progress[w.week]}
              onClick={() => setSelectedWeek(w.week)}
            />
          ))}
        </div>

        {/* What's included */}
        <div style={{
          background: "#fff", border: "1px solid #E5E7EB",
          borderRadius: 14, padding: 20, marginTop: 20
        }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: "#111827", marginBottom: 14 }}>
            📋 Cada semana incluye
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { icon: "📜", title: "20 frases clave", sub: "Para usar cada día" },
              { icon: "📖", title: "15 palabras nuevas", sub: "Con audio y flashcards" },
              { icon: "📐", title: "5 reglas de gramática", sub: "Explicadas con ejemplos" },
              { icon: "🎙", title: "Práctica oral 3 min", sub: "Con feedback de IA" },
              { icon: "🎭", title: "Simulación real", sub: "Escenarios clínicos y viajes" },
              { icon: "💬", title: "Chat libre", sub: "Conversación con corrección" },
              { icon: "✅", title: "Mini examen final", sub: "5 preguntas por semana" },
              { icon: "🔊", title: "Audio integrado", sub: "Todo con pronunciación" }
            ].map((f, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>{f.icon}</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#1F2937" }}>{f.title}</div>
                  <div style={{ fontSize: 11, color: "#6B7280" }}>{f.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "16px 0 28px", fontSize: 11, color: "#9CA3AF" }}>
        Desarrollado por DoncelProject ·{" "}
        <a href="mailto:doncel.project@gmail.com" style={{ color: "#9CA3AF", textDecoration: "none" }}>
          doncel.project@gmail.com
        </a>
      </div>
    </div>
  );
}
