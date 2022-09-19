function replaceElement(arr) {

  for (let i = 0; i < arr.length; i++) {
    //get the element after the first element arr[1]
    let v = arr[i + 1];

    for (let j = i + 1; j <= arr.length; j++) {
      let curr = arr[j]

      // If V is undefined that means V is the last value in
      // the array
      if(v === undefined) {
        v = -1
      }
      // if curr is greater that mean we have found a value
      // greater than v, we then re-assign the value of V
      if (curr > v) {
        v = curr
      } else {
        arr[i] = v
      }
    }



  }

  return arr


}
console.log(undefined === undefined)

console.log(replaceElement([17, 18, 5, 4, 6, 1])) // [18,6,6,6,1,-1]
console.log(replaceElement([400])) // [-1]