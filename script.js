const gameboard = (() => {
    let gameBoard = [' ' ,' ' ,' ' , ' ' ,' ' , ' ' ,' ' ,' ' ,' ' ];
    let player = 'X';
    let status = 'playing';
    let round = 1;


    let cells = document.querySelectorAll('.gameboard > div')
    let playButton = document.querySelector('.play > button');
    let restartButton = document.querySelector('.restart > button');
    let result = document.querySelector('.result');

    for(let i = 0; i < cells.length; i++) {
        let cell = cells[i];
        cell.addEventListener('click', function() { 
            if (cell.textContent.match(' ') && status == 'playing') {
            play(i, player);
            }
        });
    }

    playButton.addEventListener('click', function() {
        if (status != 'playing') {
            reset();
            updateResults('round');            
            render();
        }
    });

    restartButton.addEventListener('click', function() { 
        restartGame()
        updateResults('restart');
    })

    function updateResults(update) {
        result.firstChild.remove();
        let display = document.createElement('p');
        switch (update) {
            case 'round' :
                display.textContent = `Round ${++round}`;
                break;
            case 'restart':
                display.textContent = `Round ${round}`;
                break;
            case 'tie':
                display.textContent = `It's a tie`;
                break;
            default:
                display.textContent = `${update} wins!`;
                break;
        }
        
        result.appendChild(display);
    };

    const play = (i, move) => {
        gameBoard[i] = move;
        render();
        if(checkWin() == 1) {
            status = 'stop';
            updateResults(player);
        } else if (checkWin() == 2) {
            status = 'stop';
            updateResults('tie');
        }
        togglePlayer();
    };

    function clear() {
        for (let i = 0; i < gameBoard.length; i++) {
            let cell = document.querySelector(`.gameboard :nth-child(${i+1}) > p`);
            if(cell ==null) return;
            cell.remove();
        }
    }

    function reset() {
        gameBoard = [' ' ,' ' ,' ' ,' ' ,' ' ,' ' , ' ' ,' ' ,' ' ];
        player = 'X';
        status = 'playing';
        render();
    }

    function restartGame() {
        gameBoard = [' ' ,' ' ,' ' ,' ' ,' ' ,' ' , ' ' ,' ' ,' ' ];
        player = 'X';
        status = 'playing';
        round = 1;
        render();
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

    function togglePlayer() {
        if(player == 'X') {
            player = 'O';
        } else {
            player = 'X';
        }
    }

    const gameBoard2D = () => {
        let arr = gameBoard.slice()
        let newArr = [];
        while(arr.length) {
            newArr.push(arr.splice(0,3));
        }
        return newArr;
    };

    const checkWin = () => {
        let b = gameBoard2D();
        let d1 = [];
        let d2 = [];
        let tie = 1;
        
        for (let i = 0; i < 3; i++) {
            let row = b[i];
            let col = b.map((x) => x[i]);
            if(win(col) || win(row)) return 1;

            for (let j = 0; j < 3; j++) {
                if (i == j) d1.push(b[i][j]);
                if( i+j == 2) d2.push(b[i][j]);
                if(b[i][j] == ' ') tie = 0;
            }
        }

        if(win(d1) || win(d2)) return 1;

        function win(arr) {
            if( arr[0] == ' ') return 0;
            if(arr.every( v => v === arr[0]) ){
                return 1;
            }
        }

        if(tie) return 2;
    }




    render();
    return{reset,clear};
    
})();

const game = (() => {

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

