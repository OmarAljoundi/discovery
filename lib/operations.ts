'use server'
import { Article, Customer, Hotel, Location, LocationAttributes, Newsletter, Response, Setting, Tour, TourType } from '@/types/custom'
import { supabaseClient } from './supabaseClient'
import { http } from '@/service/httpService'
import {
  CONFIG_PATH,
  REVALIDATE_ARTICLE_LIST,
  REVALIDATE_CUSTOMER_LIST,
  REVALIDATE_HOTEL_LIST,
  REVALIDATE_LOCATION_LIST,
  REVALIDATE_NEWSLETTER_LIST,
  REVALIDATE_TOUR_LIST,
  REVALIDATE_TOUR_TYPE,
  SETTING_PATH,
} from './keys'
import { SearchQuery } from '@/types/search'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { cookies } from 'next/headers'
import { format } from 'date-fns'
import { delay } from '@/dev'

export async function updateTourStatus(status: boolean, id: number): Promise<Response<any>> {
  const { error } = await supabaseClient.from('tour').update({ is_active: status }).eq('id', id)

  if (error) {
    throw new Error(`faild to update tour status, ${error.message}`)
  }

  const x = await http<any>(`/api/revalidate?tag=${REVALIDATE_TOUR_LIST}`, { revalidate: 0 }).get()

  return {
    message: 'Tour updated successfully..',
    success: true,
  }
}
export async function getTourTypes(): Promise<Response<TourType>> {
  var _SQ: SearchQuery = {
    FilterByOptions: [],
    OrderByOptions: [],
    PageIndex: 0,
    PageSize: 100,
    Select: '*',
    Table: 'tour_type',
  }
  const response = await http<Response<TourType>>('/api/search', { revalidate: 86400, tags: [REVALIDATE_TOUR_TYPE] }).post(_SQ)
  return response
}
export async function createTour(tour: Tour) {
  const _tour = { ...tour }
  delete _tour.tour_hotels

  const { data, error } = await supabaseClient
    .from('tour')
    .insert(_tour as any)
    .select('*')
    .single()

  if (error) {
    console.log('Errors in creating tours.. ', error)
    throw new Error(error.message)
  }

  if (tour.tour_hotels) {
    const { data: data_tour_hotels, error: error_tour_hotels } = await supabaseClient.from('tour_hotels').insert([
      ...tour.tour_hotels.map((x) => {
        return {
          hotel_id: x.hotel_id!,
          tour_id: data.id!,
        }
      }),
    ])

    if (error_tour_hotels) {
      console.log('Errors in creating tour hotels.. ', error)
      throw new Error(error_tour_hotels.message)
    }
  }

  return data
}
export async function updateTour(tour: Tour) {
  const _tour = { ...tour }
  delete _tour.tour_hotels
  const { data, error } = await supabaseClient
    .from('tour')
    .update(_tour as any)
    .eq('id', tour.id!)
    .select('*')
    .single()

  if (error) {
    console.log('Errors in updating tour.. ', error)
    throw new Error(error.message)
  }

  //Delete old tour_hotels first

  const { error: errors_deleting_tour_hotels } = await supabaseClient.from('tour_hotels').delete().eq('tour_id', tour.id!)

  if (errors_deleting_tour_hotels) {
    console.log(`Errors while deleting tour hotel for id ${tour.id!}.. `, error)
    throw new Error(errors_deleting_tour_hotels.message)
  }

  //End Deleting tour_hotels

  if (tour.tour_hotels && tour.tour_hotels.length > 0) {
    const { error: error_tour_hotels } = await supabaseClient.from('tour_hotels').insert([
      ...tour.tour_hotels.map((x) => {
        return {
          hotel_id: x.hotel_id!,
          tour_id: tour.id!,
        }
      }),
    ])

    if (error_tour_hotels) {
      console.log('Errors in updating tour hotels.. ', error_tour_hotels)
      throw new Error(error_tour_hotels.message)
    }
  }

  return data
}
export async function createTourType(type: TourType) {
  const { data, error } = await supabaseClient
    .from('tour_type')
    .insert(type as any)
    .select('*')
    .single()

  if (error) {
    console.log('Errors.. ', error)
    throw new Error(error.message)
  }

  return data
}
export async function updateTourType(type: TourType) {
  const { data, error } = await supabaseClient
    .from('tour_type')
    .update(type as any)
    .eq('id', type.id!)
    .select('*')
    .single()

  if (error) {
    console.log('Errors.. ', error)
    throw new Error(error.message)
  }

  return data
}
export async function createDestination(dest: Location) {
  const { data, error } = await supabaseClient
    .from('location')
    .insert(dest as any)
    .select('*')
    .single()

  if (error) {
    console.log('Errors.. ', error)
    throw new Error(error.message)
  }

  return data
}
export async function updateDestination(dest: Location) {
  const { data, error } = await supabaseClient
    .from('location')
    .update(dest as any)
    .eq('id', dest.id!)
    .select('*')
    .single()

  if (error) {
    console.log('Errors.. ', error)
    throw new Error(error.message)
  }

  return data
}
export async function getTours() {
  var _SQ: SearchQuery = {
    FilterByOptions: [],
    OrderByOptions: [],
    PageIndex: 0,
    PageSize: 1000,
    Select: '*,tour_type(*),tour_hotels(*,hotel(*))',
    Table: 'tour',
  }
  const response = await http<Response<Tour>>('/api/search', { revalidate: 86400, tags: [REVALIDATE_TOUR_LIST] }).post(_SQ)
  return response.results
}
export async function getDestination() {
  var _SQ: SearchQuery = {
    FilterByOptions: [],
    OrderByOptions: [],
    PageIndex: 0,
    PageSize: 1000,
    Select: '*,location_attributes(*,location_tours(*))',
    Table: 'location',
  }
  return await http<Response<Location>>('/api/search', { revalidate: 86400, tags: [REVALIDATE_LOCATION_LIST] }).post(_SQ)
}
export async function getHotels() {
  var _SQ: SearchQuery = {
    FilterByOptions: [],
    OrderByOptions: [],
    PageIndex: 0,
    PageSize: 1000,
    Select: '*',
    Table: 'hotel',
  }

  const data = await http<Response<Hotel>>('/api/search', { revalidate: 86400, tags: [REVALIDATE_HOTEL_LIST] }).post(_SQ)
  return data.results
}
export async function deleteLocationAttr(location_id: number) {
  const { data, error } = await supabaseClient.from('location_attributes').delete().eq('location_id', location_id)

  if (error) {
    throw new Error(`An error occured in operation deleteLocationAttr ${error.message}`)
  }
}
export async function createDestinationAttr(destinationAttr: LocationAttributes) {
  let id: number = 0

  const locationAtrrResponse = await supabaseClient
    .from('location_attributes')
    .insert({
      order: Number(destinationAttr.order),
      seo: destinationAttr.seo,
      title: destinationAttr.title,
      location_id: destinationAttr.location_id,
    })
    .select('*')
    .single()

  if (locationAtrrResponse.error) {
    throw new Error('Error happend while creating destination tours ' + locationAtrrResponse.error.message)
  }

  id = locationAtrrResponse.data.id

  if (destinationAttr.location_tours && destinationAttr.location_tours.length > 0) {
    const locationToursResponse = await supabaseClient.from('location_tours').insert(
      destinationAttr.location_tours.map((x) => {
        return {
          location_attr_id: id,
          tour_id: x.tour_id,
          location_id: x.location_id,
        }
      }),
    )
    if (locationToursResponse.error) {
      console.log('location Tours Response error', locationToursResponse.error)
      throw new Error('Error while creating location tours ' + locationToursResponse.error.message)
    }
  }
}
export const getCurrentUser = async (): Promise<boolean | undefined> => {
  const supabase = createRouteHandlerClient<Database>({ cookies })
  const { data: session_response, error: session_error } = await supabase.auth.getUser()

  if (session_response?.user) {
    return true
  }

  console.log('User not authenticated.' + session_error?.message)
  return false
}
export async function createHotel(hotel: Hotel) {
  const { data, error } = await supabaseClient
    .from('hotel')
    .insert(hotel as any)
    .select('*')
    .single()

  if (error) {
    console.log('Errors.. ', error)
    throw new Error(error.message)
  }

  return data
}
export async function updateHotel(hotel: Hotel) {
  const { data, error } = await supabaseClient
    .from('hotel')
    .update(hotel as any)
    .eq('id', hotel.id!)
    .select('*')
    .single()

  if (error) {
    console.log('Errors.. ', error)
    throw new Error(error.message)
  }

  return data
}
export const getContentData = async () => {
  const { data } = await supabaseClient.storage.from('discovery').list(SETTING_PATH)
  let responseData: Setting | undefined
  if (data && data.length > 0 && data.find((x) => x.name === CONFIG_PATH)) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_IMAGE_URL}${SETTING_PATH}/${CONFIG_PATH}?v=1`, { next: { revalidate: 0 } })

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`)
    }

    responseData = (await response.json()) as Setting
  }
  return responseData
}
export const joinNewLetter = async (req: Newsletter) => {
  const { error } = await supabaseClient.from('newsletter').insert(req)
  if (error && error.code !== '23505') {
    return {
      success: false,
      message: 'حدث خطأ ما .. اذا تكرر الأمر الرجاء تواصل معنا',
    }
  } else if (error && error.code == '23505') {
    return {
      success: false,
      message: 'انت بالفعل مسجل لدينا!',
    }
  }

  await http<any>(`/api/revalidate?tag=${REVALIDATE_NEWSLETTER_LIST}`, { revalidate: 0 }).get()

  return {
    success: true,
  }
}
export async function submitForm(formData: Customer) {
  const { data, error } = await supabaseClient
    .from('customer')
    .insert(formData as any)
    .select('*,tour(name)')
    .single()

  if (error) {
    console.log('error', error)
    return {
      error: error.details,
      success: false,
    }
  }

  // var currentDate = format(new Date(data.created_at), "dd/MM/yyyy");
  // await http<Response<any>>("/api/mail", { revalidate: 0 }).post({
  //   note: data.notes,
  //   tour_name: data.tour?.name,
  //   created_at: currentDate,
  //   customer_name: data.name,
  //   contact_option:data.contact_method,
  //   customer_number: data.phone_number,
  // });

  await http<Response<any>>(`/api/revalidate?tag=${REVALIDATE_CUSTOMER_LIST}`, {
    revalidate: 0,
  }).get()
  return {
    success: true,
  }
}

