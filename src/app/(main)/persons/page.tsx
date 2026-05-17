'use client'

import { usePersons } from '@/features/persons/model/use-persons'
import { useTree } from '@/features/tree/model/use-tree'
import { Loader } from '@/shared/ui/loader'

const Persons = () => {
	const { data: tree } = useTree()
	const { data: persons, isLoading, isError } = usePersons()

	if (isLoading) return <Loader />
	if (isError && !persons) return <div className='mt-10 text-center'>Oops...</div>
	if (!persons) return <div className='mt-10 text-center'>Персоны ещё не добавлены</div>
	if (!tree) return <div className='mt-10 text-center'>Нет древа</div>

	const filterPerson = persons.filter(person => person.id !== tree.rootPersonId)

	return (
		<div>
			<div>
				<ul className='flex flex-col gap-4 mt-10'>
					{
						filterPerson.map(person => (
							<li key={person.id}>
								<p>{person.firstName} {person.lastName}</p>
							</li>
						))
					}
				</ul>
			</div>
		</div >
	)
}

export default Persons