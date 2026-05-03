'use client'

import { getToken } from '@/shared/lib/token-storage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { personsDelete } from '../api/persons.api'

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
export const useDeletePerson = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (currentPersonId: number | null) => {
			const token = getToken()

			if (!token) {
				throw new Error('No token')
			}

			if (!currentPersonId) {
				throw new Error('No current Person Id')
			}

			const res = await personsDelete(currentPersonId, token)

			return res
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['persons'] })
		},
	})
}