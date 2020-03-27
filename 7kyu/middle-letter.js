function getMiddle(s)
{
  const i = parseInt(s.length/2, 10)
  return (s.length%2 ? '' : s[i-1]) + s[i]
}

console.log(getMiddle('adf'))