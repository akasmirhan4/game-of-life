// INITIALISER
const FPS = 1;

const WIDTH = 300;
const HEIGHT = 300;

var world = new World(WIDTH, HEIGHT); 

document.getElementById('step-forward').addEventListener('click',function(e){
    world.update();
});