let levelNo = 1;
let tutorialContent = `<div class="level-name">It's Alive!</div>
<p>
  The Game of Life is not necessarily a game, but more of a simulation. The idea is whatever pattern of cells that was initialised, it will go through <i>generations</i> of update. In the right side of the screen we have the grid or the universe. Each frame of the grid, represent each generation. You can click each cell to toggle it between alive (White) or dead state (Black). Try it out!
</p>
<h3>Rules:</h3>
<ol>
  <li>Any live cell with two or three live neighbours survives.</li>
  <li>
    Any dead cell with three live neighbours becomes a live cell.
  </li>
  <li>
    All other live cells die in the next generation. Similarly, all
    other dead cells stay dead.
  </li>
</ol>`;
let instructionContent = `<ol><li>Click the purple cell and click <i>Run</i> to continue</li></ol>`;
let CellDx = 5;
let CellDy = 5;
let pattern = [[1]];
grid.pattern.dx = CellDx;
grid.pattern.dy = CellDy;
grid.pattern.patternCells = pattern;

$('#level-no').text(levelNo);
$('.tutorial.content').html(tutorialContent);
$('.instruction.content').html(instructionContent);

// CHECK PROCEED
$("#run").click(function () {
  if(grid.checkPatternFilled()){
    grid.pattern = { dx: null, dy: null, patternCells: [] };
    let lvl = localStorage.level;
    lvl++;
    localStorage.level = lvl;
    window.setTimeout(function () { location.reload(true) }, 5000);
  }
})