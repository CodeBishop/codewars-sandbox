
const Test = {
  assertDeepEquals: (returnVal, expectVal) => {
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
  },
}

console.log(Test)

// 'describe' and 'it' just run whatever they're given
describe = it = (a, b) => b()

module.exports = {it, describe, Test}
