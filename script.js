const gameboard = (() => {

    let e = ' ';
    let gameBoard = [e ,e ,e , e ,e ,e , e ,e ,e ];

    const get = () => gameBoard.slice();

    const play = (i, move) => {
        gameBoard[i] = move;
        render();
    };

    const resetGame = () => {
        gameBoard = [e ,e ,e , e ,e ,e , e ,e ,e ];
        render();
    }

    const clear = () => {
        for (let i = 0; i < gameBoard.length; i++) {
            let cell = document.querySelector(`.gameboard :nth-child(${i+1}) > p`);
            if(cell ==null) return;
            cell.remove();
        }
    }

    const render = function () {
        clear();
        for (let i = 0; i < gameBoard.length; i++) {
            let cell = document.querySelector(`.gameboard :nth-child(${i+1})`);
            let value = document.createElement('p');
            value.textContent = gameBoard[i];
            cell.appendChild(value);
        }
    }
    render();
    return{get, play, resetGame};
    
})();


const game = (() => {
    
    let player = 'X';
    let cells = document.querySelectorAll('.gameboard > div')
    
    for(let i = 0; i < cells.length; i++) {
        let cell = cells[i];
        console.log(cell);
        cell.addEventListener('click', function() { 
            if (cell.textContent.match(' ')) {
            gameboard.play(i, player);
            /* checkWin(); */
            togglePlayer();
            }
        });
    }
   
    function togglePlayer() {
        if(player == 'X') {
            player = 'O';
        } else {
            player = 'X';
        }
    }

    
    const gameBoard2D = () => {
        let gameBoard = gameboard.get();
        let newArr = [];
        while(gameBoard.length) {
            newArr.push(gameBoard.splice(0,3));
        }
        return newArr;
    };

    /* const checkWin = () => {
        let b = gameBoard2D();

        let w = 0;
        for (let i = 0; i < 3; i++) {
            let rowCheck = b[i][0];
            for (let j = 0; j < 3; j++) {
                if (rowCheck != b[i][j]) {
                    break;
                }
                return (player);
            }
            
        }
            console.log(player);
        
    } */

    
})();

const Player = (name) => {
    let points = 0;

    const win = () => {
        points++;
    }

    const getName = () => name;
    const getPoints =() => points;

    return {getName, getPoints, win}
}

