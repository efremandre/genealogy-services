'use client'

import { getToken } from '@/shared/lib/token-storage'
import { useQuery } from '@tanstack/react-query'
import { personsRequest } from '../api/persons.api'

export const usePersons = () => {
	return useQuery({
		queryKey: ['persons'],
		queryFn: async () => {
			const token = getToken()

			if (!token) {
				throw new Error('No token')
			}

			const res = await personsRequest(token)
			return res.persons
		},
		retry: false,
	})
}