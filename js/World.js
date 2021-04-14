class World {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.cells = new Array(width * height);
        this.element = document.getElementById("world");

        this.initialise();
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
        this.cells[this.getIndex(x, y)] = !this.cells[this.getIndex(x, y)];
    }

    getNeighboursState(x, y) {
        var nAlive = 0;
        // Check clockwise from North
        if (y > 0) {

            if (this.getState(x, y - 1)) {
                nAlive++;
            }
            if (x < this.width - 1) {
                if (this.getState(x + 1, y - 1)) {
                    nAlive++;
                }
            }
        }
        if (x < this.width - 1) {
            if (this.getState(x + 1, y)) {
                nAlive++;
            }
            if (y < this.height - 1) {
                if (this.getState(x + 1, y + 1)) {
                    nAlive++;
                }
            }
        }
        if (y < this.height - 1) {
            if (this.getState(x, y + 1)) {
                nAlive++;
            }
            if (x > 0) {
                if (this.getState(x - 1, y + 1)) {
                    nAlive++;
                }
            }
        }
        if (x > 0) {
            if (this.getState(x - 1, y)) {
                nAlive++;
            }
            if (y > 0) {
                if (this.getState(x - 1, y - 1)) {
                    nAlive++;
                }
            }
        }
        return nAlive;
    }

    initialise() {
        // RESET WORLD
        this.element.innerHTML = "";
        this.cells.fill(false);
        for (var y = 0; y < this.height; y++) {
            // ADD ROW
            let rowElement = document.createElement("div");
            rowElement.classList.add('row');
            rowElement.setAttribute('y', y);
            this.element.append(rowElement);

            for (var x = 0; x < this.width; x++) {
                // ADD CELL
                let cellElement = document.createElement("div");
                cellElement.classList.add('cells');
                cellElement.setAttribute('x', x);
                cellElement.setAttribute('y', y);
                cellElement.addEventListener('click', function () {
                    let x = parseInt(this.getAttribute('x'));
                    let y = parseInt(this.getAttribute('y'));
                    world.toggleState(x, y);
                    this.toggleAttribute('isAlive');
                });
                rowElement.append(cellElement);
            }
        }
    }
    update() {
        // Map the next step change to a temp variable
        let tempState = this.cells.slice(0);

        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                let nAlive = this.getNeighboursState(x, y);
                let isAlive = this.getState(x, y);
                let index = this.getIndex(x, y);
                tempState[index] = isAlive;

                if (isAlive) {
                    if (!(nAlive == 2 || nAlive == 3)) {
                        tempState[index] = false;
                    }
                }
                else {
                    if (nAlive == 3) {
                        tempState[index] = true;
                    }
                }
            }
        }
        // Update in one go
        this.cells = tempState;
    }

    display() {
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                let element = document.querySelector(`.cells[x='${x}'][y='${y}']`);
                if (this.getState(x,y)) {
                    element.setAttribute('isAlive', '');
                }
                else {
                    element.removeAttribute('isAlive');
                }
            }
        }
    }
}