'use client'

import { Protected } from '@/shared/lib/guard/Protected'
import { Footer } from '@/widgets/footer/ui/footer'
import { Header } from '@/widgets/header/ui/header'

const MainLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) => {

	return (
		<Protected>
			<div className='h-screen min-h-full flex flex-col'>
				<Header />
				<main className='flex-[1_0_auto]'>
					<div className='max-w-[1440] mx-auto px-4'>
						{children}
					</div>
				</main>
				<Footer />
			</div >
		</Protected>
	)
}

export default MainLayout