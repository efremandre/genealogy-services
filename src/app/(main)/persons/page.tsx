'use client'
import { Person } from '@/features/persons/model/persons.type'
import { usePersons } from '@/features/persons/model/use-persons'
import { useEffect } from 'react'
import MaleAvatar from '@/features/persons/assets/male-avatar.png'
import Image from 'next/image'

type Props = {
	person: Person
}

export function PersonMiniCard({ person }: Props) {
	const { firstName, lastName, gender } = person

	return (
		<div className='p-2 flex flex-col items-center gap-4 w-[200] rounded-md'>
			<div className='w-[100] h-[100] p-1 rounded-full bg-amber-50'>
				<Image
					src={MaleAvatar}
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
	const { data: persons, isLoading, isError } = usePersons()

	useEffect(() => {
		if (!isLoading) {
			console.log(persons)
		}
	}, [isLoading, persons])

	if (isLoading) return <div className='mt-10 text-center animate-pulse'>Loading...</div>
	if (isError && !persons) return <div className='mt-10 text-center'>Oops...</div>
	if (!persons) return <div className='mt-10 text-center'>Древо пока не заполненно</div>

	return (
		<div>
			<h1 className='my-4 text-center '>
				Моя родословная
			</h1>
			<div>
				<ul className='flex flex-col items-center gap-4'>
					{
						persons.map(person => <li key={person.id}><PersonMiniCard person={person} /></li>)
					}
				</ul>
			</div>
		</div>
	)
}