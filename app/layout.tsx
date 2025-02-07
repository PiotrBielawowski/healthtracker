import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cute Health Tracker",
  description: "Track your health journey in a fun and cute way!",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-pink-50`}>
        <div className="min-h-screen bg-[url('/cute-pattern.svg')] bg-repeat">{children}</div>
      </body>
    </html>
  )
}

