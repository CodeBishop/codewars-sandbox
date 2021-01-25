/*
Brainstorming
  My theory for how to solve this is for every cell to have an array of 9 booleans denoting whether a given number is still possible in that cell.
  As each number is placed we would then call checkRow, checkColumn and checkSquare with that number and these functions would run through and toggle off that number as a possibility in each cell.

  Step #1 - Initial Marking
    Sweep through the puzzle matrix and for each non-zero call the three marking functions to set flags in the marks matrix.

  Step #2 - Decipher
    Sweep through the marks matrix to find cells with only one flag left true. When found, call the three marking functions and continue onward
    Repeat the deciphering sweep until a full sweep finds no zeroes (success) or makes no changes to the flags matrix but still has zero (meaning the algorithm is stuck).

Post-Solution Thoughts
  The solution worked. Every cell has an array of bools denoting whether a number is still possible for that cell and 6 sweeps was sufficient to solve the test puzzle.

Problems encountered
  The axis were reversed in one of the loops which caused illegal numbers to be accepted.
  The marker bool arrays were indexing off-by-one because cell numbers start from 9. I fixed this by just making the bool array size 10 and ignoring index 0.
*/

const {it, describe, Test} = require('../test-framework')

function sudoku(puzzle) {
  // Create 3D array (9x9x10) of flags marking whether a number is still possible in a given cell of the 9x9 board
  // NOTE: Marks index from 1 for consistency with the numbers in the cells. The first bool in a marks-entry gets ignored.
  const marks = Array(9).fill(9).map(() => Array(9).fill().map(() => Array(10).fill(true)))

  // Mark all the cells that can't contain a number because that number already exists in a row, column or block
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (puzzle[y][x] !== 0) {
        markRow(marks, y, puzzle[y][x])
        markColumn(marks, x, puzzle[y][x])
        markBlock(marks, x, y, puzzle[y][x])
      }
    }
  }

  let cellsRemaining, foundNum
  do {
    // Sweep through the marks looking for any cell that has been reduced to only one possible number
    cellsRemaining = 81
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        if (puzzle[y][x] !== 0) {
          cellsRemaining--
        } else {
          foundNum = 0
          for (let i = 1; i <= 9; i++) {
            if (marks[y][x][i]) {
              if (foundNum === 0) {
                foundNum = i
              } else {
                foundNum = 0
                break
              }
            }
          }
          if (foundNum !== 0) {
            puzzle[y][x] = foundNum
            markRow(marks, y, foundNum)
            markColumn(marks, x, foundNum)
            markBlock(marks, x, y, foundNum)
          }
        }
      }
    }
    console.log(`Empty cells remaining: ${cellsRemaining}`)
  } while (cellsRemaining > 0)

  return puzzle
}

// Marks the flags matrix for a given row and number
function markRow(marks, rowNum, num) {
  for (let x = 0; x < 9; x++) {
    marks[rowNum][x][num] = false
  }
}

// Marks the flag matrix for a given column and number
function markColumn(marks, colNum, num) {
  for (let y = 0; y < 9; y++) {
    marks[y][colNum][num] = false
  }
}

// Marks a given number in a 3x3 sub-matrix of the flag matrix for an x,y in the 9x9 matrix
function markBlock(marks, x, y, num) {
  const x1 = Math.floor(x / 3) * 3, x2 = x1 + 3
  const y1 = Math.floor(y / 3) * 3, y2 = y1 + 3
  for (let j = y1; j < y2; j++) {
    for (let i = x1; i < x2; i++) {
      marks[j][i][num] = false
    }
  }
}


// Test from Codewars
Test.describe('Sudoku', function(){
  var puzzle = [
    [5,3,0,0,7,0,0,0,0],
    [6,0,0,1,9,5,0,0,0],
    [0,9,8,0,0,0,0,6,0],
    [8,0,0,0,6,0,0,0,3],
    [4,0,0,8,0,3,0,0,1],
    [7,0,0,0,2,0,0,0,6],
    [0,6,0,0,0,0,2,8,0],
    [0,0,0,4,1,9,0,0,5],
    [0,0,0,0,8,0,0,7,9]];

  var solution = [
    [5,3,4,6,7,8,9,1,2],
    [6,7,2,1,9,5,3,4,8],
    [1,9,8,3,4,2,5,6,7],
    [8,5,9,7,6,1,4,2,3],
    [4,2,6,8,5,3,7,9,1],
    [7,1,3,9,2,4,8,5,6],
    [9,6,1,5,3,7,2,8,4],
    [2,8,7,4,1,9,6,3,5],
    [3,4,5,2,8,6,1,7,9]];

  it('Puzzle 1', function(){
      Test.assertEquals(JSON.stringify(sudoku(puzzle)),JSON.stringify(solution), "Incorrect solution for the following puzzle: " + JSON.stringify(puzzle));
  });
});