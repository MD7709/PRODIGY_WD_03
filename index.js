let turn = "X";
let gameOver = false;
let music = new Audio('winner.mp3');

const changeTurn = () => {
    return turn === "X" ? "O" : "X";
};

// Check for a win
const checkWin = () => {
    let boxTexts = document.getElementsByClassName('boxtext');
    let winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    winCombinations.forEach(combination => {
        if (
            (boxTexts[combination[0]].innerText === boxTexts[combination[1]].innerText) &&
            (boxTexts[combination[2]].innerText === boxTexts[combination[1]].innerText) &&
            (boxTexts[combination[0]].innerText !== "")
        ) {
            document.querySelector('.winnerMessageText').innerText = boxTexts[combination[0]].innerText + " Wins!";
            gameOver = true;
            music.play();
        }
    });
};

// Main Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxText = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxText.innerText === '' && !gameOver) {
            boxText.innerText = turn;
            turn = changeTurn();
            checkWin();
            if (!gameOver) {
                document.querySelector(".winnerMessageText").innerText = "Turn for " + turn;
            }
        }
    });
});

// Reset button
document.getElementById("restartButton").addEventListener("click", () => {
    let boxTexts = document.querySelectorAll('.boxtext');
    Array.from(boxTexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    gameOver = false;
    document.querySelector(".winnerMessageText").innerText = "Turn for " + turn;
});
