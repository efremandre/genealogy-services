'use client'

import { useModalDeleteStore } from '@/features/persons/model/modal-delete.store'
import { usePersonStore } from '@/features/persons/model/person.store'
import { usePersons } from '@/features/persons/model/use-persons'
import AprooveDelete from '@/features/persons/ui/modal-aproove-delete'
import { ModalPersons } from '@/features/persons/ui/modal-persons'
import { ModalUpdatePersons } from '@/features/persons/ui/modal-update-persons'
import { applyTreeLayout } from '@/features/tree/lib/tree-layout'
import { mapPersonsToEdges, mapPersonsToNodes } from '@/features/tree/lib/tree-mapper'
import { TreeCanvas } from '@/features/tree/ui/tree-canvas'

export default function TreePage() {
	const { data: persons, isLoading, error } = usePersons()
	const modal = usePersonStore((s) => s.modal)
	const { isOpenModalDelete } = useModalDeleteStore()

	if (isLoading) return <div className="flex items-center justify-center h-screen">Загрузка...</div>
	if (error) return <div className="flex items-center justify-center h-screen">Ошибка загрузки</div>
	if (!persons || persons.length === 0) return <div className="flex items-center justify-center h-screen">Нет данных</div>

	const nodes = mapPersonsToNodes(persons)
	const edges = mapPersonsToEdges(persons)
	const layoutedNodes = applyTreeLayout(nodes, edges)

	return (
		<>
			{modal === 'createPerson' && <ModalPersons />}
			{modal === 'updatePerson' && <ModalUpdatePersons />}
			{isOpenModalDelete && <AprooveDelete />}
			<TreeCanvas nodes={layoutedNodes} edges={edges} />
		</>
	)
}