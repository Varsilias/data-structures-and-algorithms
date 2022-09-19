function heightChecker(heights) {
  let arr = [...heights];
  let corOrder = arr.sort((a, b) => a - b)
  let num = 0;

  // let p = 0
  for(let i = 0; i < heights.length; i++) {
    if(heights[i] !== corOrder[i]) {
      num++
    }
  }

  return num
}

console.log(heightChecker([1,1,4,2,1,3]))
console.log(heightChecker([5,1,2,3,4]))
console.log(heightChecker([1,2,3,4,5]))