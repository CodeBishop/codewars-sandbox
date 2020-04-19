
const zipWith = (f, as, bs) => 
  as[0] !== undefined && bs[0] !== undefined ? 
  [f(as[0], bs[0]), ...zipWith(f, as.slice(1), bs.slice(1))] : 
  []

console.log(zipWith( Math.pow, [10,10,10,10], [0,1,2,3] ))
console.log(zipWith( Math.max, [1,4,7,1,4,7], [4,7,1,4,7,1] ))
console.log(zipWith( (a,b) => a+b, [0,1,2], [0,1,2] ))
