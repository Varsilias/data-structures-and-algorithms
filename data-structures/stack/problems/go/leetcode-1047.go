package problems

import "strings"

func removeDuplicates(s string) string {
	stack := []rune{}

	for _, c := range s {
		if len(stack) > 0 && stack[len(stack)-1] == c {
			stack = stack[:len(stack)-1]
		} else {
			stack = append(stack, c)
		}
	}

	var sb strings.Builder
	for _, r := range stack {
		sb.WriteRune(r)
	}

	return sb.String()

}
