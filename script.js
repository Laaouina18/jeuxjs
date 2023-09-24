const start = document.getElementById("startButton");
const moleImages = document.querySelectorAll(".mole");
let gameStarted = false;
let activeMole = null;
let moleClicked = false;
let score = 0;
const wormImage = document.getElementById("wormImage");
let gameInterval;
let timeout1, timeout2; // Ajout de variables pour stocker les identifiants de setTimeout
let leavingTimeout; // Variable pour stocker le setTimeout du départ

function voirPhoto() {
  if (!gameStarted) {
    return; // Ne rien faire si le jeu n'a pas encore commencé
  }

  moleImages.forEach((img) => {
    img.style.display = "none";
  });

  function updateScoreDisplay() {
    const scoreDisplay = document.getElementById("scoreDisplay");
    scoreDisplay.textContent = `Score : ${score}`;
    const newSize = 50 + score * 10;
    wormImage.style.width = `${newSize}px`;
    wormImage.style.height = `${newSize}px`;
  }

  if (score >= 8) {
    gameStarted = false;
    clearInterval(gameInterval);
    document.body.classList.remove("cursor");
    return;
  }

  const randomIndex = Math.floor(Math.random() * moleImages.length);
  const randomMole = moleImages[randomIndex];
  moleClicked = false;

  function fedClickHandler() {
    randomMole.setAttribute("src", "./mole-game/fed.png");
    setTimeout(function () {
      randomMole.style.display = "none";
      randomMole.parentNode.removeChild(randomMole);
      voirPhoto(); // Afficher une nouvelle taupe
    }, 1000);
    randomMole.style.cursor = "auto";
    moleClicked = true;
    score++;
    updateScoreDisplay();
    // Annuler le délai de départ prévu
    clearTimeout(leavingTimeout);
  }

  randomMole.addEventListener("click", fedClickHandler);
  randomMole.style.cursor = "pointer";

  randomMole.addEventListener("mouseenter", () => {
    randomMole.style.cursor = "url('./mole-game/cursor-worm.png'), auto";
  });

  randomMole.addEventListener("mouseleave", () => {
    if (!moleClicked) {
      randomMole.style.cursor = "pointer";
    } else {
      randomMole.style.cursor = "auto";
    }
  });

  // Utilisation de clearTimeout pour effacer les setTimeout au besoin
  clearTimeout(timeout1);
  clearTimeout(timeout2);

  timeout1 = setTimeout(function () {
    if (!moleClicked) {
      const currentMoleSrc = randomMole.getAttribute("src");
      if (currentMoleSrc === "./mole-game/hungry.png") {
        randomMole.setAttribute("src", "./mole-game/sad.png");
        timeout2 = setTimeout(function () {
          randomMole.style.display = "none";
          voirPhoto(); // Afficher une nouvelle taupe
        }, 1000);
      }
    }
  }, 2000);

  timeout2 = setTimeout(function () {
    if (!moleClicked) {
      randomMole.setAttribute("src", "./mole-game/leaving.png");
      leavingTimeout = setTimeout(function () {
        randomMole.style.display = "none";
        voirPhoto(); // Afficher une nouvelle taupe
      }, 1000);
    }
  }, 2500);

  if (!activeMole || moleClicked) {
    activeMole = randomMole;
    randomMole.setAttribute("src", "./mole-game/hungry.png");
  }
  randomMole.style.display = "block";
}

function afficherDeuxRandom() {
  // Fonction pour afficher un élément aléatoire
  function afficherElementAleatoire() {
    const randomIndex = Math.floor(Math.random() * moleImages.length);
    const randomMole = moleImages[randomIndex];
    randomMole.style.display = "block";

    setTimeout(function () {
      randomMole.style.display = "none";
    }, 1000);
  }

  // Appeler la fonction d'affichage aléatoire deux fois avec un délai de 5 ms
  afficherElementAleatoire();
  setTimeout(afficherElementAleatoire, 5);
}

start.addEventListener("click", () => {
  if (!gameStarted) {
    gameStarted = true;
    start.textContent = "Quitter le jeu"; // Mettre à jour le texte du bouton
    gameInterval = setInterval(voirPhoto, 4000);
    document.body.classList.add("cursor");
    afficherDeuxRandom(); // Appel initial pour afficher les éléments

    // Définir un délai pour afficher la section "win" après 5 secondes
    setTimeout(function () {
      if (score > 5) {
        const winSection = document.querySelector(".win");
        winSection.style.display = "flex";
        gameStarted = false;
        clearInterval(gameInterval);
        document.body.classList.remove("cursor");
        start.textContent = "Start Game";
      } else {
      
        alert("Votre score est trop bas !");
        gameStarted = false;
    clearInterval(gameInterval);
    document.body.classList.remove("cursor");
    start.textContent = "Start Game";
      }
    }, 59000);
  } else {
    // Si le jeu est déjà en cours, cliquer sur "Quitter le jeu" arrête le jeu
    gameStarted = false;
    clearInterval(gameInterval);
    document.body.classList.remove("cursor");
    start.textContent = "Start Game"; // Remettre le bouton à son état initial
  }
});
