'use strict'

// Part 1
// ======

const part1 = input => {
	input = input.split(/\r\n|\r|\n/g);

	for (let i = 0; i < input.length; i++) {
		let matchedInput = 2020 - input[i];
		if (input.includes(matchedInput.toString())) {
			return input[i] * matchedInput;
		}
	}
	return 'found nothing';
}

// Part 2
// ======

const part2 = input => {
	input = input.split(/\r\n|\r|\n/g).map(function(v) {
  return parseInt(v, 10);
});
	for (let i = 0; i < input.length; i++) {
		for (let j = 0; j < input.length; j++) {
			for (let k = 0; k < input.length; k++) {
				if (input[i] + input[j] + input[k] == 2020) {
					return (input[i] * input[j] * input[k]);
				}
			}
		}
	}
	return 'found nothing';
}

module.exports = { part1, part2 }
