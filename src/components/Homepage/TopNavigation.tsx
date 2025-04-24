import Image from "next/image"
import React from "react"
import { RootState } from "@/store/store"
import { APIGetAdditionalServices } from "@/services/additionalService"

import { setAdditionalService } from "@/store/slices/additionalServiceSlice"
import { useEffect } from "react"
import { additionalServiceType } from "@/types/additionalServiceType"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
export default function TopNavigation() {
  const dispatch = useDispatch()
  const service = useSelector(
    (state: RootState) => state.additionalService.additionalService
  )
  const baseUrlImage = process.env.NEXT_PUBLIC_BASE_URL_IMAGE
  const handleGetService = async () => {
    try {
      const response = await APIGetAdditionalServices()
      console.log("réponse", response)
      if (response?.status === 200) {
        dispatch(setAdditionalService(response?.data))
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    handleGetService()
  }, [])
  return (
    <div className="w-full bg-[#FE9614] py-4 text-White">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center font-[Montserrat]">
          {Array.isArray(service) &&
            service.map((item: additionalServiceType, index) => (
              <div
                key={index}
                className="m-1 flex w-[calc(50%-0.5rem)] flex-col items-center rounded-md p-3 text-center text-White md:w-[calc(25%-0.75rem)]"
              >
                <div className="relative h-20 w-24">
                  <Image
                    src={
                      item.image.startsWith("data:image")
                        ? item.image
                        : baseUrlImage + item.image
                    }
                    alt={item.service_name || "service"}
                    fill
                    className="object-containy rounded-md"
                  />
                </div>

                <span className="hidden pt-3 text-sm font-semibold sm:inline">
                  {item.service_name}
                </span>
                <span>{item.description}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
