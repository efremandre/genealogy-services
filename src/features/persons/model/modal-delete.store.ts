import { create } from 'zustand'

type Store = {
	isOpenModalDelete: boolean
	currentPersonId: number | null
	openModalDelete: (id: number) => void
	closeModalDelete: () => void
}

export const useModalDeleteStore = create<Store>((set) => ({
	isOpenModalDelete: false,
	currentPersonId: null,
	openModalDelete: (id) => set({ isOpenModalDelete: true, currentPersonId: id }),
	closeModalDelete: () => set({ isOpenModalDelete: false, currentPersonId: null })
}))