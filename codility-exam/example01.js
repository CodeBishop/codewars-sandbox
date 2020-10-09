
const testData = [
    [ "eedaaad", "eedaad" ],
    [ "xxxtxxx", "xxtxx" ],
    [ "a", "a" ],
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
    const xArr = x.split("");
    let answer = "", lastChar = "", count = 0;
    xArr.forEach(c => {
        if (c !== lastChar) {
            answer += c;
            lastChar = c;
            count = 0;
        } else {
            count++;
            if (count < 2) {
                answer += c;
            }
        }
    })
    return answer;
}
