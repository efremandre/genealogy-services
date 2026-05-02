export const days = Array.from({ length: 31 }, (_, index) => index + 1)

export const months = [
	{ value: 1, label: 'Январь' },
	{ value: 2, label: 'Февраль' },
	{ value: 3, label: 'Март' },
	{ value: 4, label: 'Апрель' },
	{ value: 5, label: 'Май' },
	{ value: 6, label: 'Июнь' },
	{ value: 7, label: 'Июль' },
	{ value: 8, label: 'Август' },
	{ value: 9, label: 'Сентябрь' },
	{ value: 10, label: 'Октябрь' },
	{ value: 11, label: 'Ноябрь' },
	{ value: 12, label: 'Декабрь' }
]

const currentYear = new Date().getFullYear()

export const years = Array.from(
	{ length: currentYear - 1800 + 1 },
	(_, index) => currentYear - index
)