let levelNo = 0;
let tutorialContent = `<div class="level-name">Welcome to Conway's Game of Life!</div>
<p>
  The Game of Life, also known simply as Life, is a cellular automaton
  devised by the British mathematician John Horton Conway in 1970. It
  is a zero-player game, meaning that its evolution is determined by
  its initial state, requiring no further input. One interacts with
  the Game of Life by creating an initial configuration and observing
  how it evolves. It is Turing complete and can simulate a universal
  constructor or any other Turing machine.
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
let instructionContent = `<ol><li>Click <i>Run</i> to continue</li></ol>`;
$('#level-no').text(levelNo);
$('.tutorial.content').html(tutorialContent);
$('.instruction.content').html(instructionContent);

// CHECK PROCEED
$("#run").click(function(){
    let lvl = localStorage.level;
    lvl++;
    localStorage.level = lvl;

    window.setTimeout(function(){location.reload(true)},3000);
})  