export interface ClassificationItem {
  classification_name: string
  classification_value: string
}

export interface ProductClassification {
  images: string
  classifications: ClassificationItem[]
  price: number
  remaining: number
  _id?: string
}

export interface ProductFormData {
  _id?: string
  product_name: string
  category_id?: string
  additional_services?: string[]
  price?: number
  classification?: ProductClassification[]
  images: string[]
  description?: string
  discount_price?: number
  stock?: number
  priority: boolean
  material?: string
  code?: string
  warranty?: string
  images_delete?: string[]
}

export interface CategoryInfo {
  _id: string
  category_name: string
  category_image: string[]
  description: string
  customer: string
  createdAt: string
  updatedAt: string
  __v: number
}
// Interface cho product detail
export interface ProductDetailType {
  _id: string
  product_name: string
  category_id: CategoryInfo
  price: number
  classification: ProductClassification[]
  images: string[]
  description: string
  sold: number
  stock: number
  customer: string
  discount_price: number
  priority: boolean
  code: string
  additional_services: string[]
  material: string
  warranty: string
  createdAt: string
  updatedAt: string
  __v: number
}
