export class WinnerTemplate {
    playerOneTemplate = `
    <div class="x-symbol">
        <div class="left"></div>
        <div class="right"></div>
    </div>`;

    playerTwoTemplate = `
    <svg class="circle-symbol" width="50px" height="50px">
    <circle class="path" stroke="#F2EBD3" stroke-width="6" stroke-miterlimit="10" cx="25" cy="25" r="22"
        stroke="#F2EBD3" fill="transparent" />
    </svg>`;

    renderWinner(playerTemplate) {
        const template = `
        <div id="winner">
            ${playerTemplate}
            <div>winner!</div>
            <button type="button" id="restartGame">Start new game</button>
        </div>`;
        return template;
    }

    checkWinner(turn, moves) {
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
            message.innerHTML = turn ? this.renderWinner(this.playerTwoTemplate) : this.renderWinner(this.playerOneTemplate);
            ticTacToeField.style.transform = 'scale(0)';
            restartGame.addEventListener('click', this.triggerReset)
        }
    }

    triggerReset() {
        reset.click();
    }
}