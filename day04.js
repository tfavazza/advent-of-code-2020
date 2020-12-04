'use strict'

// Part 1
// ======
    // byr (Birth Year)
    // iyr (Issue Year)
    // eyr (Expiration Year)
    // hgt (Height)
    // hcl (Hair Color)
    // ecl (Eye Color)
    // pid (Passport ID)
    // cid (Country ID)


const part1 = input => {
	input = input.split(/\n\n/g).map(a => a.replace(/\n/g, ' '));
	return hasAllNeededCriteria(input);
}

const hasAllNeededCriteria = (passports) => {
	let validPassports = [];
	let criterias = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
	// we'll do it all in one line, it'll be great!
	return passports
	.map(passport => criterias
		.map(criteria => hasThisNeededCriteria(passport, criteria))
		.filter(criteriaResult => criteriaResult === true))
	.filter(trueCount => trueCount.length == 7)
	.length;
}
const hasThisNeededCriteria = (passport, criteria) => {
	const regex = RegExp(criteria);
	return regex.test(passport);
}

// Part 2
// ======
// byr (Birth Year) - four digits; at least 1920 and at most 2002.
// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
// hgt (Height) - a number followed by either cm or in:
//     If cm, the number must be at least 150 and at most 193.
//     If in, the number must be at least 59 and at most 76.
// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
// pid (Passport ID) - a nine-digit number, including leading zeroes.

const part2 = input => {
	input = input.split(/\n\n/g).map(a => a.replace(/\n/g, ' '));
	return hasAllNeededComplexCriteria(input);
}

const hasAllNeededComplexCriteria = (passports) => {
	let validPassports = [];
	let criterias = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
	return passports
	.map(passport => criterias
		.map(criteria => hasThisNeededComplexCriteria(passport, criteria))
		.filter(criteriaResult => criteriaResult === true))
	.filter(trueCount => trueCount.length == 7)
	.length;

}

const hasThisNeededComplexCriteria = (passport, criteria) => {
	const regex = RegExp(criteria);
	if (regex.test(passport)) {
		// split the split to get the bits we want
		let substring = passport.split(criteria + ":")[1].split(" ")[0];
		switch(criteria) {

	  	case 'byr':
	  		return substring >= 1920 && substring <= 2002;
	    break;

	  	case 'iyr':
	  		return substring >= 2010 && substring <= 2020;
	    break;

	    case 'eyr':
	  		return substring >= 2020 && substring <= 2030;
	    break;

	    case 'hgt':
	    	if (substring.includes("cm")) {
	    		let height = substring.split("cm")[0];
	    		return height >= 150 && height <= 193;
	    	} else if (substring.includes("in")) {
	    		let height = substring.split("in")[0];
	    		return height >= 59 && height <= 76;
	    	} else {
	    	    return false;		
	    	}
	    break;

	    case 'hcl':
	    	return /^#[0-9A-F]{6}$/i.test(substring)
	    break;

	    case 'ecl':
	      	return /(amb)|(blu)|(brn)|(gry)|(grn)|(hzl)|(oth)/i.test(substring);
	    break;

	    case 'pid':
	        return /^\d{9}$/.test(substring);
	    break;

	  	default:
	  		return false;
	  	}
	}
	// I could've run it through the simple check first but ehhhh, we'll do it here
	return false;
} 	


module.exports = { part1, part2 }
