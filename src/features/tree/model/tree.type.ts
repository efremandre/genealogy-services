import { Person } from '@/features/persons/model/persons.type'

export type Tree = {
	id: number,
	name: string,
	rootPersonId: number
}

export type TreeResponse = {
	tree: Tree
}

export type NodeType = {
	id: string
	data: {
		label: string
		person: Person
	}
	type: 'personNode'
}

export type EdgeType = {
	id: string
	source: string
	target: string
	label?: string
}