
// EXAMPLES:
// tokenise(String) => [ String | [ String | .. ] ] // arrays may be nested and/or empty
// tokenise("A + B * C") === [ "A", "+", "B", "*", "C" ]
// tokenise("function a(arg, arg)") === [ "function", "a", [ "arg", ",", "arg" ] ]

const {describe, it, Test} = require('../test-framework')

function tokenise(string) {
  if(string.split('(').length !== string.split(')').length) {return null}
  if (string.length = 0) {return []}

  const tokens = []
  let matchData = '', i = 0

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
    } else if (string[i] === ')') {return null}
    
    // Skip over whitespace
    while(' \n\r\t'.includes(string[i]) && i < string.length) {i++}

    matchData = string.substr(i).match(/^([a-zA-Z]+|[!#$%&*+-/<=>@^_.,;]+)/)
    if (matchData) {
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