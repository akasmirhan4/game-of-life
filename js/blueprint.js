let blueprint = null;
var anchorPosition = 0;

/* TODO: ANCHOR POSITION

0 - top left
1 - top
2 - top right
3 - left
4 - middle
5 - right
6 - bottom left
7 - bottom 
8 - bottom right

*/

let currentTool = 'default';
document.getElementById('pointer').classList.add('active');

function clearBlueprint() {
    for (let i = 0; i < grid.blueprintCells.length; i++) {
        let x = grid.blueprintCells[i].x;
        let y = grid.blueprintCells[i].y;
        if (grid.getState(x, y)) {
            grid.drawCell(x, y, CELL_ALIVE_COLOR);
        } else {
            grid.drawCell(x, y, CELL_DEAD_COLOR);
        }

    }
    grid.blueprintCells = [];
}

function overlayBlueprint(x, y) {
    clearBlueprint();
    if (currentTool != 'default' && currentTool != 'grab') {
        switch (currentTool) {
            // STILL LIFES
            case "block":
                blueprint = [
                    [1, 1],
                    [1, 1]
                ];
                break;
            case "bee-hive":
                blueprint = [
                    [0, 1, 1, 0],
                    [1, 0, 0, 1],
                    [0, 1, 1, 0]
                ];
                break;
            case "loaf":
                blueprint = [
                    [0, 1, 1, 0],
                    [1, 0, 0, 1],
                    [0, 1, 0, 1],
                    [0, 0, 1, 0]
                ];
                break;
            case "boat":
                blueprint = [
                    [1, 1, 0],
                    [1, 0, 1],
                    [0, 1, 0]
                ];
                break;
            case "tub":
                blueprint = [
                    [0, 1, 0],
                    [1, 0, 1],
                    [0, 1, 0]
                ];
                break;

            // OSCILLATORS
            case "blinker":
                blueprint = [
                    [1, 1, 1]
                ];
                break;
            case "toad":
                blueprint = [
                    [0, 1, 1, 1],
                    [1, 1, 1, 0]
                ];
                break;
            case "beacon":
                blueprint = [
                    [1, 1, 0, 0],
                    [1, 1, 0, 0],
                    [0, 0, 1, 1],
                    [0, 0, 1, 1]
                ];
                break;
            case "pulsar":
                blueprint = [
                    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
                    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
                    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
                    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
                    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
                    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
                    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0]
                ];
                break;
            case "penta-decathlon":
                blueprint = [
                    [0, 1, 0],
                    [0, 1, 0],
                    [1, 0, 1],
                    [0, 1, 0],
                    [0, 1, 0],
                    [0, 1, 0],
                    [0, 1, 0],
                    [1, 0, 1],
                    [0, 1, 0],
                    [0, 1, 0]
                ];
                break;

            // SPACESHIPS
            case "glider":
                blueprint = [
                    [0, 0, 1],
                    [1, 0, 1],
                    [0, 1, 1],
                ];
                break;
            case "lightweight":
                blueprint = [
                    [0, 1, 1, 1, 1],
                    [1, 0, 0, 0, 1],
                    [0, 0, 0, 0, 1],
                    [1, 0, 0, 1, 0]
                ];
                break;
            case "middleweight":
                blueprint = [
                    [0, 1, 1, 1, 1, 1],
                    [1, 0, 0, 0, 0, 1],
                    [0, 0, 0, 0, 0, 1],
                    [1, 0, 0, 0, 1, 0],
                    [0, 0, 1, 0, 0, 0]
                ];
                break;
            case "heavyweight":
                blueprint = [
                    [0, 1, 1, 1, 1, 1, 1],
                    [1, 0, 0, 0, 0, 0, 1],
                    [0, 0, 0, 0, 0, 0, 1],
                    [1, 0, 0, 0, 0, 1, 0],
                    [0, 0, 1, 1, 0, 0, 0]
                ];
                break;
            case "gosper-glider-gun":
                blueprint = [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                ];
                break;
        }
    }

    const dimensions = [blueprint[0].length, blueprint.length];
    for (var by = 0; by < dimensions[1]; by++) {
        for (var bx = 0; bx < dimensions[0]; bx++) {
            if (anchorPosition == 0) {
                let blueprintState = blueprint[by][bx] == 1 ? true : false;
                grid.blueprintCells.push({ x: x + bx, y: y + by, isAlive: blueprintState });
                let fill = blueprintState ? CELL_HOVER_COLOR : CELL_DEAD_COLOR;
                grid.drawCell(x + bx, y + by, fill);
            }
        }
    }
}


