
assertDeepEquals = (returnVal, expectVal) => {
  if (returnVal === expectVal) {return true}
  if (Array.isArray(returnVal !== Array.isArray(expectVal)) ||
    returnVal === null || returnVal === undefined ||
    expectVal === null || expectVal === undefined ||
    Object.keys(returnVal).length !== Object.keys(expectVal).length) {
      console.error('assertDeepEquals is false, these are not the same:')    
      console.error(`  ${JSON.stringify(returnVal)}\n  ${JSON.stringify(expectVal)}`)
      return false
  }
  return Object.keys(returnVal).every(key => assertDeepEquals(returnVal[key], expectVal[key]))
}

const assertEquals = (a, b, msg) => {
  console.log(msg)
  if (a === b) {
    console.log(`PASS: "${a.slice(0,10)}..." === "${b.slice(0,10)}..."`)
  } else {
    console.log(`FAIL: "${a.slice(0,10)}..." !== "${b.slice(0,10)}..."`)
  }
}

const assertSimilar = (returnVal, expectVal) => {
  if (returnVal == expectVal) {return true}
  if (Array.isArray(returnVal != Array.isArray(expectVal)) ||
    returnVal == null || returnVal == undefined ||
    expectVal == null || expectVal == undefined ||
    Object.keys(returnVal).length != Object.keys(expectVal).length) {
      console.error('assertSimilar is false, these are not the same:')    
      console.error(`  ${JSON.stringify(returnVal)}\n  ${JSON.stringify(expectVal)}`)
      return false
  }
  return Object.keys(returnVal).every(key => assertSimilar(returnVal[key], expectVal[key]))
}

const expectError = (msg, fn) => {
  console.log(msg)
  try {
    fn()
  } catch(e) {
    console.log('PASS')
    return
  }
  console.log('FAIL')
}

// 'describe' and 'it' just run whatever they're given
function describe(description, fn) {
  console.log(description)
  fn()
}

const it = describe

// Types of test available
const Test = {
  assertDeepEquals,
  assertEquals,
  assertSimilar,
  describe,
  expectError,
  it,
}

module.exports = {it, describe, Test}
