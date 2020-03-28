function anagrams(word, words) {
  const alphaWord = [...word].sort().join('')
  const matches = []
  words.forEach(w => {
    if(!alphaWord.localeCompare([...w].sort().join(''))) {
      matches.push(w)
    }
  })
  return matches
}

console.log(anagrams('abba', ['aabb', 'abcd', 'bbaa', 'dada']))