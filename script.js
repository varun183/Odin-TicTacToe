//SETUP THE GAMEBOARD USING IIFE i.e Module pattern(NEED ONLY SINGLE INSTANCE)

let gameBoardModule = (function(){

    let gameBoard =["O"];
    

    return {gameBoard};

})();



//SETUP DISPLAYCONTROLLER USING IIFE i.e Module pattern TO CONTROL TURN(NEED ONLY SINGLE INSTANCE)

let displayControllerModule = (function(){

    const makeMove = document.querySelectorAll(".js-game-board-button");

    let index = 0;
    makeMove.forEach(makeMoves=>{
        makeMoves.dataset.linkedButton = index;
        makeMoves.addEventListener("click",renderArrayToScreen);


        function renderArrayToScreen(){
            const gridBoxes = document.querySelectorAll(".js-grid-box");

            let index = 0;

            gridBoxes.forEach(gridBox =>{
                gridBox.dataset.linkedButton = index;

                if(gridBox.getAttribute("data-linked-button")==makeMoves.getAttribute("data-linked-button")){

                    gridBox.textContent = gameBoardModule.gameBoard;
                    console.log("MAkeMoves linked",makeMoves.dataset.linkedButton);
                    console.log("GridBox linked value...",gridBox.dataset.linkedButton);
                }

                index++;
             })
        }
        index++;

    })


    let testFunc = () =>{console.log("Testing private func inside module object")};

    return {makeMove};

})();


//SETUP PLAYERS WITH FACTORY FUNCTION

let createPlayer = (playerName,playerNumber,assignedXO) =>{

    let getPlayerName =() =>{console.log("This is player:" + playernumber +"...."+playerName); }

    return {getPlayerName,playerName,playerNumber,assignedXO}

};



let Varun = createPlayer("Varun",1,"X");
let Virat = createPlayer("Virat",2,"O");




