function removeElement(arr, val) {
  let max = Math.max(...arr);
  let count = 0;
  let K;

  for (let i = 0; i < arr.length; i++) {
    let curr = arr[i];
    if (curr !== val) {
      arr.splice(i, 1, max + 1)
      count++
    }
  }
  K = arr.length - count;
  // arr.sort((a, b) => a - b).splice(0, K);
  console.log(arr.sort((a, b) => a - b).splice(0, K))
  console.log(K)
}

removeElement([3, 2, 2, 3], 3)


/**
 * @param {number} x
 * @return {boolean}
 */
var removeElement = function(nums, val) {
  while (nums.includes(val)) {
    nums.splice(nums.indexOf(val), 1);
  }
  return nums.length;
};