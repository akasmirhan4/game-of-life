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

function getLevel(){
    if(!localStorage.level){
        localStorage.level = 0;
    }
    
    $.getScript( `js/lvl/${localStorage.level}.js` )
    .done(function( script, textStatus ) {
    //   console.log( textStatus );
    })
    .fail(function( jqxhr, settings, exception ) {
      console.log( "Triggered ajaxError handler." );
    });
}




// UPDATE FUNCTION CALLED IN PLAY. REFER TO eventListener.js