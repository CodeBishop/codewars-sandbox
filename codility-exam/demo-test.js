
const testData = [
    [ [1, 3, 6, 4, 1, 2], 5 ],
    [ [1,2,3], 4 ],
    [ [-1, -3], 1 ],
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
    x.sort();
    let answer = 1
    for(let i = 0; i < x.length-1; i++) {
        if(x[i] - x[i+1] > 1) {
            return x[i] + 1
        }
    }
    return 1
}