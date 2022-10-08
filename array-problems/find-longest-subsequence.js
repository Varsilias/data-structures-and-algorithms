function solution(X, S) {
	let result = 0;

	for(let i = 0; i < X.length; i++) {
		let frag = [];
		
		frag[i] = X[i];

		if(X[i] === S) {
			result++;
		}

		for(let j = i + 1; j < X.length; j++) {
			let sum = frag[j - 1] + X[j];

			frag[j] = sum;

			if (sum / (j - i + 1) == S) {
          result++;
      }
		}
	}

	return result;
}

console.log(solution([0, 4, 3, -1], 2));