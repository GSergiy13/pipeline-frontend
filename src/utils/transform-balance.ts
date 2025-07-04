export function transformBalance(balance: number): string {
	return balance.toLocaleString('fr-FR').replace(/\u202f/g, ' ')
}
