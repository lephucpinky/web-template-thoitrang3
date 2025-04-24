"use client"
import React, { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button } from "@/components/ui/button"
import * as Yup from "yup"
import { DataTable } from "@/components/table/DataTable"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { setMode } from "@/store/slices/modeSlice"
import { Label } from "@/components/ui/label"
import AlertOption from "@/components/alert/AlertOption"
import AlertSuccess from "@/components/alert/AlertSuccess"
import AlertError from "@/components/alert/AlertError"
import { CopyPlus } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  clearReview,
  setIsDeleteReview,
  setReview,
} from "@/store/slices/reviewSlice"
import InputConfig from "@/components/inputComponent/inputRegisterLecture"
import {
  APICreateNewReview,
  APIDeleteReview,
  APIGetReview,
  APIGetReviewById,
  APIUpdateReview,
} from "@/services/review"
import ColumnsReview from "@/components/table/ColumnReview"
import CustomButtonUploadImage from "@/components/customButtomUploadImage/customButtonUploadImage"

const ConfigValidationSchema = Yup.object({
  customerName: Yup.string().required("Tên là bắt buộc"),
  comment: Yup.string().required("Nội dung là bắt buộc"),
  avatar: Yup.mixed().required("Hình ảnh đại diện là bắt buộc"),
})

