import React, { useRef } from "react"
import { Button } from "@/components/ui/button"

interface CustomButtonUploadImageProps {
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  multiple?: boolean
  accept?: string
  buttonText?: string
  maxFileSize?: number // in KB
  maxFiles?: number
}

const CustomButtonUploadImage: React.FC<CustomButtonUploadImageProps> = ({
  onImageUpload,
  disabled = false,
  multiple = false,
  accept = "image/*",
  buttonText = "Tải ảnh lên",
  maxFileSize = 3000, // 1000KB = 1MB
  maxFiles = 10,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return

    console.log("Raw files:", files) // Debug log

    // Kiểm tra số lượng file
    if (multiple && files.length > maxFiles) {
      alert(`Chỉ có thể tải lên tối đa ${maxFiles} ảnh một lần`)
      e.target.value = ""
      return
    }

    // Lọc các file hợp lệ
    const validFiles = Array.from(files).filter((file) => {
      if (file.size > maxFileSize * 1024) {
        console.warn(`File ${file.name} vượt quá ${maxFileSize}KB`)
        return false
      }
      if (!file.type.startsWith("image/")) {
        console.warn(`File ${file.name} không phải là ảnh`)
        return false
      }
      return true
    })

    if (validFiles.length === 0) {
      alert("Không có file hợp lệ để tải lên")
      e.target.value = ""
      return
    }

    // Tạo DataTransfer mới với các file hợp lệ
    const dataTransfer = new DataTransfer()
    validFiles.forEach((file) => dataTransfer.items.add(file))
    e.target.files = dataTransfer.files

    // Truyền event thay vì chỉ truyền files
    onImageUpload(e)
  }

  return (
    <Button
      type="button"
      className="text-Charcoal flex w-fit items-center gap-2"
      onClick={() => inputRef.current?.click()}
      disabled={disabled}
    >
      <input
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
        multiple={multiple}
        accept={accept}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
      {buttonText}
    </Button>
  )
}

export default CustomButtonUploadImage
