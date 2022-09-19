function moveZeros(nums) {
  let lastNonZeroFoundAt = 0;
  // If the current element is not 0, then we need to
  // append it just in front of last non 0 element we 
  // found. 
  for (let i = 0; i < nums.length; i++) {
      if (nums[i] !== 0) {
          nums[lastNonZeroFoundAt++] = nums[i];
      }
    console.log(nums, lastNonZeroFoundAt)
  }
 	// After we have finished processing new elements,
 	// all the non-zero elements are already at beginning of 
  // array.
 	// We just need to fill remaining array with 0's.
  for (let i = lastNonZeroFoundAt; i < nums.length; i++) {
      nums[i] = 0;
  }
}

// My Solution
function moveZeroes(nums) {



  let j = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[j] = nums[i]
      j++
    }
  }
  for (let i = j; i < nums.length; i++) {
    nums[i] = 0
  }
  return nums
};
