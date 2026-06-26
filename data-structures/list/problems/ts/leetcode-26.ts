function removeDuplicates(nums: number[]): number {
    let map = new Map<number, number>()

    let count = 0
    for(let i = 0; i < nums.length; i++) {
        let elem = nums[i]
        if(map.get(elem) === undefined) {
            map.set(elem, 1)
            count++
        } else {
            nums[i] = NaN
        }
    }

    nums.sort((a: number, b: number) => a - b)
    return count
};

function removeDuplicates2(nums: number[]): number {
    let left = 1;
    for(let i = 1; i < nums.length; i++) {
        if(nums[i] !== nums[i-1]) {
            nums[left] = nums[i]
            left++
        }
    }
    return left
};