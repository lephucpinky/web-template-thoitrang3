import Image from "next/image"
import Link from "next/link"

import contact from "../../../assets/icons/contact.png"
import {
  Facebook,
  Instagram,
  MessageCircle,
  Phone,
  Youtube,
} from "lucide-react"

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Breadcrumb Navigation */}
      <nav className="mb-12 flex items-center gap-2 text-sm">
        <Link href="/" className="text-gray-700 hover:text-blue-600">
          Trang chủ
        </Link>
        <span className="text-gray-400">/</span>
        <Link href="/lien-he" className="text-gray-700 hover:text-blue-600">
          Liên hệ
        </Link>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Contact Form */}
        <div>
          {/* Title with icon */}
          <div className="mb-6 flex items-center gap-2">
            <Image src={contact} alt="contact" width={20} height={20} />
            <h2 className="text-xl font-bold text-amber-500">
              KẾT NỐI NGAY VỚI CHÚNG TÔI
            </h2>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Tên của bạn"
                className="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="tel"
                placeholder="Số điện thoại của bạn"
                className="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email của bạn"
                className="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-4">
              <textarea
                placeholder="Viết bình luận"
                rows={4}
                className="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <button
                type="submit"
                className="h-fit whitespace-nowrap rounded bg-indigo-900 px-6 py-3 font-medium text-white transition duration-300 hover:bg-indigo-800"
              >
                GỬI THÔNG TIN
              </button>
            </div>
          </form>

          {/* Social Media Icons */}
          <div className="mt-6 flex gap-3">
            <Link href="#" className="rounded-full">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3b5998] p-2">
                <Facebook size={20} className="text-white" />
              </div>
            </Link>
            <Link href="#" className="rounded-full">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF0000] p-2">
                <Youtube size={20} className="text-white" />
              </div>
            </Link>
            <Link href="#" className="rounded-full">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E60023] p-2">
                <MessageCircle size={20} className="text-white" />
              </div>
            </Link>
            <Link href="#" className="rounded-full">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black p-2">
                <Phone size={20} className="text-white" />
              </div>
            </Link>
            <Link href="#" className="rounded-full">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500 p-2">
                <Instagram size={20} className="text-white" />
              </div>
            </Link>
          </div>
        </div>

        {/* Map */}
        <div className="relative h-[400px] overflow-hidden rounded lg:h-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4241674197667!2d106.68783!3d10.7765637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ2JzM1LjYiTiAxMDbCsDQxJzE2LjIiRQ!5e0!3m2!1svi!2s!4v1616593825259!5m2!1svi!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="absolute left-4 top-4 max-w-[200px] rounded bg-white p-3 text-sm shadow-md">
            <p className="font-semibold">182 Đ. Lê Đại Hành</p>
            <a href="#" className="text-xs text-blue-500 hover:underline">
              Xem bản đồ lớn hơn
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
