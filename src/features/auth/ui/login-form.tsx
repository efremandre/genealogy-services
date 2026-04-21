import { login } from '@/features/auth/api/auth.api'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export const LoginForm: React.FC = () => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)

	const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)
		const email = formData.get('email')
		const password = formData.get('password')

		if (typeof email !== 'string' || typeof password !== 'string') return

		setIsLoading(true)

		try {
			const user = await login(email, password)

			console.log('User:', user)
			if (user) {
				router.replace('/persons')
			}

		} catch (e) {

			console.log('Ошибка логина')
		} finally {
			setIsLoading(false)
		}
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
					{isLoading ?
						<div className="p-2 border rounded-xs border-gray-600">
							<p className="text-center animate-pulse">Loading...</p>
						</div> :
						<input type="submit"
							value="Отправить"
							className="p-2 border rounded-xs border-gray-600 cursor-pointer hover:opacity-75" />
					}
				</div>
			</form>
		</div>
	)
}