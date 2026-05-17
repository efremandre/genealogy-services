import { Person } from '@/features/persons/model/persons.type'
import { EdgeType, NodeType } from '../model/tree.type'

export const mapPersonsToNodes = (persons: Person[]): NodeType[] => {
	return persons.map((person) => ({
		id: String(person.id),
		data: {
			label: `${person.firstName} ${person.lastName} ${person.birthYear ? ` (${person.birthYear})` : ''}`,
			person
		},
		type: 'personNode'
	}
	))
}

export const mapPersonsToEdges = (persons: Person[]): EdgeType[] => {
	const edges = persons.flatMap((person) => {
		const parentEdges: EdgeType[] = []
		if (person.fatherId && person.fatherId !== null) {
			parentEdges.push({
				id: `edge-${person.id}-${person.fatherId}`,
				source: String(person.fatherId),
				target: String(person.id),
				type: 'step'
			})
		}

		if (person.motherId && person.motherId !== null) {
			parentEdges.push({
				id: `edge-${person.id}-${person.motherId}`,
				source: String(person.motherId),
				target: String(person.id),
				type: 'step'
			})
		}

		return parentEdges
	})

	return edges
}