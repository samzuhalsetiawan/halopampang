import type { Metadata } from 'next'
import { Poppins as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import NavbarWrapper from '@/components/navbar/NavbarWrapper'
import FooterWrapper from '@/components/footer/FooterWrapper'
import MobilePreventProvider from '@/lib/clientUtils'

export const fontSans = FontSans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: 'Halopampang',
  description: 'Halopampang',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
        <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
          <MobilePreventProvider>
            <NavbarWrapper />
            {children}
            <FooterWrapper />
          </MobilePreventProvider>
        </body>
    </html>
  )
}
