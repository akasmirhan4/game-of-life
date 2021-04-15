let hoverObject = null;
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

document.getElementById('pointer').classList.add('active');

function overlayBlueprint(x, y) {

    // RESET BLUEPRINTS GRAPHICALLY
    if (document.querySelectorAll('.blueprint').length) {
        document.querySelectorAll('.blueprint').forEach((element) => element.classList.remove('blueprint'));
    }
    if (document.querySelectorAll('.blueprint-empty').length) {
        document.querySelectorAll('.blueprint-empty').forEach((element) => element.classList.remove('blueprint-empty'));
    }

    if (hoverObject) {
        switch (hoverObject) {
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
        }

        const dimensions = [blueprint[0].length, blueprint.length];
        for (var by = 0; by < dimensions[1]; by++) {
            for (var bx = 0; bx < dimensions[0]; bx++) {

                if (anchorPosition == 0) {
                    let blueprintState = blueprint[by][bx] == 1 ? true : false;
                    let element = document.querySelector(`.cells[x='${x + bx}'][y='${y + by}']`);
                    if (element) {
                        if (blueprintState) {
                            element.classList.add('blueprint');
                        }
                        else {
                            element.classList.add('blueprint-empty');
                        }
                    }
                }

            }
        }
    }
}


function getBlueprint() {
    document.getElementById('pointer').onclick = function () {
        // BLOCK
        hoverObject = null;
        document.getElementById('pointer').classList.add('active');
    };

    /* ------- STILL LIFES -------- */
    document.getElementById('block').onclick = function () {
        // BLOCK
        hoverObject = this.id;
        document.getElementById('pointer').classList.remove('active');
    };
    document.getElementById('bee-hive').onclick = function () {
        // BEE-HIVE
        hoverObject = this.id;
        document.getElementById('pointer').classList.remove('active');
    };
    document.getElementById('loaf').onclick = function () {
        // LOAF
        hoverObject = this.id;
        document.getElementById('pointer').classList.remove('active');
    };
    document.getElementById('boat').onclick = function () {
        // BOAT
        hoverObject = this.id;
        document.getElementById('pointer').classList.remove('active');
    };
    document.getElementById('tub').onclick = function () {
        // TUB
        hoverObject = this.id;
        document.getElementById('pointer').classList.remove('active');
    };

    /* ------- OSCILLATORS -------- */
    document.getElementById('blinker').onclick = function () {
        // BLINKER
        hoverObject = this.id;
        document.getElementById('pointer').classList.remove('active');
    };
    document.getElementById('toad').onclick = function () {
        // TOAD
        hoverObject = this.id;
        document.getElementById('pointer').classList.remove('active');
    };
    document.getElementById('beacon').onclick = function () {
        // BEACON
        hoverObject = this.id;
        document.getElementById('pointer').classList.remove('active');
    };
    document.getElementById('pulsar').onclick = function () {
        // PULSAR
        hoverObject = this.id;
        document.getElementById('pointer').classList.remove('active');
    };
    document.getElementById('penta-decathlon').onclick = function () {
        // PENTA-DECATHLON
        hoverObject = this.id;
        document.getElementById('pointer').classList.remove('active');
    };

    /* ------- SPACESHIPS -------- */
    document.getElementById('glider').onclick = function () {
        // GLIDER
        hoverObject = this.id;
        document.getElementById('pointer').classList.remove('active');
    };
    document.getElementById('lightweight').onclick = function () {
        // LIGHTWEIGHT
        hoverObject = this.id;
        document.getElementById('pointer').classList.remove('active');
    };
    document.getElementById('middleweight').onclick = function () {
        // MIDDLEWEIGHT
        hoverObject = this.id;
        document.getElementById('pointer').classList.remove('active');
    };
    document.getElementById('heavyweight').onclick = function () {
        // HEAVYWEIGHT
        hoverObject = this.id;
        document.getElementById('pointer').classList.remove('active');
    };
};

function placeBlueprint(x, y) {
    const dimensions = [blueprint[0].length, blueprint.length];
    for (var by = 0; by < dimensions[1]; by++) {
        for (var bx = 0; bx < dimensions[0]; bx++) {

            if (anchorPosition == 0) {
                let blueprintState = blueprint[by][bx] == 1 ? true : false;
                let element = document.querySelector(`.cells[x='${x + bx}'][y='${y + by}']`);
                if (element) {
                    if (blueprintState) {
                        element.classList.remove('blueprint');
                        element.setAttribute('isAlive', '');
                        world.setState(x + bx, y + by, true);
                    }
                    else {
                        element.classList.remove('blueprint-empty');
                        element.removeAttribute('isAlive');
                        world.setState(x + bx, y + by, false);
                    }
                }
            }
        }
    }

    hoverObject = null;
    document.getElementById('pointer').classList.add('active');
}