import { apiRequest } from '@/shared/api/client'
import { setToken, getToken } from '@/shared/lib/token-storage'

export const login = async (email: string, password: string) => {
	try {
		const { data: resLogin } = await apiRequest('auth/login', 'POST', {
			email,
			password
		})

		if (!resLogin.token) {
			throw new Error('No token')
		}

		setToken(resLogin.token)

		const { data: resMe } = await apiRequest('me', 'GET', undefined, resLogin.token)

		return resMe.user

	} catch (error) {
		console.error('Login error', error)
		throw error
	}
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