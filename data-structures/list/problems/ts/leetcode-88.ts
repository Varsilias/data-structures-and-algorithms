/**
 Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    if(m === 0) {
        for(let i = 0; i < nums2.length; i++) {
            nums1[i] = nums2[i] 
        }
        return
    }

    for(let i = 0; i < nums2.length; i++) {
        nums1[i+m] = nums2[i]
    }

    nums1.sort((a, b) => a-b)
};

let nums1 = [0], m = 0, nums2 = [1], n = 1
merge(nums1, m, nums2, n)
console.log(nums1)

function merge1(nums1: number[], m: number, nums2: number[], n: number): void {
    let i = m-1
    let j = n-1
    let k = m+n-1

    while(j >= 0) {
        if(i >=0 && nums1[i] > nums2[j]) {
            nums1[k] = nums1[i]
            k--
            i--
        } else {
            nums1[k] = nums2[j]
            k--
            j--
        }
    }
}

nums1 = [4,5,6,0,0,0], m = 3, nums2 = [1,2,3], n = 3
merge(nums1, m, nums2, n)
console.log(nums1)