'use client'

import { getToken } from '@/shared/lib/token-storage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { personsUpdate } from '../api/persons.api'
import { useModalStore } from './modal.store'
import { UpdatePerson } from './persons.type'

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
export const useUpdatePerson = () => {
	const { currentPersonId } = useModalStore()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (body: UpdatePerson) => {
			const token = getToken()

			if (!token) {
				throw new Error('No token')
			}

			if (!currentPersonId) {
				throw new Error('No current Person Id')
			}

			const res = personsUpdate(currentPersonId, body, token)
			return res
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['persons'] })
		},
	})
}