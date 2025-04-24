"use client"
import { Geist, Geist_Mono } from "next/font/google"
import "../../globals.css"

// Đăng ký plugin

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 pb-5">{children}</div>
    </div>
  )
}
