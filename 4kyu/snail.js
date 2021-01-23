

const {Test} = require('../test-framework')

// This version works by removing the rows and columns from the walk without altering the matrix
snail = function(array) {
    let x1 = 0, x2 = array[0].length - 1
    let y1 = 0, y2 = array.length - 1
    let returnArray = []
    let i = array.length * array[0].length // Iterator for element countdown
    while (i > 0) {
        for (x = x1; x <= x2; x++) {
            returnArray.push(array[y1][x])
            i--
        }
        y1++ // Eliminate top-most row of remaining matrix
        for (y = y1; y <= y2; y++) {
            returnArray.push(array[y][x2])
            i--
        }
        x2-- // Eliminate right-most column of remaining matrix
        for (x = x2; x >= x1; x--) {
            returnArray.push(array[y2][x])
            i--
        }
        y2-- // Eliminate bottom row of remaining matrix
        for (y = y2; y >= y1; y--) {
            returnArray.push(array[y][x1])
            i--
        }
        x1++ // Eliminate left-most column of remaining matrix
        console.log(`${returnArray}`)
    }
    return returnArray
}

// Store a cardinal direction and the initial x and y dimensions. Move in the direction until the end of the array, then subtract from that direction (x or y) and turn right. Continue until x and y have counted down to zero.
// TODO: This version is incomplete, it is not currently shrinking it's walk on the top and left which still terminate at 0
snail2 = function(array) {
  let w = array.length, h = array[0].length // Width and height countdown
  const DIRS = [{dx:1, dy:0}, {dx:0, dy:1}, {dx:-1, dy:0}, {dx:0, dy: -1}] // East, South, West, North
  let i = 0 // Index of current direction of movement
  const arr = [] // Array being constructed
  let x = 0, y = 0 // Cursor position
  while (w > 0 && h > 0) {
    arr.push(array[y][x])
    console.log({x, y, w, h, i}, arr)
    x += DIRS[i].dx
    y += DIRS[i].dy
    // If horizontal edge of spiral reached
    if ((i == 0 && x == w-1) || (i == 2 && x == 0)) {
      i = (i + 1) % 4 // Change direction (turn right)
      w-- // Decrease width countdown
    }
    // If vertical edge of spiral reached
    if ((i == 1 && y == h-1) || (i == 3 && y == 0)) {
      i = (i + 1) % 4 // Change direction (turn right)
      h-- // Decrease height countdown
    }
  }
  return arr
}

// My own tests
Test.assertDeepEquals(snail([[1, 2], [3, 4]]), [1, 2, 4, 3]);

// The Codewars tests
Test.assertDeepEquals(snail([[]]), []);
Test.assertDeepEquals(snail([[1]]), [1]);
Test.assertDeepEquals(snail([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), [1, 2, 3, 6, 9, 8, 7, 4, 5]);
Test.assertDeepEquals(snail([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25]]), [1, 2, 3, 4, 5, 10, 15, 20, 25, 24, 23, 22, 21, 16, 11, 6, 7, 8, 9, 14, 19, 18, 17, 12, 13]);
Test.assertDeepEquals(snail([[1, 2, 3, 4, 5, 6], [20, 21, 22, 23, 24, 7], [19, 32, 33, 34, 25, 8], [18, 31, 36, 35, 26, 9], [17, 30, 29, 28, 27, 10], [16, 15, 14, 13, 12, 11]]), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]);