function getBlueprint() {
    document.getElementById('pointer').onclick = function () {
        // BLOCK
        blueprint = [];
        currentTool = 'default';
        document.getElementById('world').style.cursor = currentTool;
        document.getElementById('pointer').classList.add('active');
        document.getElementById('hand').classList.remove('active');

    };

    document.getElementById('hand').onclick = function () {
        // BLOCK
        blueprint = [];
        currentTool = 'move';
        document.getElementById('world').style.cursor = currentTool;
        document.getElementById('pointer').classList.remove('active');
        document.getElementById('hand').classList.add('active');

    };
    /* ------- STILL LIFES -------- */
    document.getElementById('block').onclick = function () {
        // BLOCK
        currentTool = this.id;
        document.getElementById('pointer').classList.remove('active');
        document.getElementById('hand').classList.remove('active');
        document.getElementById('world').style.cursor = 'default';
    };
    document.getElementById('bee-hive').onclick = function () {
        // BEE-HIVE
        currentTool = this.id;
        document.getElementById('pointer').classList.remove('active');
        document.getElementById('hand').classList.remove('active');
        document.getElementById('world').style.cursor = 'default';
    };
    document.getElementById('loaf').onclick = function () {
        // LOAF
        currentTool = this.id;
        document.getElementById('pointer').classList.remove('active');
        document.getElementById('hand').classList.remove('active');
        document.getElementById('world').style.cursor = 'default';
    };
    document.getElementById('boat').onclick = function () {
        // BOAT
        currentTool = this.id;
        document.getElementById('pointer').classList.remove('active');
        document.getElementById('hand').classList.remove('active');
        document.getElementById('world').style.cursor = 'default';
    };
    document.getElementById('tub').onclick = function () {
        // TUB
        currentTool = this.id;
        document.getElementById('pointer').classList.remove('active');
        document.getElementById('hand').classList.remove('active');
        document.getElementById('world').style.cursor = 'default';
    };

    /* ------- OSCILLATORS -------- */
    document.getElementById('blinker').onclick = function () {
        // BLINKER
        currentTool = this.id;
        document.getElementById('pointer').classList.remove('active');
        document.getElementById('hand').classList.remove('active');
        document.getElementById('world').style.cursor = 'default';
    };
    document.getElementById('toad').onclick = function () {
        // TOAD
        currentTool = this.id;
        document.getElementById('pointer').classList.remove('active');
        document.getElementById('hand').classList.remove('active');
        document.getElementById('world').style.cursor = 'default';
    };
    document.getElementById('beacon').onclick = function () {
        // BEACON
        currentTool = this.id;
        document.getElementById('pointer').classList.remove('active');
        document.getElementById('hand').classList.remove('active');
        document.getElementById('world').style.cursor = 'default';
    };
    document.getElementById('pulsar').onclick = function () {
        // PULSAR
        currentTool = this.id;
        document.getElementById('pointer').classList.remove('active');
        document.getElementById('hand').classList.remove('active');
        document.getElementById('world').style.cursor = 'default';
    };
    document.getElementById('penta-decathlon').onclick = function () {
        // PENTA-DECATHLON
        currentTool = this.id;
        document.getElementById('pointer').classList.remove('active');
        document.getElementById('hand').classList.remove('active');
        document.getElementById('world').style.cursor = 'default';
    };

    /* ------- SPACESHIPS -------- */
    document.getElementById('glider').onclick = function () {
        // GLIDER
        currentTool = this.id;
        document.getElementById('pointer').classList.remove('active');
        document.getElementById('hand').classList.remove('active');
        document.getElementById('world').style.cursor = 'default';
    };
    document.getElementById('lightweight').onclick = function () {
        // LIGHTWEIGHT
        currentTool = this.id;
        document.getElementById('pointer').classList.remove('active');
        document.getElementById('hand').classList.remove('active');
        document.getElementById('world').style.cursor = 'default';
    };
    document.getElementById('middleweight').onclick = function () {
        // MIDDLEWEIGHT
        currentTool = this.id;
        document.getElementById('pointer').classList.remove('active');
        document.getElementById('hand').classList.remove('active');
        document.getElementById('world').style.cursor = 'default';
    };
    document.getElementById('heavyweight').onclick = function () {
        // HEAVYWEIGHT
        currentTool = this.id;
        document.getElementById('pointer').classList.remove('active');
        document.getElementById('hand').classList.remove('active');
        document.getElementById('world').style.cursor = 'default';
    };
    document.getElementById('gosper-glider-gun').onclick = function () {
        // HEAVYWEIGHT
        currentTool = this.id;
        document.getElementById('pointer').classList.remove('active');
        document.getElementById('hand').classList.remove('active');
        document.getElementById('world').style.cursor = 'default';
    };
};

function placeBlueprint(x, y) {
    const dimensions = [blueprint[0].length, blueprint.length];
    for (var by = 0; by < dimensions[1]; by++) {
        for (var bx = 0; bx < dimensions[0]; bx++) {
            if (anchorPosition == 0) {
                let blueprintState = blueprint[by][bx] == 1 ? true : false;
                let fill = blueprintState ? CELL_ALIVE_COLOR : CELL_DEAD_COLOR;
                grid.drawCell(x + bx, y + by, fill);
                grid.setState(x + bx, y + by, blueprintState);
                if (blueprintState) {
                    grid.aliveCells.push({ x: x + bx, y: y + by });
                }
                else {
                    grid.deadCells.push({ x: x + bx, y: y + by });
                }


            }
        }
    }
}
