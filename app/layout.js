import { ContextProviderS } from '@/context/MainContext'
import './globals.css'


export const metadata = {
  title: 'Chatcord -Connect with your favorite people.',
  description: 'Hang out anytime, anywhere—Chatcord makes it easy and fun to stay close to your favorite people.',
}

export default function RootLayout({ children }) {
  return (
    <html >
      <ContextProviderS>
      <body>{children}</body>
      </ContextProviderS>
    </html>
  )
}
