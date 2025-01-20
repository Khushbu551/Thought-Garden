// Selecting HTML element

document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("start-button");
  const startScreen = document.getElementById("start-screen");
  const gameScreen = document.getElementById("game-screen");

  //Adding event listener to the Start button

  startButton.addEventListener("click", function () {
    //Hide the starting screen

    startScreen.style.display = "none";

    //Show the game screen

    gameScreen.style.display = "block";
  });

  //Selecting Elements

  const thoughtInput = document.getElementById("thoght-input");
  const thoghtType = document.getElementById("thoght-type");
  const addThoughtButton = document.getElementById("add-thought");
  const garden = document.getElementById("garden");
  const progressBar = document.getElementById("progress-bar");
  const progressText = document.getElementById("progress-text");

  //Variables to Track Progress

  let thoughtCount = 0;
  const maxThoghts = 5;

  // Variables to Track Thought Types
  let logicalCount = 0;
  let emotionalCount = 0;
  let sensoryCount = 0;
  let memoryCount = 0;

  //Add Thoght Functionality

  addThoughtButton.addEventListener("click", function () {
    //  1. Get User Input and Thoght Type
    const thought = thoughtInput.value.trim();
    const type = thoghtType.value;

    //2. Validate Input
    if (!thought) {
      alert("Please enter a thought!");
      return;
    }

    if (type === "") {
      alert("Please choose a type!");
      return;
    }
    // Check if Garden is FUll Before Adding
    if (thoughtCount >= maxThoghts) {
      alert("Your garden is full! LET's see your result.");
      return;
    }

    //3.Select Icon Based On Thought Type
    let icon = "";
    if (type === "Logical") {
      icon = "🌳";
      logicalCount++;
    } else if (type === "Emotional") {
      icon = "🌸";
      emotionalCount++;
    } else if (type === "Sensory") {
      icon = "🌿";
      sensoryCount++;
    } else if (type === "Memory") {
      icon = "🌼";
      memoryCount++;
    }

    //4. Create and style the Icon ELement

    const plant = document.createElement("div");
    plant.textContent = icon;

    //Adjust these range to mach circale area

    const topRange = [50, 70];
    const leftRange = [30, 60];
    plant.style.position = "absolute";
    plant.style.top =
      Math.random() * (topRange[1] - topRange[0]) + topRange[0] + "%";
    plant.style.left =
      Math.random() * (leftRange[1] - leftRange[0]) + leftRange[0] + "%";
    plant.style.fontSize = "35px";

    //5.Add Icon to the Garden
    garden.appendChild(plant);

    //6. Update Progress
    thoughtCount++;
    const progressPercentage = (thoughtCount / maxThoghts) * 100;
    progressBar.style.width = progressPercentage + "%";
    progressText.textContent = `${thoughtCount}/${maxThoghts} Thoughts`;

    //7. Check if Garden is Full
    if (thoughtCount === maxThoghts) {
      alert("Your garden is FulL! LET's see your result.");
      addThoughtButton.disabled = true;
      document.getElementById("show-result").style.display = "block";
    }

    //8. Clear the Input Box
    thoughtInput.value = "";
    thoghtType.value = "";
  });

  //Function to Show Result

  const showResultButton = document.getElementById("show-result");

  showResultButton.addEventListener("click", function () {
    const maxType = Math.max(
      logicalCount,
      emotionalCount,
      sensoryCount,
      memoryCount
    );

    //Find which types are tied
    const tiedTypes = [];
    if (maxType === logicalCount && logicalCount > 0) tiedTypes.push("Logical");
    if (maxType === emotionalCount && emotionalCount > 0)
      tiedTypes.push("Emotional");
    if (maxType === sensoryCount && sensoryCount > 0) tiedTypes.push("Sensory");
    if (maxType === memoryCount && memoryCount > 0) tiedTypes.push("Memory");

    // Handele tie or single dominant type
    let dominantType = "";
    if (tiedTypes.length > 1) {
      dominantType = tiedTypes.join("and");
    } else if (tiedTypes.length === 1) {
      dominantType = tiedTypes[0];
    } else {
      dominantType = "None";
    }

    //Create a Motivational message

    let message = "";
    if (dominantType === "Logical") {
      message = "You are a logical thinker. Use this to solve challenges!";
    } else if (dominantType === "Emotional") {
      message =
        "You are in touch with your emotions. Share your warmth with others!";
    } else if (dominantType === "Sensory") {
      message =
        "You observe the world deeply . Use your senses to inspire yourself!";
    } else if (dominantType === "Memory") {
      message = "You have strong memories. Use them to build a better future!";
    } else {
      message =
        "You haven't added enough thoughts to determine a dominant type";
    }

    //Display the result in the result area
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `<p><b>Your Dominant Thought Type:</b> ${dominantType}</p> 
  <p>${message}</p>`;

    //Show the buttons for play again and go back
    const resultButtons = document.getElementById("result-buttons");
    resultButtons.style.display = "block";

    //Hide the button after displaying the result
    showResultButton.style.display = "none";
  });

  //Play Again Button Functionality

  const playAgainButton = document.getElementById("play-again");

  playAgainButton.addEventListener("click", function () {
    //Reset garden

    garden.innerHTML = "";

    //REset progress
    thoughtCount = 0;
    logicalCount = 0;
    emotionalCount = 0;
    sensoryCount = 0;
    memoryCount = 0;

    progressBar.style.width = "0%";
    progressText.textContent = `0/${maxThoghts} Thoughts`;

    //Reset input fields
    thoughtInput.value = "";
    thoghtType.value = "";

    //Enable add thought button
    addThoughtButton.disabled = false;

    //Hide result add buttons
    document.getElementById("result").innerHTML = "";
    document.getElementById("result-buttons").style.display = "none";
  });

  // Go Back Button Functionality
  const goBackButton = document.getElementById("go-back");

  goBackButton.addEventListener("click", function () {
    // HIde the game screen
    document.getElementById("game-screen").style.display = "none";

    //Show the start screen
    document.getElementById("start-screen").style.display = "block";

    //Optionally reset the game the start state

    garden.innerHTML = "";
    progressBar.style.width = "0%";
    progressText.textContent = `0/${maxThoghts} Thoughts`;
    document.getElementById("result").innerHTML = "";
  });
});
