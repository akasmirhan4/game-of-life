class World {
    constructor(width, height) {
        this.WIDTH = width;
        this.HEIGHT = height;
        this.cells = [...new Array(width)].map(() => new Array(height));

        for (var y = 0; y < this.HEIGHT; y++) {
            for (var x = 0; x < this.WIDTH; x++) {
                var cell = new Cell(x,y,this.cells);
                this.cells[x][y] = cell;
            }
        }

        this.init_display();
    }
    update(){
        var cellsCopy = this.cells.slice(0);
        for (var y = 0; y < this.HEIGHT; y++) {
            for (var x = 0; x < this.WIDTH; x++) {
                let nAlive = cellsCopy[x][y].checkNeighbour();
                let isAlive = cellsCopy.isAlive;

                if(isAlive){
                    if(!(nAlive == 2 || nAlive == 3)){
                        this.cells[x][y].isAlive = false;
                        document.querySelector(`.row[y='${y}'] .cells[x='${x}']`).toggleAttribute('isAlive');
                    }
                }
                else{
                    if(nAlive == 3){
                        this.cells[x][y].isAlive = true;
                        document.querySelector(`.row[y='${y}'] .cells[x='${x}']`).toggleAttribute('isAlive');
                    }
                }
            }
        }
    }
    init_display(){
        let worldElement = document.getElementById("world");
        for (var y = 0; y < this.HEIGHT; y++) {
            let rowElement = document.createElement("div");
            rowElement.classList.add('row');
            rowElement.setAttribute('y',y);
            worldElement.append(rowElement);
            for (var x = 0; x < this.WIDTH; x++) {
                let cellElement = document.createElement("div");
                cellElement.classList.add('cells');
                cellElement.setAttribute('x',x);
                cellElement.addEventListener('click',function(e){
                    this.toggleAttribute('isAlive');
                })
                rowElement.append(cellElement);
            }
        }

    }
}