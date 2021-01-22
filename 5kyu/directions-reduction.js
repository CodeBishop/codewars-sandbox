const {Test} = require('../test-framework')

function dirReduc(arr){
    let i = 0
    console.log(i, arr)
    while (i < arr.length - 1) {
        if ((arr[i] == 'NORTH' && arr[i+1] == 'SOUTH') ||
            (arr[i] == 'SOUTH' && arr[i+1] == 'NORTH') ||
            (arr[i] == 'EAST' && arr[i+1] == 'WEST') ||
            (arr[i] == 'WEST' && arr[i+1] == 'EAST')) {
            // If directions cancel then remove them and backtrack 1 step in the list to look for
            // new possible reduction
            arr.splice(i, 2)
            if (i > 0) {
            i--
            }
        } else {
            i++
        }
        console.log(i, arr)
    }
    return arr
}

// Visible test cases from codewars
Test.assertSimilar(dirReduc(["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"]), ["WEST"])
Test.assertSimilar(dirReduc(["NORTH", "WEST", "SOUTH", "EAST"]), ["NORTH", "WEST", "SOUTH", "EAST"])
Test.assertSimilar(dirReduc(["NORTH", "SOUTH", "EAST", "WEST", "EAST", "WEST"]), [])
