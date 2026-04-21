import { Header } from '@/widgets/header/ui/header'
import { Footer } from '@/widgets/footer/ui/footer'
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "Генеалогическое древо",
	description: "Сервис построения генеалогического древа",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {

	return (
		<html
			lang="ru"
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
			<body className="min-h-full flex flex-col">
				<div className='h-screen min-h-full flex flex-col'>
					<Header />
					<main className='flex-[1_0_auto]'>
						<div className='max-w-[1440] mx-auto px-4'>
							{children}
						</div>
					</main>
					<Footer />
				</div>
			</body>
		</html>
	)
}
