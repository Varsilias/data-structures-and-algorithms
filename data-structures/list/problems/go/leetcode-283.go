package problems

func moveZeroes(nums []int) {
	p := 0
	for i := range nums {
		left := nums[p]
		right := nums[i]

		if right != 0 {
			nums[p] = right
			nums[i] = left
			p++
		}
	}
}
