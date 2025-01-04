export type Tour = {
  additional_Info?: string | null
  additional_service?: TourFeature[] | null
  airpot_coming?: string | null
  airpot_going?: string | null
  code?: string | null
  created_at?: string
  external_file?: ExternalFile | null
  id?: number
  images?: string[] | null
  is_active?: boolean | null
  is_ticket_included?: boolean | null
  name?: string
  number_of_days?: number
  price?: number | null
  price_child?: number | null
  price_child_no_bed?: number | null
  price_infant?: number | null
  seo?: Seo | null
  start_day?: string[] | null
  tour_countries?: string[] | null
  tour_excludes?: TourFeature[] | null
  tour_includes?: TourFeature[] | null
  tour_sections?: TourSection[] | null
  tour_hotels?: TourHotels[] | null
  type_id?: number | null
  tour_type?: TourType | null
  slug?: string | null
}

export type ExternalFile = {
  name?: string
  path?: string
}
export type TourSection = {
  uuid: string
  title: string
  description: string
  image?: string
}

export type TourFeature = {
  uuid: string
  title: string
  description: string
}

export type Hotel = {
  created_at?: string
  id?: number
  images?: string[] | null
  place?: string
  hotel_logo?: string
  name?: string | null
  rating?: number | null
}

export type Newsletter = {
  created_at?: string
  id?: number
  email?: string | null
  phone_number?: string | null
}
export type TourHotels = {
  id?: number
  created_at?: string
  tour_id?: number
  hotel_id?: number
  hotel?: Hotel
}
export type TourType = {
  created_at?: string
  id?: number
  image?: string
  name?: string
}

export type Location = {
  created_at?: string
  id?: number
  image?: Image | null
  is_active?: boolean | null
  name?: string
  seo?: Seo | null
  slug?: string | null
  location_attributes?: LocationAttributes[]
}

export type Article = {
  id?: number
  image?: string
  title?: string
  content?: string
  author?: string
  tag?: string
  is_active?: boolean
  seo?: Seo
  created_at?: Date
  slug?: string
}

export type LocationTours = {
  id?: number
  location_attr_id?: number | null
  location_id: number
  tour_id: number
  created_at?: string
  location_attributes?: LocationAttributes
}
export type LocationAttributes = {
  id?: number
  order?: number | null
  seo?: Seo | null
  title?: string | null
  created_at?: string
  location_id?: number
  location_tours?: LocationTours[]
}

export type Image = {
  url: string
  size: number
  order: number
  alt: string
}

export type Seo = {
  title: string
  description: string
  tags: string
}
export type User = {
  email?: string
  password?: string
}

export type Customer = {
  closed_notes?: string | null
  created_at?: string
  tour_id?: number
  expected_travel_date?: Date | null
  contact_method?: string | null
  id?: number
  name?: string
  notes?: string | null
  number_of_adults?: number | null
  number_of_kids?: number | null
  phone_number?: string
  status?: string
  tour?: Tour
}
export type Response<T> = {
  message: string
  success: boolean
  result?: T
  results?: T[]
}

export type Setting = {
  home?: Home
  visa?: Visa
  faq?: Faq[]
  about_us?: FaqSeo
  faq_seo?: FaqSeo
  article_seo?: FaqSeo
  customers_review?: CustomerReview
  best_tours?: BestTours
}
export type FaqSeo = {
  seo: Seo
}
export type BestTours = {
  tours?: number[]
  seo: Seo
}

export type Home = {
  sliders?: Slider[]
  seo?: Seo
  best_sellers?: number[]
  best_seller_title?: ''
  footer?: FooterSettings
}

export type FooterSettings = {
  phone_number?: string
}

export type Visa = {
  visa_types?: VisaType[]
  seo?: Seo
}

export type Faq = {
  uuid?: string
  title?: string
  description?: string
}

export type CustomerReview = {
  review?: Review[]
  seo?: Seo
}

export type Review = {
  uuid: string
  title: string
  description: string
}

export type VisaType = {
  title?: string
  sub_title?: string
  image?: string
  period?: string
  requirements?: string[]
  price?: string
  note?: string
  uuid?: string
}

export type Slider = {
  uuid: string
  image: string
  title: string
  sub_title: string
  call_to_action: string
  call_to_action_link: string
}

export enum eCustomerStatus {
  All = 0,
  Pending = 1,
  Completed = 2,
  No_Answer = 3,
}

export enum eContactMethod {
  WhatsApp = 1,
  Call = 2,
}
