'use client'

import { useMe } from '@/features/auth/model/use-me'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export const Protected = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter()
	const { data: user, isLoading, isError } = useMe()

	useEffect(() => {
		if (!isLoading) {
			if (!user || isError) {
				router.replace('/login')
			}
		}
	}, [user, isLoading, isError])

	if (isLoading) return <div className='mt-10 text-center animate-pulse'>Loading...</div>
	if (isError || !user) return null

	return <>{children}</>
}