const Page = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(ConfigValidationSchema),
    defaultValues: {
      customerName: "",
      comment: "",
      avatar: "",
    },
  })

  const mode = useSelector((state: RootState) => state.mode.modeInfo.mode)
  const review = useSelector((state: RootState) => state.review.review)
  const isDeleteReview = useSelector(
    (state: RootState) => state.review.isDeleteReview
  )
  const dispatch = useDispatch()

  const [dataTable, setDataTable] = useState([])
  const [able, setAble] = useState(false)
  const [imageList, setImageList] = useState<any>()

  const [showAlertSuccess, setShowAlertSuccess] = useState(false)
  const [showAlertError, setShowAlertError] = useState(false)
  const [alertDescription, setAlertDescription] = useState("")
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)

  //up 1 anh
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] // Chỉ lấy tệp đầu tiên
    if (file) {
      // Chuyển đổi tệp sang Base64
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageList(reader.result as string) // Lưu Base64 vào state
        setValue("avatar", reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = (imageUrl: string) => {
    // setValue('image_delete', imageUrl);
    setValue("avatar", "")
    setImageList("")
  }

  useEffect(() => {
    if (review) {
      scrollToFormProduct()
      review.comment && setValue("comment", review.comment)
      review.avatar && setValue("avatar", review.avatar)
      setImageList(review.avatar)

      review.customerName && setValue("customerName", review.customerName)
    }
  }, [review, setValue])

  const handleClearData = () => {
    setValue("comment", "")
    setValue("customerName", "")
    setValue("avatar", "")
    setImageList("")

    //   setValue('image_delete', []);
  }

  const handleSetMode = (mode: string) => {
    dispatch(setMode({ mode: mode }))
  }

  const onSubmit = async (data: any) => {
    const body = {
      customerName: data.customerName,
      comment: data.comment,
      avatar: imageList,
    }

    mode === "create" && handleCreateReview(body)
    mode === "view" && handleSetMode("edit")
    mode === "edit" &&
      (review._id && handleUpdateReview(body, review._id),
      handleSetMode("view"))
  }

  const handleCreateReview = async (data: any) => {
    try {
      const response = await APICreateNewReview(data)
      if (response?.status === 201) {
        setAlertDescription("Thêm đánh giá thành công!")
        setShowAlertSuccess(true)
        handleSetMode("view")
        handleGetReviews()
        review._id && handleGetReview(review._id)

        setTimeout(() => {
          setShowAlertSuccess(false)
        }, 3000)
      } else {
        setAlertDescription("Thêm đánh giá thất bại!")
        setShowAlertError(true)

        setTimeout(() => {
          setShowAlertError(false)
        }, 3000)
      }
    } catch (err) {
      setAlertDescription("Thêm đánh giá thất bại!")
      setShowAlertError(true)

      setTimeout(() => {
        setShowAlertError(false)
      }, 3000)
      console.log(err)
    }
  }

  const handleGetReview = async (id: string) => {
    try {
      const response = await APIGetReviewById(id)
      if (response?.status === 200) {
        dispatch(setReview(response.data))
        dispatch(setMode({ mode: "view" }))
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleGetReviews = async () => {
    try {
      setLoading(true)

      const response = await APIGetReview()
      if (response?.status === 200) {
        setDataTable(response?.data)
        setLoading(false)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleUpdateReview = async (data: any, id: string) => {
    try {
      const response = await APIUpdateReview(data, id)
      if (response?.status === 200) {
        setAlertDescription("Cập nhật đánh giá thành công!")
        setShowAlertSuccess(true)
        handleGetReviews()
        review._id && handleGetReview(review._id)
        // setValue('image_delete', '');/

        setTimeout(() => {
          setShowAlertSuccess(false)
        }, 3000)
      } else {
        setAlertDescription("Cập nhật đánh giá thất bại!")
        setShowAlertError(true)

        setTimeout(() => {
          setShowAlertError(false)
        }, 3000)
      }
    } catch (err) {
      setAlertDescription("Cập nhật đánh giá thất bại!")
      setShowAlertError(true)

      setTimeout(() => {
        setShowAlertError(false)
      }, 3000)
      console.log(err)
    }
  }

  const handleDeleteReview = async (id: string) => {
    try {
      const response = await APIDeleteReview(id)
      if (response?.status === 200) {
        setAlertDescription("Xóa đánh giá thành công!")
        setShowAlertSuccess(true)
        handleClearData()
        handleGetReviews()
        handleSetMode("create")
        dispatch(clearReview())
        setTimeout(() => {
          setShowAlertSuccess(false)
        }, 3000)
      }
    } catch (err) {
      setAlertDescription("Xóa đánh giá thất bại!")
      setShowAlertError(true)
      setTimeout(() => {
        setShowAlertError(false)
      }, 3000)
      console.log(err)
    }
  }

  useEffect(() => {
    handleGetReviews()
    handleSetMode("create")
    handleClearData()
  }, [])

  useEffect(() => {
    if (isDeleteReview) {
      handleGetReviews()
      dispatch(setIsDeleteReview(false))
      dispatch(clearReview())
      handleSetMode("create")
      handleClearData()
    }
  }, [isDeleteReview])

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

  const scrollToFormProduct = () => {
    const formEventElement = document.getElementById("formProduct")
    if (formEventElement) {
      const offset = 100 // Khoảng cách từ phía trên của trang
      const elementPosition = formEventElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="bg-white h-full w-full rounded-lg p-3 shadow-md">
      <div className="flex flex-row items-center gap-4">
        <p className="text-black font-sans text-[20px] font-medium">
          Thông tin đánh giá
        </p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <CopyPlus
                className="hover:cursor-pointer"
                size={18}
                color="#2a435d"
                onClick={() => {
                  handleSetMode("create"),
                    handleClearData(),
                    scrollToFormProduct()
                }}
              />{" "}
            </TooltipTrigger>
            <TooltipContent>
              <span className="rounded-md bg-Charcoal p-2 text-White shadow-sm">
                Thêm mới
              </span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex flex-col">
        <DataTable columns={ColumnsReview} data={dataTable} loading={loading} />
      </div>
      <div className="h-full w-full gap-3 p-3">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center gap-3">
            <span className="font-sans text-[12px] font-bold text-PersianRed md:text-[16px] lg:text-[20px]">
              Cam kết{" "}
            </span>
          </div>
          <div className="h-full w-full gap-3 rounded-lg bg-White p-3">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
              id="formProduct"
            >
              <div className="grid-flow-col-1 grid flex-col gap-4 md:grid-cols-2 lg:grid-cols-2">
                <Controller
                  name="customerName"
                  control={control}
                  render={({ field }) => (
                    <InputConfig
                      {...field}
                      labelText="Tên"
                      error={errors.customerName?.message}
                      disabled={able}
                    />
                  )}
                />

                <Controller
                  name="comment"
                  control={control}
                  render={({ field }) => (
                    <InputConfig
                      {...field}
                      labelText="Nội dung"
                      error={errors.comment?.message}
                      disabled={able}
                    />
                  )}
                />
              </div>
              <div
                className={`col-span-1 grid w-full gap-1.5 font-sans font-normal text-Charcoal md:col-span-2`}
              >
                {" "}
                <Label className="mb-2 block">{`Hình ảnh khách hàng`}</Label>
                {}
                {(mode === "edit" || mode === "create") && (
                  <CustomButtonUploadImage
                    onImageUpload={handleImageUpload}
                    disabled={able}
                  />
                )}
                {errors.avatar && (
                  <p className="font-sans text-[12px] font-normal text-PersianRed">
                    {errors.avatar?.message}
                  </p>
                )}
                {imageList && (
                  <div className="flex flex-wrap gap-2">
                    <div className="relative">
                      <img
                        src={
                          imageList?.startsWith("data:image")
                            ? imageList
                            : process.env.NEXT_PUBLIC_BASE_URL_IMAGE + imageList
                        }
                        alt="review"
                        className="h-36 w-full rounded object-contain"
                      />
                      {(mode === "edit" || mode === "create") && (
                        <button
                          type="button"
                          className="bg-red-500 text-white absolute right-0 top-0 h-6 w-6 rounded-full"
                          onClick={() => {
                            handleRemoveImage(imageList)
                          }}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {mode === "edit" && (
                <div className="flex flex-row gap-4">
                  {/* <Button
                    type="button"
                    className="w-fit bg-PersianRed p-2 px-8 text-White"
                    onClick={() => setDialogOpen(true)}
                  >
                    Xóa
                  </Button> */}
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
                  type="submit"
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
          </div>
        </div>
      </div>
      <AlertOption
        isOpen={isDialogOpen}
        onOpenChange={setDialogOpen}
        onConfirm={() => review._id && handleDeleteReview(review._id)}
      />
      {showAlertSuccess && <AlertSuccess description={alertDescription} />}
      {showAlertError && <AlertError description={alertDescription} />}{" "}
    </div>
  )
}

export default Page
