'use client'

import { getToken } from '@/shared/lib/token-storage'
import { useQuery } from '@tanstack/react-query'
import { treeRequest } from '../api/tree.api'

export const useTree = () => {
	return useQuery({
		queryKey: ['tree'],
		queryFn: async () => {
			const token = getToken()

			if (!token) {
				throw new Error('No token')
			}

			const res = await treeRequest(token)
			return res.tree
		},
		retry: false,
	})
}