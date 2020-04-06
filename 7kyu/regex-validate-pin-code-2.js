/* 
validatePIN("1234") === true
validatePIN("12345") === false
validatePIN("a234") === false
*/

function validatePIN(pin) {
  return /^(\d{4}|\d{6})$/.test(pin)
}

validatePIN("1234")
console.log(validatePIN("1234"))
console.log(validatePIN("12345"))
console.log(validatePIN("a234"))

// console.log("123456".match(/^[\d]{6}$/))