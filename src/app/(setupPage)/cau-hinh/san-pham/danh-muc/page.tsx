"use client"
import React, { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button } from "@/components/ui/button"
import * as Yup from "yup"

import { DataTable } from "@/components/table/DataTable"
import { useDispatch, useSelector } from "react-redux"

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
  APICreateNewCategory,
  APIGetCategories,
  APIGetCategoryById,
  APIUpdateCategory,
} from "@/services/category"
import InputConfig from "@/components/inputComponent/inputRegisterLecture"
import { RootState } from "@/store/store"
import { setMode } from "@/store/slices/modeSlice"
import { Label } from "@radix-ui/react-dropdown-menu"
import { setCategory, setIsDelete } from "@/store/slices/categorySlice"
import { CategoryFormData } from "@/types/categoryType"
import ColumnsCategory from "@/components/table/ColumnCategory"
import CustomButtonUploadImage from "@/components/customButtomUploadImage/customButtonUploadImage"
const ConfigValidationSchema = () =>
  Yup.object().shape({
    category_name: Yup.string()
      .required("Tên danh mục là bắt buộc")
      .max(100, "Tên danh mục tối đa 100 ký tự"),
    description: Yup.string()
      .required("Mô tả danh mục là bắt buộc")
      .max(200, "Mô tả danh mục tối đa 200 ký tự"),
    category_image: Yup.string().required("Ảnh danh mục là bắt buộc"),
  })

