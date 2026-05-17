'use client'

import {
	Background,
	Controls,
	MiniMap,
	ReactFlow
} from 'reactflow'
import 'reactflow/dist/style.css'
import { EdgeType, NodeType } from '../model/tree.type'
import { PersonNode } from './person-node'

type Props = {
	nodes: (NodeType & { position: { x: number, y: number } })[]
	edges: EdgeType[]
}

export const TreeCanvas = ({ nodes, edges }: Props) => {
	return (
		<div className='w-full h-screen'>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				nodeTypes={{ personNode: PersonNode }}
				nodesDraggable={false}
				nodesConnectable={false}
				fitView
			>
				<Background />
				<Controls />
				<MiniMap />
			</ReactFlow>
		</div>
	)
}