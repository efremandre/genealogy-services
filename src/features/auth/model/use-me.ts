'use client'

import { useQuery } from '@tanstack/react-query'
import { meRequest } from '../api/auth.api'
import { getToken } from '@/shared/lib/token-storage'

export const useMe = () => {
	return useQuery({
		queryKey: ['me'],
		queryFn: async () => {
			const token = getToken()

			if (!token) {
				throw new Error('No token')
			}

			const res = await meRequest(token)
			return res.user
		},
		retry: false,
	})
}