/*
NOTES
    This should probably be recursive to simplify choosing between two subtrees of any given node.
    Possible values: 1, 3, 7, 15, ..., n[i] + n[i-1] + 1

*/

const testData = [
    [{"x":1,"l":{"x":2,"l":null,"r":{"x":4,"l":null,"r":null}},"r":{"x":3,"l":{"x":5,"l":{"x":7,"l":null,"r":null},"r":{"x":8,"l":null,"r":null}},"r":{"x":6,"l":{"x":9,"l":null,"r":null},"r":{"x":10,"l":{"x":11,"l":null,"r":null},"r":null}}}}, 7],
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

function solution(T) {
    console.log(T.r);
    let lSize = 0, rSize = 0;
    // If this is a leaf then its size=1
    if (T.l === T.r === undefined) {
        return 1;
    }

    // Else, find the size of the left and right sub-trees
    if (T.l) {
        lSize = solution(T.l);
    }
    if (T.r) {
        rSize = solution(T.r);
    }

    // If both sub-trees are same size then return their sum plus this node
    if (lSize === rSize) {
        return lSize + rSize + 1;
    // Else, return the size of the largest sub-tree
    } else {
        if (lSize > rSize) {
            return lSize;
        } else {
            return rSize;
        }
    }
}