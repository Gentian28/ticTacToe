import { TicTacToe } from './js/game.js';
import { WinnerTemplate } from './js/winnerTemplate.js';

var socket = io.connect('http://localhost:4001/');
// var socket = io.connect('https://tictactoews.herokuapp.com:443/');

socket.on('connected players', function (data) {
    if (localStorage.getItem("uuid") === null) {
        localStorage.setItem('uuid', uuidv4());
    }
    connectedPlayers.innerHTML = data;
    // console.log(localStorage.getItem('uuid'));
});

socket.on('games', function (games) {
    roomsList.innerHTML = '';
    console.log(games);
    createGame.onclick = () => {
        const index = games.map(e => e.userId).indexOf(localStorage.getItem('uuid'));
        if (index === -1) {
            socket.emit('generate game', localStorage.getItem('uuid'));
        } else {
            console.log('You have already created a game');
        }
    }
    games.forEach(game => {
        const newGame = document.createElement('li');
        const newContent = document.createTextNode('Game generated by ' + game.userId);
        newGame.setAttribute('id', game.userId);
        newGame.appendChild(newContent);
        roomsList.append(newGame);
    });
    // roomsList.innerHTML = gamesList;
});

socket.on('player disconnected', function (data) {
    connectedPlayers.innerHTML = data;
});

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}


roomsList.onclick = (event) => {
    const gameId = event.target.id;
    // console.log(event);
    rooms.style.display = 'none';
    game.setAttribute('class', gameId);
    const currentGame = document.getElementsByClassName(gameId);
    currentGame[0].style.display = 'block';
    gameIdContainer.innerHTML = gameId;
    let ticTacToe = new TicTacToe(gameId);
    // console.log(ticTacToe)
    const winnerTemplate = new WinnerTemplate();
    ticTacToe.newGame();
    // console.log(ticTacToe.moves)
    console.log(gameId)
    console.log(ticTacToe.gameId)
    const getTicTacToe = document.querySelectorAll('#ticTacToeField td');
    // console.log(getTicTacToe);

    const makeMove = () => {
        getTicTacToe.forEach((cell, index) => {
            cell.onclick = () => {
                if (!cell.hasChildNodes()) {
                    socket.emit('move', { index, gameId });
                }
            }
        })
    }

    makeMove();

    // socket.on('new message', function (data) {
    //     console.log(data);
    // });

    socket.on('move made', function (data) {
        console.log(data)
        if (data.gameId === gameId) {
            if (ticTacToe.turn === 0) {
                getTicTacToe[data.index].innerHTML = winnerTemplate.playerOneTemplate;
                ticTacToe.moves[data.index] = 'X';
            } else {
                getTicTacToe[data.index].innerHTML = winnerTemplate.playerTwoTemplate;
                ticTacToe.moves[data.index] = 'O';
            }
            console.log(ticTacToe.moves);
            winnerTemplate.checkWinner(ticTacToe.turn, ticTacToe.moves);
            if (!ticTacToe.turn) {
                ticTacToe.turn = 1;
            } else {
                ticTacToe.turn = 0;
            }
        }
    })

    reset.onclick = () => {
        socket.emit('reset')
    }

    socket.on('reset', function (data) {
        getTicTacToe.forEach((element, index) => {
            element.innerHTML = '';
        });
        ticTacToe.reset();
        console.log(ticTacToe)
    });
}