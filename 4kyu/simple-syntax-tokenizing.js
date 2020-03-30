
// EXAMPLES:
// tokenise(String) => [ String | [ String | .. ] ] // arrays may be nested and/or empty
// tokenise("A + B * C") === [ "A", "+", "B", "*", "C" ]
// tokenise("function a(arg, arg)") === [ "function", "a", [ "arg", ",", "arg" ] ]

const {describe, it, Test} = require('../test-framework')

const identifierRegex = new RegExp("(^[a-zA-Z]+)")
const operatorRegex = new RegExp("^([!#$%&*+\-\/<=>@^_.,;]+)")

function tokenise(string) {
  // Test for paranthesis mismatch
  if(string.split('(').length !== string.split(')').length) {return null}

  const tokens = []
  let matchData = '', i = 0, substr

  while (i < string.length) {
    // Skip over whitespace
    while(' \n\r\t'.includes(string[i]) && i < string.length) {i++}
    // Extract paranthesized subgroups
    if(string[i] === '(') {
      const j = string.lastIndexOf(')')
      // console.log(`subgroup: ${string.substring(i+1, j)}`)
      tokens.push(tokenise(string.substring(i+1, j)))
      i += j-i+1
    }
    // Try for identifier
    substr = string.substr(i)
    matchData = substr.match(identifierRegex)
    if (matchData) {
      // console.log(`word: ${matchData[0]}`)
      matchData[0].length > 0 && tokens.push(matchData[0])
      i += matchData[0].length
    }
    // Try for operator
    substr = string.substr(i)
    matchData = substr.match(operatorRegex)
    if (matchData) {
      // console.log(`operator: ${matchData[0]}`)
      matchData[0].length > 0 && tokens.push(matchData[0])
      i += matchData[0].length
    }
  }

  return tokens
}

describe("Simple Syntax Tokenizing", ()=>{
  it("Example Tests", ()=>{
    Test.assertDeepEquals( tokenise(""), [] );
    Test.assertDeepEquals( tokenise("()"), [ [] ] );
    Test.assertDeepEquals( tokenise("a (Word)"), [ "a", [ "Word" ] ] );
    Test.assertDeepEquals( tokenise("These are tokens."), [ "These", "are", "tokens", "." ] );
    Test.assertDeepEquals( tokenise("add(a, b) = a + b"), [ "add", [ "a", ",", "b" ], "=", "a", "+", "b" ] );
    Test.assertDeepEquals( tokenise("A *(B ^& C)"), [ "A", "*", [ "B", "^&", "C" ] ] );
    Test.assertDeepEquals( tokenise("do $ readLine >>= putStrLn"), [ "do", "$", "readLine", ">>=", "putStrLn" ] );
    Test.assertDeepEquals( tokenise("A single mismatched bracket ("), null );
  })
})