'use client'

import { getToken } from '@/shared/lib/token-storage'
import { useQuery } from '@tanstack/react-query'
import { personRequest } from '../api/persons.api'

export const usePerson = (id: number | undefined) => {
	return useQuery({
		queryKey: ['person', id],
		queryFn: async () => {
			const token = getToken()

			if (!token) {
				throw new Error('No token')
			}

			if (!id || id === undefined) {
				throw new Error('No id')
			}

			const res = await personRequest(token, id)
			return res.person
		},
		enabled: id !== undefined,
		retry: false,
	})
}