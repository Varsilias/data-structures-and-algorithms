package problems

func removeDuplicatesMedium(nums []int) int {
	p := 2
	for i := 2; i < len(nums); i++ {

		if nums[i] != nums[p-2] {
			curr := nums[i]
			nums[i] = nums[p]
			nums[p] = curr
			p++
		}
	}
	return p
}
