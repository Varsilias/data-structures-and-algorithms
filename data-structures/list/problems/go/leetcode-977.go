func sortedSquares(nums []int) []int { // [-4,-1,0,3,10]
	n := len(nums)
	res := make([]int, n)

	i := 0
	j := n - 1

	p := n - 1

	for j >= i {
		leftSquare := nums[i] * nums[i]
		rightSquare := nums[j] * nums[j]

		if leftSquare > rightSquare {
			res[p] = leftSquare
			i++
		} else {
			res[p] = rightSquare
			j--
		}
		p--
	}

	return res

}