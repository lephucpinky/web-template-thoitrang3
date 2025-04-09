import Image from "next/image"
import Link from "next/link"

import contact from "../../../assets/icons/contact.png"
import Facebook from "../../../assets/icons/Item.png"
import Instagram from "../../../assets/icons/Item (3).png"
import MessageCircle from "../../../assets/icons/Link - f1genz-luxury-fashion - Pinterest.png"
import Phone from "../../../assets/icons/Item (2).png"
import Youtube from "../../../assets/icons/Item (1).png"

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Breadcrumb Navigation */}
      <nav className="mb-12 flex items-center gap-2 text-sm">
        <Link href="/" className="text-[#252A2B]">
          Trang chủ
        </Link>
        <span className="text-[#CCCCCC]">/</span>
        <Link href="/lien-he" className="text-[#252A2B]">
          Liên hệ
        </Link>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Contact Form */}
        <div>
          {/* Title with icon */}
          <div className="mb-6 flex items-center gap-2">
            <Image src={contact} alt="contact" width={20} height={20} />
            <h2 className="text-xl font-bold">KẾT NỐI NGAY VỚI CHÚNG TÔI</h2>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Tên của bạn"
                className="w-full rounded border px-4 py-2 focus:outline-none focus:ring-2"
              />
            </div>
            <div>
              <input
                type="tel"
                placeholder="Số điện thoại của bạn"
                className="w-full rounded border px-4 py-2 focus:outline-none focus:ring-2"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email của bạn"
                className="w-full rounded border px-4 py-2 focus:outline-none focus:ring-2"
              />
            </div>
            <div className="flex gap-4">
              <textarea
                placeholder="Viết bình luận"
                rows={4}
                className="w-full rounded border px-4 py-2 focus:outline-none focus:ring-2"
              ></textarea>
              <button
                type="submit"
                className="h-fit whitespace-nowrap rounded px-6 py-3 font-medium transition duration-300"
              >
                GỬI THÔNG TIN
              </button>
            </div>
          </form>

          {/* Social Media Icons */}
          <div className="mt-6 flex gap-3">
            <Link
              href="#"
              className="flex h-10 w-10 items-center justify-center"
            >
              <Image src={Facebook} alt="/facebook" width={30} height={30} />
            </Link>
            <Link
              href="#"
              className="flex h-10 w-10 items-center justify-center"
            >
              <Image src={Instagram} alt="/facebook" width={30} height={30} />
            </Link>
            <Link
              href="#"
              className="flex h-10 w-10 items-center justify-center"
            >
              <Image
                src={MessageCircle}
                alt="/facebook"
                width={30}
                height={30}
              />
            </Link>
            <Link
              href="#"
              className="flex h-10 w-10 items-center justify-center"
            >
              <Image src={Phone} alt="/facebook" width={30} height={30} />
            </Link>
            <Link
              href="#"
              className="flex h-10 w-10 items-center justify-center"
            >
              <Image src={Youtube} alt="/facebook" width={30} height={30} />
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
          {/* <div className="absolute left-4 top-4 max-w-[200px] rounded bg-White p-3 text-sm shadow-md">
            <p className="font-semibold">2 Nguyễn Thế Lộc</p>
            <Link href="#" className="text-xs text-Blue hover:underline">
              Xem bản đồ lớn hơn
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  )
}
