'use client'

import { logout } from '@/features/auth/api/auth.api'
import { useMe } from '@/features/auth/model/use-me'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import TreeLogo from '../assets/tree-logo.png'

export const Header = () => {
	const { data: user, isLoading } = useMe()
	const router = useRouter()

	const handleLogout = () => {
		logout()
		router.replace('/login')
	}

	return (
		<header>
			<div className='max-w-[1440] mx-auto px-4'>
				<div className='py-3 flex justify-between items-center'>
					<div className='w-[30] h-[30] p-1 rounded-full bg-amber-50'>
						<Image
							src={TreeLogo}
							width={30}
							height={30}
							alt='Logo'
						/>
					</div>
					<div>
						<div className='flex justify-between items-center gap-4'>
							<div className='flex justify-between items-center gap-2'>
								<div className='w-[20] h-[20] p-1 rounded-full bg-amber-50'></div>
								{isLoading ? 'Loading...' : user?.firstName ?? 'Гость'}
							</div>
							<div>
								<button onClick={handleLogout}>Выйти</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}