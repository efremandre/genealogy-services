"use client"


const API_BASE_URL: string = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/"


export const apiRequest = async (patch: string, method: string = 'GET', body?: any, token?: string) => {
	const headers = {
		"Content-Type": "application/json",
		...(token !== undefined ? { Authorization: `Bearer ${token}` } : {})
	}

	const options = {
		method,
		headers,
		...(body !== undefined ? { body: JSON.stringify(body) } : {})
	}

	const response = await fetch(`${API_BASE_URL}${patch}`, options)

	if (!response.ok) {
		throw Error('Request failed! :(')
	}

	const data = await response.json()

	return { data, response }
}