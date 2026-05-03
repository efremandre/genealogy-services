export type RoleType = 'father' | 'mother' | ''

/**
 * Тип данных для человека в генеалогическом древе.
 */
export type Person = {
	/** Уникальный идентификатор человека */
	id: number
	/** Имя */
	firstName: string
	/** Фамилия */
	lastName: string
	/** Девичья фамилия */
	maidenName: string
	/** Отчество */
	middleName: string
	/** Пол (male/female) */
	gender: 'male' | 'female'
	/** Год рождения */
	birthYear: number
	/** Месяц рождения */
	birthMonth: number
	/** День рождения */
	birthDay: number
	/** Жив ли человек */
	isAlive: boolean
	/** Год смерти */
	deathYear: number
	/**Месяц смерти */
	deathMonth: number
	/**День смерти */
	deathDay: number
}

/**
 * Ответ API при запросе списка людей.
 */
export type PersonsResponse = {
	/** Массив людей */
	persons: Person[]
}

export type AddRequestPerson = {
	firstName: string
	lastName: string
	maidenName?: string
	middleName?: string
	gender: 'male' | 'female'
	birthYear?: number
	birthMonth?: number
	birthDay?: number
	isAlive: boolean
	deathYear?: number
	deathMonth?: number
	deathDay?: number
}

export type UpdatePerson = {
	firstName?: string
	lastName?: string
	maidenName?: string
	middleName?: string
	birthYear?: number
	birthMonth?: number
	birthDay?: number
	isAlive?: boolean
	deathYear?: number
	deathMonth?: number
	deathDay?: number
	motherId?: number
	fatherId?: number
}

export type UpdatePersonResponse = {
	person: Person
}

export type CreatePersonMutationArgs = {
	body: AddRequestPerson
	currentPersonId: number
	role: 'father' | 'mother' | ''
}