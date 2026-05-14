'use client'
import { useModalDeleteStore } from '@/features/persons/model/modal-delete.store'
import { usePersonStore } from '@/features/persons/model/person.store'
import { usePersons } from '@/features/persons/model/use-persons'
import AprooveDelete from '@/features/persons/ui/modal-aproove-delete'
import { ModalPersons } from '@/features/persons/ui/modal-persons'
import { ModalUpdatePersons } from '@/features/persons/ui/modal-update-persons'
import { PersonMiniCard } from '@/features/persons/ui/person-mini-card'
import { useTree } from '@/features/tree/model/use-tree'
import { Loader } from '@/shared/ui/loader'

const Persons = () => {
	const modal = usePersonStore((s) => s.modal)
	const { isOpenModalDelete } = useModalDeleteStore()
	const { data: tree } = useTree()
	const { data: persons, isLoading, isError } = usePersons()

	if (isLoading) return <Loader />
	if (isError && !persons) return <div className='mt-10 text-center'>Oops...</div>
	if (!persons) return <div className='mt-10 text-center'>Древо пока не заполненно</div>
	if (!tree) return <div className='mt-10 text-center'>Нет древа</div>

	const rootPerson = persons.find(person => person.id === tree.rootPersonId)
	const filterPerson = persons.filter(person => person.id !== tree.rootPersonId)

	if (!rootPerson) return <div>Корневая персона не найдена</div>

	return (
		<div>
			{modal === 'createPerson' && <ModalPersons />}
			{modal === 'updatePerson' && <ModalUpdatePersons />}
			{isOpenModalDelete && <AprooveDelete />}
			<h1 className='my-4 text-center '>
				Моя родословная
			</h1>
			<div>
				<div className='flex flex-col items-center gap-4'>
					<PersonMiniCard person={rootPerson} />
				</div>
				<ul className='flex justify-center items-center flex-wrap gap-4'>
					{
						filterPerson.map(person => <li key={person.id}><PersonMiniCard person={person} /></li>)
					}
				</ul>
			</div>
		</div >
	)
}

export default Persons