import { Person } from '@/features/persons/model/persons.type'
import { PersonMiniCard } from '@/features/persons/ui/person-mini-card'
import { Handle, NodeProps, Position } from 'reactflow'

type Props = NodeProps<{
	person: Person
}>

export const PersonNode = ({ data }: Props) => {
	const { person } = data

	return (
		<div>
			<div className='p-2 flex flex-col items-center gap-4 w-[200] rounded-md group relative'>
				<PersonMiniCard person={person} />
			</div >
			<Handle type='target' position={Position.Top} />
			<Handle type='source' position={Position.Bottom} />
		</div>
	)
}