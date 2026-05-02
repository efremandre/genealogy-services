"use client"

/**
 * Базовый URL для API запросов.
 * Использует переменную окружения NEXT_PUBLIC_API_URL или дефолтный localhost.
 */
const API_BASE_URL: string = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/"

/**
 * Универсальная функция для выполнения HTTP запросов к API.
 *
 * @param path - Путь к API эндпоинту (относительно базового URL)
 * @param method - HTTP метод (GET, POST, PUT, DELETE и т.д.), по умолчанию 'GET'
 * @param body - Тело запроса (объект, который будет сериализован в JSON)
 * @param token - JWT токен для авторизации (опционально)
 * @returns Объект с данными ответа и самим response объектом
 * @throws Error если запрос не удался
 *
 * @example
 * // Получение данных с авторизацией
 * const { data } = await apiRequest('persons', 'GET', undefined, token);
 *
 * @example
 * // Отправка данных
 * const { data } = await apiRequest('auth/login', 'POST', { email, password });
 */
export const apiRequest = async (path: string, method: string = 'GET', body?: any, token?: string) => {
	const headers = {
		"Content-Type": "application/json",
		...(token !== undefined ? { Authorization: `Bearer ${token}` } : {})
	}

	const options = {
		method,
		headers,
		...(body !== undefined ? { body: JSON.stringify(body) } : {})
	}

	const response = await fetch(`${API_BASE_URL}${path}`, options)

	if (!response.ok) {
		throw Error('Request failed! :(')
	}

	const data = await response.json()

	return { data, response }
}