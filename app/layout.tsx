import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Samiq Portfolio',
  description: 'A portfolio showcasing my skills, projects, and experiences in software development and design.',
  generator: 'React',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
