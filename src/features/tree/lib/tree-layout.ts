import dagre from 'dagre'
import { EdgeType, NodeType } from '../model/tree.type'

export const applyTreeLayout = (
	nodes: NodeType[],
	edges: EdgeType[]
): NodeType[] => {
	const g = new dagre.graphlib.Graph()

	g.setGraph({
		rankdir: 'BT',
		nodesep: 50,
		ranksep: 100
	})

	nodes.forEach((node) => g.setNode(node.id, { width: 180, height: 60 }))
	edges.forEach((edge) => g.setEdge(edge.source, edge.target))
	dagre.layout(g)

	return nodes.map((node) => ({
		...node,
		position: {
			x: g.node(node.id).x - 90,
			y: g.node(node.id).y - 30
		}
	}))
}

