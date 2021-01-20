function isIsogram(str){
    const lookup = {}
    for (i = 0; i < str.length; i++) {
        const c = str.toLowerCase()[i]
        if (lookup[c]) {
            console.log(`Returning FALSE for ${str}`)
            return false
        }
        lookup[c] = true
    }
    console.log(`Returning TRUE for ${str}`)
    return true
}


function Test(a, b) {
    if (a === b) {
        console.log(`${'\033[32m'}PASS${'\033[39m'}: ${a} is ${b}`)
    } else {
        console.log(`${'\033[31m'}FAIL${'\033[39m'}: ${typeof(a)}:${a} is NOT ${typeof(b)}:${b}`)
    }
}

Test(isIsogram("Dermatoglyphics"), true)
Test(isIsogram("isogram"), true)
Test(isIsogram("aba"), false, "same chars may not be adjacent")
Test(isIsogram("moOse"), false, "same chars may not be same case")
Test(isIsogram("isIsogram"), false)
Test(isIsogram(""), true, "an empty string is a valid isogram")
