function removeDuplicates(nums: number[]): number {
    let p = 2;
    for(let i = 2; i < nums.length; i++) {
        if(nums[i] !== nums[p-2]) {
           const left = nums[p];
           nums[p] = nums[i]
           nums[i] = left
           p++
        }
    }
    return p
};
let nums = [1,1,1,2,2,3]
console.log(removeDuplicates(nums)) // Output: 5, nums = [1,1,2,2,3,_]
console.log(nums)

nums = [0,0,1,1,1,1,2,3,3]
console.log(removeDuplicates(nums)) // Output: 7, nums = [0,0,1,1,2,3,3,_,_]
console.log(nums)
