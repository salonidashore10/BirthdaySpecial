// //  ~~~~~~page~~~~~~~~
//   window.onload = () => {
//     document.querySelector(".page").classList.add("start");
//   };
// //  ~~~~~~page1~~~~~~~~
//   window.onload = () => {
//     document.querySelector(".page1").classList.add("start");
//   };
// //  ~~~~~~page2~~~~~~~~
//   window.onload = () => {
//     document.querySelector(".page2").classList.add("start");
//   };
  
window.addEventListener("load", () => {
  document.querySelector(".page")?.classList.add("start");
  document.querySelector(".page1")?.classList.add("start");
  document.querySelector(".page2")?.classList.add("start");
  document.querySelector(".page3")?.classList.add("start");
});

  const container = document.getElementById("heart-container");
  const hearts = ["💖"];
  const hearts1 = ["💗"];

  function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerText = hearts[0];

    const heart1 = document.createElement("div");
    heart1.className = "heart";
    heart1.innerText = hearts1[0];

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 15 + 10 + "px";
    heart.style.animationDuration = Math.random() * 1 + 4 + "s";

    heart1.style.left = Math.random() * 100 + "vw";
    heart1.style.fontSize = Math.random() * 15 + 10 + "px";
    heart1.style.animationDuration = Math.random() * 1 + 4 + "s";

    container.appendChild(heart);
    container.appendChild(heart1);

    setTimeout(() => {
      heart.remove();
    }, 8000);
  }

  setInterval(createHeart, 600);

  function showMemories() {
    document.getElementById("memories").style.display = "block";
    const bgMusic = document.getElementById("bgMusic");
  }

function startMusic() {
  bgMusic.volume = 0.6; // soft romantic volume
  bgMusic.play().catch(() => {});
  document.removeEventListener("click", startMusic);
  document.removeEventListener("touchstart", startMusic);
}

// First user interaction triggers music
document.addEventListener("click", startMusic);
document.addEventListener("touchstart", startMusic);


const puzzle = document.getElementById("puzzle");
const timerEl = document.getElementById("timer");
const movesEl = document.getElementById("moves");
const winSection = document.getElementById("winSection");
const giftMsg = document.getElementById("giftMsg");
const confetti = document.getElementById("confetti");

const images = [
  "images/img1.jpg",
  "images/img2.jpg",
  "images/img3.jpg",
  "images/img4.jpg",
  "images/img5.jpg",
  "images/img6.jpg",
  "images/img7.jpg",
  "images/img8.jpg"
];

let currentImage = images[0];
let size = 2;
let tiles = [];
let time = 0;
let moves = 0;
let timer;
let started = false;

function setLevel(level) {
  size = level;
  newGame();
}

function newGame() {
  clearInterval(timer);
  time = 0;
  moves = 0;
  started = false;

  timerEl.textContent = 0;
  movesEl.textContent = 0;

  document.getElementById("hintBox").classList.add("hidden");
  
  winSection.classList.add("hidden");
  giftMsg.classList.add("hidden");
  confetti.innerHTML = "";

  currentImage = images[Math.floor(Math.random() * images.length)];

  tiles = [...Array(size * size - 1).keys(), null];
  shuffleSolvable();

  puzzle.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  puzzle.style.width = `${size * 100}px`;

  createPuzzle();
}

function startTimer() {
  if (!started) {
    started = true;
    timer = setInterval(() => {
      time++;
      timerEl.textContent = time;
    }, 1000);
  }
}

function createPuzzle() {
  puzzle.innerHTML = "";

  tiles.forEach((tile, index) => {
    const div = document.createElement("div");
    div.className = "tile";
    div.style.width = "100px";
    div.style.height = "100px";

    div.style.backgroundImage = `url(${currentImage})`;
    div.style.backgroundSize = `${size * 100}px ${size * 100}px`;

    if (tile === null) {
      div.classList.add("empty");
    } else {
      const x = tile % size;
      const y = Math.floor(tile / size);
      div.style.backgroundPosition = `${-x * 100}px ${-y * 100}px`;
      div.onclick = () => moveTile(index);
    }

    puzzle.appendChild(div);
  });
}

function moveTile(index) {
  startTimer();
  const empty = tiles.indexOf(null);
  const valid = [index-1, index+1, index-size, index+size];

  if (valid.includes(empty)) {
    [tiles[index], tiles[empty]] = [tiles[empty], tiles[index]];
    moves++;
    movesEl.textContent = moves;
    createPuzzle();
    checkWin();
  }
}

function shuffleSolvable() {
  for (let i = 0; i < 100; i++) {
    const index = Math.floor(Math.random() * tiles.length);
    const empty = tiles.indexOf(null);
    const valid = [index-1, index+1, index-size, index+size];
    if (valid.includes(empty)) {
      [tiles[index], tiles[empty]] = [tiles[empty], tiles[index]];
    }
  }
}

function checkWin() {
  const solved = [...Array(size * size - 1).keys(), null];
  if (JSON.stringify(tiles) === JSON.stringify(solved)) {
    clearInterval(timer);

    // Show win section
    winSection.classList.remove("hidden");

    // 🎉 WIN EFFECTS
    puzzle.classList.add("win-effect");
    document.body.classList.add("win-bg");

    // Auto confetti on win
    startConfetti();
  }
}


