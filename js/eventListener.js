
/* FLAGS */
let isPlayed = false;
let isGridMouseDown = false;
let mousePosition = { x: 0, y: 0 };
let lastMousePosition = { x: 0, y: 0 };
/* OTHERS */
let intervalFunction;
let lastCell = { x: 0, y: 0 };
let scrollPosition = { x: 0, y: 0 };
let movePosition = { x: 0, y: 0 };

function isInsideGrid(x, y) {
    return x >= grid.dx + grid.marginX &&
        x < grid.width * CELL_SIZE + grid.dx + grid.marginX &&
        y >= grid.dy + grid.marginY &&
        y < grid.height * CELL_SIZE + grid.dy + grid.marginY;
}

function moveGrid(e, element) {
    let rect = element.getBoundingClientRect();

    let d = {
        x: e.clientX - rect.x - lastMousePosition.x,
        y: e.clientY - rect.y - lastMousePosition.y
    };

    grid.displayClear();
    grid.updateOffset(scrollPosition.x + movePosition.x + d.x, scrollPosition.y + movePosition.y + d.y);
    grid.displayAll();
}

$(document).ready(function () {
    getLevel();
    $(window).resize(function () {
        grid.element.height = grid.element.parentElement.clientHeight;
        grid.element.width = grid.element.parentElement.clientWidth;
        grid.displayAll();
    });

    $('#run').click(function () {
        if (isPlayed) {
            isPlayed = false;
            this.innerText = "Run";
            this.classList.remove('active');
            clearInterval(intervalFunction);
        }
        else {
            let FPS = $('#speed').val();
            isPlayed = true;
            this.innerText = "Pause";
            this.classList.add('active');
            intervalFunction = setInterval(update, 1000 / FPS);
        }
    });


    $('#speed').change(function () {
        if (isPlayed) {
            let FPS = this.value;
            clearInterval(intervalFunction);
            intervalFunction = setInterval(update, 1000 / FPS);
        }
    });

    $(grid.element).keydown(function (e) {
        if (e.code == "Space") {
            currentTool = "moveTemp";
            $(grid.element).css('cursor', 'move');
        }
    });
    $(grid.element).keyup(function (e) {
        if (e.code == "Space") {
            currentTool = "default";
            $(grid.element).css('cursor',  'default');
            isGridMouseDown = false;
            movePosition.x = grid.dx - scrollPosition.x;
            movePosition.y = grid.dy - scrollPosition.y;
        }
    });
    $(grid.element).mousemove(function (e) {
        let rect = this.getBoundingClientRect();
        let currentPosition = {
            x: e.clientX - rect.x,
            y: e.clientY - rect.y
        };
        if (currentTool == 'move' || currentTool == 'moveTemp') {
            if (isGridMouseDown) {
                moveGrid(e, this);
            }
        }
        else {

            lastMousePosition.x = currentPosition.x;
            lastMousePosition.y = currentPosition.y;

            if (CELL_SIZE >= 5) {
                // INSIDE THE WORLD
                if (isInsideGrid(currentPosition.x, currentPosition.y)) {
                    let currentCell = {
                        x: Math.floor((currentPosition.x - grid.dx - grid.marginX) / CELL_SIZE),
                        y: Math.floor((currentPosition.y - grid.dy - grid.marginY) / CELL_SIZE)
                    };
                    if (currentCell.x == lastCell.x && currentCell.y == lastCell.y) {
                        // DO SOMETHING?
                    }
                    else {

                        lastCell.x = currentCell.x;
                        lastCell.y = currentCell.y;

                        switch (currentTool) {
                            case 'default':
                                // RESET PAST HOVERED CELL STATE
                                if (grid.hoveredCell.isAlive) {
                                    grid.drawCell(grid.hoveredCell.x, grid.hoveredCell.y);
                                } else {
                                    grid.drawCell(grid.hoveredCell.x, grid.hoveredCell.y, CELL_DEAD_COLOR);
                                }
                                grid.displayPattern();
                                // UPDATE NEW HOVERED CELL
                                grid.hoveredCell.x = currentCell.x;
                                grid.hoveredCell.y = currentCell.y;
                                grid.hoveredCell.isAlive = grid.getState(currentCell.x, currentCell.y);

                                grid.drawCell(currentCell.x, currentCell.y, CELL_HOVER_COLOR);
                                break;
                            case "block":
                            case "bee-hive":
                            case "loaf":
                            case "boat":
                            case "tub":
                            case "blinker":
                            case "toad":
                            case "beacon":
                            case "pulsar":
                            case "penta-decathlon":
                            case "glider":
                            case "lightweight":
                            case "middleweight":
                            case "heavyweight":
                            case "gosper-glider-gun":
                                overlayBlueprint(currentCell.x, currentCell.y);
                        }
                    }

                }
            }
        }
    });

    $(grid.element).mousedown(function (e) {
        let rect = this.getBoundingClientRect();
        let currentPosition = {
            x: e.clientX - rect.x,
            y: e.clientY - rect.y
        };
        lastMousePosition.x = currentPosition.x;
        lastMousePosition.y = currentPosition.y;
        // LEFT CLICK
        if (e.which == 1) {
            if (CELL_SIZE >= 5) {
                // INSIDE THE WORLD
                if (isInsideGrid(currentPosition.x, currentPosition.y)) {
                    let currentCell = {
                        x: Math.floor((currentPosition.x - grid.dx - grid.marginX) / CELL_SIZE),
                        y: Math.floor((currentPosition.y - grid.dy - grid.marginY) / CELL_SIZE)
                    };
                    switch (currentTool) {
                        case 'default':
                            grid.toggleState(currentCell.x, currentCell.y);
                            grid.hoveredCell.isAlive = grid.getState(currentCell.x, currentCell.y);
                            if (grid.getState(currentCell.x, currentCell.y)) {
                                grid.drawCell(currentCell.x, currentCell.y, CELL_ALIVE_COLOR);
                                grid.aliveCells.push({ x: currentCell.x, y: currentCell.y });
                            }
                            else {
                                grid.drawCell(currentCell.x, currentCell.y, CELL_DEAD_COLOR);
                                grid.deadCells.push({ x: currentCell.x, y: currentCell.y });
                            }
                            break;
                        case 'moveTemp':
                            isGridMouseDown = true;
                            break;
                        case "block":
                        case "bee-hive":
                        case "loaf":
                        case "boat":
                        case "tub":
                        case "blinker":
                        case "toad":
                        case "beacon":
                        case "pulsar":
                        case "penta-decathlon":
                        case "glider":
                        case "lightweight":
                        case "middleweight":
                        case "heavyweight":
                        case "gosper-glider-gun":
                            placeBlueprint(x, y);

                    }
                }
            }
        }
        // MIDDLE CLICK
        else if (e.which == 2) {
            currentTool = "moveTemp";
            $(grid.element).css('cursor', 'move');
            isGridMouseDown = true;
        }
        // RIGHT CLICK 
        else if (e.which == 3) {

        }

    });
    $(grid.element).mouseup(function (e) {
        if (currentTool == "moveTemp") {
            currentTool = 'default';
            isGridMouseDown = false;
            $(grid.element).css('cursor', 'default');
            movePosition.x = grid.dx - scrollPosition.x;
            movePosition.y = grid.dy - scrollPosition.y;
        }
    });
    $('#stop').click(function () {
        if (isPlayed) {
            isPlayed = false;
            $('#run')[0].innerText = "run";
            $('#run')[0].classList.remove('active');
            clearInterval(intervalFunction);
        }

        nGeneration = 0;
        // document.getElementById('generation-counter').innerText = nGeneration;

        // reset the world;
        grid.cells.fill(false);
        grid.aliveCells = [];
        grid.deadCells = [];
        grid.displayClear();

    });

    /* ZOOM STUFF */
    var handleScroll = function (element, e) {
        let rect = element.getBoundingClientRect();
        let currentPosition = {
            x: e.clientX - rect.x,
            y: e.clientY - rect.y
        };
        let scrollspeed = 2;
        // INSIDE THE WORLD
        if (isInsideGrid(currentPosition.x, currentPosition.y)) {
            let currentCell = {
                x: Math.floor((currentPosition.x - grid.dx - grid.marginX) / CELL_SIZE),
                y: Math.floor((currentPosition.y - grid.dy - grid.marginY) / CELL_SIZE)
            };
            var delta = e.originalEvent.wheelDelta ? e.originalEvent.wheelDelta / (120 / scrollspeed) : e.originalEvent.detail ? -e.originalEvent.detail : 0;
            if (delta) {
                grid.displayClear();
                let nextSize = CELL_SIZE + delta;
                let size = CELL_SIZE;
                if (nextSize < 1) {
                    nextSize = 1;
                }
                else if (nextSize > 100) {
                    nextSize = 100;
                }

                let dx = - nextSize * (0.5 + currentCell.x) + size * (0.5 + currentCell.x);
                let dy = - nextSize * (0.5 + currentCell.y) + size * (0.5 + currentCell.y);

                CELL_SIZE = nextSize;
                grid.updateOffset(grid.dx + dx, grid.dy + dy);
                scrollPosition.x = grid.dx;
                scrollPosition.y = grid.dy;
                movePosition.x = 0;
                movePosition.y = 0;
                grid.displayAll();

                // $('#zoom').val(CELL_SIZE);
            }
        };
    }
    $(grid.element).bind('mousewheel DOMMouseScroll', function (e) { handleScroll(this, e) });

});

