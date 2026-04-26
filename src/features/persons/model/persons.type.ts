export type Person = {
	id: number
	firstName: string
	lastName: string
	gender: 'male' | 'female' | string
	birthYear: number
	birthMonth: number
	birthDay: number
	isAlive: boolean
}

export type PersonsResponse = {
	persons: Person[]
}