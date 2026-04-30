import { create } from 'zustand'

type RoleType = 'father' | 'mother' | ''

type Store = {
	isOpen: boolean
	role: RoleType
	currentPersonId: number | null
	open: (currentPersonId: number) => void
	close: () => void
	setRole: (role: RoleType) => void
}

export const useModalStore = create<Store>((set) => ({
	isOpen: false,
	role: '',
	currentPersonId: null,
	open: (currentPersonId) => set({ isOpen: true, currentPersonId }),
	close: () => set({ isOpen: false, currentPersonId: null, role: '' }),
	setRole: (role) => set({ role }),
}))