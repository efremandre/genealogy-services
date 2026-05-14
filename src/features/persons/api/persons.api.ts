import { apiRequest } from '@/shared/api/client'
import { CreatePersonRequest, PersonResponse, PersonsResponse, UpdatePerson, UpdatePersonResponse } from '../model/persons.type'

export const personsRequest = async (token: string): Promise<PersonsResponse> => {
	const { data } = await apiRequest('persons', 'GET', undefined, token)
	return data
}

export const personRequest = async (token: string, id: number): Promise<PersonResponse> => {
	const { data } = await apiRequest(`person/${id}`, 'GET', undefined, token)
	return data
}

export const personsCreate = async (body: CreatePersonRequest, token: string): Promise<UpdatePersonResponse> => {
	const { data } = await apiRequest('persons', 'POST', body, token)
	return data
}

export const personsUpdate = async (id: number, body: UpdatePerson, token: string): Promise<UpdatePersonResponse> => {
	const { data } = await apiRequest(`persons/${id}`, 'PATCH', body, token)
	return data
}

export const personsDelete = async (id: number, token: string): Promise<any> => {
	const { data } = await apiRequest(`persons/${id}`, 'DELETE', undefined, token)
	return data
}