

//SET DIMENSIONS
const GRID_MAX_SIZE = 1000;
const GRID_MIN_SIZE = 5;

document.getElementById('width').setAttribute('max',GRID_MAX_SIZE);
document.getElementById('height').setAttribute('max',GRID_MAX_SIZE);
document.getElementById('width').setAttribute('min',GRID_MIN_SIZE);
document.getElementById('height').setAttribute('min',GRID_MIN_SIZE);

var width = parseInt(document.getElementById('width').value);
var height = parseInt(document.getElementById('height').value);

// INITIALISE GRID
var grid = new Grid(width, height);

// UPDATE FUNCTION
var nGeneration = 0;
function update() {
    nGeneration++;
    document.getElementById('generation-counter').innerText = nGeneration;
    grid.stepForward();
    grid.displayUpdate();
};

// UPDATE FUNCTION CALLED IN PLAY. REFER TO eventListener.js