// $(document).ready(function () {

//     // REFER TO blueprint.js
//     // getBlueprint();

//     $('#run').click(function () {
//         if (isPlayed) {
//             isPlayed = false;
//             this.children[0].classList.remove('fa-pause');
//             this.classList.remove('active');
//             this.children[0].classList.add('fa-play');
//             clearInterval(intervalFunction);
//         }
//         else {
//             let FPS = document.getElementById('speed').value;
//             isPlayed = true;
//             this.children[0].classList.add('fa-pause');
//             this.classList.add('active');
//             this.children[0].classList.remove('fa-play');
//             intervalFunction = setInterval(update, 1000 / FPS);
//         }
//     });
//     document.getElementById('step-forward').onclick = function () {
//         update();
//     };

//     document.getElementById('stop').onclick = function () {
//         if (isPlayed) {
//             isPlayed = false;
//             document.getElementById('play').classList.remove('active');
//             document.getElementById('play').children[0].classList.remove('fa-pause');
//             document.getElementById('play').children[0].classList.add('fa-play');
//             clearInterval(intervalFunction);
//         }

//         nGeneration = 0;
//         document.getElementById('generation-counter').innerText = nGeneration;

//         // reset the world;
//         grid.cells.fill(false);
//         grid.aliveCells = [];
//         grid.deadCells = [];
//         grid.displayClear();