function showSolution() {
  tiles = [...Array(size * size - 1).keys(), null];
  createPuzzle();
  clearInterval(timer);
}

function openGift() {
  const gift = document.getElementById("gift");

  // 🎁 Gift animation
  gift.classList.add("opened");
  gift.textContent = "💖";

  // Show message with typewriter effect
  giftMsg.classList.remove("hidden");
  giftMsg.classList.add("typewriter");

  // Strong confetti rain
  startConfetti();
}


function startConfetti() {
  confetti.innerHTML = "";
  for (let i = 0; i < 120; i++) {
    const c = document.createElement("div");
    c.className = "confetti-piece";
    c.style.left = Math.random() * 100 + "vw";
    c.style.backgroundColor =
      ["#ff69b4","#ff1493","#ffc0cb","#fff"][Math.floor(Math.random()*4)];
    c.style.animationDuration = Math.random()*2 + 2 + "s";
    confetti.appendChild(c);
  }
}

// Start default
setLevel(2);
function toggleHint() {
  const hintBox = document.getElementById("hintBox");
  const hintImage = document.getElementById("hintImage");

  hintImage.src = currentImage; // current puzzle image
  hintBox.classList.toggle("hidden");
}

document.getElementById("giftbox").addEventListener("click", function () {
      const msg = document.getElementById("message");
      msg.style.display = msg.style.display === "none" ? "block" : "none";
    });

document.getElementById("myVideo").addEventListener("ended", () => {
  document.getElementById("bgMusic").play();
});

function playVideo() {
  const music = document.getElementById("bgMusic");
  const video = document.getElementById("myVideo");
  const btn = document.getElementById("playBtn");

  music.pause();
  music.currentTime = 0;
  video.classList.remove("hidden");
  video.play();
}


const play = document.getElementById("play");
const gameContainer = document.getElementById("gameContainer");

play.onclick = () => {
  play.style.display = "none";   // hide button
  gameContainer.style.display = "block"; // show game

  // document.getElementById("gameBtn")
  // .addEventListener("click", () => {
  //   document.getElementById("gameContainer")
  //     .classList.add("show-game");
  // });
  gameBtn.addEventListener("click", () => {
  gameBtn.style.display = "none";      // button hide
  game.classList.add("show-game");     // game show
});

};

const img = document.getElementById("cartoonImg");
const question = document.getElementById("question");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const loveBtn = document.getElementById("loveBtn");

let index = 0;
let lastQuestion = false;

const questions = [
  "Do you want to play this game with me? 😌💖",
  "Do you feel safe when you talk to me? 🥹",
  "Do you promise to keep me forever? 🥹💖",
  "Are you smiling right now while reading this? 😌💕",
  "Will you choose me again and again? ♾️💘",
  "Do I make you smile without trying? 😊💖",
  "Do I feel like home to you, even on your hardest days? 😜❤️",
  "Can I annoy you for a lifetime? 😆💞",
  "Would you let me hold your hand through your fears? 🤝💝",
  "Do you trust me with your heart? 🫶💗",
  "Will you laugh with me even on bad days? 😂💓", 
  "Are you ready to be stuck with me forever? 😜♾️",
  "💫 “What’s the answer that makes this game special?” 👇👇👇🥹🥹🥹🥹🥹"
];

function loadQuestion() {
  img.src = `image2/imag${index + 1}.gif`;
  question.textContent = questions[index];

  yesBtn.classList.remove("hidden");
  noBtn.classList.remove("hidden");
  loveBtn.classList.add("hidden");
}

// YES CLICK
yesBtn.onclick = () => {
  index++;

  // LAST QUESTION
  if (index === questions.length - 1) {
    img.src = `image2/imag${index + 1}.gif`;
    question.textContent = questions[index];

    yesBtn.classList.add("hidden");
    noBtn.classList.add("hidden");
    loveBtn.classList.remove("hidden");
    return;
  }

  if (index < questions.length) {
    loadQuestion();
  }
};

// FIRST NO CLICK → SINGLE NO
noBtn.onclick = () => {
  img.src = "image3/imag10.gif";
  question.textContent = "Maar Khana he ? 😏💖 double click on NO 😤👊";

  yesBtn.classList.add("hidden");
  noBtn.textContent = "No 🙈";
};

// SECOND NO CLICK → RETURN
noBtn.ondblclick = () => {
  noBtn.textContent = "No 🙈";
  loadQuestion();
};

// LOVE YOU TOO BUTTON
loveBtn.onclick = () => {
  img.src = "image2/imag10.gif";
  question.innerHTML =
    "I knew it you love me and I Love you too, yrr 🥹💖 and miss you so so so much 🥺<br>" +
    "not just for the good moments, but for every moments we share 🤗🥰 <br>"+
    "I Love You in a way words can't fully explain, "+
    "but my heart understands perfectly 💕 <br>"+
    "You are my favorite feeling,<br>" +
    "today and always 💕😘♾️";
  loveBtn.classList.add("hidden");
  startHeartRain();
};

// START
loadQuestion();

const heartbox = document.getElementById("heartbox");

function startHeartRain() {
  const interval = setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = "💖";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 4 + "s";

    heartbox.appendChild(heart);

    setTimeout(() => heart.remove(), 6000);
  }, 300);

  // stop after some time
  setTimeout(() => clearInterval(interval), 6000);
}
