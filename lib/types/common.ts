export type ApiResponse<T> = {
  data: T
  message: string
  status: boolean
}

export type PaginatedResponse<T> = {
  status: boolean
  data: T
  pagination: {
    total_items: number
    page_size: number
    current_page: number
    total_pages: number
    next_page: string | null
    previous_page: string | null
  }
}

export type Route = {
  key: string
  title: string
  count?: string
}


export type FileProps = {
  uri: string
  name: string
  type: string
}

export type LocalizedText = {
  en: string
  vi: string
  'zh-CN': string
  'zh-TW': string
}


export type LanguageProps = 'en' | 'vi' | 'zh-TW' | 'zh-CN'