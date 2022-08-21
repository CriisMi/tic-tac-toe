const gameboard = (() => {
    let gameBoard = [' ' ,' ' ,' ' , ' ' ,' ' , ' ' ,' ' ,' ' ,' ' ];
    let status = 'playing';
    let round = 1;
    let player1 = Player('Player1','X');
    let player2 = Player('Player2', 'O');
    let player = player1;

    function Player(name, mark) {
        let playerName = name;
        let wins = 0;
        let sign = mark;

        const getName = () => playerName;
        const getSign = () => sign;
        const win = () => {
            wins++;
        }
        const getWins =() => wins;

        function toggleSign() {
            if(sign == 'X') {
                sign = 'O';
            } else {
                sign = 'X';
            }
        }
    
        return {getName, getWins, getSign, win, toggleSign}
    };


    let cells = document.querySelectorAll('.gameboard > div')
    let playButton = document.querySelector('.play > button');
    let restartButton = document.querySelector('.restart > button');
    let result = document.querySelector('.result');
    let p1Wins = document.querySelector('.p1 > .wins');
    let p2Wins = document.querySelector('.p2 > .wins');

    function updateSign() {
        let p1sign = document. querySelector('.p1 > .sign');
        p1sign.firstChild.remove();
        let sign = document.createElement('p');
        sign.textContent = player1.getSign();
        p1sign.appendChild(sign);
        let p2sign = document. querySelector('.p2 > .sign');
        p2sign.firstChild.remove();
        let sign2 = document.createElement('p');
        sign2.textContent = player2.getSign();
        p2sign.append(sign2);
    };


    for(let i = 0; i < cells.length; i++) {
        let cell = cells[i];
        cell.addEventListener('click', function() { 
            if (cell.textContent.match(' ') && status == 'playing') {
            play(i, player.getSign());
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
        restartGame();
        updateSign();
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
                p1Wins.firstChild.remove();
                p2Wins.firstChild.remove();
                let win1 = document.createElement('p');
                win1.textContent = '0';
                let win2 = document.createElement('p');
                win2.textContent = '0';
                p1Wins.appendChild(win1);
                p2Wins.appendChild(win2);
                break;
            case 'tie':
                display.textContent = `It's a tie`;
                break;
            default:
                display.textContent = `${update.getName()} wins!`;
                if (update.getName() == player1.getName()) {
                    player1.win();
                    p1Wins.firstChild.remove();
                    let win = document.createElement('p');
                    win.textContent = player1.getWins();
                    p1Wins.appendChild(win);
                } else {
                    player2.win();
                    p2Wins.firstChild.remove();
                    let win = document.createElement('p');
                    win.textContent = player2.getWins();
                    p2Wins.appendChild(win);
                }
                
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
        status = 'playing';
        player1.toggleSign();
        player2.toggleSign();
        updateSign();
        render();
    }

    function restartGame() {
        let gameBoard = [' ' ,' ' ,' ' , ' ' ,' ' , ' ' ,' ' ,' ' ,' ' ];
        let status = 'playing';
        let round = 1;
        let player1 = Player('Player1','X');
        let player2 = Player('Player2', 'O');
        let player = player1;
        render();
    }

    function render() {
        clear();
        for (let i = 0; i < gameBoard.length; i++) {
            let cell = document.querySelector(`.gameboard :nth-child(${i+1})`);
            let value = document.createElement('p');
            value.textContent = gameBoard[i];
            cell.appendChild(value);
        }
    }

    function togglePlayer() {
        if(player == player1) {
            player = player2;
        } else {
            player = player1;
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
})();