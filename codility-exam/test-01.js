
const testData = [
    [ [1, 2, -3, 4, 5, -6], 9 ],
    [ [7], 7 ],
    [ [-1, 3], 3 ],
    [ [-2], -1 ],
    [ [2, 1, -3], 3 ],
    // [ [], -1 ],
    // [ [-4], -1 ],
    // [ [-4, 2], 2 ],
    // [ [-4, 2, 3], 5 ],
    // [ [3, -1, 4, -1, 2, -1, 7], 7 ],
    // [ [-4, 2, -8], 2 ],
    // [ [21, -4, 2, -8, 4], 21 ],
    // [ [-4, -8], -1 ],
]


testData.forEach(blah => {
    const input = JSON.stringify(blah[0]);
    const expected = JSON.stringify(blah[1]);
    const output = JSON.stringify(solution(blah[0]));
    console.log(` input: ${input}`);
    console.log(`expect: ${expected}`);
    console.log(`output: ${output}`);
    console.log(output === expected ? "   \033[32m"+"pass"+"\033[39m" : "   \033[31m"+"FAIL"+"\033[39m");
    console.log('\n');
})

/*
NOTES
    Negative numbers create boundaries

*/

function solution(S) {
    var max_sum = 0;
    var current_sum = 0;
    var positive = false;
    var n = S.length;
    for (var i = 0; i < n; ++i) {
        var item = S[i];
        // If we reach a negative number
        if (item < 0) {
            // Update the max sum if we have a new max
            if (max_sum < current_sum) {
                max_sum = current_sum;
            }
            // Reset counting sum
            current_sum = 0;
        } else {
            // Flag us as back into positive number
            positive = true;
            // Add the current numer to the counting sum
            current_sum += item;
        }
    }

    if (current_sum > max_sum) {
        max_sum = current_sum;
    }
    if (positive) {
      return max_sum;
    }
    return -1;
}