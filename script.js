const phaseData = {
  arrival: {
    number: "01", horizon: "IN-EVENT", title: "Arrival", x: 82, y: 96,
    signal: "HRV relative to baseline + movement",
    experience: "A brief EMA asks how welcomed or uncertain the arrival feels.",
    design: "Find first-contact friction before it disappears into an overall rating.",
    questionLead: "HRV + EMA at arrival"
  },
  entry: {
    number: "02", horizon: "IN-EVENT", title: "Entry", x: 224, y: 151,
    signal: "Baseline-relative HRV + wait and movement",
    experience: "EMA captures clarity, stress, fairness, and control during queueing, security, or check-in.",
    design: "Separate the delay itself from how entry is organized and communicated.",
    questionLead: "HRV + EMA during entry"
  },
  core: {
    number: "03", horizon: "IN-EVENT", title: "Core experience", x: 365, y: 118,
    signal: "HRV + activity during a defined program segment",
    experience: "EMA distinguishes excitement, strain, engagement—or a mixture.",
    design: "Identify which program or participation touchpoint changes the experience.",
    questionLead: "HRV + EMA during the core experience"
  },
  departure: {
    number: "04", horizon: "IN-EVENT", title: "Departure", x: 485, y: 102,
    signal: "HRV relative to baseline + movement",
    experience: "EMA asks how easy it felt to leave, recover, and make sense of the event.",
    design: "Test whether the final operational moment changes the overall evaluation.",
    questionLead: "HRV + EMA at departure"
  }
};

const outcomeData = {
  satisfaction: {phrase: "post-event satisfaction", label: "SAT", feedback: "Testing post-event satisfaction"},
  return: {phrase: "intention to return", label: "RETURN", feedback: "Testing intention to return"},
  repurchase: {phrase: "repurchase intention", label: "BUY", feedback: "Testing repurchase intention"}
};

const stepData = {
  measure: {
    kicker: "COMPARE TWO MOMENTS", title: "Measure",
    copy: "Students compare two event moments or designs using baseline-relative HRV, movement, and short EMA prompts.",
    learn: "Experience journey · Event design · Field measurement",
    make: "A time-aligned experience map with one testable touchpoint hypothesis."
  },
  explain: {
    kicker: "ADD PARTICIPANT VOICE", title: "Explain",
    copy: "Students combine the wearable timeline with EMA, interviews, field observation, or social media data to interpret why a change occurred.",
    learn: "Mixed methods · Data literacy · Experience research",
    make: "An evidence-based explanation of one consequential event touchpoint."
  },
  improve: {
    kicker: "CHANGE ONE TOUCHPOINT", title: "Improve",
    copy: "Students redesign one experience condition, repeat the same measures, and compare the pattern with the original design.",
    learn: "Service design · Evaluation · Continuous improvement",
    make: "A tested design recommendation—not only a description of the problem."
  }
};

const visualData = {
  hrv: "Locate a physiological change during the event.",
  ema: "Ask what happened and how it felt at that moment.",
  outcome: "Connect the paired evidence to satisfaction or future behavior."
};

let selectedPhase = "arrival";
let selectedOutcome = "satisfaction";

function updateResearchQuestion() {
  const question = document.getElementById("researchQuestion");
  if (question) question.textContent =
    `Is ${phaseData[selectedPhase].questionLead} associated with ${outcomeData[selectedOutcome].phrase}?`;
}

function flash(element) {
  element.classList.remove("is-updating");
  requestAnimationFrame(() => element.classList.add("is-updating"));
}

function selectVisual(key) {
  const stage = document.querySelector(".watch-stage");
  stage.dataset.mode = key;
  document.querySelectorAll(".visual-step").forEach((button) => {
    const active = button.dataset.visual === key;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  const caption = document.getElementById("visualCaption");
  caption.textContent = visualData[key];
  flash(caption);
}

function selectPhase(key) {
  selectedPhase = key;
  const data = phaseData[key];
  document.querySelectorAll(".phase-controls button").forEach((button) => {
    const active = button.dataset.phase === key;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  document.getElementById("phaseCursor").setAttribute("x1", data.x);
  document.getElementById("phaseCursor").setAttribute("x2", data.x);
  document.getElementById("phaseDot").setAttribute("cx", data.x);
  document.getElementById("phaseDot").setAttribute("cy", data.y);
  document.getElementById("emaFocus").setAttribute("cx", data.x);
  document.getElementById("phaseNumber").textContent = data.number;
  document.getElementById("phaseHorizon").textContent = data.horizon;
  document.getElementById("phaseTitle").textContent = data.title;
  document.getElementById("phaseSignal").textContent = data.signal;
  document.getElementById("phaseExperience").textContent = data.experience;
  document.getElementById("phaseDesign").textContent = data.design;
  updateResearchQuestion();
  flash(document.querySelector(".insight-panel"));
  flash(document.querySelector(".research-question"));
}

function selectOutcome(key) {
  selectedOutcome = key;
  const data = outcomeData[key];
  document.querySelectorAll(".outcome-controls button").forEach((button) => {
    const active = button.dataset.outcome === key;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  document.getElementById("outcomeFeedback").textContent = data.feedback;
  document.getElementById("outcomeSvgLabel").textContent = data.label;
  flash(document.querySelector(".outcome-feedback"));
  const outcomeWindow = document.querySelector(".outcome-window");
  outcomeWindow.classList.remove("outcome-pulse");
  requestAnimationFrame(() => outcomeWindow.classList.add("outcome-pulse"));
  updateResearchQuestion();
  flash(document.querySelector(".research-question"));
}

function selectStep(key) {
  if (!document.getElementById("stepTitle")) return;
  const data = stepData[key];
  document.querySelectorAll(".step-controls button").forEach((button) => {
    const active = button.dataset.step === key;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  document.getElementById("stepKicker").textContent = data.kicker;
  document.getElementById("stepTitle").textContent = data.title;
  document.getElementById("stepCopy").textContent = data.copy;
  document.getElementById("stepLearn").textContent = data.learn;
  document.getElementById("stepMake").textContent = data.make;
  flash(document.querySelector(".step-detail"));
}

document.querySelectorAll(".visual-step").forEach((button) =>
  button.addEventListener("click", () => selectVisual(button.dataset.visual))
);

document.querySelectorAll(".phase-controls button").forEach((button) =>
  button.addEventListener("click", () => selectPhase(button.dataset.phase))
);
document.querySelectorAll(".outcome-controls button").forEach((button) =>
  button.addEventListener("click", () => selectOutcome(button.dataset.outcome))
);
document.querySelectorAll(".step-controls button").forEach((button) =>
  button.addEventListener("click", () => selectStep(button.dataset.step))
);

selectVisual("hrv");
selectPhase("arrival");
selectOutcome("satisfaction");
selectStep("measure");
