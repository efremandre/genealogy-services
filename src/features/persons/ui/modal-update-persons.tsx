import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { days, months, years } from '../model/date-options'
import { usePersonStore } from '../model/person.store'
import { UpdatePersonFormValues } from '../model/persons.type'
import { useUpdatePerson } from '../model/update-persons'
import { usePerson } from '../model/use-person'
import { X } from 'lucide-react'

/** TODO:
 * Сделать очистку полей или/и чтобы в полях выставилось то, что уже заполненно
 * 
 */

export const ModalUpdatePersons = () => {
	const currentPersonId = usePersonStore((s) => s.payload?.currentPersonId)
	const { data: person } = usePerson(currentPersonId)
	const role = usePersonStore((s) => s.payload?.role)
	const { mutate, isPending } = useUpdatePerson()
	const close = usePersonStore((s) => s.close)

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<UpdatePersonFormValues>({
		defaultValues: {
			isAlive: true,
		},
	})

	useEffect(() => {
		console.log(person)

	}, [person])

	const isAlive = watch('isAlive')

	const onSubmit: SubmitHandler<UpdatePersonFormValues> = (data) => {
		if (!currentPersonId) {
			throw new Error('No current Person Id')
		}

		let newData = Object.fromEntries(
			Object.entries(data).filter(([_, value]) => {
				return value !== '' && value !== undefined
			})
		)

		console.log(newData)


		mutate({
			body: newData,
			currentPersonId
		},
			{
				onSuccess: () => {
					close()
				}
			})
	}

	const daysMap = days.map(day => <option key={day} value={day} className='bg-violet-950 text-white' > {day} </option>)
	const monthsMap = months.map(m => <option key={m.value} value={m.value} className='bg-violet-950 text-white' >{m.label}</option>)
	const yearsMap = years.map(year => <option key={year} value={year} className='bg-violet-950 text-white'>{year}</option>)

	return (
		<div className='fixed w-full h-full z-10 top-0 right-0 flex justify-end inset-0 box-border'>
			<div className='relative w-max max-w-full h-full p-4 bg-blue-950 flex flex-col'>
				<button
					onClick={close}
					className='absolute top-5 left-[-40] p-1 w-[30] h-[30] flex items-center justify-center bg-amber-50 cursor-pointer text-black text-[10px] rounded-full transition hover:opacity-50'
				><X size={16} /></button>
				<form onSubmit={handleSubmit(onSubmit)} className='flex-1'>
					<div className='w-80 flex flex-col h-full'>
						<div>Редактировать персону</div>
						<div className='flex-[1_0_auto] w-full flex flex-col gap-4'>
							<div>
								{currentPersonId}
							</div>

							<div className='w-full flex flex-col gap-4'>
								<input
									{...register('lastName')}
									placeholder={person?.lastName ? person?.lastName : 'Фамилия'}
									className={`p-2 border rounded-xs ${errors.lastName ? ' border-red-800' : 'border-gray-600'}`}
								/>
								{
									person?.gender === 'female' &&
									<input
										{...register('maidenName')}
										placeholder={person?.maidenName ? person?.maidenName : 'Фамилия при рождении'}
										className='p-2 border rounded-xs border-gray-600'
									/>
								}
								<input
									{...register('firstName')}
									placeholder={person?.firstName ? person?.firstName : 'Имя'}
									className={`p-2 border rounded-xs ${errors.lastName ? 'border-red-800' : 'border-gray-600'}`} />
								<input
									{...register('middleName')}
									placeholder={person?.middleName ? person?.middleName : 'Отчество'}
									className='p-2 border rounded-xs border-gray-600'
								/>
							</div>
							<div className='flex justify-between gap-2'>
								<select
									{...register('birthDay', {
										setValueAs: value => value === '' ? undefined : Number(value),
									})}
									defaultValue='' className='p-2 border rounded-xs border-gray-600'
								>
									<option value='' disabled className='bg-violet-950 text-white' >День</option>
									{daysMap}
								</select>
								<select
									{...register('birthMonth', {
										setValueAs: value => value === '' ? undefined : Number(value),
									})}
									defaultValue=''
									className='p-2 border rounded-xs border-gray-600'
								>
									<option value='' disabled className='bg-violet-950 text-white'>Месяц</option>
									{monthsMap}
								</select>
								<select
									{...register("birthYear", {
										setValueAs: value => value === '' ? undefined : Number(value),
									})}
									defaultValue=''
									className='p-2 border rounded-xs border-gray-600'
								>
									<option value='' disabled className='bg-violet-950 text-white'>Год</option>
									{yearsMap}
								</select>
							</div>
							<div>
								<label className="flex items-center gap-2 my-3 text-white cursor-pointer">
									<input
										type="checkbox"
										{...register('isAlive')}
									/>
									Человек жив
								</label>

								{!isAlive && (
									<div className='flex justify-between gap-2'>
										<select
											{...register('deathDay', { valueAsNumber: true })}
											defaultValue=''
											className='p-2 border rounded-xs border-gray-600'>
											<option value='' className='bg-violet-950 text-white'>День</option>
											{days.map(day => (
												<option key={day} value={day} className='bg-violet-950 text-white'>{day}</option>
											))}
										</select>

										<select
											{...register('deathMonth', { valueAsNumber: true })}
											defaultValue=''
											className='p-2 border rounded-xs border-gray-600'>
											<option value='' className='bg-violet-950 text-white'>Месяц</option>
											{months.map(month => (
												<option key={month.value} value={month.value} className='bg-violet-950 text-white'>
													{month.label}
												</option>
											))}
										</select>

										<select
											{...register('deathYear', { valueAsNumber: true })}
											defaultValue=''
											className='p-2 border rounded-xs border-gray-600'>
											<option value='' className='bg-violet-950 text-white'>Год</option>
											{years.map(year => (
												<option key={year} value={year} className='bg-violet-950 text-white'>{year}</option>
											))}
										</select>
									</div>
								)}
							</div>
						</div>
						<div className='w-full flex flex-col gap-4'>
							{
								isPending ?
									<div>Loadibg</div> :
									<input
										type='submit'
										className="p-2 border rounded-xs border-gray-600 cursor-pointer hover:opacity-75"
									/>
							}
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}