// Coding Meetup - Kata series emphasizing: forEach, filter, map, reduce, some, every, find, findIndex

var list1 = [
  { firstName: 'Sofia', lastName: 'I.', country: 'Argentina', continent: 'Americas', age: 35, language: 'Java' },
  { firstName: 'Lukas', lastName: 'X.', country: 'Croatia', continent: 'Europe', age: 35, language: 'Python' },
  { firstName: 'Madison', lastName: 'U.', country: 'United States', continent: 'Americas', age: 32, language: 'Ruby' }
];

greetDevelopers2 = ds => 
  ds.map(dev => 
    ({greeting: `Hi ${dev.firstName}, what do you like the most about ${dev.language}?`, ...dev}))


function greetDevelopers(list) {
  return list.map(dev => {
    dev.greeting = `Hi ${dev.firstName}, what do you like the most about ${dev.language}?`
    return dev
  })
}

console.log(greetDevelopers(list1))


// [
//   { firstName: 'Sofia', lastName: 'I.', country: 'Argentina', continent: 'Americas', age: 35, language: 'Java',
//     greeting: 'Hi Sofia, what do you like the most about Java?'
//   },
//   { firstName: 'Lukas', lastName: 'X.', country: 'Croatia', continent: 'Europe', age: 35, language: 'Python',
//     greeting: 'Hi Lukas, what do you like the most about Python?'
//   },
//   { firstName: 'Madison', lastName: 'U.', country: 'United States', continent: 'Americas', age: 32, language: 'Ruby',
//     greeting: 'Hi Madison, what do you like the most about Ruby?'
//   } 
// ];`