import FemaleAvatar from '@/features/persons/assets/female-avatar.png'
import MaleAvatar from '@/features/persons/assets/male-avatar.png'
import { Person } from '@/features/persons/model/persons.type'
import Image from 'next/image'
import { useModalStore } from '../model/modal.store'


type Props = {
	person: Person
}

export const PersonMiniCard = ({ person }: Props) => {
	const { open } = useModalStore()
	const { id, firstName, lastName, gender } = person
	const MaleFemaleImage = (gender === 'female') ? FemaleAvatar : MaleAvatar

	return (
		<div className='p-2 flex flex-col items-center gap-4 w-[200] rounded-md group relative'>
			<div className='w-[100] h-[100] p-1 rounded-full bg-gray-900'>
				<Image
					src={MaleFemaleImage}
					width={100}
					height={100}
					alt='Logo'
				/>
			</div>
			<div className='text-center'>{`${firstName} ${lastName}`}</div>
			<div className='flex justify-between gap-2 opacity-0 transition group-hover:opacity-100'>
				<button
					onClick={() => open(id)}
					className='p-1 w-[30] h-[30] bg-amber-50 cursor-pointer text-black text-[10px] rounded-full transition hover:opacity-50'
				>+</button>

				<button className='p-1 w-[30] h-[30] bg-amber-50 cursor-pointer text-black text-[10px] rounded-full transition hover:opacity-50'>-</button>

				<button className='p-1 w-[30] h-[30] bg-amber-50 cursor-pointer text-black text-[10px] rounded-full transition hover:opacity-50'>@</button>

			</div>
		</div >
	)
}