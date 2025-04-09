"use client"
import { Button } from "@/components/ui/button"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import * as Yup from "yup"

import AlertError from "@/components/alert/AlertError"
import AlertOption from "@/components/alert/AlertOption"
import AlertSuccess from "@/components/alert/AlertSuccess"
import InputConfig from "@/components/inputComponent/inputRegisterLecture"
import ColumnsAdditionalService from "@/components/table/ColumnAdditionalService"
import { DataTable } from "@/components/table/DataTable"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  APICreateNewAdditionalServices,
  APIDeleteAdditionalServices,
  APIGetAdditionalServices,
  APIGetAdditionalServicesById,
  APIUpdateAdditionalServices,
} from "@/services/additionalService"
import {
  clearAdditionalService,
  setAdditionalService,
  setIsDeleteAdditionalService,
} from "@/store/slices/additionalServiceSlice"
import { setMode } from "@/store/slices/modeSlice"
import { RootState } from "@/store/store"
import { CopyPlus } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"

const ConfigValidationSchema = Yup.object({
  service_name: Yup.string()
    .required("Nội dung lý do là bắt buộc")
    .max(200, "Nội dung lý do tối đa 200 ký tự"),
  description: Yup.string().required("Mô tả là bắt buộc"),
})

const Page = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(ConfigValidationSchema),
    defaultValues: {
      // image_delete: '',

      service_name: "",
      description: "",
    },
  })

  const mode = useSelector((state: RootState) => state.mode.modeInfo.mode)
  const additionalService = useSelector(
    (state: RootState) => state.additionalService.additionalService
  )
  const isDeleteAdditionalService = useSelector(
    (state: RootState) => state.additionalService.isDeleteAdditionalService
  )
  const dispatch = useDispatch()

  const [dataTable, setDataTable] = useState([])
  const [able, setAble] = useState(false)
  const [showAlertSuccess, setShowAlertSuccess] = useState(false)
  const [showAlertError, setShowAlertError] = useState(false)
  const [alertDescription, setAlertDescription] = useState("")
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (additionalService) {
      scrollToFormProduct()
      setValue("service_name", additionalService.service_name)
      setValue("description", additionalService.description)
    }
  }, [additionalService, setValue])

  const handleClearData = () => {
    setValue("service_name", "")
    setValue("description", "")

    //   setValue('image_delete', []);
  }

  const handleSetMode = (mode: string) => {
    dispatch(setMode({ mode: mode }))
    console.log(mode)
  }

  const onSubmit = async (data: any) => {
    const body = {
      service_name: data.service_name,
      description: data.description,
    }

    mode === "create" && handleCreateAdditionalService(body)
    mode === "view" && handleSetMode("edit")
    mode === "edit" &&
      (additionalService._id &&
        handleUpdateAdditionalService(body, additionalService._id),
      handleSetMode("view"))
  }

  const handleCreateAdditionalService = async (data: any) => {
    try {
      const response = await APICreateNewAdditionalServices(data)
      if (response?.status === 201) {
        setAlertDescription("Thêm lý do lựa chọn  thành công!")
        setShowAlertSuccess(true)
        handleSetMode("view")
        handleGetAdditionalServices()
        additionalService._id &&
          handleGetAdditionalService(additionalService._id)

        setTimeout(() => {
          setShowAlertSuccess(false)
        }, 3000)
      } else {
        setAlertDescription("Thêm lý do lựa chọn  thất bại!")
        setShowAlertError(true)

        setTimeout(() => {
          setShowAlertError(false)
        }, 3000)
      }
    } catch (err) {
      setAlertDescription("Thêm lý do lựa chọn  thất bại!")
      setShowAlertError(true)

      setTimeout(() => {
        setShowAlertError(false)
      }, 3000)
    }
  }

  const handleGetAdditionalService = async (id: string) => {
    try {
      const response = await APIGetAdditionalServicesById(id)
      if (response?.status === 200) {
        dispatch(setAdditionalService(response.data))
        dispatch(setMode({ mode: "view" }))
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleGetAdditionalServices = async () => {
    try {
      setLoading(true)

      const response = await APIGetAdditionalServices()
      if (response?.status === 200) {
        setDataTable(response?.data)
        setLoading(false)
        handleSetMode("create")
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleUpdateAdditionalService = async (data: any, id: string) => {
    try {
      const response = await APIUpdateAdditionalServices(data, id)
      if (response?.status === 200) {
        setAlertDescription("Cập nhật lý do lựa chọn  thành công!")
        setShowAlertSuccess(true)
        handleGetAdditionalServices()
        additionalService._id &&
          handleGetAdditionalService(additionalService._id)
        // setValue('image_delete', '');/

        setTimeout(() => {
          setShowAlertSuccess(false)
        }, 3000)
      } else {
        setAlertDescription("Cập nhật lý do lựa chọn  thất bại!")
        setShowAlertError(true)

        setTimeout(() => {
          setShowAlertError(false)
        }, 3000)
      }
    } catch (err) {
      setAlertDescription("Cập nhật lý do lựa chọn  thất bại!")
      setShowAlertError(true)

      setTimeout(() => {
        setShowAlertError(false)
      }, 3000)
    }
  }

  const handleDeleteAdditionalService = async (id: string) => {
    try {
      const response = await APIDeleteAdditionalServices(id)
      if (response?.status === 200) {
        setAlertDescription("Xóa lý do lựa chọn  thành công!")
        setShowAlertSuccess(true)
        handleClearData()
        handleGetAdditionalServices()
        handleSetMode("create")
        dispatch(clearAdditionalService())
        setTimeout(() => {
          setShowAlertSuccess(false)
        }, 3000)
      }
    } catch (err) {
      setAlertDescription("Xóa lý do lựa chọn  thất bại!")
      setShowAlertError(true)
      setTimeout(() => {
        setShowAlertError(false)
      }, 3000)
    }
  }

  useEffect(() => {
    handleGetAdditionalServices()
    handleSetMode("create")
    handleClearData()
  }, [])

  useEffect(() => {
    if (isDeleteAdditionalService) {
      handleGetAdditionalServices()
      dispatch(setIsDeleteAdditionalService(false))
      handleSetMode("create")
      handleClearData()
    }
  }, [isDeleteAdditionalService])

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
          Thông tin lý do lựa chọn
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
        <DataTable
          columns={ColumnsAdditionalService}
          data={dataTable}
          loading={loading}
        />
      </div>
      <div className="h-full w-full gap-3 p-3">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center gap-3">
            <span className="font-sans text-[12px] font-bold text-PersianRed md:text-[16px] lg:text-[20px]">
              Lý do lựa chọn
            </span>
          </div>
          <div className="bg-white h-full w-full gap-3 rounded-lg p-3">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
              id="formProduct"
            >
              <div className="flex gap-4">
                <div className="w-full">
                  <Controller
                    name="service_name"
                    control={control}
                    render={({ field }) => (
                      <InputConfig
                        {...field}
                        labelText="Lý do lựa chọn"
                        error={errors.service_name?.message}
                        disabled={able}
                      />
                    )}
                  />
                </div>

                <div className="w-full">
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <InputConfig
                        {...field}
                        labelText="Mô tả"
                        error={errors.description?.message}
                        disabled={able}
                      />
                    )}
                  />
                </div>
              </div>

              {mode === "edit" && (
                <div className="flex flex-row gap-4">
                  <Button
                    type="button"
                    className="w-fit bg-PersianRed p-2 px-8 text-White"
                    onClick={() => setDialogOpen(true)}
                  >
                    Xóa
                  </Button>
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
        onConfirm={() =>
          additionalService._id &&
          handleDeleteAdditionalService(additionalService._id)
        }
      />
      {showAlertSuccess && <AlertSuccess description={alertDescription} />}
      {showAlertError && <AlertError description={alertDescription} />}{" "}
    </div>
  )
}

export default Page
