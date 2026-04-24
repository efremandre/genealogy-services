'use client'

import { useMe } from '@/features/auth/model/use-me'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
	const router = useRouter()
	const { data: user, isLoading, isError } = useMe()

	useEffect(() => {
		if (!isLoading) {
			if (!user || isError) {
				router.replace('/login')
			} else {
				router.replace('/persons')
			}
		}

	}, [user, isLoading, isError])

	return <div className='mt-10 text-center animate-pulse'>Loading...</div>
}

/**
 * replace → не оставляет в истории (правильно для auth)
 * push → оставляет (можно вернуться назад)
 * 
 */
