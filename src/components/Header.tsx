"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Image from "next/image"
import logo from "../assets/images/Template Alena.png"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: "Trang chủ", href: "/" },
    { name: "Sản phẩm", href: "/san-pham" },
    { name: "Giới thiệu", href: "/gioi-thieu" },
    { name: "Liên hệ", href: "/lien-he" },
  ]

  return (
    <nav className="bg-[#1C5B41] text-White">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Desktop layout */}
        <div className="hidden h-16 items-center justify-between md:flex">
          {/* Logo on left */}
          <div className="w-[24%]">
            <Link href="/" className="w-auto text-3xl font-bold">
              <Image src={logo} alt="" width={153} height={47} />
            </Link>
          </div>

          {/* Navigation in center */}
          <div className="flex flex-1 justify-center">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-1 py-2 text-sm font-medium ${
                    pathname === item.href
                      ? "text-White"
                      : "text-gray-200 hover:text-White"
                  }`}
                >
                  {item.name}
                  {pathname === item.href && (
                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#f39c12]"></span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Empty space on right to balance layout */}
          <div className="w-1/4"></div>
        </div>

        {/* Mobile layout */}
        <div className="flex h-16 items-center justify-between md:hidden">
          <Link href="/" className="flex items-center">
            <span className="font-serif text-3xl text-White">A</span>
            <span className="font-serif text-3xl text-[#f39c12]">lena</span>
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-White hover:text-White focus:outline-none"
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                  pathname === item.href
                    ? "border-l-4 border-[#f39c12] pl-2 text-White"
                    : "text-gray-200 hover:text-White"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
