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
}

/**
 * Ответ API при запросе списка людей.
 */
export type PersonsResponse = {
	/** Массив людей */
	persons: Person[]
}