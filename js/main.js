let width= 40;
let height= 20;

// INITIALISE GRID
var grid = new Grid($("#grid")[0],width, height);

// UPDATE FUNCTION
var nGeneration = 0;
function update() {
    nGeneration++;
    // $('#generation-counter').innerText = nGeneration;
    grid.stepForward();
    grid.displayUpdate();
};

// UPDATE FUNCTION CALLED IN PLAY. REFER TO eventListener.js