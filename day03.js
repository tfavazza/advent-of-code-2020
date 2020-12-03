'use strict'

// Part 1
// ======
//Starting at the top-left corner of your map and following a slope of right 3 and down 1, how many trees would you encounter?
const part1 = input => {
	input = input.split(/\r\n|\r|\n/g);
	let counter = 0; // gotta stay under 31
	let trees = 0;
	for(let i = 1; i < input.length; i++) {
		//31
		counter = counter + 3;
		if (input[i].charAt(counter % input[i].length) == '#') {
			console.log(`i got hit at row ${i} column ${counter}`)
			trees++;
		}
	}
  return trees;
}

// Part 2
// ======
const treesSlopes = (input, slope, rows) => {
	input = input.split(/\r\n|\r|\n/g);
	let counter = 0; // gotta stay under slope
	let trees = 0;
	for(let i = rows; i < input.length; i = i + rows) {
		counter = counter + slope;
		if (input[i].charAt(counter % input[i].length) == '#') {
			trees++;
		}
	}
  return trees;
}
//Right 3, down 1. (This is the slope you already checked.)
//Right 5, down 1.
//Right 7, down 1.
//Right 1, down 2.

const part2 = input => {
	const a = treesSlopes(input, 1, 1);
	const b = treesSlopes(input, 3, 1);
	const c = treesSlopes(input, 5, 1);
	const d = treesSlopes(input, 7, 1);
	const e = treesSlopes(input, 1, 2);
	console.log(a);
	console.log(b);
	console.log(c);
	console.log(d);
	console.log(e);
	console.log(a*b*c*d*e);
}


module.exports = { part1, part2 }
