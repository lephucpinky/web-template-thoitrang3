"use client"
import * as Yup from "yup"
import Image from "next/image"
import Link from "next/link"
import contacts from "../../../assets/icons/contact.png"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import SocialMedia from "@/components/HomepageComponent/socialMedia"
import { Facebook, Instagram, Linkedin, Twitch } from "lucide-react"

export default function ContactPage() {
  const aboutUs = useSelector((state: RootState) => state.aboutUs.aboutUs)
  const mapSrc = aboutUs.map.match(/src="([^"]+)"/)?.[1]
  const baseUrlImage = process.env.NEXT_PUBLIC_BASE_URL_IMAGE
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
        <div className="">
          {/* Title with icon */}
          <div className="mb-6 flex items-center gap-2">
            <Image src={contacts} alt="contact" width={20} height={20} />
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
            <div>
              <textarea
                placeholder="Viết bình luận"
                rows={4}
                className="w-full rounded border px-4 py-2 focus:outline-none focus:ring-2"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-[#2A2FAF] px-6 py-3 font-medium uppercase tracking-wide text-White transition-colors duration-200 hover:bg-[#1f1f7a] disabled:cursor-not-allowed disabled:opacity-70"
              >
                GỬI THÔNG TIN
              </button>
            </div>
          </form>

          {/* Social Media Icons */}
          <div className="mt-6 flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-White transition-opacity hover:opacity-90">
              {aboutUs.facebook_link && (
                <SocialMedia
                  icon={Facebook}
                  url={aboutUs.facebook_link}
                  sizeIcon={20}
                />
              )}
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[#FFDC80] via-[#E1306C] to-[#833AB4] text-White transition-opacity hover:opacity-90">
              {aboutUs?.instagram_link && (
                <SocialMedia
                  url={aboutUs?.instagram_link}
                  icon={Instagram}
                  sizeIcon={20}
                />
              )}
            </div>
            <div className="text-white flex h-10 w-10 items-center justify-center rounded-full bg-[#1DA1F2] transition-opacity hover:opacity-90">
              {aboutUs?.twitter_link && (
                <SocialMedia
                  url={aboutUs?.twitter_link}
                  icon={Twitch}
                  sizeIcon={20}
                />
              )}
            </div>
            <div className="text-white flex h-10 w-10 items-center justify-center rounded-full bg-[#0A66C2] transition-opacity hover:opacity-90">
              {aboutUs?.linkedin_link && (
                <SocialMedia
                  url={aboutUs?.linkedin_link}
                  icon={Linkedin}
                  sizeIcon={20}
                />
              )}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="relative h-[400px] overflow-hidden rounded lg:h-auto">
          {mapSrc && (
            <iframe
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          )}
        </div>
      </div>
    </div>
  )
}
