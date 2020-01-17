import { ResultTemplate } from './resultTemplate.js';

export class TicTacToe {
    constructor(gameId, players) {
        this.gameId = gameId;
        this.players = players;
        this.resultTemplate = new ResultTemplate();
        this.moves = [null, null, null, null, null, null, null, null, null];
        this.turn = 0;
    }

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

    checkWinner(turn, moves) {
        let winner = false;
        // if (ticTacToe.moves[0] === 'X' && ticTacToe.moves[1] === 'X' && ticTacToe.moves[2] === 'X') {
        //     document.getElementById('line-0-1-2').style.width = '100%';
        // }
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
            message.innerHTML = turn ? this.resultTemplate.renderResult(this.resultTemplate.playerTwoTemplate, 'winner') : this.resultTemplate.renderResult(this.resultTemplate.playerOneTemplate, 'winner');
            winner = true;
            ticTacToeField.style.transform = 'scale(0)';
            restartGame.addEventListener('click', this.triggerReset);
        }
        if (!moves.includes(null) && !winner) {
            message.innerHTML = this.resultTemplate.renderResult(this.resultTemplate.drawTemplate, 'draw');
            ticTacToeField.style.transform = 'scale(0)';
            restartGame.addEventListener('click', this.triggerReset)
        }
    }

    triggerReset() {
        reset.click();
    }

    reset() {
        this.moves = [null, null, null, null, null, null, null, null, null];
        this.turn = 0;
        message.innerHTML = '';
        ticTacToeField.style.transform = 'scale(1)';
    }
}