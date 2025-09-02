import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./ClientLayout"

export const metadata: Metadata = {
  title: "Guttin Language - Ancient Mysteries Reborn",
  description:
    "Discover the Guttin language - explore its unique symbols, learn grammar, and unlock otherworldly communication",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ClientLayout>{children}</ClientLayout>
}


import './globals.css'