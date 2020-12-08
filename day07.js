'use strict'

// Part 1
// ======

let goldBagTypes = {}
let secondTypes = {};
let thirdTypes = {};
let fourthTypes = {};
let fifthTypes = {};
let sixthTypes = {};
let seventhTypes = {};
let eightTypes = {};
let ninthTypes = {};
let tenTypes = {};
let leven = {};

const part1 = input => {
	input = input.split('.').map(a => a.replace(/\n/g, ''));
 input.map(instruction => findBagType(instruction, 'shiny gold bag', goldBagTypes));
 doItAgain(Object.keys(goldBagTypes), input, secondTypes);
 doItAgain(Object.keys(secondTypes), input, thirdTypes);
 // oh god this is so bad i should be doing recursion but gah it took an hour to get to this point 
 let combinedTypes = {
 	...goldBagTypes,
 	...secondTypes
 }
 doItAgain(Object.keys(combinedTypes), input, thirdTypes);
 let allTypes = {
 	...goldBagTypes,
 	...secondTypes,
 	...thirdTypes
 }
doItAgain(Object.keys(allTypes), input, fourthTypes);
allTypes = {
	...allTypes,
	...fourthTypes
}
doItAgain(Object.keys(allTypes), input, fifthTypes);
allTypes = {
	...allTypes,
	...fifthTypes
}
doItAgain(Object.keys(allTypes), input, sixthTypes);
allTypes = {
	...allTypes,
	...sixthTypes
}
doItAgain(Object.keys(allTypes), input, seventhTypes);
allTypes = {
	...allTypes,
	...seventhTypes
}
doItAgain(Object.keys(allTypes), input, eightTypes);
allTypes = {
	...allTypes,
	...eightTypes
}
doItAgain(Object.keys(allTypes), input, ninthTypes);
allTypes = {
	...allTypes,
	...ninthTypes
}
doItAgain(Object.keys(allTypes), input, tenTypes);
allTypes = {
	...allTypes,
	...tenTypes
}
doItAgain(Object.keys(allTypes), input, leven);
allTypes = {
	...allTypes,
	...leven
}
 return Object.keys(allTypes).length;
}

const findBagType = (sentence, type, holder) => {
	if (sentence.includes(type) && sentence.split(' contain')[1].includes(type)) {
		let fitsABag = sentence.split('s contain')[0];
		if (!Object.keys(holder).includes(fitsABag)) {
			holder[fitsABag] = buildWhatItContains(sentence.split(' contain')[1].split(','));
		}
	}
}

const doItAgain = (keys, input, holder) => {
		keys.map(key => {
			input.map(sameInstructions => {
				findBagType(sameInstructions, key, holder)})
			}
		);
}

const buildWhatItContains = (arrayOfContainment) => {
	return arrayOfContainment.map(bag => {
				if (bag.includes('no other bags')) {
			return new Object;
		} else {
			return {'number': bag.slice(0,1),
					'bag': bag.slice(2, bag.indexOf(' bag'))}
		}
	})

}


// Part 2
// ======
let organizedBag = {};
let bagCount = 0;
const part2 = input => {
 input = input.split('.').map(a => a.replace(/\n/g, ''));
input.map(instructions => organizeBag(instructions));
countTheBags(organizedBag['shiny gold'], 1, 1);
return bagCount
}

const organizeBag = (sentence) => {
	let fixed = sentence.split(' bags contain ');
	organizedBag[fixed[0]] = buildWhatItContains(fixed[1].split(', '));
}

const countTheBags = (bagObject, needed, multiplier) => {
	console.log(bagObject);
	bagObject.map(bagInside => {
		if (Object.keys(bagInside).length === 0 && bagInside.constructor === Object) {
			console.log('should be an empty object above this');
			multiplier = 1;
			return;
		} else {
			console.log(`bag count is ${bagCount}, multiplier is ${multiplier}`);
			multiplier = multiplier * needed;
			bagCount = bagCount + (parseInt(bagInside.number) * multiplier);
			console.log(`bag count is ${bagCount}, multiplier is ${multiplier}`);
			countTheBags(organizedBag[bagInside.bag], parseInt(bagInside.number), multiplier);
			multiplier = multiplier / needed;
		}
	});
}

module.exports = { part1, part2 }
