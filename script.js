const gameboard = (() => {
    let e = ' ';
    let gameBoard = [e ,e ,e , e ,e ,e , e ,e ,e ];
    let player = 'X';
    let status = 'playing';
    let cells = document.querySelectorAll('.gameboard > div')


    for(let i = 0; i < cells.length; i++) {
        let cell = cells[i];
        cell.addEventListener('click', function() { 
            if (cell.textContent.match(' ') && status == 'playing') {
            play(i, player);
            }
        });
    }

    const get = () => gameBoard.slice();
    const play = (i, move) => {
        gameBoard[i] = move;
        togglePlayer();
        render();
        if(checkWin()) console.log('win');
    };

    const reset = () => {
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
        
        for (let i = 0; i < 3; i++) {
            let row = b[i];
            let col = b.map((x) => x[i]);
            if(win(col) || win(row)) return 1;

            for (let j = 0; j < 3; j++) {
                if (i == j) d1.push(b[i][j]);
                if( i+j == 2) d2.push(b[i][j]);
            }
        }

        if(win(d1) || win(d2)) return 1;

        function win(arr) {
                if( arr[0] == ' ') return 0;
                if(arr.every( v => v === arr[0]) ){
                    return 1;
                }
        }
        
    }


    render();
    return{ play, reset, gameBoard2D};
    
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

