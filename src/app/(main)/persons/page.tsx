'use client'
import FemaleAvatar from '@/features/persons/assets/female-avatar.png'
import MaleAvatar from '@/features/persons/assets/male-avatar.png'
import { Person } from '@/features/persons/model/persons.type'
import { usePersons } from '@/features/persons/model/use-persons'
import { useTree } from '@/features/tree/model/use-tree'
import Image from 'next/image'
import { useEffect } from 'react'

type Props = {
	person: Person
}

export function PersonMiniCard({ person }: Props) {
	const { firstName, lastName, gender } = person
	const MaleFemaleImage = (gender === 'female') ? FemaleAvatar : MaleAvatar

	return (
		<div className='p-2 flex flex-col items-center gap-4 w-[200] rounded-md'>
			<div className='w-[100] h-[100] p-1 rounded-full bg-gray-900'>
				<Image
					src={MaleFemaleImage}
					width={100}
					height={100}
					alt='Logo'
				/>
			</div>
			<div className='text-center'>{`${firstName} ${lastName}`}</div>
		</div>
	)
}

export default function Persons() {
	const { data: tree } = useTree()
	const { data: persons, isLoading, isError } = usePersons()

	useEffect(() => {
		if (!isLoading) {
			console.log(persons)
		}
	}, [isLoading, persons])

	if (isLoading) return <div className='mt-10 text-center animate-pulse'>Loading...</div>
	if (isError && !persons) return <div className='mt-10 text-center'>Oops...</div>
	if (!persons) return <div className='mt-10 text-center'>Древо пока не заполненно</div>
	if (!tree) return <div className='mt-10 text-center'>Нет древа</div>

	const rootPerson = persons.find(person => person.id === tree.rootPersonId)
	const filterPerson = persons.filter(person => person.id !== tree.rootPersonId)

	if (!rootPerson) return <div>Корневая персона не найдена</div>

	return (
		<div>
			<h1 className='my-4 text-center '>
				Моя родословная
			</h1>
			<div>
				<div className='flex flex-col items-center gap-4'>
					<PersonMiniCard person={rootPerson} />
				</div>
				<ul className='flex justify-center items-center gap-4'>
					{
						filterPerson.map(person => <li key={person.id}><PersonMiniCard person={person} /></li>)
					}
				</ul>
			</div>
		</div>
	)
}