const ticTacToeField = document.getElementById('tic-tac-toe-field');
const message = document.getElementById('message');

let moves = [null, null, null, null, null, null, null, null, null];
function generateTicTacToe() {
    const tbody = document.createElement('tbody');
    for (let i = 0; i < 3; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < 3; j++) {
            const td = document.createElement('td');
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    return tbody;
}
ticTacToeField.appendChild(generateTicTacToe());
console.log(moves)
let turn = 0;

const getTicTacToe = document.querySelectorAll('#tic-tac-toe-field td');
console.log(getTicTacToe);

const checkWinner = (turn) => {
    if (
        (
            moves[0] === 'X' && moves[1] === 'X' && moves[2] === 'X' ||
            moves[3] === 'X' && moves[4] === 'X' && moves[5] === 'X' ||
            moves[6] === 'X' && moves[7] === 'X' && moves[8] === 'X' ||
            moves[0] === 'X' && moves[3] === 'X' && moves[6] === 'X' ||
            moves[1] === 'X' && moves[4] === 'X' && moves[7] === 'X' ||
            moves[2] === 'X' && moves[5] === 'X' && moves[8] === 'X' ||
            moves[0] === 'X' && moves[4] === 'X' && moves[8] === 'X' ||
            moves[2] === 'X' && moves[4] === 'X' && moves[6] === 'X'
        ) || (
            moves[0] === 'O' && moves[1] === 'O' && moves[2] === 'O' ||
            moves[3] === 'O' && moves[4] === 'O' && moves[5] === 'O' ||
            moves[6] === 'O' && moves[7] === 'O' && moves[8] === 'O' ||
            moves[0] === 'O' && moves[3] === 'O' && moves[6] === 'O' ||
            moves[1] === 'O' && moves[4] === 'O' && moves[7] === 'O' ||
            moves[2] === 'O' && moves[5] === 'O' && moves[8] === 'O' ||
            moves[0] === 'O' && moves[4] === 'O' && moves[8] === 'O' ||
            moves[2] === 'O' && moves[4] === 'O' && moves[6] === 'O'
        )
    ) {
        message.innerText = `Player ${Number(turn + 1)} wins!`;
    }
}

var socket = io.connect('https://tictactoews.herokuapp.com:4001');

const makeMove = () => {
    getTicTacToe.forEach((cell, index) => {
        cell.onclick = () => {
            socket.emit('move', index);
            // if (turn === 0) {
            //     cell.innerText = 'X';
            //     moves[index] = 'X';
            // } else {
            //     cell.innerText = 'O'
            //     moves[index] = 'O';
            // }
            // console.log(moves);
            // checkWinner(turn);
            // if (!turn) {
            //     turn = 1;
            // } else {
            //     turn = 0;
            // }
        }
    })
}

makeMove();

socketBtn.onclick = () => {
    socket.emit('sending message', 'Message sent');
};

socket.on('new message', function (data) {
    console.log(data);
});

socket.on('move made', function (data) {
    console.log(data)
    if (turn === 0) {
        getTicTacToe[data.index].innerText = 'X';
        moves[data.index] = 'X';
    } else {
        getTicTacToe[data.index].innerText = 'O'
        moves[data.index] = 'O';
    }
    console.log(moves);
    checkWinner(turn);
    if (!turn) {
        turn = 1;
    } else {
        turn = 0;
    }
})