//     };
//     document.getElementById('speed').onchange = function () {

//         if (isPlayed) {
//             let FPS = this.value;
//             clearInterval(intervalFunction);
//             intervalFunction = setInterval(update, 1000 / FPS);
//         }
//     };

//     /* ZOOM STUFF */
//     var handleScroll = function (e) {
//         let rect = this.getBoundingClientRect();
//         let x = e.clientX - rect.x;
//         let y = e.clientY - rect.y;

//         // INSIDE THE WORLD
//         if (isInsideGrid(x, y)) {
//             x = Math.floor((x - grid.dx - grid.marginX) / CELL_SIZE);
//             y = Math.floor((y - grid.dy - grid.marginY) / CELL_SIZE);

//             var delta = e.wheelDelta ? e.wheelDelta / 120 : e.detail ? -e.detail : 0;
//             if (delta) {
//                 grid.displayClear();
//                 let nextSize = CELL_SIZE + delta;
//                 let size = CELL_SIZE;
//                 if (nextSize < 1) {
//                     nextSize = 1;
//                 }
//                 else if (nextSize > 100) {
//                     nextSize = 100;
//                 }

//                 let dx = - nextSize * (0.5 + x) + size * (0.5 + x);
//                 let dy = - nextSize * (0.5 + y) + size * (0.5 + y);

