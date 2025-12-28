import { reactive, effect } from '../src/core.js';

// UI Elements
const awarenessSlider = document.getElementById("awareness");
const effortSlider = document.getElementById("effort");
const awarenessValue = document.getElementById("awarenessValue");
const effortValue = document.getElementById("effortValue");
const impactDisplay = document.getElementById("impact");
const logContent = document.getElementById("logContent");

const state = reactive({ awareness: 0.1, effort: 0.6 });

const logs = [];

function addLog(message, logIntoConsole = true, maxLogs = 8) {
  logIntoConsole && console.log(message);
  logs.unshift(message); // Add to beginning
  if (logs.length > maxLogs) logs.pop(); // Keep last 8 entries
  updateLog();
}

function updateLog() {
  logContent.innerHTML = logs
    .map((log) => `<div class="log-entry">${log}</div>`)
    .join("");
}

// Business logic & updates display when state changes
effect(() => {
  const impact = (state.awareness * state.effort).toFixed(2);
  impactDisplay.textContent = impact;

  const message = `A(${state.awareness}) * E(${state.effort}) = I(${impact})`;
  addLog(message);
});

// UI Event Listeners
awarenessSlider.addEventListener("input", (e) => {
  const value = parseFloat(e.target.value);
  state.awareness = value;
  awarenessValue.textContent = value;
});

effortSlider.addEventListener("input", (e) => {
  const value = parseFloat(e.target.value);
  state.effort = value;
  effortValue.textContent = value;
});
