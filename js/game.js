export class TicTacToe {
    constructor(gameId) {
        this.gameId = gameId;
    }
    moves = [null, null, null, null, null, null, null, null, null];
    turn = 0;

    generateTicTacToe() {
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

    newGame() {
        ticTacToeField.appendChild(this.generateTicTacToe());
    }

    reset() {
        this.moves = [null, null, null, null, null, null, null, null, null];
        this.turn = 0;
        message.innerHTML = '';
        ticTacToeField.style.transform = 'scale(1)';
    }
}