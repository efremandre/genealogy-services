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
	/**Айди отца */
	fatherId: number
	/**Айди матери */
	motherId: number
}

/**
 * Ответ API при запросе списка людей.
 */
export type PersonsResponse = {
	/** Массив людей */
	persons: Person[]
}

export type PersonResponse = {
	/** Массив людей */
	person: Person
}

export type ParentType = 'father' | 'mother'

export type CreatePersonRequest = {
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

export type CreatePersonFormValues = Omit<CreatePersonRequest, 'gender'> & {
	role: ParentType | ''
}

export type UpdatePersonResponse = {
	person: Person
}

export type CreatePersonMutationArgs = {
	body: Omit<CreatePersonRequest, 'gender'>
	currentPersonId: number
	role: ParentType | ''
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
}

export type UpdatePersonFormValues = UpdatePerson

export type UpdatePersonMutationArgs = {
	body: UpdatePerson
	currentPersonId: number
}