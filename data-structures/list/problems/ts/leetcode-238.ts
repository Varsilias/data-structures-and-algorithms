
// Time - O(n), Space O(1)
function productExceptSelf(nums: number[]): number[] {
    let n = nums.length
    let ans = new Array(n)
    ans[0] = 1



  
    // calculate all prefix
    let prefix = 1
    for(let i = 1; i < n; i++) {
        const temp = prefix * nums[i-1]
        ans[i] = temp
        prefix = temp
    }

    // calculate all suffix
    let suffix = 1
    for(let i = n-2; i >= 0; i--) {
        const temp = suffix * nums[i+1]
        ans[i] = ans[i] * temp
        suffix = temp
        
    }

    // console.log({ prefix, suffix})
    // const ans = new Array(n)
    // for(let i = 0; i < n; i++) {
    //     ans[i] = prefix[i] * suffix[i]
    // }

    // return ans
    return ans
};

  // O(n2) - Not good
function productExceptSelf1(nums: number[]): number[] {
    let n = nums.length
    let answer = new Array(n)
     for(let i = 0; i < n; i++) {
        let sum = 1
        for(let j = 0; j < n; j++) {
            if(i === j) continue
            sum *= nums[j]
        }

        answer[i] = sum 
    }

    return answer
};

// Time - O(n), Space O(n)
function productExceptSelf2(nums: number[]): number[] {    
    let n = nums.length
    let prefix = new Array(n)


  
    // calculate all prefix
    prefix[0] = 1
    for(let i = 1; i < n; i++) {
        prefix[i] = prefix[i-1] * nums[i-1]
    }

    // calculate all suffix
    let suffix = 1
    for(let i = n-2; i >= 0; i--) {
        const temp = suffix * nums[i+1]
        prefix[i] = prefix[i] * temp
        suffix = temp
        
    }

    return prefix
};

// Time - O(n), Space O(n)
function productExceptSelf3(nums:  number[]): number[] {

    
    let n = nums.length
    let prefix = new Array(n)
    let suffix = new Array(n)


  
    // calculate all prefix
    prefix[0] = 1
    for(let i = 1; i < n; i++) {
        prefix[i] = prefix[i-1] * nums[i-1]
    }

    // calculate all suffix
    suffix[n-1] = 1
    for(let i = n-2; i >= 0; i--) {
        suffix[i] = suffix[i+1] * nums[i + 1]
    }

    const ans = new Array(n)
    for(let i = 0; i < n; i++) {
        ans[i] = prefix[i] * suffix[i]
    }

    return ans
};