

function createPhoneNumber(numbers){
  const out = []
  const numCount = numbers.reduce((acc, val) => typeof val === 'number' ? acc+1 : acc, 0)
  console.log(numCount)
  numbers.forEach((item, i) => {
    switch(i) {
      case 0:
      numCount > 9 &&  out.push('(')
      break;
      case 3:
      numCount > 9 ? out.push(') ') : out.push('-')
      break;
      case 6:
      numCount > 9 &&  out.push('-')
      break;
    }
    typeof item === 'number' && out.push(item)
    if (i > 10) return out.join("")
  })
  return out.join("")
}

const nums = [4, 5, 6, 7, 8, 9, 0]
const nums2 = [3, 4, 5, 6, 7, 8, 9, 0]
const nums3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
console.log(createPhoneNumber(nums2))
// console.log(createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]))
