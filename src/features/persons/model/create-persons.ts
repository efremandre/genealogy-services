'use client'

import { getToken } from '@/shared/lib/token-storage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { personsCreate, personsUpdate } from '../api/persons.api'
import { CreatePersonMutationArgs } from './persons.type'

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
				throw new Error('No role or body')
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