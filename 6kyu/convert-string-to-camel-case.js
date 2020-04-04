function toCamelCase2(str) {
  const match = str.match(/([-_][\w])/)
  if (!match) {
    return str
  } 
  const beforeMatch = str.substr(0, match.index)
  const afterMatch = str.substr(match.index)
  return beforeMatch + afterMatch[1].toUpperCase() + toCamelCase(afterMatch.substr(2)) 
}

function toCamelCase(str) {
  return str.replace(/([-_][\w])/g, x => x[1].toUpperCase())
}

console.log(toCamelCase("the-stealth-warrior")) // returns "theStealthWarrior"
console.log(toCamelCase("The_Stealth_Warrior")) // returns "TheStealthWarrior"
