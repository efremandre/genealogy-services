import { apiRequest } from '@/shared/api/client'
import { PersonsResponse } from '../model/persons.type'

export const personsRequest = async (token: string): Promise<PersonsResponse> => {
	const { data } = await apiRequest('persons', 'GET', undefined, token)
	return data
}