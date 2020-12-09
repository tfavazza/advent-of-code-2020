'use strict'

// Part 1
// ======
const preamble = 25;
const part1 = input => {
	input = input.split(/\r\n|\r|\n/g).map(string => parseInt(string));

	for (let i = preamble; i < input.length; i++) {
		let windowOfNumbers = makeNewWindow(i, input);
		if (!validNumbers(input[i], windowOfNumbers)) {
			return input[i];
		}
	}
}

const validNumbers = (numberToCheck, windowOfNumbers) => {
	let arrayOfComplements = windowOfNumbers.map(original => numberToCheck - original);
	if (arrayOfComplements.some(number => windowOfNumbers.indexOf(number) >= 0)) {
		return true;
	}
}

const makeNewWindow = (startingPoint, array) => {
	let newWindow = array.slice(startingPoint - preamble, startingPoint);
	return newWindow;
}
// Part 2
// ======
const numberToFind = 1398413738;
const part2 = input => {
		input = input.split(/\r\n|\r|\n/g).map(string => parseInt(string));

	//ignore everything larger than our number
	input = input.slice(0,input.indexOf(numberToFind));

	for(let i = 0; i < input.length; i++) {
		for (let j = i+1; j < input.length; j++) {
			let range = input.slice(i,j).sort( (a, b) => {return a-b});
			if (range.reduce((a, b) => a + b, 0) == numberToFind) {
				return (range[0] + range[range.length-1])
			}
		}
	}
  return 'something has gone awry';
}


module.exports = { part1, part2 }
