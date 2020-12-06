'use strict'

// Part 1
// ======
    // BFFFBBFRRR: row 70, column 7, seat ID 567.
    // FFFBBBFRRR: row 14, column 7, seat ID 119.
    // BBFFBBFRLL: row 102, column 4, seat ID 820.

const part1 = input => {
	input = input.split(/\r\n|\r|\n/g);
	const highestSeatId = input.map(seat => setUpForBisect(seat)).sort(function(a, b) {return a-b}).slice(-1);
  return highestSeatId;
}

const setUpForBisect= (seat) => {
	let frontAndBack = seat.slice(0,7,);
	let leftAndRight = seat.slice(7);
	return (bisect(frontAndBack, [0,127], 'column') * 8) + bisect(leftAndRight, [0,7], 'row')

} 

const bisect = (directions, minAndMax, columnOrRow) => {
	let firstDirection;
	let secondDirection;
	if (columnOrRow === 'column') {
		firstDirection = 'F';
		secondDirection = 'B';
	}
	if (columnOrRow === 'row') {
		firstDirection = 'L';
		secondDirection = 'R';
	}
	while (directions.length > 0) {
		if (directions.charAt(0) == firstDirection) {
			minAndMax = [minAndMax[0], minAndMax[0] + Math.floor((minAndMax[1] - minAndMax[0]) / 2 )];
		}
		if (directions.charAt(0) == secondDirection) {
			minAndMax = [minAndMax[0] + Math.ceil((minAndMax[1] - minAndMax[0]) / 2), minAndMax[1]];

		}
		if (minAndMax[0] == (minAndMax[1] - 1)) {
			let lastDirection = directions.slice(-1);
			if (lastDirection == firstDirection) {
				return minAndMax[0]
			} else {
				return minAndMax[1]
			}
		}
		directions = directions.slice(1);
	}

}

// Part 2
// ====== The same thing but find the missing number!

const part2 = input => {
	input = input.split(/\r\n|\r|\n/g);
	let missingNumber = input
		.map(seat => setUpForBisect(seat))
		.sort((a, b) => a-b)
		.reduce((acc, cur, ind, arr) => {
			let diff = cur - arr[ind-1];
			if (diff > 1) {
				let i = 1;
				while (i < diff) {
					acc.push(arr[ind-1]+i);
					i++;
				}
			}
			return acc;
		}, []);
	return missingNumber;
}

module.exports = { part1, part2 }
