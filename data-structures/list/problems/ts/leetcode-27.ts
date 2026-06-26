function removeElement(nums: number[], val: number): number {
    let count = 0;
    
    for(let i = 0; i < nums.length; i++) { // [0,1,2,2,3,0,4,2], 2
        if(nums[i] === val) {
            nums[i] = NaN
        } else {
            count++
        }
    }

    nums.sort()

    return count
};