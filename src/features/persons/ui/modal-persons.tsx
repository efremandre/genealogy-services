import { SubmitHandler, useForm } from 'react-hook-form'
import { days, months, years } from '../model/date-options'
import { useModalStore } from '../model/modal.store'
import { Person } from '../model/persons.type'

export const ModalPersons = () => {
	const { close } = useModalStore()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Person>()

	const onSubmit: SubmitHandler<Person> = (data) => console.log(data)

	const daysMap = days.map(day => <option key={day} value={day} className='bg-violet-950 text-white' > {day} </option>)
	const monthsMap = months.map(m => <option key={m.value} value={m.value} className='bg-violet-950 text-white' >{m.label}</option>)
	const yearsMap = years.map(year => <option key={year} value={year} className='bg-violet-950 text-white'>{year}</option>)

	return (
		<div className='fixed w-full h-full z-10 top-0 right-0 flex justify-end inset-0 bg-black/30 backdrop-blur-sm box-border'>
			<div className='relative w-max max-w-full h-full p-4 bg-blue-950 flex flex-col'>
				<button
					onClick={close}
					className='absolute top-5 left-[-40] p-1 w-[30] h-[30] bg-amber-50 cursor-pointer text-black text-[10px] rounded-full transition hover:opacity-50'
				>X</button>
				<form onSubmit={handleSubmit(onSubmit)} className='flex-1'>
					<div className='w-80 flex flex-col h-full'>
						<div className='mt-10 flex-[1_0_auto] w-full flex flex-col gap-4'>
							<input
								{...register("firstName", { required: true })}
								placeholder='Имя'
								className='p-2 border rounded-xs border-gray-600'
							/>
							{errors.firstName && <span>This field is required</span>}
							<input
								{...register('lastName')}
								placeholder='Фамилия'
								className='p-2 border rounded-xs border-gray-600'
							/>
							<div className='flex justify-between gap-2'>
								<select
									{...register('birthDay', { valueAsNumber: true })}
									defaultValue='' className='p-2 border rounded-xs border-gray-600'
								>
									<option value='' disabled className='bg-violet-950 text-white' >День</option>
									{daysMap}
								</select>
								<select
									{...register('birthMonth', { valueAsNumber: true })}
									defaultValue=""
									className='p-2 border rounded-xs border-gray-600'
								>
									<option value='' disabled className='bg-violet-950 text-white'>Месяц</option>
									{monthsMap}
								</select>
								<select
									{...register("birthYear", { valueAsNumber: true })}
									defaultValue=""
									className='p-2 border rounded-xs border-gray-600'
								>
									<option value='' disabled className='bg-violet-950 text-white'>Год</option>
									{yearsMap}
								</select>
							</div>
						</div>
						<div className='w-full flex flex-col gap-4'>
							<div>

							</div>
							<input
								type="submit"
								className="p-2 border rounded-xs border-gray-600 cursor-pointer hover:opacity-75"
							/>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}