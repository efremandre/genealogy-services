'use client'

import { getToken } from '@/shared/lib/token-storage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { personsCreate, personsUpdate } from '../api/persons.api'
import { CreatePersonMutationArgs } from './persons.type'

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
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({
			body,
			currentPersonId,
			role
		}: CreatePersonMutationArgs) => {
			const token = getToken()

			if (!token) {
				throw new Error('No token')
			}

			if (!role && !body) {
				throw new Error('No token')
			}
			const gender: 'male' | 'female' = (role === 'father') ? 'male' : 'female'
			const createdPerson = await personsCreate({ ...body, gender }, token)
			const newPersonId = createdPerson.person.id
			const parentIdField = role === 'father' ? 'fatherId' : 'motherId'
			const updateParentPerson = await personsUpdate(currentPersonId, { [parentIdField]: newPersonId }, token)

			return updateParentPerson
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['persons'] })
		},
	})
}