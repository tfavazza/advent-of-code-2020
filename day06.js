'use strict'

// Part 1
// ======

const part1 = input => {
	input = input.split(/\n\n/g).map(a => a.replace(/\n/g, ' '));
	let answer = input.map(a => reduceQuestions(a)).reduce((a,b) => a + b);

	return answer;
}

const reduceQuestions = (singleParty) => {
	let singlePartyArray = singleParty.split(' ');
	let someoneAnsweredYes = singlePartyArray.shift();
	if (singlePartyArray.length === 0 ) {
		return someoneAnsweredYes.length;
	}
	singlePartyArray.forEach(personAnswer => {
		for (let i = 0; i < personAnswer.length; i++){
			if (!someoneAnsweredYes.includes(personAnswer.charAt(i))) {
				someoneAnsweredYes = someoneAnsweredYes + personAnswer.charAt(i);
			}
		}
	})
	return someoneAnsweredYes.length;
}

// Part 2
// ======

const part2 = input => {
	input = input.split(/\n\n/g).map(a => a.replace(/\n/g, ' '));

  return input.map(group => everyoneSaidYes(group)).reduce((a,b) => a+b);
}

const everyoneSaidYes = (singleParty) => {
	let singlePartyArray = singleParty.split(' ');
	let numberOfPeopleInParty = singlePartyArray.length;
	let letterSet = {};
	singlePartyArray.forEach(personAnswer => {
		for (let i = 0; i < personAnswer.length; i++){
			if (Object.keys(letterSet).includes(personAnswer.charAt(i))) {
				letterSet[personAnswer.charAt(i)] = letterSet[personAnswer.charAt(i)] + 1;
			} else {
				letterSet[personAnswer.charAt(i)] = 1;
			}
		}
	})
	let allWhoSaidYesCount = 0;
	for (const key in letterSet) {
		if (letterSet[key] === numberOfPeopleInParty) {
			allWhoSaidYesCount++
		}
	}
	return allWhoSaidYesCount;
}


module.exports = { part1, part2 }
