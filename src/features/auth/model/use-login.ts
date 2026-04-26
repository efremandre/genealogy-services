'use client'

import { setToken } from '@/shared/lib/token-storage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { loginRequest } from '../api/auth.api'

/**
 * Хук для выполнения входа пользователя в систему.
 *
 * Выполняет мутацию для аутентификации, сохраняет токен в localStorage
 * и инвалидирует кэш для текущего пользователя.
 *
 * @returns Мутационный объект TanStack Query с методами mutate, isLoading, error и т.д.
 *
 * @example
 * const loginMutation = useLogin();
 *
 * const handleLogin = (email: string, password: string) => {
 *   loginMutation.mutate({ email, password });
 * };
 */
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