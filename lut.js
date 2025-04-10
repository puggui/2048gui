const move_table = () => {
  const moves = new Array(1 << 20).fill(0); // 32^4 = 1,048,576 = 1 << 20

  for (let i = 0; i < (1 << 20); i++) {
    // Decode the 20-bit number into 4 tiles (each 5 bits)
    const line = [
      (i >> 0) & 0x1f,
      (i >> 5) & 0x1f,
      (i >> 10) & 0x1f,
      (i >> 15) & 0x1f,
    ];

    // Simulate move left logic
    let result = [0, 0, 0, 0];
    let idx = 0;

    for (let j = 0; j < 4; j++) {
      if (line[j] === 0) continue;

      if (result[idx] === 0) {
        result[idx] = line[j];
      } else if (result[idx] === line[j]) {
        result[idx] += 1; // Merge tiles
        idx++;
      } else {
        idx++;
        result[idx] = line[j];
      }
    }

    // Encode the result back into 20-bit format
    let code = 0;
    for (let j = 0; j < 4; j++) {
      code |= result[j] << (j * 5);
    }

    moves[i] = code;
  }
  return moves;
}

const MOVE_TABLE = move_table()
module.exports = MOVE_TABLE