import freeShip from "../../assets/images/MIỄN PHÍ GIAO HÀNG.png"
import cod from "../../assets/images/THANH TOÁN COD.png"
import vip from "../../assets/images/KHÁCH HÀNG VIP.png"
import support from "../../assets/images/HỖ TRỢ BẢO HÀNH.png"
import Image from "next/image"
export default function TopNavigation() {
  return (
    <div className="w-full bg-[#FE9614] py-4 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center font-[Montserrat]">
          <div className="m-1 flex w-[calc(50%-0.5rem)] flex-col items-center rounded-md p-3 text-center text-white md:w-[calc(25%-0.75rem)]">
            <Image src={freeShip} alt="" width={55} height={47} />
            <span className="hidden pt-3 text-sm font-semibold sm:inline">
              MIỄN PHÍ GIAO HÀNG
            </span>
            <span>Miễn phí ship với đơn hàng 498K</span>
          </div>
          <div className="m-1 flex w-[calc(50%-0.5rem)] flex-col items-center rounded-md p-3 text-center text-white md:w-[calc(25%-0.75rem)]">
            <Image src={cod} alt="" width={44} height={44} />
            <span className="hidden pt-3 text-sm font-semibold sm:inline">
              THANH TOÁN COD
            </span>
            <span>Thanh toán khi nhận hàng (COD)</span>
          </div>
          <div className="m-1 flex w-[calc(50%-0.5rem)] flex-col items-center rounded-md p-3 text-center text-white md:w-[calc(25%-0.75rem)]">
            <Image src={vip} alt="" width={55} height={47} />
            <span className="hidden pt-4 text-sm font-semibold sm:inline">
              KHÁCH HÀNG VIP
            </span>
            <span>Ưu đãi dành cho khách hàng VIP</span>
          </div>
          <div className="m-1 flex w-[calc(50%-0.5rem)] flex-col items-center rounded-md p-3 text-center text-white md:w-[calc(25%-0.75rem)]">
            <Image src={support} alt="" width={55} height={47} />
            <span className="hidden pt-3 text-sm font-semibold sm:inline">
              HỖ TRỢ BẢO HÀNH
            </span>
            <span>Đổi , sửa đồ tại tất cả store</span>
          </div>
        </div>
      </div>
    </div>
  )
}
