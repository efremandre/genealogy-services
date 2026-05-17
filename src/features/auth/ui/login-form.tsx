import { useLogin } from '@/features/auth/model/use-login'
import { useRouter } from 'next/navigation'
import React from 'react'

export const LoginForm: React.FC = () => {
	const router = useRouter()
	const { mutate, isPending } = useLogin()

	const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)
		const email = formData.get('email')
		const password = formData.get('password')

		if (typeof email !== 'string' || typeof password !== 'string') return

		mutate(
			{ email, password },
			{
				onSuccess: () => {
					router.replace('/tree')
				},
				onError: () => {
					console.log('Ошибка логина')
				},
			}
		)
	}

	return (
		<div className="flex justify-center">
			<form onSubmit={submitForm} >
				<div className="w-80 flex flex-col gap-4">
					<input type="email"
						name="email"
						autoComplete="email"
						placeholder="Email"
						required
						className="p-2 border rounded-xs border-gray-600" />
					<input type="password"
						name="password"
						autoComplete="current-password"
						placeholder="Password"
						required
						className="p-2 border rounded-xs border-gray-600" />
					{isPending ?
						(
							<div className="p-2 border rounded-xs border-gray-600">
								<p className="text-center animate-pulse">Loading...</p>
							</div>
						) : (
							<input type="submit"
								value="Отправить"
								className="p-2 border rounded-xs border-gray-600 cursor-pointer hover:opacity-75" />
						)}
				</div>
			</form>
		</div>
	)
}