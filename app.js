import { TicTacToe } from './js/game.js';
import { WinnerTemplate } from './js/winnerTemplate.js';

// const ticTacToeField = document.getElementById('tic-tac-toe-field');
// const message = document.getElementById('message');

let ticTacToe = new TicTacToe();
const winnerTemplate = new WinnerTemplate();
ticTacToeField.appendChild(ticTacToe.generateTicTacToe());
console.log(ticTacToe.moves)

const getTicTacToe = document.querySelectorAll('#ticTacToeField td');
console.log(getTicTacToe);


// var socket = io.connect('http://localhost:4001/');
var socket = io.connect('https://tictactoews.herokuapp.com:443/');

const makeMove = () => {
    getTicTacToe.forEach((cell, index) => {
        cell.onclick = () => {
            if (!cell.hasChildNodes()) {
                socket.emit('move', index);
            }
        }
    })
}

makeMove();

socket.on('new message', function (data) {
    console.log(data);
});

socket.on('move made', function (data) {
    console.log(data)
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

socket.on('connected players', function (data) {
    connectedPlayers.innerHTML = data;
});

socket.on('player disconnected', function (data) {
    connectedPlayers.innerHTML = data;
});

const url = window.location;
console.log('href ' + url.href);
console.log('host ' + url.host);      // developer.mozilla.org:8080
console.log('hostmane ' + url.hostname);  // developer.mozilla.org
console.log('port ' + url.port);      // 8080
console.log('pathname ' + url.pathname);  // /en-US/search