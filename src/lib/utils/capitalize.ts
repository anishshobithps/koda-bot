/**
 * Capitalize the first letter in a string.
 * @param {string}
 * @returns {string}
 */
export function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
