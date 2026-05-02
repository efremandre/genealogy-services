import { apiRequest } from '@/shared/api/client'
import { AddRequestPerson, PersonsResponse, UpdatePerson, UpdatePersonResponse } from '../model/persons.type'

export const personsRequest = async (token: string): Promise<PersonsResponse> => {
	const { data } = await apiRequest('persons', 'GET', undefined, token)
	return data
}

export const personsCreate = async (body: AddRequestPerson, token: string): Promise<UpdatePersonResponse> => {
	const { data } = await apiRequest('persons', 'POST', body, token)
	return data
}

export const personsUpdate = async (id: number, body: UpdatePerson, token: string): Promise<UpdatePersonResponse> => {
	const { data } = await apiRequest(`persons/${id}`, 'PATCH', body, token)
	return data
}