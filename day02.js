'use strict'

// Part 1
// ======

const part1 = input => {
		let valid = 0;
		input = input.split(/\r\n|\r|\n/g);
	for (let i = 0; i < input.length; i++) {
		let firstSplit = input[i].split('-');
		let firstNumber = parseInt(firstSplit[0], 10);
		let secondSplit = firstSplit[1].split(" ");
		let secondNumber = parseInt(secondSplit[0], 10);
		let letterToCheck = secondSplit[1].charAt(0);
		let password = secondSplit[2];
		let occurence = password.split(letterToCheck).length - 1;

		if ((firstNumber <= occurence) && (secondNumber >= occurence)) {
			valid = valid + 1;
		}
	}
	return valid;
}
 
// Part 2
// ======

const part2 = input => {
	let valid = 0;
	input = input.split(/\r\n|\r|\n/g);
	//input = ['1-3 a: abcde','1-3 b: cdefg','2-9 c: ccccccccc'];

	for (let i = 0; i < input.length; i++) {
		let firstSplit = input[i].split('-');
		let firstNumber = parseInt(firstSplit[0], 10) - 1;
		let secondSplit = firstSplit[1].split(" ");
		let secondNumber = parseInt(secondSplit[0], 10) -1;
		let letterToCheck = secondSplit[1].charAt(0);
		let password = secondSplit[2];
		let firstIsAMatch = password.charAt(firstNumber) == letterToCheck;
		let secondIsMatch = password.charAt(secondNumber) == letterToCheck;
		if (firstIsAMatch ^ secondIsMatch) {
			valid++
		}
	}
  return valid;
}

module.exports = { part1, part2 }
