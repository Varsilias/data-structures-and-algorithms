

// Link to question
// https://leetcode.com/discuss/general-discussion/851939/ancestor-problem












function convertRomNumeralToNum(str) {
	let obj = { I: 1, V: 5, X: 10, L: 50 }
	let sum = 0;

	let strLen = str.length
	
	for (let i = 0; i < strLen; i++) {

		let temp = 0;
		let s = obj[str[i]]
		let ns = obj[str[i + 1]]

		console.log(s, ns)


		if (s === obj[str[i + 1]]) {
			temp += s + obj[str[i + 1]]
		} else if (s < obj[str[i + 1]]) {
			temp = obj[str[i + 1]] - (temp + s)
		} else {
			temp = obj[str[i + 1]] + temp
		}
		// if (s > obj[str[i + 1]]) {
		// }
		
		sum = temp
	}
	
	return sum
}

function sortRoman(names) {
	names.sort((a, b) => a.split(" ")[0] > b.split(" ")[0] ? 1 : -1);

	// console.log(names)
	let map = new Map();

	for (let i = 0; i < names.length; i++) {
		let name = names[i];
		let units = name.split(" ");
		let sumOfNumeral = convertRomNumeralToNum(units[1]);

		// console.log(sumOfNumeral)
		let transformed = `${units[0]} ${sumOfNumeral}`
		map.set(transformed, name)	
	}

	return Array.from(map.keys())

	// let sorted = Array.from(map.keys()).sort((a, b) => {
	// 		return a.split(" ")[1] > b.split(" ")[1] ? -1 : 1;
	// 	})

	// for (let i = 0; i < sorted.length; i++) {
	// 	sorted[i] = map.get(sorted[i]);
	// }
	// return sorted
}

let names = ["Steven XL", "Steven XVI", "David IX", "Mary XV", "Mary XIII", "Mary XX"]

console.log(sortRoman(names))