//                 CELL_SIZE = nextSize;
//                 grid.updateOffset(grid.dx + dx, grid.dy + dy);
//                 scrollDx = grid.dx;
//                 scrollDy = grid.dy;
//                 grid.displayAll();

//                 document.getElementById('zoom').setAttribute('value', CELL_SIZE);
//             }
//         };
//     }

//     grid.element.addEventListener('DOMMouseScroll', handleScroll, false);
//     grid.element.addEventListener('mousewheel', handleScroll, false);

//     document.getElementById('zoom').onchange = function () {
//         grid.displayClear();
//         CELL_SIZE = parseInt(this.value);
//         grid.updateOffset();
//         grid.ctx.transform(1, 0, 0, 1, grid.dx, grid.dy);
//         grid.displayAll();
//     };
//     document.getElementById('world').onmouseup = function (e) {
//         if (isGridMouseDown) {
//             isGridMouseDown = false;
//             scrollDx = grid.dx;
//             scrollDy = grid.dy;
//         }
//     }
//     document.getElementById('world').onmousedown = function (e) {
//         if (currentTool == 'move') {
//             isGridMouseDown = true;
//             let rect = this.getBoundingClientRect();
//             let x = e.clientX - rect.x;
//             let y = e.clientY - rect.y;
//             lastMouseDownX = x;
//             lastMouseDownY = y;
//         }
//     }
//     document.getElementById('world').onclick = function (e) {
//         let rect = this.getBoundingClientRect();
//         let x = e.clientX - rect.x;
//         let y = e.clientY - rect.y;
//         if (CELL_SIZE >= 5) {

//             // INSIDE THE WORLD
//             if (isInsideGrid(x, y)) {

//                 x = Math.floor((x - grid.dx - grid.marginX) / CELL_SIZE);
//                 y = Math.floor((y - grid.dy - grid.marginY) / CELL_SIZE);

//                 switch (currentTool) {
//                     case 'default':
//                         grid.toggleState(x, y);
//                         grid.hoveredCell.isAlive = grid.getState(x, y);
//                         if (grid.getState(x, y)) {
//                             grid.drawCell(x, y, CELL_ALIVE_COLOR);
//                             grid.aliveCells.push({ x: x, y: y });
//                         }
//                         else {
//                             grid.drawCell(x, y, CELL_DEAD_COLOR);
//                             grid.deadCells.push({ x: x, y: y });
//                         }
//                         grid.hoveredCell = { x: null, y: null, isAlive: null };
//                         break;
//                     case "block":
//                     case "bee-hive":
//                     case "loaf":
//                     case "boat":
//                     case "tub":
//                     case "blinker":
//                     case "toad":
//                     case "beacon":
//                     case "pulsar":
//                     case "penta-decathlon":
//                     case "glider":
//                     case "lightweight":
//                     case "middleweight":
//                     case "heavyweight":
//                     case "gosper-glider-gun":
//                         placeBlueprint(x, y);

//                 }
//             }
//         }
//     }
//     document.getElementById('world').onmouseleave = function (e) {

//         clearBlueprint();
//         // RESET PAST HOVERED CELL STATE
//         if (grid.hoveredCell.isAlive) {
//             grid.drawCell(grid.hoveredCell.x, grid.hoveredCell.y);
//         } else {
//             grid.drawCell(grid.hoveredCell.x, grid.hoveredCell.y, CELL_DEAD_COLOR);
//         }
//     }
//     document.getElementById('world').onmousemove = function (e) {
//         let rect = this.getBoundingClientRect();
//         let x = e.clientX - rect.x;
//         let y = e.clientY - rect.y;
//         if (currentTool == 'move') {
//             if (isGridMouseDown) {
//                 let dx = x - lastMouseDownX;
//                 let dy = y - lastMouseDownY;
//                 grid.displayClear();
//                 grid.updateOffset(scrollDx + dx, scrollDy + dy);
//                 grid.displayAll();
//             }
//         }
//         else {
//             if (CELL_SIZE >= 5) {

