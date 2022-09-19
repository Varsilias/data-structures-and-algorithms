function largestGap(N) {
  let binary = parseInt(N).toString(2)
  let bn = binary.split('')

  let gapCount = 0
  let gap = [0]

  for (let i = 0; i < bn.length; i++) {
    if (bn[i] == 0) {
      gapCount++
      if (bn[i + 1] == 1) {
        gap.push(gapCount)
        gapCount = 0
      }
    }
  }
  return Math.max(...gap);
}

console.log(largestGap(32))