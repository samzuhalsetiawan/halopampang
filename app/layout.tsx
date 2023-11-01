import type { Metadata } from 'next'
import { Poppins as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import FooterWrapper from '@/components/footer/FooterWrapper'
import MobilePreventProvider from '@/lib/clientUtils'
import AuthProvider from '@/context/AuthProvider'
import Navbar from '@/components/navbar/Navbar'
import FirebaseProvider from '@/components/firabase-wrapper'

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
  children
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
        <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
          <AuthProvider>
            <MobilePreventProvider>
              <FirebaseProvider>
                <Navbar className='fixed z-50' />
                {children}
                <FooterWrapper />
              </FirebaseProvider>
            </MobilePreventProvider>
          </AuthProvider>
        </body>
    </html>
  )
}
