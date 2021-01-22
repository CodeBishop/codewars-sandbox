function mergeArrays(a, b) {
    const l = a.length < b.length ? a.length : b.length
    const ret = []
    for (i = 0; i < l; i++) {
      ret.push(a[i])
      ret.push(b[i])
    }
    return ret.concat(b.slice(l)).concat(a.slice(l))
  }

  console.log(mergeArrays([1, 2, 3, 4, 5, 6, 7, 8], ['a', 'b', 'c', 'd', 'e']))
