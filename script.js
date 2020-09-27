let currentPlayer = 'X';
let nextPlayer = 'O';

let playerXSelections = [];
let playerOSelections = [];

const winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

let showCurrentPlayer = document.createElement("div")
showCurrentPlayer.innerHTML = "O player atual é :" + currentPlayer
document.body.appendChild(showCurrentPlayer)

const handleClick = function (event) {
    const cell = event.target;
    console.log(cell.innerHTML)
    if (cell.innerHTML === '') {
        cell.innerHTML = currentPlayer;

        if (currentPlayer === 'X') {
            playerSelections = playerXSelections;
            nextPlayer = 'O';
        } else {
            playerSelections = playerOSelections;
            nextPlayer = 'X';
        }

        playerSelections.push(Number(cell.id));

        currentPlayer = nextPlayer;
        showCurrentPlayer.innerHTML = "O player atual é :" + nextPlayer
    }
    if (checkWinner(playerOSelections)) {
        resetGame()
    }
    if (checkWinner(playerXSelections)) {
        resetGame()
    }
    if (checkDraw()) {
        console.log("empate")
        resetGame()
    }

}

const cells = document.querySelectorAll('td');

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', handleClick);
}

function checkWinner(playersSelection = []) {
    for (i = 0; i < winningCombinations.length; i++) {
        matches = 0
        for (j = 0; j < winningCombinations[i].length; j++) {
            if (playersSelection.includes(winningCombinations[i][j])) {
                matches++
            }
            else break
            if (matches === 3) {
                console.log("Venceu")
                return true
            }
        }
    }
    return false
}

function checkDraw() {
    return (playerOSelections.length + playerXSelections.length) >= cells.length;
}

function resetGame() {
    playerXSelections = new Array();
    playerOSelections = new Array();
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = '';
    }
}