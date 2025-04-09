"use client"
import React, { useEffect, useState } from "react"
import * as Yup from "yup"
import {
  useForm,
  Controller,
  FieldValues,
  ControllerRenderProps,
} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { ConfigStoreInformation } from "@/types/configStoreInformation"
import InputConfig from "@/components/inputComponent/inputRegisterLecture"
import { Button } from "@/components/ui/button"
import {
  APICreateNewAboutUs,
  APIGetAboutUs,
  APIUpdateAboutUs,
} from "@/services/aboutUs"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { useDispatch } from "react-redux"
import { setMode } from "@/store/slices/modeSlice"
import { Label } from "@/components/ui/label"
import AlertSuccess from "@/components/alert/AlertSuccess"
import AlertError from "@/components/alert/AlertError"
import { setAboutUs } from "@/store/slices/aboutUsSlice"
import dynamic from "next/dynamic"
import TextAreaConfig from "@/components/inputComponent/textAreaConfig"
import CustomButtonUploadImage from "@/components/customButtomUploadImage/customButtonUploadImage"

const ConfigValidationSchema: any = Yup.object({
  company_name: Yup.string().required("Tên công ty là bắt buộc"),
  logo: Yup.string().required("Logo là bắt buộc"),
  description: Yup.string().required("Mô tả là bắt buộc"),

  open_time: Yup.string().optional(),
  address: Yup.string().required("Địa chỉ là bắt buộc"),
  phone: Yup.string()
    .matches(/^(\+?\d{1,4}|\d{1,4})?\s?\d{9,12}$/, "Số điện thoại không hợp lệ")
    .required("Số điện thoại là bắt buộc"),
  email: Yup.string().email("Email không hợp lệ").optional(),
  facebook_link: Yup.string().url("Facebook phải là URL hợp lệ").optional(),
  twitter_link: Yup.string().url("Twitter phải là URL hợp lệ").optional(),
  instagram_link: Yup.string().url("Instagram phải là URL hợp lệ").optional(),
  linkedin_link: Yup.string().url("LinkedIn phải là URL hợp lệ").optional(),
  map: Yup.string().required("Đường dẫn google map là bắt buộc"),
  images: Yup.array().of(Yup.string().optional()),
  vision: Yup.string().optional(),
  mission: Yup.string().optional(),
})

