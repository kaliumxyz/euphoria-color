function hueHash(text, offset = 0) {
	// DJBX33A-ish.
	let val = 0
	for (let i = 0; i < text.length; i++) {
		// scramble char codes across [0-255]
		// prime multiple chosen so @greenie can green, and @redtaboo red.
		const charVal = (text.charCodeAt(i) * 439) % 256

		// multiply val by 33 while constraining within signed 32 bit int range.
		// this keeps the value within Number.MAX_SAFE_INTEGER without throwing out
		// information.
		const origVal = val
		val = val << 5
		val += origVal

		// add the character information to the hash.
		val += charVal
	}

	// cast the result of the final character addition to a 32 bit int.
	val = val << 0 

	// add the minimum possible value, to ensure that val is positive (without
	// throwing out information).
	val += 2147483648

	// add the calibration offset and scale within 0-254 (an arbitrary range kept
	// for consistency with prior behavior).
	return (val + offset) % 255
}

module.exports = color
