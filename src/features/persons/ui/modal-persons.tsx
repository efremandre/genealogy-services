import { SubmitHandler, useForm } from 'react-hook-form'
import { useCreatePerson } from '../model/create-persons'
import { days, months, years } from '../model/date-options'
import { useModalStore } from '../model/modal.store'
import { AddRequestPerson, RoleType } from '../model/persons.type'

export const ModalPersons = () => {
	const { mutate, isPending } = useCreatePerson()
	const { currentPersonId, close, role, setRole } = useModalStore()
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<AddRequestPerson>({
		defaultValues: {
			isAlive: true,
		},
	})

	const isAlive = watch('isAlive')

	const onSubmit: SubmitHandler<AddRequestPerson> = (data) => {
		if (!currentPersonId) {
			throw new Error('No current Person Id')
		}

		const gender: 'male' | 'female' = (role === 'father') ? 'male' : 'female'

		const requestData = {
			...data,
			gender
		}

		mutate({
			body: requestData,
			role,
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
		<div className='fixed w-full h-full z-10 top-0 right-0 flex justify-end inset-0 bg-black/30 backdrop-blur-sm box-border'>
			<div className='absolute top-10 left-10'>id person store: {currentPersonId}</div>
			<div className='relative w-max max-w-full h-full p-4 bg-blue-950 flex flex-col'>
				<button
					onClick={close}
					className='absolute top-5 left-[-40] p-1 w-[30] h-[30] bg-amber-50 cursor-pointer text-black text-[10px] rounded-full transition hover:opacity-50'
				>X</button>
				<form onSubmit={handleSubmit(onSubmit)} className='flex-1'>
					<div className='w-80 flex flex-col h-full'>
						<div className='mt-10 flex-[1_0_auto] w-full flex flex-col gap-4'>
							<div>
								<select
									required
									value={role}
									onChange={(e) => setRole(e.target.value as RoleType)}
									className='w-full p-2 border rounded-xs border-gray-600'
								>
									<option value='' className='bg-violet-950 text-white'>Родство</option>
									<option value='father' className='bg-violet-950 text-white'>Отец</option>
									<option value='mother' className='bg-violet-950 text-white'>Мать</option>
								</select>
							</div>
							<input
								{...register("firstName", { required: true })}
								placeholder='Имя'
								className='p-2 border rounded-xs border-gray-600'
							/>
							{errors.firstName && <span>This field is required</span>}
							<input
								{...register('lastName', { required: true })}
								placeholder='Фамилия'
								className='p-2 border rounded-xs border-gray-600'
							/>
							{errors.lastName && <span>This field is required</span>}
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