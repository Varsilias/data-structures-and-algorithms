// My Solution with 168 out of 169 test cases passing

// function checkIfExist(arr) {

//   if (arr.length === 2) {
//     for(let i = 0; i < arr.length; i++) {
//       let curr = arr[i]
//       let next = arr[i + 1]
//       if ((curr % 2 === 0 && next % 2 === 0)) {
//         if ((curr === 2 * next) || next === 2 * curr) {
//           return true
//         }
//       } else {
//         return false
//       }
//     }
//   }
//   arr.sort((a, b) => a - b);
//   for(let i = 0; i < arr.length; i++) {
//     let curr = arr[i];
//     let found = arr.find((num) => {
//       return num !== curr && num === 2 * curr
//     })
//     // console.log(curr, found)
//     if(found === undefined) {
//       continue
//     } else {
//       return true
//     }
    
//   }

//   return false;
// }

//Optmiized solution using double for-loop

function checkIfExist(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i] === 2 * arr[j] && i !== j) {
        return true;
      }
    }
  }
  return false
}

console.log(checkIfExist([10,2,5,3]))
console.log(checkIfExist([7,1,14,11]))
console.log(checkIfExist([0,0]))
// console.log(checkIfExist([3,1,7,11]))
// console.log(checkIfExist([-2,0,10,-19,4,6,-8]))
console.log(checkIfExist([2,3,3,0,0]))