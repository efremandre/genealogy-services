import { useDeletePerson } from '../model/delete-person'
import { useModalDeleteStore } from '../model/modal-delete.store'

const AprooveDelete = () => {
	const { currentPersonId, closeModalDelete } = useModalDeleteStore()
	const { mutate } = useDeletePerson()

	const getDeletePerson = (value: number | null) => {
		mutate(value)
		closeModalDelete()
	}

	return (
		<div className='fixed w-full h-full z-10 top-0 right-0 flex flex-col justify-center items-center inset-0 bg-black/30 backdrop-blur-sm box-border'>
			<div className='relative p-6 w-fit h-40 flex flex-col justify-center gap-6 bg-blue-950 rounded-xl'>
				<div className='text-center text-xl'>
					<p>Уверены что хотите удалить?</p>
				</div>
				<div className='flex justify-between items-center gap-4'>
					<button onClick={() => getDeletePerson(currentPersonId)} className='flex-[0_1_50%] p-2 border rounded-xs border-gray-600 cursor-pointer hover:opacity-75'>Да</button>
					<button onClick={closeModalDelete} className='flex-[0_1_50%] p-2 bg-red-800 border rounded-xs border-gray-600 cursor-pointer hover:opacity-75'>Отмена</button>
				</div>
			</div>
		</div>
	)
}

export default AprooveDelete