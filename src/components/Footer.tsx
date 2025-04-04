import Link from "next/link"
import map from "../assets/icons/SVG (2).png"
import location from "../assets/icons/location.png"
import clock from "../assets/icons/clock.png"
import Image from "next/image"
import logo from "../assets/images/Template Alena.png"

export default function Footer() {
  return (
    <footer className="relative bg-[#AEAEAE] font-[Montserrat] text-White">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Logo and Contact Info */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image src={logo} alt="" width={153} height={47} />
              <p className="mt-2 text-sm text-[#F39C12]">
                Shop thời trang và phụ kiện Alena
              </p>
            </Link>

            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <div className="h-10 w-14">
                  <Image src={clock} alt="" width={50} height={50} />
                </div>{" "}
                <div className="text-sm text-[#FFF6E8]">
                  Tầng 6, Tòa nhà Ladeco, 266 Đội Cấn, Phường Liễu Giai, Quận Ba
                  Đình, TP Hà Nội
                </div>
              </div>

              <div className="flex items-start">
                <div className="h-10 w-10">
                  <Image src={location} alt="" width={30} height={30} />
                </div>
                <div className="text-sm text-[#FFF6E8]">
                  <p>Giờ làm việc: Từ 9:00 đến 22:00 các ngày trong tuần</p>
                  <p>Từ Thứ 2 đến Chủ nhật</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="h-10 w-10">
                  <Image src={map} alt="" width={30} height={30} />
                </div>
                <div className="text-sm">
                  <p className="text-[#FFF6E8]">Hotline</p>
                  <p className="text-[#F39C12]">1800 6750</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: About Us */}
          <div>
            <h3 className="mb-6 text-lg font-bold">Về chúng tôi</h3>
            <ul className="space-y-3 text-sm text-[#FFF6E8]">
              <li>
                <Link href="/trang-chu" className="hover:text-[#F39C12]">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/thoi-trang-nam" className="hover:text-[#F39C12]">
                  Thời trang Nam
                </Link>
              </li>
              <li>
                <Link href="/san-pham" className="hover:text-[#F39C12]">
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link href="/be-trai" className="hover:text-[#F39C12]">
                  Bé trai
                </Link>
              </li>
              <li>
                <Link href="/be-gai" className="hover:text-[#F39C12]">
                  Bé gái
                </Link>
              </li>
              <li>
                <Link href="/tin-tuc" className="hover:text-[#F39C12]">
                  Tin tức
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className="hover:text-[#F39C12]">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div>
            <h3 className="mb-6 text-lg font-bold">Chăm sóc khách hàng</h3>
            <ul className="space-y-3 text-sm text-[#FFF6E8]">
              <li className="flex items-center">
                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-White"></span>
                Thời gian hỗ trợ
              </li>
              <li className="flex items-center">
                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-White"></span>
                24/7 không kể ngày lễ
              </li>
              <li className="flex items-center">
                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-White"></span>
                Hotline: 1800.6750
              </li>
            </ul>
          </div>

          {/* Column 4: Guidelines */}
          <div>
            <h3 className="mb-6 text-lg font-bold">Hướng dẫn</h3>
            <ul className="space-y-3 text-sm text-[#FFF6E8]">
              <li>
                <Link
                  href="/chinh-sach-mua-ban"
                  className="hover:text-[#F39C12]"
                >
                  Chính sách mua bán
                </Link>
              </li>
              <li>
                <Link
                  href="/he-thong-kiem-duyet"
                  className="hover:text-[#F39C12]"
                >
                  Hệ thống kiểm duyệt
                </Link>
              </li>
              <li>
                <Link
                  href="/chinh-sach-bao-mat"
                  className="hover:text-[#F39C12]"
                >
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link
                  href="/quy-dinh-nguoi-ban"
                  className="hover:text-[#F39C12]"
                >
                  Quy định đối với người bán
                </Link>
              </li>
              <li>
                <Link
                  href="/huong-dan-mua-hang"
                  className="hover:text-[#F39C12]"
                >
                  Hướng dẫn mua hàng
                </Link>
              </li>
            </ul>

            <div className="mt-6 flex space-x-3">
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F39C12]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-White"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F39C12]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-White"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F39C12]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-White"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 right-0 h-32 w-1/3 overflow-hidden">
        <div className="absolute bottom-0 right-0 h-full w-full bg-[url('/placeholder.svg?height=200&width=400')] bg-cover bg-right-bottom opacity-30"></div>
      </div>
    </footer>
  )
}
