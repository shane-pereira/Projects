const timerDisplay = document.querySelector('.js-timer-display');
const startStopButton = document.querySelector('.js-start-stop-button');
const resetButton = document.querySelector('.js-reset-button');
const lapButton = document.querySelector('.js-lap-button');
const lapSection = document.querySelector('.js-lap-section');

let isTimerRunning = false;
resetButton.disabled = true;
lapButton.disabled = true;

let time = {
  hours: 0,
  seconds: 0,
  minutes: 0,
  ms: 0,
  intervalId: 0,
  displayTime: {
    hours: '00',
    minutes: '00',
    seconds: '00',
    ms: '000'
  },
  laps: []
};

startStopButton.addEventListener('click', () => {
  if (!isTimerRunning) {
    lapButton.disabled = false;
    lapButton.classList.add('lap-button-enabled');

    resetButton.disabled = false;
    resetButton.classList.add('enabled-reset-button');

    startStopButton.classList.add('stop-timer-button');
    startStopButton.innerHTML = 'Stop'
    isTimerRunning = true;
    time.intervalId = setInterval(startTimer, 10);
  }
  else {
    stopTimer(false);
    lapButton.disabled = true;
  }
});

resetButton.addEventListener('click', () => {
  resetTimer(false);
})

lapButton.addEventListener('click', () => {
  lapsHTML = '';
  time.laps.push(`${time.displayTime.hours} : ${time.displayTime.minutes} : ${time.displayTime.seconds} : ${time.displayTime.ms}`);
  time.laps.forEach((value, index) => {
    lapsHTML += `<p>Lap ${index + 1}- ${value}</p>`;
  })
  lapSection.innerHTML = lapsHTML;
  resetTimer(true);
  startTimer();
})

function startTimer() {
  time.ms += 10;
  if (time.ms === 1000) {
    time.ms = 0;
    time.seconds++;
    if (time.seconds === 60) {
      time.seconds = 0;
      time.minutes++;
      if (time.minutes === 60) {
        time.minutes = 0;
        time.hours++;
      }
    }
  }

  time.displayTime.hours = time.hours < 10 ? "0" + time.hours : time.hours;
  time.displayTime.minutes = time.minutes < 10 ? "0" + time.minutes : time.minutes;
  time.displayTime.seconds = time.seconds < 10 ? "0" + time.seconds : time.seconds;
  time.displayTime.ms =
    time.ms < 10 ? "00" + time.ms :
      time.ms < 100 ? "0" + time.ms : time.ms;

  timerDisplay.innerHTML = `${time.displayTime.hours} : ${time.displayTime.minutes} : ${time.displayTime.seconds} : ${time.displayTime.ms}`;
}

function stopTimer(lap) {
  if (!lap) {
    lapButton.classList.remove('lap-button-enabled');
    startStopButton.classList.remove('stop-timer-button');
    startStopButton.innerHTML = 'Start';
    isTimerRunning = false;
    clearInterval(time.intervalId);
  }
  else  {
    clearInterval(time.intervalId);
  }
}

function resetTimer(lap) {
  console.log(lap);
  if (lap) {
    //stopTimer(lap)
    timerDisplay.innerHTML = `${time.displayTime.hours} : ${time.displayTime.minutes} : ${time.displayTime.seconds} : ${time.displayTime.ms}`;
  }
  time.hours = 0;
  time.minutes = 0;
  time.seconds = 0;
  time.ms = 0;
  time.displayTime.hours = "00"
  time.displayTime.minutes = "00"
  time.displayTime.seconds = "00"
  time.displayTime.ms = "000"
  if (!lap) {
    stopTimer(false);
    resetButton.disabled = true;
    resetButton.classList.remove('enabled-reset-button');
    lapButton.classList.remove('lap-button-enabled');
    time.laps.splice(0, time.laps.length);
    lapSection.innerHTML = '';
    timerDisplay.innerHTML = `${time.displayTime.hours} : ${time.displayTime.minutes} : ${time.displayTime.seconds} : ${time.displayTime.ms}`;
  }
}