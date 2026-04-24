'use client'

import { LoginForm } from '@/features/auth/ui/login-form'

export default function Login() {

	return (
		<div className='mt-40 flex flex-col gap-4'>
			<h1 className='flex justify-center'>Login</h1>
			<LoginForm />
		</div>
	)
}