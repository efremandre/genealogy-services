import Image from 'next/image'
import TreeLogo from '../assets/tree-logo.png'

export const Header = () => {
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
						<div>Name</div>
					</div>
				</div>
			</div>
		</header>
	)
}