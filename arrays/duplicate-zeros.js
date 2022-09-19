var duplicateZeros = function(arr) {

  let tempArr = [];

  if (!arr.includes(0)) {
    tempArr = [...arr]
  }


  for (let i = 0; i < arr.length; i++) {
    let curr = arr[i];
    if (curr === 0) {
      tempArr.push(curr)
      tempArr.push(curr)
    } else {
      tempArr.push(curr)
    }
  }
  arr = tempArr.slice(0, arr.length);
  return arr

};

console.log(duplicateZeros([1, 0, 2, 3, 0, 4, 5, 0])) //[1,0,0,2,3,0,0,4]
duplicateZeros([1, 0, 0, 3, 0, 4, 5, 7]) //[1,0,0,0,0,3,0,0]
duplicateZeros([1, 2, 3]) // [1,2,3]