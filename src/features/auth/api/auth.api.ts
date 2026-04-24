import { apiRequest } from '@/shared/api/client'
import { getToken, removeToken, setToken } from '@/shared/lib/token-storage'


export const loginRequest = async (email: string, password: string) => {
	const { data } = await apiRequest('auth/login', 'POST', { email, password })
	return data
}

export const meRequest = async (token: string) => {
	const { data } = await apiRequest('me', 'GET', undefined, token)
	return data
}

export const checkAuth = async () => {
	try {
		const token = getToken()

		if (!token) {
			return false
		}

		const { data: resMe } = await apiRequest('me', 'GET', undefined, token)
		return resMe.user

	} catch (error) {
		console.error('Login error', error)
		return false
	}
}

export const logout = () => {
	removeToken()
}