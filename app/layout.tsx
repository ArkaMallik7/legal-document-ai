import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ClientLayout } from "@/components/client-layout"

export const metadata: Metadata = {
  title: "LegalClarify AI - Demystifying Legal Documents",
  description: "AI-powered platform that simplifies complex legal documents into clear, accessible guidance",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <ClientLayout>{children}</ClientLayout>
    </html>
  )
}
