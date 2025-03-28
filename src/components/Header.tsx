"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Image from "next/image"
import logo from "../assets/images/Template Alena.png"

export default function Header() {
  const pathname = usePathname()

  const navItems = [
    { name: "Trang chủ", href: "/" },
    { name: "Sản phẩm", href: "/san-pham" },
    { name: "Giới thiệu", href: "/gioi-thieu" },
    { name: "Liên hệ", href: "/lien-he" },
  ]

  return (
    <header className="w-full bg-[#1C5B41] text-white">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center">
          <Link href="/" className="text-3xl font-bold">
            <Image src={logo} alt="" width={153} height={47} />
          </Link>
        </div>

        <nav className="flex flex-1 justify-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-1 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "text-white"
                  : "text-white/80 hover:text-white"
              )}
            >
              {item.name}
              {pathname === item.href && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#F39C12]" />
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
