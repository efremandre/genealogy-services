import { apiRequest } from '@/shared/api/client'
import { TreeResponse } from '../model/tree.type'

export const treeRequest = async (token: string): Promise<TreeResponse> => {
	const { data } = await apiRequest('tree', 'GET', undefined, token)
	return data
}