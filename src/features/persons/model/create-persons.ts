'use client'

import { getToken } from '@/shared/lib/token-storage'
import { useMutation } from '@tanstack/react-query'
import { personsCreate } from '../api/persons.api'
import { AddRequestPerson, PersonsResponse } from './persons.type'

/**
 * Хук для получения списка всех людей из API.
 *
 * Выполняет запрос к API с авторизацией через токен.
 * Кэширует данные с помощью TanStack Query.
 *
 * @returns Объект запроса с данными, состоянием загрузки и ошибками
 *
 * @example
 * const { data: persons, isLoading, error } = usePersons();
 *
 * if (isLoading) return <div>Загрузка...</div>;
 * if (error) return <div>Ошибка: {error.message}</div>;
 *
 * return persons.map(person => <div key={person.id}>{person.firstName}</div>);
 */
export const useCreatePerson = () => {

	return useMutation({
		mutationFn: async (body: AddRequestPerson) => {
			const token = getToken()

			if (!token) {
				throw new Error('No token')
			}

			const res = personsCreate(body, token)
			return res
		},
	})
}