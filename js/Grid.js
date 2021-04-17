/* GRID SETTINGS */
let SHOW_GRID_BORDER = true;
const GRID_BACKGROUND_COLOR = "#AAAAAA";
const SHOW_GRID_CENTER = false;
const GRID_RANDOMISE = false;
/* CELL SETTINGS */
let CELL_SIZE = 40;
const CELL_ALIVE_COLOR = '#444444';
const CELL_DEAD_COLOR = '#CCCCCC';
const CELL_HOVER_COLOR = 'rgba(76, 175, 80, 0.5)';

/* MAIN GRID  */
class Grid {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.element = document.getElementById('world');

        this.cells = [];
        this.ctx = this.element.getContext("2d");

        this.aliveCells = [];
        this.deadCells = [];
        this.hoveredCell = { x: null, y: null, isAlive: null };
        this.blueprintCells = [];

        this.element.height = this.element.parentElement.clientHeight;
        this.element.width = this.element.parentElement.clientWidth;

        this.displayClear();

        // Initialise the cells
        if (GRID_RANDOMISE) {
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    let value = Math.random() < 0.5;
                    if (value) {
                        this.aliveCells.push({ x: x, y: y });
                    }
                    this.cells.push(value);
                }
            }
        }
        else {
            this.cells.fill(false);
        }

        this.dx = 0;
        this.dy = 0;
        this.marginX = 0;
        this.marginY = 0;
        this.updateOffset(this.dx, this.dy)
        this.ctx.translate(this.dx, this.dy);
        this.displayAll();
    }
    updateOffset(x, y) {
        this.dx = x;
        this.dy = y;
        if (SHOW_GRID_CENTER) {
            this.marginX = this.element.width / 2 - this.width * CELL_SIZE / 2;
            this.marginY = this.element.height / 2 - this.height * CELL_SIZE / 2;
        }
    }
    getIndex(x, y) {
        return y * this.width + x;
    }
    getState(x, y) {
        return this.cells[this.getIndex(x, y)];
    }
    setState(x, y, value) {
        this.cells[this.getIndex(x, y)] = value;
    }
    toggleState(x, y) {
        this.setState(x, y, !this.getState(x, y));
    }
    stepForward(nGeneration = 1) {
        // Compute next generation
        for (let generation = 0; generation < nGeneration; generation++) {
            this.aliveCells = [];
            this.deadCells = [];
            let updatedCells = [];
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    let nAlive = this.getNeighboursState(x, y);
                    let isAlive = this.getState(x, y);
                    let index = this.getIndex(x, y);

                    if (isAlive) {
                        if (!(nAlive == 2 || nAlive == 3)) {
                            updatedCells.push({ x: x, y: y, value: false });
                            this.deadCells.push({ x: x, y: y });
                        }
                    }
                    else {
                        if (nAlive == 3) {
                            updatedCells.push({ x: x, y: y, value: true });
                            this.aliveCells.push({ x: x, y: y });
                        }
                    }
                }
            }

            // Update next generation
            for (var i = 0; i < updatedCells.length; i++) {
                this.setState(updatedCells[i].x, updatedCells[i].y, updatedCells[i].value);
            }
        }
    }
    getNeighboursState(x, y) {
        var nAlive = 0;
        // Check clockwise from North
        if (y > 0) {

            if (this.getState(x, y - 1) == 1) {
                nAlive++;
            }
            if (x < this.width - 1) {
                if (this.getState(x + 1, y - 1) == 1) {
                    nAlive++;
                }
            }
        }
        if (x < this.width - 1) {
            if (this.getState(x + 1, y) == 1) {
                nAlive++;
            }
            if (y < this.height - 1) {
                if (this.getState(x + 1, y + 1) == 1) {
                    nAlive++;
                }
            }
        }
        if (y < this.height - 1) {
            if (this.getState(x, y + 1) == 1) {
                nAlive++;
            }
            if (x > 0) {
                if (this.getState(x - 1, y + 1) == 1) {
                    nAlive++;
                }
            }
        }
        if (x > 0) {
            if (this.getState(x - 1, y) == 1) {
                nAlive++;
            }
            if (y > 0) {
                if (this.getState(x - 1, y - 1) == 1) {
                    nAlive++;
                }
            }
        }
        return nAlive;
    }
    displayEmptyGrid() {
        this.ctx.setTransform(1, 0, 0, 1, this.dx + this.marginX, this.dy + this.marginY);
        this.ctx.fillStyle = CELL_DEAD_COLOR;
        this.ctx.fillRect(0, 0, this.width * CELL_SIZE, this.height * CELL_SIZE);
    }
    displayClear() {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.fillStyle = GRID_BACKGROUND_COLOR;
        this.ctx.fillRect(-1, -1, this.element.width + 1, this.element.height + 1);
    }
    displayAll() {
        this.displayClear();
        this.displayEmptyGrid();

        this.ctx.beginPath();
        this.ctx.fillStyle = CELL_ALIVE_COLOR;
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                if (this.getState(x, y)) {
                    this.pathCell(x, y);
                }
            }
        }
        this.ctx.fill();
        this.ctx.closePath();

        if (SHOW_GRID_BORDER) {
            this.showBorders();
        }
    }
    displayUpdate() {

        this.ctx.setTransform(1, 0, 0, 1, this.dx + this.marginX, this.dy + this.marginY);
        // Display only the updated cells
        this.ctx.beginPath();
        this.ctx.fillStyle = CELL_ALIVE_COLOR;
        for (var i = 0; i < this.aliveCells.length; i++) {
            this.pathCell(this.aliveCells[i].x, this.aliveCells[i].y);
        }
        this.aliveCells = [];
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.fillStyle = CELL_DEAD_COLOR;
        for (var i = 0; i < this.deadCells.length; i++) {
            this.pathCell(this.deadCells[i].x, this.deadCells[i].y);
        }
        this.deadCells = [];
        this.ctx.fill();
        this.ctx.closePath();

        if (SHOW_GRID_BORDER) {
            this.showBorders();
        }
    }
    pathCell(x, y) {
        this.ctx.rect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
    drawCell(x, y, fill = CELL_ALIVE_COLOR) {
        this.ctx.fillStyle = fill;
        this.ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        if (SHOW_GRID_BORDER) {
            this.showBorders();
        }
    }
    showBorders() {
        if (CELL_SIZE > 4) {
            this.ctx.beginPath();
            this.ctx.lineWidth = 1;
            this.ctx.strokeStyle = 'black';
            for (var x = 0; x < this.width; x++) {
                this.ctx.moveTo(x * CELL_SIZE, 0);
                this.ctx.lineTo(x * CELL_SIZE, this.height * CELL_SIZE);
            }
            for (var y = 0; y < this.height; y++) {
                this.ctx.moveTo(0, y * CELL_SIZE);
                this.ctx.lineTo(this.width * CELL_SIZE, y * CELL_SIZE);
            }
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }

    hideBorders() {

    }
}