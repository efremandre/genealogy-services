'use client'

import { getToken } from '@/shared/lib/token-storage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { personsUpdate } from '../api/persons.api'
import { UpdatePersonMutationArgs } from './persons.type'

export const useUpdatePerson = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({
			body,
			currentPersonId
		}: UpdatePersonMutationArgs) => {
			const token = getToken()

			if (!token) {
				throw new Error('No token')
			}

			if (!currentPersonId) {
				throw new Error('No current Person Id')
			}

			if (!body) {
				throw new Error('No body')
			}

			const res = personsUpdate(currentPersonId, body, token)
			return res
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['persons'] })
		},
	})
}