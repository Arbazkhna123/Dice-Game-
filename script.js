let player1 = { name: "", score: 0 };
let player2 = { name: "", score: 0 };
let currentTurn = "";

function startGame() {
    player1.name = prompt("Player 1 ka naam bataye:");
    player2.name = prompt("Player 2 ka naam bataye:");

    document.getElementById("player1Name").innerText = `${player1.name}: 0`;
    document.getElementById("player2Name").innerText = `${player2.name}: 0`;

    // Disable buttons after players' names are set
    document.getElementById("startBtn").disabled = true;
    document.getElementById("headBtn").disabled = false;
    document.getElementById("tailBtn").disabled = false;

    document.getElementById("gameStatus").innerText = "Head ya Tail select karein.";
}

function selectChoice(choice) {
    if (choice === "head") {
        player1.choice = "head";
        player2.choice = "tail";
    } else {
        player1.choice = "tail";
        player2.choice = "head";
    }

    alert(`${player1.name} ne ${player1.choice} select kiya, aur ${player2.name} ko ${player2.choice} mili.`);

    // Hide the Head/Tail buttons
    document.getElementById("coinToss").style.display = "none";

    tossCoin();
}

function tossCoin() {
    const toss = Math.random() < 0.5 ? "head" : "tail";
    alert(`Toss ka result: ${toss}`);

    if (toss === player1.choice) {
        currentTurn = player1.name;
        document.getElementById("player1Btn").disabled = false;
        document.getElementById("player2Btn").disabled = true;
        document.getElementById("gameStatus").innerText = `${player1.name} ki bari hai.`;
    } else {
        currentTurn = player2.name;
        document.getElementById("player1Btn").disabled = true;
        document.getElementById("player2Btn").disabled = false;
        document.getElementById("gameStatus").innerText = `${player2.name} ki bari hai.`;
    }

    // Show the dice container
    document.getElementById("diceContainer").style.display = "block";
}

function rollDice(player) {
    const roll1 = Math.floor(Math.random() * 6) + 1;
    const roll2 = Math.floor(Math.random() * 6) + 1;

    // Show dice images
    document.getElementById("diceImage1").src = `dice${roll1}.png`; // Assume dice1.png to dice6.png exist
    document.getElementById("diceImage2").src = `dice${roll2}.png`;

    document.getElementById("result").innerText = `${currentTurn} ka dice roll: ${roll1} aur ${roll2}`;

    // Check for the out condition
    if (roll1 === 6 && roll2 === 6) {
        alert(`${currentTurn} out ho gaya!`);
        resetGame(); // Reset the game if player is out
        return; // Stop further processing
    }

    // Update player scores
    if (player === 1) {
        player1.score += roll1 + roll2;
        document.getElementById("player1Name").innerText = `${player1.name}: ${player1.score}`;
    } else {
        player2.score += roll1 + roll2;
        document.getElementById("player2Name").innerText = `${player2.name}: ${player2.score}`;
    }

    // Switch turns
    if (player === 1) {
        currentTurn = player2.name;
        document.getElementById("player1Btn").disabled = true;
        document.getElementById("player2Btn").disabled = false;
        document.getElementById("gameStatus").innerText = `${player2.name} ki bari hai.`;
    } else {
        currentTurn = player1.name;
        document.getElementById("player1Btn").disabled = false;
        document.getElementById("player2Btn").disabled = true;
        document.getElementById("gameStatus").innerText = `${player1.name} ki bari hai.`;
    }
}


function sweetAlertWin(winnerName) {
    swal({
        title: `${winnerName} jeet gaya!`,
        text: "Shandar khel! Ab naya game shuru karein.",
        icon: "success",
        button: "OK",
    }).then(() => {
        resetGame();
    });
}

function resetGame() {
    player1.score = 0;
    player2.score = 0;
    document.getElementById("result").innerText = "";
    document.getElementById("diceContainer").style.display = "none";
    document.getElementById("coinToss").style.display = "block";
    document.getElementById("player1Btn").disabled = true;
    document.getElementById("player2Btn").disabled = true;
    document.getElementById("startBtn").disabled = false;

    // Reset player names
    document.getElementById("player1Name").innerText = "Player 1: 0";
    document.getElementById("player2Name").innerText = "Player 2: 0";
}
