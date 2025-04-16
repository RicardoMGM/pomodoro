let workTime = 25 * 60;
let shortBreak = 5 * 60;
let longBreak = 15 * 60;
let timer;
let seconds = workTime;
let isRunning = false;
let isBreak = false;
let cycle = 0;

const startSound = document.getElementById('start-sound');
const endSound = document.getElementById('end-sound');

function updateDisplay() {
  const min = String(Math.floor(seconds / 60)).padStart(2, '0');
  const sec = String(seconds % 60).padStart(2, '0');
  document.getElementById('timer').textContent = `${min}:${sec}`;
}

function startPomodoro() {
  if (isRunning) return;
  isRunning = true;
  startSound.play();

  timer = setInterval(() => {
    if (seconds > 0) {
      seconds--;
      updateDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
      endSound.play();
      if (!isBreak) {
        cycle++;
        document.getElementById('cycles').textContent = `Ciclos completados: ${cycle}`;
        if (cycle % 4 === 0) {
          startBreak(longBreak, "Pausa longa 💤");
        } else {
          startBreak(shortBreak, "Pausa curta ☕");
        }
      } else {
        startWork();
      }
    }
  }, 1000);
}

function startWork() {
  seconds = workTime;
  isBreak = false;
  document.getElementById('status').textContent = "Trabalhando 🍅";
  updateDisplay();
  startPomodoro();
}

function startBreak(duration, label) {
  seconds = duration;
  isBreak = true;
  document.getElementById('status').textContent = label;
  updateDisplay();
  startPomodoro();
}

function pausePomodoro() {
  clearInterval(timer);
  isRunning = false;
}

function resetPomodoro() {
  clearInterval(timer);
  isRunning = false;
  isBreak = false;
  seconds = workTime;
  cycle = 0;
  document.getElementById('status').textContent = "Trabalhando 🍅";
  document.getElementById('cycles').textContent = "Ciclos completados: 0";
  updateDisplay();
}

updateDisplay();
