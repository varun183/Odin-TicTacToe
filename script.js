const gameBoardModule = (() => {
    let gameBoard = ["", "", "", "", "", "", "", "", ""]

    const render = () => {
        const squares = document.querySelectorAll(".js-grid-box");

        squares.forEach((square)=>{
            square.addEventListener("click",Game.handleClick);

        })

    }

    return {
        render,
    }
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
        gameBoardModule.render();

    }

    const handleClick = (event)=>{
        alert("you clicked");
    }

    return { start,handleClick }
})();

const startButton = document.querySelector(".js-start-btn");
startButton.addEventListener("click", () => {
    console.log("you cllicked")
    Game.start();

})