//                 // INSIDE THE WORLD
//                 if (isInsideGrid(x, y)) {
//                     let currentCell.x = Math.floor((x - grid.dx - grid.marginX) / CELL_SIZE);
//                     let currentCell.y = Math.floor((y - grid.dy - grid.marginY) / CELL_SIZE);
//                     if (currentCell.x == lastCell.x && currentCell.y == lastCell.y) {
//                         // DO SOMETHING?
//                     }
//                     else {

//                         lastCell.x = currentCell.x;
//                         lastCell.y = currentCell.y;

//                         switch (currentTool) {
//                             case 'default':
//                                 // RESET PAST HOVERED CELL STATE
//                                 if (grid.hoveredCell.isAlive) {
//                                     grid.drawCell(grid.hoveredCell.x, grid.hoveredCell.y);
//                                 } else {
//                                     grid.drawCell(grid.hoveredCell.x, grid.hoveredCell.y, CELL_DEAD_COLOR);
//                                 }

//                                 // UPDATE NEW HOVERED CELL
//                                 grid.hoveredCell.x = currentCell.x;
//                                 grid.hoveredCell.y = currentCell.y;
//                                 grid.hoveredCell.isAlive = grid.getState(currentCell.x, currentCell.y);

//                                 grid.drawCell(currentCell.x, currentCell.y, CELL_HOVER_COLOR);
//                                 break;
//                             case "block":
//                             case "bee-hive":
//                             case "loaf":
//                             case "boat":
//                             case "tub":
//                             case "blinker":
//                             case "toad":
//                             case "beacon":
//                             case "pulsar":
//                             case "penta-decathlon":
//                             case "glider":
//                             case "lightweight":
//                             case "middleweight":
//                             case "heavyweight":
//                             case "gosper-glider-gun":
//                                 overlayBlueprint(currentCell.x, currentCell.y);
//                         }
//                     }

//                 }
//             }
//         }
//     }

//     document.getElementById('height').onchange = function () {
//         nGeneration = 0;
//         document.getElementById('generation-counter').innerText = nGeneration;

//         if (isPlayed) {
//             isPlayed = false;
//             document.getElementById('play').classList.remove('active');
//             document.getElementById('play').children[0].classList.remove('fa-pause');
//             document.getElementById('play').children[0].classList.add('fa-play');
//             clearInterval(intervalFunction);
//         }

//         let height = parseInt(this.value);

//         // CLAMP INPUT
//         if (height > GRID_MAX_SIZE) {
//             height = GRID_MAX_SIZE;
//             alert('Good luck loading this big, your computer would not like it...');
//         }
//         else if (height < GRID_MIN_SIZE) {
//             height = GRID_MIN_SIZE;
//             alert('Dont be shy, add more to be more interesting...');
//         }
//         this.value = height;
//         grid = new Grid(grid.width, height);

//     };

//     document.getElementById('width').onchange = function () {
//         nGeneration = 0;
//         document.getElementById('generation-counter').innerText = nGeneration;

//         if (isPlayed) {
//             isPlayed = false;
//             document.getElementById('play').classList.remove('active');
//             document.getElementById('play').children[0].classList.remove('fa-pause');
//             document.getElementById('play').children[0].classList.add('fa-play');
//             clearInterval(intervalFunction);
//         }

//         let width = parseInt(this.value);

//         // CLAMP INPUT
//         if (width > GRID_MAX_SIZE) {
//             width = GRID_MAX_SIZE;
//             alert('too big, your computer would not like it...');
//         }
//         else if (width < GRID_MIN_SIZE) {
//             width = GRID_MIN_SIZE;
//             alert('too small, the simulation would not be interesting...');
//         }
//         this.value = width;
//         grid = new Grid(width, grid.height);

//     };
//     document.getElementById('show-border').onclick = function () {
//         this.classList.toggle('active');
//         SHOW_GRID_BORDER = !SHOW_GRID_BORDER;
//         grid.displayAll();
//     }
//     window.addEventListener('resize', function (event) {
//         grid.element.height = grid.element.parentElement.clientHeight;
//         grid.element.width = grid.element.parentElement.clientWidth;
//         grid.displayAll();
//     });


// });