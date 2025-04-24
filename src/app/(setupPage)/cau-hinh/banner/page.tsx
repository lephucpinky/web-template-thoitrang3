"use client"
import React, { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import InputConfig from "@/components/inputComponent/inputRegisterLecture"
import { Button } from "@/components/ui/button"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { setMode } from "@/store/slices/modeSlice"
import { Label } from "@/components/ui/label"
import AlertSuccess from "@/components/alert/AlertSuccess"
import AlertError from "@/components/alert/AlertError"
import {
  APICreateNewBanner,
  APIGetBanners,
  APIUpdateBanner,
} from "@/services/banner"
import { clearBanner, setBanner } from "@/store/slices/bannerSlice"
import { BannerFormData } from "@/types/bannerType"
import CustomButtonUploadImage from "@/components/customButtomUploadImage/customButtonUploadImage"
import Image from "next/image"
// Schema validation với Yup
const ConfigValidationSchema: any = Yup.object({
  title: Yup.string()
    .required("Tiêu đề là bắt buộc")
    .max(100, "Tiêu đề tối đa 100 ký tự"),
  description: Yup.string()

    .max(500, "Mô tả tối đa 500 ký tự"),
  image_url: Yup.array().of(Yup.string()).required("Hình ảnh nền là bắt buộc"),
})

const defaultValues: BannerFormData = {
  title: "",
  description: "",
  image_url: [],
  display_page: "",
  image_delete: [],
}

// Danh sách các trang
const pages = [{ key: "home", label: "Trang chủ" }]

const Page = () => {
  const [activePage, setActivePage] = useState<string>("home")
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm<BannerFormData>({
    resolver: yupResolver(ConfigValidationSchema),
    defaultValues,
  })

  const mode = useSelector((state: RootState) => state.mode.modeInfo.mode)
  const banner = useSelector((state: RootState) => state.banner.banner)

  const dispatch = useDispatch()

  const [able, setAble] = useState(false)
  const [showAlertSuccess, setShowAlertSuccess] = useState(false)
  const [showAlertError, setShowAlertError] = useState(false)
  const [alertDescription, setAlertDescription] = useState("")
  const [imageList, setImageList] = useState<any>([])

  const handlePageChange = (pageKey: string) => {
    setActivePage(pageKey)
    reset(defaultValues) // Reset form mỗi khi đổi trang
    dispatch(clearBanner())
    setValue("image_url", [])
    setValue("image_delete", [])
    setImageList([])
    handleSetMode("create")
    handleGetBanner(pageKey)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const fileArray = Array.from(files)
      const readerPromises = fileArray.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => {
            resolve(reader.result)
          }
          reader.readAsDataURL(file)
        })
      })

      Promise.all(readerPromises).then((results) => {
        const newImageList = [...imageList, ...results] as string[]
        setImageList(newImageList)
        setValue("image_url", newImageList)
        if (banner[0]?.image_url) {
          setValue("image_delete", banner[0].image_url)
        }
      })
    }
  }

  const handleRemoveImage = (imageToRemove: string) => {
    const updatedImageList = imageList.filter(
      (img: string) => img !== imageToRemove
    )
    setImageList(updatedImageList)
    setValue("image_url", updatedImageList)

    // Nếu ảnh bị xóa không phải là base64, thêm vào image_delete
    if (!imageToRemove.startsWith("data:image")) {
      const imageDelete = getValues("image_delete")
      setValue("image_delete", [...imageDelete, imageToRemove])
    }
  }

  const handleSetMode = (mode: string) => {
    dispatch(setMode({ mode: mode }))
  }

  const handleCreateBanner = async (data: any) => {
    try {
      const response = await APICreateNewBanner(data)
      if (response?.status === 201) {
        setAlertDescription("Thêm banner thành công!")
        setShowAlertSuccess(true)
        handleSetMode("view")
        banner[0]._id && handleGetBanner(activePage)

        setTimeout(() => {
          setShowAlertSuccess(false)
        }, 3000)
      } else {
        setAlertDescription("Thêm banner thất bại!")
        setShowAlertError(true)

        setTimeout(() => {
          setShowAlertError(false)
        }, 3000)
      }
    } catch (err) {
      setAlertDescription("Thêm banner thất bại!")
      setShowAlertError(true)

      setTimeout(() => {
        setShowAlertError(false)
      }, 3000)
      console.log(err)
    }
  }

  const handleGetBanner = async (page: string) => {
    try {
      const response = await APIGetBanners({ display_page: page })
      if (response?.status === 200) {
        if (response.data.length > 0) {
          dispatch(setBanner(response.data))
          dispatch(setMode({ mode: "view" }))
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleUpdateBanner = async (data: any, id: string) => {
    try {
      const response = await APIUpdateBanner(data, id)
      if (response?.status === 200) {
        setAlertDescription("Cập nhật banner thành công!")
        setShowAlertSuccess(true)
        banner[0]._id && handleGetBanner(activePage)
        setValue("image_delete", [])

        setTimeout(() => {
          setShowAlertSuccess(false)
        }, 3000)
      } else {
        setAlertDescription("Cập nhật banner thất bại!")
        setShowAlertError(true)

        setTimeout(() => {
          setShowAlertError(false)
        }, 3000)
      }
    } catch (err) {
      setAlertDescription("Cập nhật banner thất bại!")
      setShowAlertError(true)

      setTimeout(() => {
        setShowAlertError(false)
      }, 3000)
      console.log(err)
    }
  }

  useEffect(() => {
    if (banner && banner[0]) {
      setValue("title", banner[0].title || "")
      setValue("description", banner[0].description || "")
      setValue("image_url", banner[0].image_url || [])
      setValue("display_page", banner[0].display_page || "")
      setImageList(banner[0].image_url || [])
    }
  }, [banner, setValue])

  useEffect(() => {
    handleGetBanner(activePage)
  }, [])

  const onSubmit = async (data: any) => {
    const body = {
      title: data.title,
      description: data.description,
      image_delete: data.image_delete,
      image_url: imageList,
      display_page: activePage,
    }

    if (mode === "create") {
      const { image_delete, ...rest } = body
      await handleCreateBanner(rest)
    } else if (mode === "view") {
      handleSetMode("edit")
    } else if (mode === "edit" && banner[0]?._id) {
      await handleUpdateBanner(body, banner[0]._id)
      handleSetMode("view")
    }
  }
  useEffect(() => {
    if (mode === "view") {
      setAble(true)
    }
    if (mode === "create") {
      setAble(false)
    }
    if (mode === "edit") {
      setAble(false)
    }
  }, [mode])

  return (
    <div className="bg-white w-full rounded-b-sm p-4">
      {/* Navigation Buttons */}
      <div className="mb-6 flex">
        {pages.map((page) => (
          <Button
            key={page.key}
            onClick={() => handlePageChange(page.key)}
            className={`w-32 shadow-none hover:shadow-sm ${
              activePage === page.key
                ? "bg-Charcoal font-bold text-White hover:bg-Charcoal hover:shadow-md hover:shadow-DarkJungleGreen"
                : "bg-White text-Black hover:bg-White hover:shadow-md hover:shadow-DarkJungleGreen"
            }`}
          >
            {page.label}
          </Button>
        ))}
      </div>
      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full w-full flex-col gap-4"
      >
        <div className="bg-white h-full w-full rounded-lg p-3 shadow-md">
          <p className="text-black font-sans text-[20px] font-medium">
            {pages.find((p) => p.key === activePage)?.label}
          </p>
          <div className="grid-flow-col-1 grid h-full w-full gap-3 p-3 md:grid-cols-2 lg:grid-cols-2">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <InputConfig
                  {...field}
                  labelText={`Tiêu đề`}
                  error={errors.title?.message}
                  disabled={able}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <InputConfig
                  {...field}
                  labelText={`Mô tả`}
                  error={errors.description?.message}
                  disabled={able}
                />
              )}
            />

            <div
              className={`col-span-1 grid w-full gap-1.5 font-sans font-normal text-Charcoal md:col-span-2`}
            >
              {" "}
              <Label className="mb-2 block">{`Hình ảnh nền`}</Label>
              {}
              {(mode === "edit" || mode === "create") && (
                <CustomButtonUploadImage
                  onImageUpload={handleImageUpload}
                  disabled={able}
                  multiple={true}
                />
              )}
              {errors.image_url && (
                <p className="font-sans text-[12px] font-normal text-PersianRed">
                  {errors.image_url?.message}
                </p>
              )}
              {imageList && imageList.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {imageList.map((image: string, index: number) => (
                    <div key={index} className="relative">
                      <img
                        src={
                          image?.startsWith("data:image")
                            ? image
                            : process.env.NEXT_PUBLIC_BASE_URL_IMAGE + image
                        }
                        alt="banner"
                        className="h-36 w-full rounded object-contain"
                      />
                      {(mode === "edit" || mode === "create") && (
                        <button
                          type="button"
                          className="bg-red-500 text-white absolute right-0 top-0 h-6 w-6 rounded-full"
                          onClick={() => {
                            handleRemoveImage(image)
                          }}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        {mode === "edit" && (
          <div className="flex flex-row gap-4">
            <Button
              type="submit"
              className="w-fit bg-Charcoal p-2 px-8 text-White"
            >
              Cập nhật
            </Button>
          </div>
        )}

        {mode === "view" && (
          <Button
            onClick={() => handleSetMode("edit")}
            className="w-fit bg-Charcoal p-2 px-8 text-White"
          >
            Chỉnh sửa
          </Button>
        )}
        {mode === "create" && (
          <Button
            type="submit"
            className="w-fit bg-Charcoal p-2 px-8 text-White"
          >
            Thêm mới
          </Button>
        )}
      </form>
      {showAlertSuccess && <AlertSuccess description={alertDescription} />}
      {showAlertError && <AlertError description={alertDescription} />}{" "}
    </div>
  )
}

export default Page
