let levelNo = 2;
let tutorialContent = `<div class="level-name">Wait did something happened?...</div>
<p>
  The pattern created is considered stable and can survive for an infinite generations (unless it is being disturbed by external cells). This pattern is called <i>Still life</i> because well... it is still graphically. 
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
let instructionContent = `<ol><li>Let's create a stable generation. Make the purple cells alive and click <i>Run</i> to continue</li></ol>`;
let CellDx = 5;
let CellDy = 5;
let pattern = [
  [1, 1],
  [1, 1]
];
grid.pattern.dx = CellDx;
grid.pattern.dy = CellDy;
grid.pattern.patternCells = pattern;

$('#level-no').text(levelNo);
$('.tutorial.content').html(tutorialContent);
$('.instruction.content').html(instructionContent);

// CHECK PROCEED
$("#run").click(function () {
  if (grid.checkPatternFilled()) {
    grid.pattern = { dx: null, dy: null, patternCells: [] };
    let lvl = localStorage.level;
    lvl++;
    localStorage.level = lvl;
    window.setTimeout(function () { location.reload(true) }, 5000);
  }
})