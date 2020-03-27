function accum(s) {
    if (s.length < 2) {
        return s.toUpperCase()
    }
    const end = s.length-1
    return accum(s.slice(0,end)) + '-' + s[end].toUpperCase() + s[end].toLowerCase().repeat(end)
}


const test = 'abc', answer = 'A-Bb-Ccc'
const test2 = 'abcde', answer2 = 'A-Bb-Ccc-Dddd'
// console.log(acc(test))
console.log(accum(test2))
// console.log(acc(test).localeCompare(answer) == 0)
// console.log(accum('abcd'))

