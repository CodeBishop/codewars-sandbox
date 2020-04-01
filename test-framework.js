
// TODO: Write assertEquals
//    It should return fail messages like this:
//      Expected: 'hisTay siay ymay tringsay', instead got: 'hsiayTay is ymay tringsay'

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

// Types of test available
const Test = {
  assertDeepEquals,
}

// 'describe' and 'it' just run whatever they're given
describe = it = (a, b) => b()

module.exports = {it, describe, Test}
