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
	gender: 'male' | 'female'
	birthYear?: number
	birthMonth?: number
	birthDay?: number
	isAlive: boolean
	deathYear?: number
	deathMonth?: number
	deathDay?: number
}