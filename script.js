const start = document.getElementById("startButton");
const moleImages = document.querySelectorAll(".mole");
let jeuCommencé = false;
let taupeActive = null;
let taupeCliquée = false;
let score = 0;
const imageVer = document.getElementById("wormImage");
let intervalleJeu;
let timeout1, timeout2;
let timeoutSortie;
const applauseAudio = document.getElementById("applauseAudio");
applauseAudio.play();

function voirPhoto() {
  if (!jeuCommencé) {
    return;
  }

  moleImages.forEach((img) => {
    img.style.display = "none";
  });

  function mettreÀJourAffichageScore() {
    const scoreDisplay = document.getElementById("scoreDisplay");
    scoreDisplay.textContent = `Score : ${score}`;
    const nouvelleTaille = 50 + score * 10;
    imageVer.style.width = `${nouvelleTaille}px`;
    imageVer.style.height = `${nouvelleTaille}px`;
  }

  if (score >= 8) {
    jeuCommencé = false;
    clearInterval(intervalleJeu);
    document.body.classList.remove("cursor");
    winSection.style.display = "flex";
    start.textContent = "Commencer le jeu";
    applauseAudio.play(); 
    return;
  }

  const indiceAléatoire = Math.floor(Math.random() * moleImages.length);
  const taupeAléatoire = moleImages[indiceAléatoire];
  taupeCliquée = false;

  function gestionnaireClicNourri() {
    taupeAléatoire.setAttribute("src", "./mole-game/fed.png");

    taupeAléatoire.style.cursor = "auto";
    taupeCliquée = true;
    score++;
    mettreÀJourAffichageScore();
    clearTimeout(timeoutSortie);
  }

  taupeAléatoire.addEventListener("click", gestionnaireClicNourri);
  taupeAléatoire.style.cursor = "pointer";

  taupeAléatoire.addEventListener("mouseenter", () => {
    taupeAléatoire.style.cursor = "url('./mole-game/cursor-worm.png'), auto";
  });

  taupeAléatoire.addEventListener("mouseleave", () => {
    if (!taupeCliquée) {
      taupeAléatoire.style.cursor = "pointer";
    } else {
      taupeAléatoire.style.cursor = "auto";
    }
  });
  clearTimeout(timeout1);
  clearTimeout(timeout2);

  timeout1 = setTimeout(function () {
    if (!taupeCliquée) {
      const sourceTaupeActuelle = taupeAléatoire.getAttribute("src");
      if (sourceTaupeActuelle === "./mole-game/hungry.png") {
        taupeAléatoire.setAttribute("src", "./mole-game/sad.png");
      }
    }
  }, 2000);

  timeout2 = setTimeout(function () {
    if (!taupeCliquée) {
      taupeAléatoire.setAttribute("src", "./mole-game/leaving.png");
      timeoutSortie = setTimeout(function () {
        taupeAléatoire.setAttribute("src", "./mole-game/leaving.png");
      }, 1000);
    }
    taupeActive = null;
  }, 2500);

  if (!taupeActive || taupeCliquée) {
    taupeActive = taupeAléatoire;
    taupeAléatoire.setAttribute("src", "./mole-game/hungry.png");
  }
  taupeAléatoire.style.display = "block";
}

function afficherDeuxRandom() {
  function afficherElementAleatoire() {
    const indiceAléatoire = Math.floor(Math.random() * moleImages.length);
    const taupeAléatoire = moleImages[indiceAléatoire];
    taupeAléatoire.style.display = "block";

    setTimeout(function () {
      taupeAléatoire.style.display = "none";
    }, 1000);
  }
}

start.addEventListener("click", () => {
  if (!jeuCommencé) {
    jeuCommencé = true;
    start.textContent = "Quitter le jeu";
    intervalleJeu = setInterval(voirPhoto, 4000);
    document.body.classList.add("cursor");
    afficherDeuxRandom();

    setTimeout(function () {
      if (score > 5) {
        const winSection = document.querySelector(".win");
        winSection.style.display = "flex";
        jeuCommencé = false;
        clearInterval(intervalleJeu);
        document.body.classList.remove("cursor");
        start.textContent = "Commencer le jeu";
        applauseAudio.play();
      } else {
        alert("Votre score est trop bas !");
        jeuCommencé = false;
        clearInterval(intervalleJeu);
        document.body.classList.remove("cursor");
        start.textContent = "Commencer le jeu";
      }
    }, 59000);
  } else {
    jeuCommencé = false;
    clearInterval(intervalleJeu);
    document.body.classList.remove("cursor");
    start.textContent = "Commencer le jeu";
  }
});
