// EXAMPLES
// pigIt('Pig latin is cool'); // igPay atinlay siay oolcay
// pigIt('Hello world !');     // elloHay orldway !

// TODO: Write a 1-line version that uses
const pigIt = str => str.replace(/(\w+)/g, w => w.slice(1) + w[0] + 'ay')

console.log(pigIt(''))
console.log(pigIt('Pig latin, is cool!'))
console.log(pigIt('!Pig latin, is cool!'))
console.log(pigIt('This is my string'))