const Page = () => {
  const mode = useSelector((state: RootState) => state.mode.modeInfo.mode)

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<CategoryFormData>({
    resolver: yupResolver<any>(ConfigValidationSchema()),
    defaultValues: {
      category_name: "",
      description: "",
      category_image: "",
    },
  })

  const category = useSelector((state: RootState) => state.category.category)
  const isDelete = useSelector((state: RootState) => state.category.isDelete)
  const dispatch = useDispatch()

  const [dataTable, setDataTable] = useState([])
  const [able, setAble] = useState(false)
  const [showAlertSuccess, setShowAlertSuccess] = useState(false)
  const [showAlertError, setShowAlertError] = useState(false)
  const [alertDescription, setAlertDescription] = useState("")
  const [loading, setLoading] = useState(false)

  const [imageList, setImageList] = useState("")
  useEffect(() => {
    if (category) {
      setValue("category_name", category.category_name)
      setValue("description", category.description)
      setValue("category_image", category.category_image)
      setImageList(category.category_image || "")
    }
  }, [category, setValue])

  const handleClearData = () => {
    setValue("category_name", "")
    setValue("description", "")
    setValue("category_image", "")
    setImageList("")
  }

  useEffect(() => {
    dispatch(setMode({ mode: "create" }))
    handleClearData()
  }, [])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] // Chỉ lấy tệp đầu tiên
    if (file) {
      // Tạo preview cho ảnh
      const preview = URL.createObjectURL(file)

      // Chuyển đổi tệp sang Base64
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageList(reader.result as string) // Lưu Base64 vào state
        setValue("category_image", reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = (imageUrl: string) => {
    setValue("category_image", "")
    setImageList("")
  }

  const handleSetMode = (mode: string) => {
    dispatch(setMode({ mode: mode }))
    console.log(mode)
  }

  const onSubmit = async (data: any) => {
    const body = {
      category_name: data.category_name,
      description: data.description,
      category_image: data.category_image,
    }
    mode === "create" && handleCreateCategory(data)
    mode === "view" && handleSetMode("edit")
    mode === "edit" &&
      (category._id && handleUpdateCategory(body, category._id),
      handleSetMode("view"))
  }

  const handleCreateCategory = async (data: any) => {
    try {
      const response = await APICreateNewCategory(data)
      if (response?.status === 201) {
        setAlertDescription("Thêm danh mục thành công!")
        setShowAlertSuccess(true)
        handleSetMode("view")
        handleGetCategories()
        handleClearData()

        setTimeout(() => {
          setShowAlertSuccess(false)
        }, 3000)
      } else {
        setAlertDescription("Thêm danh mục thất bại!")
        setShowAlertError(true)

        setTimeout(() => {
          setShowAlertError(false)
        }, 3000)
      }
    } catch (err) {
      setAlertDescription("Thêm danh mục thất bại!")
      setShowAlertError(true)

      setTimeout(() => {
        setShowAlertError(false)
      }, 3000)
    }
  }

  const handleGetCategory = async (id: string) => {
    try {
      const response = await APIGetCategoryById(id)
      if (response?.status === 200) {
        dispatch(setCategory(response.data))
        console.log(response.data)
        dispatch(setMode({ mode: "view" }))
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleGetCategories = async () => {
    try {
      setLoading(true)

      const response = await APIGetCategories()
      if (response?.status === 200) {
        setDataTable(response?.data)

        setLoading(false)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleUpdateCategory = async (data: any, id: string) => {
    try {
      const response = await APIUpdateCategory(data, id)
      if (response?.status === 200) {
        setAlertDescription("Cập nhật danh mục thành công!")
        setShowAlertSuccess(true)
        handleGetCategories()
        category._id && handleGetCategory(category._id)

        setTimeout(() => {
          setShowAlertSuccess(false)
        }, 3000)
      } else {
        setAlertDescription("Cập nhật danh mục thất bại!")
        setShowAlertError(true)

        setTimeout(() => {
          setShowAlertError(false)
        }, 3000)
      }
    } catch (err) {
      setAlertDescription("Cập nhật danh mục thất bại!")
      setShowAlertError(true)

      setTimeout(() => {
        setShowAlertError(false)
      }, 3000)
    }
  }

  useEffect(() => {
    handleGetCategories()
    handleSetMode("create")
  }, [])

  useEffect(() => {
    if (isDelete) {
      handleGetCategories()
      dispatch(setIsDelete(false))
      handleClearData()
      handleSetMode("create")
    }
  }, [isDelete])

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
    <div className="bg-white h-full w-full rounded-lg p-3 shadow-md">
      <div className="flex flex-row items-center gap-4">
        <p className="text-black font-sans text-[20px] font-medium">
          Thông tin danh mục
        </p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <CopyPlus
                className="hover:cursor-pointer"
                size={18}
                color="#2a435d"
                onClick={() => {
                  handleSetMode("create"), handleClearData()
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
        <DataTable
          columns={ColumnsCategory}
          data={dataTable}
          loading={loading}
        />
      </div>
      <div className="h-full w-full gap-3 p-3">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center gap-3">
            <span className="font-sans text-[12px] font-bold text-PersianRed md:text-[16px] lg:text-[20px]">
              Danh mục sản phẩm
            </span>
          </div>
          <div className="bg-white h-full w-full gap-3 rounded-lg p-3">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="grid-flow-col-1 grid flex-col gap-4 md:grid-cols-2 lg:grid-cols-2">
                <Controller
                  name="category_name"
                  control={control}
                  render={({ field }) => (
                    <InputConfig
                      {...field}
                      labelText="Tên danh mục"
                      error={errors.category_name?.message}
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
                      labelText="Mô tả danh mục"
                      error={errors.description?.message}
                      disabled={able}
                    />
                  )}
                />
                <div
                  className={`col-span-1 grid w-full gap-1.5 font-sans font-normal text-Charcoal md:col-span-2`}
                >
                  {" "}
                  <Label className="mb-2 block font-sans font-normal text-Charcoal">{`Hình ảnh nền`}</Label>
                  {}
                  {(mode === "edit" || mode === "create") && (
                    <CustomButtonUploadImage
                      onImageUpload={handleImageUpload}
                      disabled={able}
                    />
                  )}
                  {errors.category_image && (
                    <p className="font-sans text-[12px] font-normal text-PersianRed">
                      {errors.category_image?.message}
                    </p>
                  )}
                  {imageList && (
                    <div className="flex flex-wrap gap-2">
                      <div className="relative">
                        <img
                          src={
                            imageList?.startsWith("data:image")
                              ? imageList
                              : process.env.NEXT_PUBLIC_BASE_URL_IMAGE +
                                imageList
                          }
                          alt="banner"
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
              </div>

              {mode === "edit" && (
                <div className="flex flex-row gap-4">
                  <Button
                    type="submit"
                    className="w-fit bg-Charcoal p-2 px-8 text-White hover:bg-DarkJungleGreen hover:shadow-sm"
                  >
                    Cập nhật
                  </Button>
                </div>
              )}

              {mode === "view" && (
                <Button
                  onClick={() => {
                    setAble(false)
                    handleSetMode("edit")
                  }}
                  className="w-fit bg-Charcoal p-2 px-8 text-White hover:bg-DarkJungleGreen hover:shadow-sm"
                >
                  Chỉnh sửa
                </Button>
              )}
              {mode === "create" && (
                <Button
                  type="submit"
                  className="w-fit bg-Charcoal p-2 px-8 text-White hover:bg-DarkJungleGreen hover:shadow-sm"
                >
                  Thêm mới
                </Button>
              )}
            </form>
          </div>
        </div>
      </div>
      {showAlertSuccess && <AlertSuccess description={alertDescription} />}
      {showAlertError && <AlertError description={alertDescription} />}{" "}
    </div>
  )
}

export default Page
