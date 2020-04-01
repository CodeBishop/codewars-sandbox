// EXAMPLES
// pigIt('Pig latin is cool'); // igPay atinlay siay oolcay
// pigIt('Hello world !');     // elloHay orldway !

function pigIt(str) {
  const matchObj = str.match(/(\w+)/)
  if (matchObj === null) {return str}
  const word = matchObj[0]
  const pigWord = word.slice(1) + word[0] + 'ay'
  const beforeWord = str.slice(0, matchObj.index)
  const afterWord = str.slice(matchObj.index+word.length)
  return beforeWord + pigWord + pigIt(afterWord)
}

// pigIt('Pig latin, is cool!')
console.log(pigIt(''))
console.log(pigIt('Pig latin, is cool!'))
// console.log(pigIt('This is my string'))
