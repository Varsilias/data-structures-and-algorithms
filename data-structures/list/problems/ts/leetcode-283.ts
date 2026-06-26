/**
 Do not return anything, modify nums in-place instead.
 */
function moveZeroes(nums: number[]): void {
    let left = 0

    for(let i = 0; i < nums.length; i++) {
        let curr = nums[left]
        let next = nums[i]

        if(next !== 0) {
            nums[left] = next
            nums[i] = curr
            left++
        }
        
    }
};

console.log(moveZeroes([0,1,0,3,12]))
console.log(moveZeroes([0]))
console.log(moveZeroes([1,0,1]))
console.log(moveZeroes([4,2,4,0,0,3,0,5,1,0]))