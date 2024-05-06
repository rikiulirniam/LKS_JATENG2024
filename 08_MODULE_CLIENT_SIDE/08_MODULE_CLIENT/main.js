/**
 * @type {HTMLCanvasElement}
 */

const canvas = document.querySelector(".gameboard");

canvas.width = 800;
canvas.height = 580;

const ctx = canvas.getContext("2d");

class Target {
  constructor(source) {
    this.source = source;
  }
  draw() {
    const image = new Image();
    image.src = this.source;
    this.x = Math.floor(Math.random() * 650 + 50);
    this.y = Math.floor(Math.random() * 400 + 50);

    image.onload = () => {
      ctx.drawImage(image, this.x, this.y, 100, 100);
    };
  }
}

class Shooter {
  constructor(source) {
    this.source = source;
  }
  draw() {
    const image = new Image();
    image.src = this.source;

    image.onload = () => {
      ctx.drawImage(image, 300, 350, 300, 300);
    };
  }
}

let shooter = "";
if (localStorage.getItem("gun")) {
  shooter = new Shooter(`Sprites/${localStorage.getItem("gun")}.png`);
  shooter.draw();
}
let sourceTarget = "";
if (localStorage.getItem("target")) {
  sourceTarget = `Sprites/${localStorage.getItem("target")}.png`;
}

const defaultTarget = new Target(sourceTarget);
let targets = [];

let targetInterval = setInterval(() => {
  const target1 = new Target(sourceTarget);
  target1.draw();
  targets.push(target1);
}, 1000);

canvas.addEventListener("click", (e) => {
  const mouseX = e.clientX - canvas.getBoundingClientRect().left;
  const mouseY = e.clientY - canvas.getBoundingClientRect().top;

  targets.forEach((target) => {
    if (
      mouseX > target.x &&
      mouseX < target.x + 100 &&
      mouseY < target.y + 100 &&
      mouseY > target.y
    ) {
      document.querySelector(".scoreInfo").textContent++;
      targets = targets.filter((t) => t.x != target.x);
      ctx.clearRect(target.x, target.y, 100, 100);
      shooter.draw();
      const img = new Image();
      img.src = "Sprites/boom.png";
      img.onload = () => {
        ctx.drawImage(img, target.x, target.y, 80, 80);
      };
      setTimeout(() => {
        ctx.clearRect(target.x, target.y, 80, 80);
      }, 500);
    }
  });
});

const inscButton = document.querySelector(".instructionButton");
inscButton.addEventListener("click", (e) => {
  document.querySelector(".instruction").style.display = "flex";
});

document.querySelector(".buttonClose").addEventListener("click", (e) => {
  document.querySelector(".instruction").style.display = "none";
});

const username = document.querySelector(".username");
username.addEventListener("change", (e) => {
  // console.log(e)
  localStorage.setItem("username", e.target.value);
});

const level = document.querySelector(".selectlevel");
level.addEventListener("change", (e) => {
  localStorage.setItem("level", e.target.value);
});

const gun1 = document.querySelector("#gun1");
const gun2 = document.querySelector("#gun2");

gun1.addEventListener("click", (e) => {
  gun2.checked = false;
  localStorage.setItem("gun", "gun1");
});
gun2.addEventListener("click", (e) => {
  gun1.checked = false;
  localStorage.setItem("gun", "gun2");
});

const target1 = document.querySelector("#target1");
const target2 = document.querySelector("#target2");
const target3 = document.querySelector("#target3");

target1.addEventListener("click", (e) => {
  target2.checked = false;
  target3.checked = false;
  localStorage.setItem("target", "target1");
});
target2.addEventListener("click", (e) => {
  target1.checked = false;
  target3.checked = false;
  localStorage.setItem("target", "target2");
});
target3.addEventListener("click", (e) => {
  target1.checked = false;
  target2.checked = false;
  localStorage.setItem("target", "target3");
});

const playButton = document.querySelector(".playButton");
if (
  localStorage.getItem("username") &&
  localStorage.getItem("level") &&
  localStorage.getItem("gun") &&
  localStorage.getItem("target")
) {
  // console.log(playButton.disabled);
  playButton.removeAttribute("disabled");
}
localStorage.setItem("gameover", false);

playButton.addEventListener("click", (e) => {
  document.querySelector("#welcomescreen").style.display = "none";
  document.querySelector("#gamescreen").style.display = "flex";
  // document.querySelector("");
  const mode = localStorage.getItem("level");
  if (mode == "Easy") {
    document.querySelector(".timerInfo").textContent = 30;
    let timerInterval = setInterval(() => {
      document.querySelector(".timerInfo").textContent -= 1;
    }, 1000);
    setTimeout(() => {
      console.log("game over");
      clearInterval(timerInterval);
    }, 30000);
  } else if (mode == "Medium") {
    document.querySelector(".timerInfo").textContent = 20;
    let timerInterval = setInterval(() => {
      document.querySelector(".timerInfo").textContent -= 1;
    }, 1000);
    setTimeout(() => {
      console.log("game over");
      clearInterval(timerInterval);
    }, 20000);
  } else if (mode == "Hard") {
    document.querySelector(".timerInfo").textContent = 15;
    let timerInterval = setInterval(() => {
      document.querySelector(".timerInfo").textContent -= 1;
    }, 1000);
    setTimeout(() => {
      gameover();
      clearInterval(timerInterval);
    }, 15000);
  }
});

if (localStorage.getItem("username")) {
  document.querySelector(".usernameInfo").textContent =
    localStorage.getItem("username");
}

function gameover() {
  // document.querySelector('.resultName').textContent = localStorage.getItem('username');
  // document.querySelector('.resultScore').textContent = localStorage.getItem('score');
  // const gameOverPop = document.querySelector("gameOver");
  // gameOverPop.style.display = "flex";

  clearInterval(targetInterval);
  localStorage.setItem(
    "score",
    document.querySelector(".scoreInfo").textContent
  );

  window.location.href = "index.html";
}
