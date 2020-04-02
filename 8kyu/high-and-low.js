function highAndLow(numbers) {
  const arr = numbers.split(' ').map(x=>parseInt(x))
  return Math.max(...arr) + ' ' + Math.min(...arr)
}

console.log(highAndLow("1 -2 3 4 5"))
