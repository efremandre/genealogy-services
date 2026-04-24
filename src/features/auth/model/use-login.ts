'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { loginRequest } from '../api/auth.api'
import { setToken } from '@/shared/lib/token-storage'

export const useLogin = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({
			email,
			password,
		}: {
			email: string
			password: string
		}) => {
			const res = await loginRequest(email, password)

			if (!res.token) {
				throw new Error('No token')
			}

			setToken(res.token)

			return res
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['me'] })
		},
	})
}