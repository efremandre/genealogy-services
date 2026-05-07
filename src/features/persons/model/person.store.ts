import { create } from 'zustand'
import { ParentType } from './persons.type'

type ModalType = 'createPerson' | 'deletePerson' | null

type Store = {
	modal: ModalType
	payload: {
		currentPersonId?: number
		role?: ParentType
	} | null
	open: (modal: ModalType, payload?: Store['payload']) => void
	close: () => void
}

export const usePersonStore = create<Store>((set) => ({
	modal: null,
	payload: null,
	open: (modal, payload) => set({ modal, payload }),
	close: () => set({ modal: null, payload: null })
}))