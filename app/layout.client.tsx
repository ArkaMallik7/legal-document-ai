import type React from "react"
import { ClientLayout } from "@/components/client-layout"

export function LayoutClient({
  children,
  sourceSansVariable,
  playfairVariable,
}: Readonly<{
  children: React.ReactNode
  sourceSansVariable: string
  playfairVariable: string
}>) {
  return <ClientLayout>{children}</ClientLayout>
}
