'use strict'

// Part 1
// ======
let acc = 0;
let outsideCounter = 0;
let replacedValue = [];
let visitedSet = new Set()
const part1 = input => {
	input = input.split(/\r\n|\r|\n/g);
	// input = [
	// 	'nop +0',
	// 	'acc +1',
	// 	'jmp +4',
	// 	'acc +3',
	// 	'jmp -3',
	// 	'acc -99',
	// 	'acc +1',
	// 	'jmp -4',
	// 	'acc +6'
	// ]
	return parseParameters(input);
}

const parseParameters = (input) => {
	for (let i = 0; i < input.length; i++) {
		let instructionArray = input[i].split(' ');
		if (visitedSet.has(i)) {
			console.log('found the loop!');
			return acc;
		}
		visitedSet.add(i);
		switch(instructionArray[0]) {
				case 'nop':
				outsideCounter = i+1;
				break;
				case 'acc':
					acc = acc + parseInt(instructionArray[1])
					outsideCounter = i+1;
				break;
				case 'jmp':
					i = (i-1) + parseInt(instructionArray[1]);
					outsideCounter = i+1;
				break;
				default:
				console.log('whoops');
				break;
			}
	}
	return false;
}


// Part 2
// ======

const part2 = input => {
	input = input.split(/\r\n|\r|\n/g);
	// 	input = [
	// 	'nop +0',
	// 	'acc +1',
	// 	'jmp +4',
	// 	'acc +3',
	// 	'jmp -3',
	// 	'acc -99',
	// 	'acc +1',
	// 	'jmp -4',
	// 	'acc +6'
	// ]
	 return fixTheBuild(input);
}

const fixTheBuild = input => {
	// this was shallow copied before and caused SO. MUCH. PAIN 
	let pristineCopy = JSON.parse(JSON.stringify(input));

	for (let i = 0; i < input.length; i++) {
		// dealing with the first go round
		if (replacedValue.length > 0) {
			input[replacedValue[0]] = replacedValue[1];
		}

		// input.length will be one outside of instructions
		if (outsideCounter == input.length) {
			console.log('WE DID IT');
			return acc;
		}

		// reset acc for every loop
		acc = 0;
		visitedSet = new Set()
		let instructionArray = input[i].split(' ');

		// could've been switch statement again.. eh
		if (instructionArray[0] === 'nop') {
			replacedValue = [i, input[i]];
			input[i] = 'jmp ' + instructionArray[1];
			parseForPartTwo(input);
		}
		else if (instructionArray[0] == 'jmp') {
			replacedValue = [i, input[i]];
			input[i] = 'nop ' + instructionArray[1];
			parseForPartTwo(input); 
		} else {
			parseForPartTwo(input);
		}
	}
}

// copypaste code 
const parseForPartTwo = (input) => {
	for (let i = 0; i < input.length; i++) {
		let instructionArray = input[i].split(' ');
		if (visitedSet.has(i)) {
			visitedSet = new Set()
			acc = 0;
			return;
		}
		visitedSet.add(i);
		switch(instructionArray[0]) {
				case 'nop':
				outsideCounter = i+1;
				break;
				case 'acc':
					acc = acc + parseInt(instructionArray[1])
					outsideCounter = i+1;
				break;
				case 'jmp':
					i = (i-1) + parseInt(instructionArray[1]);
					outsideCounter = i+1;
				break;
				default:
				console.log('whoops');
				break;
			}
	}
	return false;
}

module.exports = { part1, part2 }
