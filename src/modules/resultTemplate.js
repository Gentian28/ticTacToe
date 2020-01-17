export class ResultTemplate {
    constructor() {
        this.playerOneTemplate = `
        <div class="x-symbol">
            <div class="left"></div>
            <div class="right"></div>
        </div>
        `;

        this.playerTwoTemplate = `
        <svg class="circle-symbol" width="50px" height="50px">
            <circle class="path" stroke="#F2EBD3" stroke-width="6" stroke-miterlimit="10" cx="25" cy="25" r="22"
                stroke="#F2EBD3" fill="transparent" />
        </svg>
        `;

        this.drawTemplate = `
        <div id="draw-template">
            <div class="x-symbol">
                <div class="left"></div>
                <div class="right"></div>
            </div>
            <svg class="circle-symbol" width="50px" height="50px">
                <circle class="path" stroke="#F2EBD3" stroke-width="6" stroke-miterlimit="10" cx="25" cy="25" r="22"
                    stroke="#F2EBD3" fill="transparent" />
            </svg>
        </div>
        `;
    }

    renderResult(playerTemplate, result) {
        const template = `
        <div id="result">
            ${playerTemplate}
            <div>${result}!</div>
            <button type="button" id="restartGame" class="waves-effect waves-light btn">Start new game</button>
        </div>`;
        return template;
    }
}