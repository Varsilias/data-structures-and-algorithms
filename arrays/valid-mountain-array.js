/**
 * @param {number[]} arr
 * @return {boolean}
 */
function validMountainArray(arr) {
  let n = arr.length;
  if (n < 3) return false
  let i = 0;
  //get the index of the last element of the array
  let j = n - 1

  // we compare the current element to the next while 
  // making sure that the next element is not the last 
  // element and then INCREMENT I
  while (arr[i] < arr[i + 1] && (i + 1) < n) i++

  // we compare the last element(current) to the
  //element before it and then DECRMENT J
  while (j > 0 && arr[j - 1] > arr[j]) j--

  console.log(i, j)
  return i > 0 && i == j && j < n - 1;
};

// console.log(validMountainArray([3,5,5])) // false
// console.log(validMountainArray([0,3,2,1])) // true
// console.log(validMountainArray([2,1])) // false
console.log(validMountainArray([0, 2, 3, 4, 5, 2, 1, 0])) // true
console.log(validMountainArray([0, 1, 2, 3, 4, 7, 6, 5, 4, 3, 2, 1, 0]))

