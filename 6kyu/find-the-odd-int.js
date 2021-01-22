function findOdd(A) {
    const dic = {}
    A.forEach(num => {
      if (dic[num]) {
        delete dic[num]
      } else {
        dic[num] = true
      }
    })
    return Number(Object.keys(dic)[0])
  }