const Page = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<ConfigStoreInformation>({
    resolver: yupResolver(ConfigValidationSchema),
    defaultValues: {
      _id: "",
      company_name: "",
      logo: null,
      images: [],
      description: "",
      open_time: "",
      address: "",
      phone: "",
      email: "",
      facebook_link: "",
      twitter_link: "",
      instagram_link: "",
      linkedin_link: "",
      map: "",
      images_delete: [],
      vision: "",
      mission: "",
    },
  })

  const mode = useSelector((state: RootState) => state.mode.modeInfo.mode)
  const aboutUs = useSelector((state: RootState) => state.aboutUs.aboutUs)
  const tokenDecode = useSelector((state: RootState) => state.auth.tokenDecode)
  const dispatch = useDispatch()

  const [imageList, setImageList] = useState<any>([])
  const [base64List, setBase64List] = useState<string>()
  const [able, setAble] = useState(false)
  const [showAlertSuccess, setShowAlertSuccess] = useState(false)
  const [showAlertError, setShowAlertError] = useState(false)
  const [alertDescription, setAlertDescription] = useState("")
  const [description, setDescription] = useState<string>("")

  useEffect(() => {
    if (description) {
      setValue("description", description)
    }
  }, [description])

  //up 1 anh
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] // Chỉ lấy tệp đầu tiên
    if (file) {
      // Tạo preview cho ảnh
      const preview = URL.createObjectURL(file)

      // Chuyển đổi tệp sang Base64
      const reader = new FileReader()
      reader.onloadend = () => {
        setBase64List(reader.result as string) // Lưu Base64 vào state
        setValue("logo", reader.result as string)

        if (aboutUs.logo) {
          setValue("images_delete", [
            ...(getValues("images_delete") || []),
            aboutUs.logo,
          ])
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleMoreImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files
    if (!files?.length) return

    // Tạo array chứa tất cả promises của việc đọc file
    const readFilePromises = Array.from(files).map(
      (file) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => {
            resolve(reader.result as string)
          }
          reader.readAsDataURL(file)
        })
    )

    try {
      // Đợi tất cả files được đọc xong
      const newImages = await Promise.all(readFilePromises)

      // Cập nhật state và form một lần duy nhất
      setImageList((prevList: any) => {
        const updatedList = [...prevList, ...newImages]
        setValue("images", updatedList)
        return updatedList
      })
    } catch (error) {
      console.error("Error processing images:", error)
    }
  }

  const handleRemoveMoreImage = (index: number) => {
    const removedImage = imageList[index] // Lấy ảnh bị xóa
    const updatedImages = imageList.filter((_: any, i: any) => i !== index) // Loại bỏ ảnh khỏi danh sách hiện tại
    setImageList(updatedImages) // Cập nhật danh sách ảnh hiển thị
    setValue("images", updatedImages) // Cập nhật dữ liệu trong form
    const imageDelete = getValues("images_delete")
    const newImageDeleteList = [...(imageDelete || []), removedImage]
    setValue("images_delete", newImageDeleteList)
  }

  const handleRemoveImage = (imageUrl: string) => {
    setValue("images_delete", [...(getValues("images_delete") || []), imageUrl])
    setValue("logo", "")
    setBase64List("")
  }

  useEffect(() => {
    if (base64List) {
      setValue("logo", base64List)
      setBase64List(base64List)
    }
    if (imageList.length > 0) {
      setValue("images", imageList)
      setImageList(imageList)
    }
  }, [base64List, imageList])

  useEffect(() => {
    if (aboutUs?._id && aboutUs?._id.length > 0) {
      setValue("company_name", aboutUs.company_name || "")

      setValue("logo", aboutUs.logo || null)
      setValue("description", aboutUs.description || "")
      setValue("open_time", aboutUs.open_time || "")
      setValue("vision", aboutUs.vision || "")
      setValue("mission", aboutUs.mission || "")
      setValue("address", aboutUs.address || "")
      setValue("phone", aboutUs.phone || "")
      setValue("email", aboutUs.email || "")
      setValue("facebook_link", aboutUs.facebook_link || "")
      setValue("twitter_link", aboutUs.twitter_link || "")
      setValue("instagram_link", aboutUs.instagram_link || "")
      setValue("linkedin_link", aboutUs.linkedin_link || "")
      setValue("map", aboutUs.map || "")
      setValue("_id", aboutUs._id || "")
      setBase64List(aboutUs.logo)
      setValue("images", aboutUs.images || [])
      setImageList(aboutUs.images)
      setDescription(aboutUs.description)
    } else {
      setValue("_id", tokenDecode.id)
    }
  }, [aboutUs, setValue])

  const handleSetMode = (mode: string) => {
    dispatch(setMode({ mode: mode }))
  }

  const onSubmit = async (data: any) => {
    mode === "create" && handleCreateAboutUs(data)
    mode === "view" && handleSetMode("edit")
    mode === "edit" &&
      (data._id && handleUpdateAboutUs(data, data._id), handleSetMode("view"))
  }

  const handleCreateAboutUs = async (data: any) => {
    try {
      const { _id, ...newData } = data
      const response = await APICreateNewAboutUs(newData)
      if (response?.status === 201) {
        setAlertDescription("Thêm thông tin thành công!")
        setShowAlertSuccess(true)
        handleGetAboutUs()
        handleSetMode("view")

        setTimeout(() => {
          setShowAlertSuccess(false)
        }, 3000)
      } else {
        setAlertDescription("Thêm thông tin thất bại!")
        setShowAlertError(true)

        setTimeout(() => {
          setShowAlertError(false)
        }, 3000)
      }
    } catch (err) {
      setAlertDescription("Thêm thông tin thất bại!")
      setShowAlertError(true)

      setTimeout(() => {
        setShowAlertError(false)
      }, 3000)
    }
  }
  const handleGetAboutUs = async () => {
    try {
      const response = await APIGetAboutUs(tokenDecode.id)
      if (response?.status === 200) {
        handleSetMode("view")
        dispatch(setAboutUs(response.data))
      } else if (response?.status === 404) {
        handleSetMode("create")
      }
    } catch (error) {
      console.error(error)
      handleSetMode("create")
    }
  }

  useEffect(() => {
    if (tokenDecode.id.length > 0) {
      handleGetAboutUs()
    }
  }, [tokenDecode.id])

  const handleUpdateAboutUs = async (data: any, id: string) => {
    try {
      const response = await APIUpdateAboutUs(data, id)
      if (response?.status === 200) {
        setAlertDescription("Cập nhật thông tin thành công!")
        setShowAlertSuccess(true)
        setValue("images_delete", [])
        handleGetAboutUs()
        setTimeout(() => {
          setShowAlertSuccess(false)
        }, 3000)
      } else {
        setAlertDescription("Cập nhật thông tin thất bại!")
        setShowAlertError(true)

        setTimeout(() => {
          setShowAlertError(false)
        }, 3000)
      }
    } catch (err) {
      setAlertDescription("Cập nhật thông tin thất bại!")
      setShowAlertError(true)

      setTimeout(() => {
        setShowAlertError(false)
      }, 3000)
    }
  }

  useEffect(() => {
    handleGetAboutUs()
  }, [])

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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full w-full flex-col gap-2"
      >
        <div className="bg-white h-full w-full rounded-lg p-3 shadow-md">
          <p className="text-black font-sans text-[20px] font-medium">
            Thông tin cửa hàng
          </p>
          <div className="grid h-full w-full grid-cols-1 gap-3 p-3 md:grid-cols-2 lg:grid-cols-2">
            <div
              className={`col-span-1 grid w-full gap-1.5 font-sans font-normal text-Charcoal md:col-span-2`}
            >
              <Label className="mb-2 block">Logo</Label>
              {}
              {(mode === "edit" || mode === "create") && (
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="mb-2"
                  disabled={able}
                />
              )}
              {errors.logo && (
                <p className="font-sans text-[12px] font-normal text-PersianRed">
                  {errors.logo.message}
                </p>
              )}
              {base64List && (
                <div className="flex flex-wrap gap-2">
                  <div className="relative">
                    <img
                      src={
                        base64List?.startsWith("data:image")
                          ? base64List
                          : process.env.NEXT_PUBLIC_BASE_URL_IMAGE + base64List
                      }
                      alt=""
                      className="h-24 w-24 rounded object-contain"
                    />
                    {(mode === "edit" || mode === "create") && (
                      <button
                        type="button"
                        className="bg-red-500 text-white absolute right-0 top-0 h-6 w-6 rounded-full"
                        onClick={() => {
                          handleRemoveImage(base64List)
                        }}
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
            <Controller
              name="company_name"
              control={control}
              render={({ field }) => (
                <InputConfig
                  {...field}
                  labelText="Tên công ty"
                  error={errors.company_name?.message}
                  disabled={able}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <InputConfig
                  {...field}
                  labelText="Email"
                  error={errors.email?.message}
                  disabled={able}
                />
              )}
            />
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <InputConfig
                  {...field}
                  labelText="Địa chỉ"
                  error={errors.address?.message}
                  disabled={able}
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <InputConfig
                  {...field}
                  labelText="Số điện thoại"
                  error={errors.phone?.message}
                  disabled={able}
                />
              )}
            />
            <Controller
              name="open_time"
              control={control}
              render={({ field }) => (
                <InputConfig
                  {...field}
                  labelText="Thời gian hoạt động"
                  error={errors.open_time?.message}
                  disabled={able}
                />
              )}
            />

            <Controller
              name="facebook_link"
              control={control}
              render={({ field }) => (
                <InputConfig
                  {...field}
                  labelText="Facebook"
                  error={errors.facebook_link?.message}
                  disabled={able}
                />
              )}
            />
            <Controller
              name="instagram_link"
              control={control}
              render={({ field }) => (
                <InputConfig
                  {...field}
                  labelText="Instagram"
                  error={errors.instagram_link?.message}
                  disabled={able}
                />
              )}
            />
            <Controller
              name="twitter_link"
              control={control}
              render={({ field }) => (
                <InputConfig
                  {...field}
                  labelText="Twitter"
                  error={errors.twitter_link?.message}
                  disabled={able}
                />
              )}
            />
            <Controller
              name="linkedin_link"
              control={control}
              render={({ field }) => (
                <InputConfig
                  {...field}
                  labelText="LinkedIn"
                  error={errors.linkedin_link?.message}
                  disabled={able}
                />
              )}
            />
            <Controller
              name="map"
              control={control}
              render={({ field }) => (
                <InputConfig
                  {...field}
                  labelText="Đường dẫn google map"
                  error={errors.map?.message}
                  disabled={able}
                />
              )}
            />
            <Controller
              name="vision"
              control={control}
              render={({ field }) => (
                <InputConfig
                  {...field}
                  labelText="Tầm nhìn"
                  error={errors.vision?.message}
                  disabled={able}
                />
              )}
            />
            <Controller
              name="mission"
              control={control}
              render={({ field }) => (
                <InputConfig
                  {...field}
                  labelText="Sứ mệnh"
                  error={errors.mission?.message}
                  disabled={able}
                />
              )}
            />
          </div>
          <div className="mt-3 flex w-full flex-col gap-2">
            <TextAreaConfig
              label="Mô tả công ty"
              name="description"
              value={description}
              onChange={(data: any) => setDescription(data)}
              disabled={mode === "view" ? true : false}
            />
          </div>

          <div
            className={`grid w-full gap-1.5 py-2 font-sans font-normal text-Charcoal`}
          >
            {" "}
            <Label className="mb-2 block">Danh sách hình ảnh cửa hàng</Label>
            {(mode === "edit" || mode === "create") && (
              <CustomButtonUploadImage
                onImageUpload={handleMoreImageUpload}
                disabled={able}
                multiple={true}
              />
            )}
            {errors.images && (
              <p className="font-sans text-[12px] font-normal text-PersianRed">
                {errors.images.message}
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              {imageList?.map((image: string, index: any) => (
                <div key={index} className="relative">
                  <img
                    src={
                      image?.startsWith("data:image")
                        ? image
                        : process.env.NEXT_PUBLIC_BASE_URL_IMAGE + image
                    }
                    alt=""
                    className="h-24 w-24 rounded object-contain"
                  />
                  {(mode === "edit" || mode === "create") && (
                    <button
                      type="button"
                      className="bg-red-500 text-white absolute right-0 top-0 h-6 w-6 rounded-full"
                      onClick={() => handleRemoveMoreImage(index)}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
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
      {showAlertError && <AlertError description={alertDescription} />}
    </div>
  )
}

export default Page
