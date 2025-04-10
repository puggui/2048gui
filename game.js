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
  terminal: false
});

// start game
let board = new Board([
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 1, 1, 1],
  [1, 3, 2, 2],
]);


// no looop
// GUI TURN 1:
initGame(board.tiles)
printBoard(board.tiles);

const gameLoop = async () => {
  if (!hasLegalMoves(board)) {
    rl.write("\ngameover")
    rl.close();
    return;
  }
  // ENGINE RES 1:
  const engineResponse = await rl.question("engine response: ");
  const direction = parseEngineResponse(engineResponse);
  
  // GUI TURN 2:
  const moved = slideTiles(direction, board);
  if (moved) {
    addRandomTile(board.tiles);
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