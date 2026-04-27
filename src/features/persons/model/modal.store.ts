import { create } from 'zustand'

type Store = {
	isOpen: boolean
	role: string
	open: (role?: 'father' | 'mother') => void
	close: () => void
	setRole: (role: string) => void
}

export const useModalStore = create<Store>((set) => ({
	isOpen: false,
	role: '',
	open: (role) => set({ isOpen: true, role: role || '' }),
	close: () => set({ isOpen: false, role: '' }),
	setRole: (role) => set({ role }),
}))