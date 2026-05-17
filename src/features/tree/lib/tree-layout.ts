import dagre from 'dagre'
import { EdgeType, NodeType } from '../model/tree.type'

export const applyTreeLayout = (
	nodes: NodeType[],
	edges: EdgeType[]
): (NodeType & { position: { x: number, y: number } })[] => {
	const g = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}))

	g.setGraph({
		rankdir: 'TB',
		nodesep: 160,
		ranksep: 160
	})

	nodes.forEach((node) => g.setNode(node.id, { width: 180, height: 180 }))
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