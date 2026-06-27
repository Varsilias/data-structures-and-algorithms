
// O(nlogn)
function sortedSquares(nums: number[]): number[] {
    for(let i = 0; i < nums.length; i++) {
        nums[i] = nums[i]**2
    }
    return nums.sort((a, b) => a-b)
};

// O(n) Time
// O(n) Space
function sortedSquares1(nums: number[]): number[] {
    const n = nums.length
    const result = new Array(n)


    let right = n - 1
    let left = 0;

    let p = n - 1 // this determines where in the new array elements are added


    while(right >= left) {
        const leftSquare = nums[left]**2
        const rightSquare = nums[right]**2

        if(leftSquare > rightSquare) {
            result[p] = leftSquare
            left++
        } else {
            result[p] = rightSquare
            right--
        }
        p--
    }

    return result
};

console.log(sortedSquares([-4,-1,0,3,10]))