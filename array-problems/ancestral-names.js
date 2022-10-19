

// Link to question
// https://leetcode.com/discuss/general-discussion/851939/ancestor-problem






function convertRomNumeralToNum(str) {
	let obj = { I: 1, V: 5, X: 10, L: 50 }
	let strLen = str.length; 

	

	let temp = 0; 
	
	for (let i = 0; i < strLen; i++) {

		let s = obj[str[i]]
		let ns = obj[str[i + 1]]

		if (s < ns) {
			temp -= s
		} else {
			temp += s
		}
		
		
		
	}	
	return temp
}

function sortRoman(names) {
	names.sort((a, b) => a.split(" ")[0] > b.split(" ")[0] ? 1 : -1); // O(n)

	let map = new Map();
	// O(n * m) where m = length of the roman numeral part of the string
	for (let i = 0; i < names.length; i++) {
		
		let name = names[i];
		let units = name.split(" ");
		let sumOfNumeral = convertRomNumeralToNum(units[1]);
		let transformed = `${units[0]} ${sumOfNumeral}`
		
		map.set(transformed, name)	
	}

// Sort the map keys by name and number 
	let sorted = Array.from(map.keys()).sort((a, b) => { // O(n)
		let aSplits = a.split(" ");
		let bSplits = b.split(" ")
		
		if (aSplits[0] === bSplits[0]) { // if the names are the same sort by roman numerals
			if (aSplits[1] > bSplits[1]) {
				return 1
			} else {			
				return -1
			}
		}
		if (aSplits[0] > bSplits[0]) {
			return 1
		} else {			
			return -1
		}

	})
	
	for (let i = 0; i < sorted.length; i++) { // O(n)
		sorted[i] = map.get(sorted[i]); // set every element at the sorted array to the original value(input) 
		// David 9 ===> David IX
	}
	return sorted

	// time complexity => O(n) + O(n * m) + O(n) + O(n) = O(n) + O(n) + O(n) + O(n) =========> O(N)
	// Space Complexity ====> O(N) N = length of Entries in the Map
}

let names = [
	"Steven XL", 
	"Steven XVI", 
	"David IX", 
	"Mary XV", 
	"Mary XIII", 
	"Mary XX"
]

console.log(sortRoman(names))