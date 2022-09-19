/**
 * @param {number[]} nums
 * @return {number[]}
 */
function sortArrayByParity(nums) {
  let even = []
  let odd = []

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 === 0) {
      even.push(nums[i])
    } else {
      odd.push(nums[i])
    }
  }

  console.log(even, odd)
  return [...even, ...odd]
}

console.log(sortArrayByParity([3,1,2,4])) // [2,4,1,3]
console.log(sortArrayByParity([5,4,3,7,8,6])) // [4,6,8,3,5,7]