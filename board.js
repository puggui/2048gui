const MOVE_TABLE = require("./lut");

class Board {
  constructor(tiles) {
    this.tiles = tiles; // 4x4 array
  }

  static from(tiles) {
    return new Board(JSON.parse(JSON.stringify(tiles))); // Deep copy
  }

  moveRight() {
    let legal = false;
    for (let x = 0; x < 4; x++) {
      let v = 0;
      for (let y = 0; y < 4; y++) {
        v = v * 32 + this.tiles[x][y];
      }
      let c = MOVE_TABLE[v];
      if (c === v) continue;
      legal = true;
      for (let y = 3; y >= 0; y--) {
        this.tiles[x][y] = c % 32;
        c = Math.floor(c / 32);
      }
    }
    return legal;
  }

  moveLeft() {
    let legal = false;
    for (let x = 0; x < 4; x++) {
      let v = 0;
      for (let y = 3; y >= 0; y--) {
        v = v * 32 + this.tiles[x][y];
      }
      let c = MOVE_TABLE[v];
      if (c === v) continue;
      legal = true;
      for (let y = 0; y < 4; y++) {
        this.tiles[x][y] = c % 32;
        c = Math.floor(c / 32);
      }
    }
    return legal;
  }

  moveDown() {
    let legal = false;
    for (let y = 0; y < 4; y++) {
      let v = 0;
      for (let x = 0; x < 4; x++) {
        v = v * 32 + this.tiles[x][y];
      }
      let c = MOVE_TABLE[v];
      if (c === v) continue;
      legal = true;
      for (let x = 3; x >= 0; x--) {
        this.tiles[x][y] = c % 32;
        c = Math.floor(c / 32);
      }
    }
    return legal;
  }

  moveUp() {
    let legal = false;
    for (let y = 0; y < 4; y++) {
      let v = 0;
      for (let x = 3; x >= 0; x--) {
        v = v * 32 + this.tiles[x][y];
      }
      let c = MOVE_TABLE[v];
      if (c === v) continue;
      legal = true;
      for (let x = 0; x < 4; x++) {
        this.tiles[x][y] = c % 32;
        c = Math.floor(c / 32);
      }
    }
    return legal;
  }
}

module.exports = Board

// === TEST ===
function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function testMoves() {
  const start = new Board([
    [0, 0, 0, 1],
    [0, 2, 0, 2],
    [2, 2, 2, 2],
    [3, 1, 1, 1],
  ]);

  start.printBoard()

  const movedLeft = new Board([
    [1, 0, 0, 0],
    [3, 0, 0, 0],
    [3, 3, 0, 0],
    [3, 2, 1, 0],
  ]);

  const movedRight = new Board([
    [0, 0, 0, 1],
    [0, 0, 0, 3],
    [0, 0, 3, 3],
    [0, 3, 1, 2],
  ]);

  const movedUp = new Board([
    [2, 3, 2, 1],
    [3, 1, 1, 3],
    [0, 0, 0, 1],
    [0, 0, 0, 0],
  ]);

  const movedDown = new Board([
    [0, 0, 0, 0],
    [0, 0, 0, 1],
    [2, 3, 2, 3],
    [3, 1, 1, 1],
  ]);

  const a = Board.from(start.tiles);
  const b = Board.from(start.tiles);
  const c = Board.from(start.tiles);
  const d = Board.from(start.tiles);

  console.assert(a.moveLeft() && deepEqual(a.tiles, movedLeft.tiles), 'Move Left Failed');
  a.printBoard()
  console.assert(b.moveRight() && deepEqual(b.tiles, movedRight.tiles), 'Move Right Failed');
  b.printBoard()
  console.assert(c.moveUp() && deepEqual(c.tiles, movedUp.tiles), 'Move Up Failed');
  c.printBoard()
  console.assert(d.moveDown() && deepEqual(d.tiles, movedDown.tiles), 'Move Down Failed');
  d.printBoard()

  console.log("All move tests passed!");
}

// testMoves();
