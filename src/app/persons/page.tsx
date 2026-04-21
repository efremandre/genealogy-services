'use client'

import { checkAuth } from '@/features/auth/api/auth.api'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Persons() {

	const router = useRouter()

	useEffect(() => {
		const run = async () => {
			const user = await checkAuth()

			if (!user) {
				router.replace('/login')
			}
		}

		run()

	}, [router])

	return (
		<div>
			<h1>Persons</h1>
		</div>
	)
}