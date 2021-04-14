function toggleAlive(e) {
    let x = parseInt(e.currentTarget.getAttribute('x'));
    let y = parseInt(e.currentTarget.parentElement.getAttribute('y'));
    world.cells[x][y];
    this.toggleAttribute('isAlive');
}


class World {
    constructor(width, height) {
        this.WIDTH = width;
        this.HEIGHT = height;
        this.cells = [...new Array(width)].map(() => new Array(height));
        this.element = document.getElementById("world");

        // RESET WORLD
        this.element.innerHTML = "";

        for (var y = 0; y < this.HEIGHT; y++) {

            // ADD ROW
            let rowElement = document.createElement("div");
            rowElement.classList.add('row');
            rowElement.setAttribute('y', y);
            this.element.append(rowElement);

            for (var x = 0; x < this.WIDTH; x++) {

                // ADD CELL
                let cellElement = document.createElement("div");
                cellElement.classList.add('cells');
                cellElement.setAttribute('x', x);
                cellElement.addEventListener('click', toggleAlive);
                rowElement.append(cellElement);

                var cell = new Cell(x, y, cellElement, this.cells);
                this.cells[x][y] = cell;
            }
        }


        for (var y = 0; y < this.HEIGHT; y++) {
            for (var x = 0; x < this.WIDTH; x++) {

            }
        }
    }
    update() {
        // Set all cell isAlive to false
        for (var y = 0; y < this.HEIGHT; y++) {
            for (var x = 0; x < this.WIDTH; x++) {
                this.cells[x][y].isAlive = false;
            }
        }
        // Set isAlive to true depends on the current graphic state
        let aliveCells = document.querySelectorAll('.cells[isAlive]');
        for (var i = 0; i < aliveCells.length; i++) {
            let x = aliveCells[i].getAttribute('x');
            let y = aliveCells[i].parentElement.getAttribute('y');
            this.cells[x][y].isAlive = true;
        }

        // Map the next step change to a temp variable
        let tempIsAlive = [...new Array(this.WIDTH)].map(() => new Array(this.HEIGHT));
        for (var y = 0; y < this.HEIGHT; y++) {
            for (var x = 0; x < this.WIDTH; x++) {
                let nAlive = this.cells[x][y].checkNeighbour();
                let isAlive = this.cells[x][y].isAlive;
                tempIsAlive[x][y] = isAlive;

                if (isAlive) {
                    if (!(nAlive == 2 || nAlive == 3)) {
                        tempIsAlive[x][y] = false;
                    }
                }
                else {
                    if (nAlive == 3) {
                        tempIsAlive[x][y] = true;
                    }
                }
            }
        }

        // Update in one go
        for (var y = 0; y < this.HEIGHT; y++) {
            for (var x = 0; x < this.WIDTH; x++) {
                let element = document.querySelector(`.row[y='${y}'] .cells[x='${x}']`);
                if (tempIsAlive[x][y]) {
                    element.setAttribute('isAlive', '');
                }
                else {
                    element.removeAttribute('isAlive');
                }
            }
        }
    }
}