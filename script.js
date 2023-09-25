const start = document.getElementById("startButton");
const moleImages = document.querySelectorAll(".mole");
let gameStarted = false;
let activeMole = [];


function voirPhoto() {
  moleImages.forEach((img) => {
    img.style.display = "none";
  });
  const randomIndex = Math.floor(Math.random() * moleImages.length);
  const randomMole = moleImages[randomIndex];

  activeMole.push(randomIndex);

  if (activeMole.includes(randomIndex)) {
    randomMole.setAttribute("src", "./mole-game/hungry.png")
  }

  randomMole.style.display = "block";
  
  setTimeout(function () {
    randomMole.setAttribute("src", "./mole-game/sad.png")
    

  }, 1400);
  setTimeout(function () {
    randomMole.setAttribute("src", "./mole-game/leaving.png")
  }, 1800);
  
}
start.addEventListener("click", () => {
  if (!gameStarted) {
    gameStarted = true;
    setInterval(voirPhoto, 2000);
    add = document.getElementById("mybody");
    add.classList.add("cursor");
  }
});
