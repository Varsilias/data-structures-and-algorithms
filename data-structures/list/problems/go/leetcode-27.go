package problems

var nums = []int{3, 2, 2, 3}
var val = 3

func removeElement(nums []int, val int) int {
	p := 0
	for i := range nums {
		if nums[i] != val {
			nums[p] = nums[i]
			p++
		}
	}
	return p
}
