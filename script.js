const start = document.getElementById("startButton");
const moleImages = document.querySelectorAll(".mole");
let gameStarted = false;
let activeMole = null;
let moleClicked = false; // Drapeau pour savoir si la taupe a été cliquée

function voirPhoto() {
  moleImages.forEach((img) => {
    img.style.display = "none";
  });

  // Sélectionner un index aléatoire
  const randomIndex = Math.floor(Math.random() * moleImages.length);
  const randomMole = moleImages[randomIndex];

  // Si une taupe est active et n'a pas été cliquée, affichez "sad" ou "leaving"
  if (activeMole && !moleClicked) {
    const previousMoleSrc = activeMole.getAttribute("src");
    if (previousMoleSrc === "./mole-game/hungry.png") {
      activeMole.setAttribute("src", "./mole-game/sad.png");
    } else if (previousMoleSrc === "./mole-game/fed.png") {
      activeMole.setAttribute("src", "./mole-game/fed-sad.png");
    }
    activeMole.style.cursor = "auto";
  }

  // Réinitialiser le drapeau de clic
  moleClicked = false;

  // Gestionnaire de clic pour changer l'image de "hungry" à "fed"
  function fedClickHandler() {
    randomMole.setAttribute("src", "./mole-game/fed.png");
    randomMole.style.cursor = "auto";
    moleClicked = true; // Mettez à jour le drapeau de clic
  }

  randomMole.addEventListener("click", fedClickHandler);

  // Curseur personnalisé au survol
  randomMole.style.cursor = "pointer";

  // Gestionnaire de survol pour changer le curseur
  randomMole.addEventListener("mouseenter", () => {
    randomMole.style.cursor = "url('./mole-game/cursor-worm.png'), auto";
  });

  // Gestionnaire de sortie de survol pour réinitialiser le curseur
  randomMole.addEventListener("mouseleave", () => {
    if (!moleClicked) {
      randomMole.style.cursor = "pointer"; // Réinitialiser le curseur si la taupe n'a pas été cliquée
    } else {
      randomMole.style.cursor = "auto"; // Réinitialiser le curseur si la taupe a été cliquée
    }
  });

  setTimeout(function () {
    if (!moleClicked) {
      const currentMoleSrc = randomMole.getAttribute("src");
      if (currentMoleSrc === "./mole-game/hungry.png" || currentMoleSrc === "./mole-game/fed.png") {
        randomMole.setAttribute("src", "./mole-game/sad.png");
        setTimeout(function () {
          randomMole.style.display = "none";
        }, 1000);
      }
    }
  }, 2000);
  setTimeout(function () {
    if (!moleClicked) {
      randomMole.setAttribute("src", "./mole-game/leaving.png");
      setTimeout(function () {
        randomMole.style.display = "none";
      }, 1000);
    }
  }, 2500);

  // Assurez-vous que la première taupe est toujours "hungry"
  if (!activeMole || moleClicked) {
    activeMole = randomMole;
    randomMole.setAttribute("src", "./mole-game/hungry.png");
  }

  randomMole.style.display = "block";
}

start.addEventListener("click", () => {
  if (!gameStarted) {
    gameStarted = true;
    setInterval(voirPhoto, 5000);
    document.body.classList.add("cursor");
  }
});
