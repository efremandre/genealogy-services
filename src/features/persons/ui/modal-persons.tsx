import { SubmitHandler, useForm } from 'react-hook-form'

type Inputs = {
	example: string
	exampleRequired: string
}

export const ModalPersons = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>()

	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

	console.log(watch("example"))

	return (
		<div className='fixed w-full h-full z-10 top-0 right-0 flex justify-end inset-0 bg-black/30 backdrop-blur-sm box-border'>
			<div className='relative w-max max-w-full h-full p-4 bg-blue-950 flex flex-col'>
				<button className='absolute top-5 left-[-40] p-1 w-[30] h-[30] bg-amber-50 cursor-pointer text-black text-[10px] rounded-full transition hover:opacity-50'>X</button>
				<form onSubmit={handleSubmit(onSubmit)} className='flex-1'>
					<div className='w-80 flex flex-col h-full'>
						<div className='mt-10 flex-[1_0_auto] w-full flex flex-col gap-4'>
							<input
								defaultValue="test" {...register("example")}
								className='p-2 border rounded-xs border-gray-600'
							/>
							<input
								{...register("exampleRequired", { required: true })}
								className='p-2 border rounded-xs border-gray-600'
							/>
							{errors.exampleRequired && <span>This field is required</span>}

						</div>
						<div className='w-full flex flex-col gap-4'>
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