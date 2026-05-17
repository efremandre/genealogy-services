import FemaleAvatar from '@/features/persons/assets/female-avatar.png'
import MaleAvatar from '@/features/persons/assets/male-avatar.png'
import { Person } from '@/features/persons/model/persons.type'
import { SquarePen, SquarePlus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useModalDeleteStore } from '../model/modal-delete.store'
import { usePersonStore } from '../model/person.store'

type Props = {
	person: Person
}

export const PersonMiniCard = ({ person }: Props) => {
	const openModal = usePersonStore((s) => s.open)
	const { openModalDelete } = useModalDeleteStore()
	const { id, firstName, lastName, maidenName, middleName, gender, fatherId, motherId, birthDay, birthMonth, birthYear, deathDay, deathMonth, deathYear } = person
	const MaleFemaleImage = (gender === 'female') ? FemaleAvatar : MaleAvatar

	const formatTwoDigits = (value: number) => {
		return String(value).padStart(2, '0')
	}
	const isName = (name: string) => name ? name : ''
	const isMaidenName = (name: string) => name ? `(${name})` : ''
	const isParent = fatherId || motherId
	const birthDate = [formatTwoDigits(birthDay), formatTwoDigits(birthMonth), birthYear].filter(Boolean).join('.')


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
			<div className='text-center'>
				<div>{`${lastName} ${isMaidenName(maidenName)} ${firstName} ${isName(middleName)}`}</div>
				<div>
					{birthDate.length > 0 && birthDate}
				</div>
			</div>
			<div className='flex justify-between gap-4 opacity-0 transition group-hover:opacity-100'>
				{
					!isParent &&
					<button
						onClick={() => openModalDelete(id)}
						className='p-1 w-[30] h-[30]  flex items-center justify-center bg-amber-50 cursor-pointer text-black text-[10px] rounded-full transition hover:opacity-50'><Trash2 size={16} /></button>
				}
				<button
					onClick={() => openModal('updatePerson', { currentPersonId: id })}
					className='p-1 w-[30] h-[30] flex items-center justify-center bg-amber-50 cursor-pointer text-black text-[10px] rounded-full transition hover:opacity-50'><SquarePen size={16} /></button>
				<button
					onClick={() => {
						console.log('test')

						openModal('createPerson', { currentPersonId: id })
					}}
					className='p-1 w-[30] h-[30]  flex items-center justify-center bg-amber-50 cursor-pointer text-black text-[10px] rounded-full transition hover:opacity-50'
				><SquarePlus size={16} /></button>

			</div>
		</div >
	)
}