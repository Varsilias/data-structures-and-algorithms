function maxPairwiseProduct(length = 0, nums = []) {
    if (nums.length <= 0) {
        return 0
    }

    let firstIndex = -1 // 2
    for (let i = 0; i < nums.length; i++) {
        if (firstIndex === -1 || nums[i] > nums[firstIndex]) {
            firstIndex = i
        }
    }

    // [1,2,3]
    let secondIndex = -1 // 1
    for (let i = 0; i < nums.length; i++) { // i = 2, f=2
        // if (i === firstIndex) {
        //     continue
        // }
        // if (secondIndex === -1) {
        //     secondIndex = i
        // }
        // if (nums[i] > nums[secondIndex]) {
        //     secondIndex = i
        // }

        if (i !== firstIndex && (secondIndex === -1 || nums[i] > nums[secondIndex])) {
            secondIndex = i
        }
    }
    console.log({ firstIndex, secondIndex})
    return nums[firstIndex] * nums[secondIndex]
}

console.log(maxPairwiseProduct(3, [1,2,3]))
console.log(maxPairwiseProduct(10, [7, 5, 14, 2, 8, 8, 10, 1, 2, 3]))