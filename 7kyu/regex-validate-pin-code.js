/* 
validatePIN("1234") === true
validatePIN("12345") === false
validatePIN("a234") === false
*/

function validatePIN(str) {
  return !!(str.match(/^[\d$]{4}$/)||str.match(/^[\d]{6}$/))
}

validatePIN("1234")
console.log(validatePIN("1234"))
console.log(validatePIN("12345"))
console.log(validatePIN("a234"))

console.log("123456".match(/^[\d]{6}$/))