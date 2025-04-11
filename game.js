import readline from "node:readline/promises";
import Board from "./board.js";
import {
  addRandomTile,
  printBoard,
  initGame,
  parseEngineResponse,
  slideTiles,
  hasLegalMoves,
  engineMove
} from "./utils.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

// start game
let board = new Board([
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 1, 1, 1],
  [1, 3, 2, 2],
]);


// init game
initGame(board.tiles)
printBoard(board.tiles);
// console.log({hasLegalMove: hasLegalMoves(board)})

const gameLoop = async () => {
  if (!hasLegalMoves(board)) {
    rl.write("\ngameover")
    rl.close();
    return;
  }
  // ENGINE TURN
  const engineResponse = await rl.question("\nengine response: ");

  const res = parseEngineResponse(engineResponse);
  console.log(res)
  
  // GUI TURN 
  const moved = slideTiles(res.direction, board);
  // console.log({moved})
  if (moved) {
    addRandomTile(board.tiles);
    // console.log({hasLegalMove: hasLegalMoves(board)})
    if (hasLegalMoves(board)) {
      engineMove(5000)
      printBoard(board.tiles)
      gameLoop();
    } else {
      rl.write("\ngameover");
      rl.close();
      return;
    }
  } else {
    gameLoop();
  }
}

gameLoop();