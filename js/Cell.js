class Cell {
    constructor(x, y, element, parent) {
        this.x = x;
        this.y = y;
        this.element = element;
        this.parent = parent;
        this.isAlive = false;
    }
    checkNeighbour() {
        var nAlive = 0;
        // Check clockwise from North
        if (this.y > 0) {
            if (this.parent[this.x][this.y - 1].isAlive) {
                nAlive++;
            }
            if (this.x < this.parent[0].length-1) {
                if (this.parent[this.x + 1][this.y - 1].isAlive) {
                    nAlive++;
                }
            }
        }
        if (this.x < this.parent[0].length-1) {
            if (this.parent[this.x + 1][this.y].isAlive) {
                nAlive++;
            }
            if (this.y < this.parent.length-1) {
                if (this.parent[this.x + 1][this.y + 1].isAlive) {
                    nAlive++;
                }
            }
        }
        if (this.y < this.parent.length-1) {
            if (this.parent[this.x][this.y + 1].isAlive) {
                nAlive++;
            }
            if (this.x > 0) {
                if (this.parent[this.x - 1][this.y + 1].isAlive) {
                    nAlive++;
                }
            }
        }
        if (this.x > 0) {
            if (this.parent[this.x - 1][this.y].isAlive) {
                nAlive++;
            }
            if (this.y > 0) {
                if (this.parent[this.x - 1][this.y - 1].isAlive) {
                    nAlive++;
                }
            }
        }
        return nAlive;
    }
}