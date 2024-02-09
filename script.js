const gameBoardModule = (() => {
    let gameBoard = ["", "", "", "", "", "", "", "", ""]

    const render = () => {
        const squares = document.querySelectorAll(".js-grid-box");
        squares.forEach((square, index) => {
            square.textContent = gameBoard[index];
        })
    }

    const update = (index, value) => {
        gameBoard[index] = value;
        render();

    };

    const getGameBoard = () =>gameBoard;
    return {
        render,
        update,
        getGameBoard
    }
})();


const displayController =(()=>{

    const renderMessage = (message) =>{
        document.querySelector("#message").innerHTML = message;
    }

    return {renderMessage};

})();





const createPlayer = (name, mark) => {
    return {
        name, mark
    }
}

const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = () => {
        console.log("inside start")
        players = [
            createPlayer(document.querySelector("#player1-input").value, "X"),
            createPlayer(document.querySelector("#player2-input").value, "O"),
        ]

        currentPlayerIndex = 0;
        gameOver = false;

        const squares = document.querySelectorAll(".js-grid-box");
        squares.forEach((square) => {
            square.addEventListener("click", handleClick);

        })

    }

    const restart = () =>{
        for(let i=0;i<9;i++){
            gameBoardModule.update(i,"");
        }

        gameBoardModule.render();
        gameOver = false;
        document.querySelector("#message").textContent = "";



    }

    const handleClick = (event) => {

        if (gameOver) {
            return;
        }

        let index = parseInt(event.target.id.split("-")[1]);
        if(gameBoardModule.getGameBoard()[index]!=="")
            return;

        gameBoardModule.update(index, players[currentPlayerIndex].mark);

        if(checkForWin(gameBoardModule.getGameBoard(), players[currentPlayerIndex].mark)){
            gameOver = true;
            displayController.renderMessage(`${players[currentPlayerIndex].name} wins`)


        } else if(checkForTie(gameBoardModule.getGameBoard())){
            gameOver = true;
            displayController.renderMessage("It's a tie");
        }

        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    }

    return { start,restart, handleClick }
})();




function checkForWin(board) {
    const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    for (let i = 0; i< winningCombinations.length; i++) {
      const [a,b,c] = winningCombinations[i];
      
      if(board[a] && (board[a] === board[b] && board[a] === board[c])){
            return true;
      }
    }
    return false;    
}


function checkForTie(board){
    return board.every(cell => cell!=="");
    
}


const restartButton  = document.querySelector("#js-restart-btn");
restartButton.addEventListener("click", ()=>{
    Game.restart();
})

const startButton = document.querySelector("#js-start-btn");
startButton.addEventListener("click", () => {
    console.log("you cllicked")
    Game.start();

})