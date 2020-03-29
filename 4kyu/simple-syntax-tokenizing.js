


// tokenise(String) => [ String | [ String | .. ] ] // arrays may be nested and/or empty
// tokenise("A + B * C") === [ "A", "+", "B", "*", "C" ]
// tokenise("function a(arg, arg)") === [ "function", "a", [ "arg", ",", "arg" ] ]
const operators = "!#$%&*+-/<=>@^_.,;"

// Tokenizer state
const [
  UNINITIALIZED, IDENTIFIER, OPERATOR,
] = [...Array(100).keys()] // Erbitrary range (must be larger than number of states)

function tokenise(string) {
  // Test for paranthesis mismatch
  if(string.split('(').length !== string.split(')').length) {return null}

  const tokens = []
  let state = UNINITIALIZED
  let matchData = '', i = 0, substr

  while (i < string.length) {
    // Try for identifier
    substr = string.substr(i)
    matchData = substr.match(/(^[a-zA-Z]+)/)
    if (matchData) {
      console.log(`found string: ${matchData[0]}`)
      matchData[0].length > 0 && tokens.push(matchData[0])
      i += matchData[0].length
    }
    // console.log(i)
    // Try for operator
    substr = string.substr(i)
    matchData = substr.match(/^([!#$%&*+\-\/<=>@^_.,;]+)/)
    if (matchData) {
      console.log(`found operator: ${matchData[0]}`)
      matchData[0].length > 0 && tokens.push(matchData[0])
      i += matchData[0].length
    }
    // Skip over whitespace
    substr = string.substr(i)
    matchData = substr.match(/^(\s)+/)
    if(matchData) {
      console.log('found whitespace')
      i += matchData[0].length
    }
  }

  return tokens
}

// console.log(tokenise("")) // []
// console.log(tokenise("()")) // [ [] ]
// console.log(tokenise("a (Word)")) // [ "a", [ "Word" ] ]
console.log(tokenise("These are tokens.")) // [ "These", "are", "tokens", "." ]
// console.log(tokenise("add(a, b) = a + b")) // [ "add", [ "a", ",", "b" ], "=", "a", "+", "b" ]
// console.log(tokenise("A *(B ^& C)")) // [ "A", "*", [ "B", "^&", "C" ] ]
// console.log(tokenise("do $ readLine >>= putStrLn")) // [ "do", "$", "readLine", ">>=", "putStrLn" ]
// console.log(tokenise("A single mismatched bracket (")) // null
