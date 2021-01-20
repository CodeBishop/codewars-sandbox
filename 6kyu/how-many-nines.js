/*
This kata asks how many numbers between 0..n contain the digit 9. The formula is n minus all the numbers that don't contain it.
    EXAMPLE: nines(100) = 100 - 9^2
    The above works because there are 9 digits that are not 9 (the equation would be identical for the digit 7 or any other)

Update Jan 19 2021:
    This mostly works but it fails
*/
function nines(n) {
    // console.log(`nines(${n}) called where n is a ${typeof(n)}}`);
    if (n < 10) {
      return n === 9 ? 1n : 0n
    }
    const digitCount = BigInt(n.toString().length) // The formula uses the digit-count minus 1
    const firstDigit = BigInt(n.toString().split('')[0])
    const tailNumber = BigInt(n.toString().slice(1)) // Number with first digit removed: 114->14, 2019->019=19
    const returnVal = BigInt(10n ** (digitCount - 1n) - 9n ** (digitCount - 1n)) * firstDigit + nines(tailNumber)
    // console.log(`number=${n}, digitCount=${digitCount}, firstDigit=${firstDigit}, returnVal=${returnVal}`)
    return BigInt(returnVal)
}

// console.log(`nines(0) = ${nines(0)}, typeof(nines())=${typeof(nines(0))}`)
// console.log(`nines(9) = ${nines(9)}`)
// console.log(`nines(99) = ${nines(99)}`)
// console.log(`nines(20) = ${nines(20)}`)
// console.log(`nines(100) = ${nines(100)}`)
// console.log(`nines(100) = ${nines(100)}`)
// console.log(`nines(1000) = ${nines(1000)}`)
// console.log(`nines(2019) = ${nines(2019)}`)

function test(a, b) {
    const answer = nines(a)
    if (answer === b) {
        console.log(`${'\033[32m'}PASS${'\033[39m'}: nines(${a}) is ${answer}`)
    } else {
        console.log(`${'\033[31m'}FAIL${'\033[39m'}: nines(${a}) is ${typeof(answer)}:${answer}, expected: ${typeof(b)}:${b}`)
    }
}


test(1n,0n);
test(10n,1n);
test(20n,2n);
test(100n,19n);
test(200n,38n);
test(300n,57n);
test(1000n,271n);
test(1009n,272n);
test(1010n,272n);
test(1020n,273n);
test(1100n,290n);
test(2000n,290n);
test(1100n,290n);
test(3950n,1035n);
