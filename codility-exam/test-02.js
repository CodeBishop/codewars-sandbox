/*
NOTES
    If you built a new array with each pass by discarding the first number and all subsequent instances of it then at least the problem size would be decreasing
    
*/

const testData = [
    [[3,8,2,3,3,2], 3],
    [[7,1,2,8,2], 2],
    [[3,1,4,1,5], 0],
    [[5,5,5,5,5], 5]
    [[1], 1],
    [[1000000000], 0]
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

function solution(x) {
    let arr = x, newArr;
    let highest = 0;
    console.log(arr);
    while (arr.length > 0) {
        let num = arr[0], count = 1;
        let newArr = [];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] === num) {
                count++;
            } else {
                newArr.push(num);
            }
        }
        if (count === num && num > highest) {
            highest = num;
        }
        arr = newArr;
    }
    return highest;
}