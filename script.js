

const gameboard = (() => {
    let x = 'x';
    let o = 'o';
    let e = 'e';
    let gameBoard = [[x, o, o], [x, e, o], [o, x, e]];

    const get = () => gameBoard;
    const play = (i, j, move) => gameBoard[i][j] = move;
    const reset = () => gameBoard = [[ , , ,], [ , , ,], [ , , ,]];

    return{get, play, reset};
})();


let flatBoard = (gameboard.get()).flat();

const cells = document.querySelectorAll(".cell");
console.log(cells);
let i = 0;
cells.forEach((cell) => {
    
    let value = document.createTextNode(`${flatBoard[i]}`);
    cell.appendChild(value);
    i++;
});



const Player = (name) => {
    let points = 0;

    const win = () => {
        points++;
    }

    const getName = () => name;
    const getPoints =() => points;

    return {getName, getPoints, win}
}
