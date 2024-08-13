let startTime;
let updatedTime;
let difference = 0;
let timerInterval;
let isRunning = false;
let isPaused = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapTimes = document.getElementById('lapTimes');

startButton.addEventListener('click', () => {
    if (!isRunning && !isPaused) {
        startTime = new Date().getTime() - difference;
        timerInterval = setInterval(updateTime, 10);
        isRunning = true;
    }
});

pauseButton.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        isPaused = true;
        pauseButton.innerText = 'Resume';
    } else if (isPaused) {
        startTime = new Date().getTime() - difference;
        timerInterval = setInterval(updateTime, 10);
        isRunning = true;
        isPaused = false;
        pauseButton.innerText = 'Pause';
    }
});

resetButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    isRunning = false;
    isPaused = false;
    difference = 0;
    display.innerText = '00:00:00';
    lapTimes.innerHTML = '';
    lapCounter = 0;
    pauseButton.innerText = 'Pause';
});

lapButton.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = formatTime(difference);
        const lapItem = document.createElement('li');
        lapCounter++;
        lapItem.innerText = `Lap ${lapCounter}: ${lapTime}`;
        lapTimes.appendChild(lapItem);
    }
});

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.innerText = formatTime(difference);
}

function formatTime(time) {
    const hours = String(Math.floor(time / (1000 * 60 * 60))).padStart(2, '0');
    const minutes = String(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    const seconds = String(Math.floor((time % (1000 * 60)) / 1000)).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}
