"use client"

import type React from "react"
import { Playfair_Display, Source_Sans_3 } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
})

export function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <body className={`font-sans ${sourceSans.variable} ${playfair.variable} ${GeistMono.variable}`}>
      {children}
      <Analytics />
    </body>
  )
}