export async function createArticle(article: Article) {
  const { data, error } = await supabaseClient
    .from('article')
    .insert(article as any)
    .select('*')
    .single()

  if (error) {
    console.log('Errors in creating article.. ', error)
    throw new Error(error.message)
  }

  await http<any>(`/api/revalidate?tag=${REVALIDATE_ARTICLE_LIST}`, { revalidate: 0 }).get()

  return data
}
export async function updateArticle(article: Article) {
  const { data, error } = await supabaseClient
    .from('article')
    .update(article as any)
    .eq('id', article.id!)
    .select('*')
    .single()

  if (error) {
    console.log('Errors in updating article.. ', error)
    throw new Error(error.message)
  }

  await http<any>(`/api/revalidate?tag=${REVALIDATE_ARTICLE_LIST}`, { revalidate: 0 }).get()

  return data
}
export async function updateArticleStatus(status: boolean, id: number): Promise<Response<any>> {
  const { error } = await supabaseClient.from('article').update({ is_active: status }).eq('id', id)

  if (error) {
    throw new Error(`faild to update article status, ${error.message}`)
  }

  await http<any>(`/api/revalidate?tag=${REVALIDATE_ARTICLE_LIST}`, { revalidate: 0 }).get()

  return {
    message: 'Article updated successfully..',
    success: true,
  }
}

export async function getArticles() {
  var _SQ: SearchQuery = {
    FilterByOptions: [],
    OrderByOptions: [],
    PageIndex: 0,
    PageSize: 1000,
    Select: '*',
    Table: 'article',
  }
  const response = await http<Response<Article>>('/api/search', { revalidate: 86400, tags: [REVALIDATE_ARTICLE_LIST] }).post(_SQ)
  return response.results
}
