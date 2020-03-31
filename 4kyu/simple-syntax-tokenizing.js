
// EXAMPLES:
// tokenise(String) => [ String | [ String | .. ] ] // arrays may be nested and/or empty
// tokenise("A + B * C") === [ "A", "+", "B", "*", "C" ]
// tokenise("function a(arg, arg)") === [ "function", "a", [ "arg", ",", "arg" ] ]

const {describe, it, Test} = require('../test-framework')

const identifierRegex = new RegExp("(^[a-zA-Z]+)")
const operatorRegex = new RegExp("^([!#$%&*+\-\/<=>@^_.,;]+)")

function validParantheses(string) {
  // Fast test for paranthesis miscount
  if(string.split('(').length !== string.split(')').length) {return false}
  
  // Test for parantheses mis-arrangement
  let nestCount = 0
  for(let i = 0; i < string.length; i++) {
    if (string[i] === '(') {nestCount++}
    if (string[i] === ')') {nestCount--}
    if (nestCount < 0) {return false}
  }
  return nestCount === 0
}

function tokenise(string) {
  if (!validParantheses(string)) {return null}
  if (string.length = 0) {return []}

  const tokens = []
  let matchData = '', i = 0, substr

  while (i < string.length) {
    // Extract paranthesized subgroups
    if(string[i] === '(') {
      // Find index of corresponding closing parenthesis
      let j = i, nestCount = 1
      while (nestCount !== 0) {
        j++
        if (string[j] === '(') {nestCount++}
        if (string[j] === ')') {nestCount--}
      }
      tokens.push(tokenise(string.substring(i+1, j)))
      i += j-i+1
    }
    
    // Skip over whitespace
    while(' \n\r\t'.includes(string[i]) && i < string.length) {i++}

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

console.log(tokenise("(((())))))(())"))
console.log(tokenise("(((()))((()))))((()()()))((())(()()))"))
console.log(tokenise("(()(()))"))
console.log(tokenise("()()"))
console.log(tokenise(""))
console.log(tokenise("()"))
console.log(tokenise(")("))
tokenise("(()(())()(()")
tokenise("(()))()")
tokenise("fgh^(das+_^ygrE(ssd))//UJ")
tokenise("das+_^ygrE(ssd)")
tokenise("ssd")
tokenise("ds^!(sd+%%(ZZaddu))^&(())-(<=>)")
tokenise("sd+%%(ZZaddu))^&(())-(<=>")
tokenise("ZZaddu))^&(()")
tokenise(")-(")

// describe("Simple Syntax Tokenizing", ()=>{
//   it("Example Tests", ()=>{
//     Test.assertDeepEquals( tokenise(""), [] );
//     Test.assertDeepEquals( tokenise("()"), [ [] ] );
//     Test.assertDeepEquals( tokenise("a (Word)"), [ "a", [ "Word" ] ] );
//     Test.assertDeepEquals( tokenise("These are tokens."), [ "These", "are", "tokens", "." ] );
//     Test.assertDeepEquals( tokenise("add(a, b) = a + b"), [ "add", [ "a", ",", "b" ], "=", "a", "+", "b" ] );
//     Test.assertDeepEquals( tokenise("A *(B ^& C)"), [ "A", "*", [ "B", "^&", "C" ] ] );
//     Test.assertDeepEquals( tokenise("do $ readLine >>= putStrLn"), [ "do", "$", "readLine", ">>=", "putStrLn" ] );
//     Test.assertDeepEquals( tokenise("A single mismatched bracket ("), null );
//   })
// })