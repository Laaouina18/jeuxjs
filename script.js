const startButton = document.getElementById("startButton");

    const moleImages = document.querySelectorAll(".mole");
    let gameStarted = false;
    function showRandomMole() {
      moleImages.forEach((img) => {
        img.style.display = "none";
      });

      const randomIndex = Math.floor(Math.random() * moleImages.length);
      const randomMole = moleImages[randomIndex];
      
      randomMole.style.display = "block"; 
    }
    startButton.addEventListener("click", () => {
      if (!gameStarted) {
        gameStarted = true;
        setInterval(showRandomMole, 2000); 
      }
    });