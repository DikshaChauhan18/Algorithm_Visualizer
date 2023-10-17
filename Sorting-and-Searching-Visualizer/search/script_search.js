var array = [];

// array bar
var selectedBar;
var targetBar;
var bar;

// Audio algorithm
let audioCtx = null;
function playNote(freq) {
  if (audioCtx == null) {
    audioCtx = new (AudioContext ||
      webkitAudioContext ||
      window.AudioContext)();
  }
  const dur = 0.1;
  const osc = audioCtx.createOscillator();
  osc.frequency.value = freq;
  osc.start();
  osc.stop(audioCtx.currentTime + dur);
  const node = audioCtx.createGain();
  node.gain.value = 0.1;
  node.gain.linearRampToValueAtTime(0, audioCtx.currentTime + dur);
  osc.connect(node);
  node.connect(audioCtx.destination);
}

// buat array baru
function createArray(n = 30) {
  clearBar();
  resetTime();
  resetAlgo();

  for (let i = 0; i < n; i++) {
    array[i] = Math.random() * 130 + 2;
  }
  const bars = document.querySelector(".container");
  console.log(array);

  for (let i = 0; i < n; i++) {
    const bar = document.createElement("div");
    bar.style.height = `${array[i] * 2}px`;
    bar.classList.add("bar");
    bar.setAttribute("id", i);
    bars.appendChild(bar);
  }
  bar = document.querySelectorAll(".bar");
  disableSearch();
  selectBar();
}

// bersihkan bar
function clearBar() {
  const bars = document.querySelector(".container");
  bars.innerHTML = "";
}

// setTimeOut untuk smoothing animation
function waitforme(milisec) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, milisec);
  });
}

// size
let size = document.querySelector("#arr_size");
size.addEventListener("input", function () {
  createArray(parseInt(size.value));
});

// delay 200ms
let delay = 200;

createArray();

const newArray = document.querySelector("#new_arr");
newArray.addEventListener("click", function () {
  enableSearch();
  enableSize();
  createArray(size.value);
});

function disableSearch() {
  document.querySelector(".linearSearch").disabled = true;
  document.querySelector(".binarySearch").disabled = true;
}

function enableSearch() {
  document.querySelector(".linearSearch").disabled = false;
  document.querySelector(".binarySearch").disabled = false;
}

function disableSize() {
  document.querySelector("#arr_size").disabled = true;
}

function enableSize() {
  document.querySelector("#arr_size").disabled = false;
}

function disableNewArray() {
  document.querySelector("#new_arr").disabled = true;
}

function enableNewArray() {
  document.querySelector("#new_arr").disabled = false;
}

function resetTime() {
  document.querySelector("#timeExec").textContent = "-";
  document.querySelector("#notation").innerHTML = "-";
}

function displayTime(time, notation) {
  document.querySelector("#timeExec").textContent = time;
  document.querySelector("#notation").innerHTML = notation;
}

// select bar
function selectBar() {
  for (i of bar) {
    i.addEventListener("click", chooseClick, false);
  }
}

function resetAlgo() {
  document.querySelector("#algo").textContent = "Searching";
}

function displayAlgo(algo) {
  document.querySelector("#algo").textContent = algo;
}

function chooseClick(square) {
  let id = square.target.id;
  selectedBar = bar[id];

  targetBar = selectedBar.style.height;

  console.log(selectedBar);

  selectedBar.style.background = "blue";
  for (i of bar) {
    i.style.cursor = "default";
  }
  enableSearch();
  removeEventBar();
}

function removeEventBar() {
  for (i of bar) {
    i.removeEventListener("click", chooseClick, false);
  }
}
