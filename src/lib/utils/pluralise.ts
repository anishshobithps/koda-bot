/**
 * Pluralises a string
 * @param word The word to pluralise
 * @param count The number of items
 * @example
 * pluralise('cat', 1) // 'cat'
 * pluralise('cat', 2) // 'cats'
 * @returns The pluralised string.
 */
export function pluralise(word: string, count: number): string {
	return count === 1 ? word : `${word}s`;
}
