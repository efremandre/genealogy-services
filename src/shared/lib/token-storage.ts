'use client	'

const TOKEN_KEY: string = 'auth_token'

/**
 * Возвращает JWT из localStorage.
 */

export function getToken(): string | null {
	try {
		if (typeof window === 'undefined') return null
		return window.localStorage.getItem(TOKEN_KEY)
	} catch (error) {
		return null
	}
}

/**
 * Сохраняет JWT в localStorage.
 */

export function setToken(token: string): void {
	try {
		if (typeof window === 'undefined') return
		window.localStorage.setItem(TOKEN_KEY, token)
	} catch (error) {
		// Для MVP молча игнорируем.
	}
}

/**
 * Удаляет JWT из localStorage.
 */

export function removeToken(): void {
	try {
		if (typeof window === 'undefined') return
		window.localStorage.removeItem(TOKEN_KEY)
	} catch (error) {
		// Для MVP молча игнорируем.
	}
}