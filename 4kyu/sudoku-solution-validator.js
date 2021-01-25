
const {Test} = require('../test-framework')

// This tests whether every row, column and block sums to 45
function validSolution(board){
  // Check rows
  for (let i = 0; i < 9; i++) {
    if (board[i].reduce((a, n) => a + n) !== 45) return false
  }
  
  // Check columns
  for (let i = 0; i < 9; i++) {
    const col = board.map(row => row[i])
    if (col.reduce((a, n) => a + n) !== 45) return false
  }
  
  // Check blocks (TODO: this is clunky, fix it)
  const b = board.reduce((acc, c) => acc.concat(c));
  let flag45 = true;
  [0, 3, 6, 27, 30, 33, 54, 57, 60].forEach(i => {
    if (b[i] + b[i+1] + b[i+2] + b[i+9] + b[i+10] + b[i+11] + b[i+18] + b[i+19] + b[i+20] !== 45) {
      flag45 = false
      return
    }
  })
  if (!flag45) return false
  
  return true
}

Test.assertEquals(validSolution([
  [5, 3, 4, 6, 7, 8, 9, 1, 2], 
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]]), true);
  
Test.assertEquals(validSolution([[5, 3, 4, 6, 7, 8, 9, 1, 2], 
   [6, 7, 2, 1, 9, 0, 3, 4, 8],
   [1, 0, 0, 3, 4, 2, 5, 6, 0],
   [8, 5, 9, 7, 6, 1, 0, 2, 0],
   [4, 2, 6, 8, 5, 3, 7, 9, 1],
   [7, 1, 3, 9, 2, 4, 8, 5, 6],
   [9, 0, 1, 5, 3, 7, 2, 1, 4],
   [2, 8, 7, 4, 1, 9, 6, 3, 5],
   [3, 0, 0, 4, 8, 1, 1, 7, 9]]), false);