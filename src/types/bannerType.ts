export interface BannerType {
  title: string
  display_page?: string
  image_delete?: string
  image_url: string[]
  description?: string
  _id?: string
}

export interface BannerFormData {
  title: string
  description: string
  image_url: string[]
  display_page: string
  image_delete: string[]
}
