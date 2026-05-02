import { apiRequest } from '@/shared/api/client'
import { removeToken } from '@/shared/lib/token-storage'


export const loginRequest = async (email: string, password: string) => {
	const { data } = await apiRequest('auth/login', 'POST', { email, password })
	return data
}

export const meRequest = async (token: string) => {
	const { data } = await apiRequest('me', 'GET', undefined, token)
	return data
}

export const logout = () => {
	removeToken()
}