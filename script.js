

const gameboard = (() => {
    let x = 'X';
    let o = 'O';
    let e = ' ';
    let gameBoard = [[x, e, o], [x, e, o], [o, x, e]];
    let flatBoard = gameBoard.flat();
    
    const get = () => gameBoard;
    const play = (i, j, move) => {
        gameBoard[i][j] = move;
        flatBoard = gameBoard.flat();
        gameboard.render();
    };

    const reset = () => {
        gameBoard = [[e ,e ,e ,], [e ,e ,e ,], [e ,e ,e ,]];
        flatBoard = gameBoard.flat();
        gameboard.render();
        
    }

    const clearBoard = () => {
        for (let i = 0; i < flatBoard.length; i++) {
            let cell = document.querySelector(`.gameboard :nth-child(${i+1}) > p`);
            if(cell ==null) return;
            cell.remove();
        }
    }

    const render = function () {
        clearBoard();
        for (let i = 0; i < flatBoard.length; i++) {
            let cell = document.querySelector(`.gameboard :nth-child(${i+1})`);
            let value = document.createElement('p');
            value.textContent = flatBoard[i];
            cell.appendChild(value);
        }
    }

    /* const playerMove = () => {
        for (let i = 0; i < flatBoard.length; i++) {
            let cell = document.querySelector(`.gameboard :nth-child(${i+1})`);
            cell.addEventListener('click', gameboard.play(1, 2, 'X'));
        }
    } */

    return{get, play, reset, render, /* playerMove */};
})();

gameboard.render();

const Player = (name) => {
    let points = 0;

    const win = () => {
        points++;
    }

    const getName = () => name;
    const getPoints =() => points;

    return {getName, getPoints, win}
}

