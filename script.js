

const gameboard = (() => {
    let x = 'x';
    let o = 'o';
    let e = 'e';
    let gameBoard = [[x, e, o], [x, e, o], [o, x, e]];

    const get = () => gameBoard;
    const play = (i, j, move) => gameBoard[i][j] = move;
    const reset = () => gameBoard = [[ , , ,], [ , , ,], [ , , ,]];

    const render = () => {
        let flatBoard = (gameboard.get()).flat();
        for (let i = 0; i < flatBoard.length; i++) {
            let cell = document.querySelector(`.gameboard :nth-child(${i+1})`);
            let value = document.createTextNode(flatBoard[i]);
            if (flatBoard[i] !== 'e') {
                cell.appendChild(value);
            }
        }
    }

    return{get, play, reset, render};
})();

gameboard.render();

/* const cells = document.querySelectorAll(".cell");
console.log(cells);
let i = 0;
cells.forEach((cell) => {
    
    let value = document.createTextNode(`${flatBoard[i]}`);
    cell.appendChild(value);
    i++;
});
 */


const Player = (name) => {
    let points = 0;

    const win = () => {
        points++;
    }

    const getName = () => name;
    const getPoints =() => points;

    return {getName, getPoints, win}
}
