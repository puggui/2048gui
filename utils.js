const readline = require("node:readline");
const Board = require("./board");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const hexNumtoStr = (hexNum) => {
  const dict = {
    0xa: "a",
    0xb: "b",
    0xc: "c",
    0xd: "d",
    0xe: "e",
    0xf: "f",
  }
  return dict[hexNum] || `${hexNum}`
}

const setPosition = (positionString, tiles) => {
  const rows = positionString.split("/")
  for (let i=0; i<rows.length; i++) {
    rows[i] = rows[i].split("");
  }
  for (let i=0; i<tiles.length; i++) {
    for (let j=0; j<tiles[i].length; j++) {
      tiles[i][j] = parseInt(rows[i][j], 16)
    }
  }
  rl.write(`\nposition ${positionString}`)
}

const getRandomEmptyTile = (tiles) => {
  const emptyTilePosition = []
  const flatTiles = tiles.flat();
  for (let i=0; i<flatTiles.length; i++) {
    if (flatTiles[i] == 0) emptyTilePosition.push(hexNumtoStr(i))
  }
  return emptyTilePosition[Math.floor(Math.random()*emptyTilePosition.length)];
}

const addRandomTile = (tiles) => {
  const squarePosition = getRandomEmptyTile(tiles);
  // spawn tile2 90% of the time, spawn tile 4 10% of the time
  const tileValue = Math.random() < 0.9 ? 1 : 2;
  const dec = parseInt(squarePosition, 16)
  const row = Math.floor(dec/4);
  const col = dec%4
  tiles[row][col] = tileValue
  rl.write(`\nadd ${squarePosition} ${tileValue}`)
}

const initGame = (tiles) => {
  rl.write("newgame")
  setPosition("0000/0000/0000/0000", tiles)
  addRandomTile(tiles);
  addRandomTile(tiles);
}

const printBoard = (tiles) => {
  let flatTiles = tiles.flat();
  for (let i=0; i<flatTiles.length; i++) {
    if (flatTiles[i] == 0) flatTiles[i] = " ";
    if (flatTiles[i] > 0x9) flatTiles[i] = hexNumtoStr(flatTiles[i])
  }
  const [t0, t1, t2, t3, t4, t5, t6, t7, t8, t9, ta, tb, tc, td, te, tf] = flatTiles;

  console.log(`
    ┌───┬───┬───┬───┐
    │ ${t0} │ ${t1} │ ${t2} │ ${t3} │
    ├───┼───┼───┼───┤
    │ ${t4} │ ${t5} │ ${t6} │ ${t7} │
    ├───┼───┼───┼───┤
    │ ${t8} │ ${t9} │ ${ta} │ ${tb} │
    ├───┼───┼───┼───┤
    │ ${tc} │ ${td} │ ${te} │ ${tf} │
    └───┴───┴───┴───┘
    `
  )
}

const parseEngineResponse = (msg) => {
  const [drop, direction] = msg.trim().split(" ");
  return {drop, direction};
}

const slideTiles = (direction, board) => {
  switch(direction) {
    case "u":
      moved = board.moveUp();
      break;
    case "d":
      moved = board.moveDown();
      break;
    case "l":
      moved = board.moveLeft();
      break;
    case "r":
      moved = board.moveRight();
      break;
    default:
      rl.write("\nerror: invalid direction")
      return false;
  }
  return moved;
}

const hasLegalMoves = (board) => {
  const copy = Board.from(board.tiles);
  return copy.moveUp() || copy.moveDown() || copy.moveLeft() || copy.moveRight();
}

const engineMove = (time) => {
  rl.write(`\ngo time ${time}`)
}

module.exports = {
  hexNumtoStr,
  setPosition,
  getRandomEmptyTile,
  addRandomTile,
  initGame,
  printBoard,
  parseEngineResponse,
  slideTiles,
  hasLegalMoves,
  engineMove
};