"use client"
import { store } from "@/store/store"
import { Geist, Geist_Mono } from "next/font/google"
import { Provider } from "react-redux"
import "../../globals.css"
import { metadata } from "../../metadata"

// Đăng ký plugin

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

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
