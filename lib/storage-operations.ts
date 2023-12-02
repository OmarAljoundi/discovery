'use client'
import { ImageListType, ImageType } from 'react-images-uploading'
import { supabaseClient } from './supabaseClient'
import { ATTACHMENT_PATH, CONFIG_PATH, SETTING_PATH } from './keys'
import { v4 } from 'uuid'
import { getContentData } from './operations'

export const UploadProductImages = async (
  files: ImageListType,
  path: string,
): Promise<{ image?: string; file?: ImageType; error: { message?: string; image?: string } }[]> => {
  return await Promise.all(
    files.map(async (element) => {
      const { data, error } = await supabaseClient.storage
        .from('discovery')
        .upload(`${path}/${containsArabicText(element.file!.name)}`, element.file!, {
          cacheControl: '86400',
          contentType: 'File',
          upsert: true,
        })
      return {
        image: data?.path,
        file: !error ? element : undefined,
        error: {
          image: element.file!.name,
          message: error?.message,
        },
      }
    }),
  )
}
export const ListAllImagesInBucket = async (limit: number = 10, offest: number = 0, search?: string) => {
  var _SO: any = {
    limit: limit,
    offset: offest,
    sortBy: { column: 'created_at', order: 'desc' },
  }
  if (search) {
    _SO['search'] = search
  }
  const { data, error } = await supabaseClient.storage.from('discovery').list('tour_images', _SO)

  if (error) {
    console.log('ERROR', error)
  }

  return data
}
export const ListAllAttachmentsInBucket = async (limit: number = 10, offest: number = 0, search?: string) => {
  var _SO: any = {
    limit: limit,
    offset: offest,
    sortBy: { column: 'created_at', order: 'desc' },
  }
  if (search) {
    _SO['search'] = search
  }
  const { data, error } = await supabaseClient.storage.from('discovery').list(ATTACHMENT_PATH, _SO)

  if (error) {
    console.log('ERROR', error)
  }

  return data
}
export const DeleteImageFromTour = async (images: string[]) => {
  const { data, error } = await supabaseClient.storage.from('discovery').remove(images)
  if (error) {
    return {
      success: false,
      error: error.message,
    }
  }
  return {
    success: true,
  }
}

export const PushAttachments = async (
  files: File[],
): Promise<{ path?: string; file?: File; name: string; error: { message?: string; fileName?: string } }[]> => {
  return await Promise.all(
    files.map(async (element) => {
      const name = containsArabicText(element.name)
      const { data, error } = await supabaseClient.storage.from('discovery').upload(`${ATTACHMENT_PATH}/${name}`, element!, {
        cacheControl: '86400',
        upsert: true,
      })
      return {
        path: data?.path,
        name: name,
        file: !error ? element : undefined,
        error: {
          fileName: name,
          message: error?.message,
        },
      }
    }),
  )
}

export const PushJsonFile = async (blob: Blob) => {
  const { data, error } = await supabaseClient.storage.from('discovery').upload(`${SETTING_PATH}/${CONFIG_PATH}`, blob, {
    cacheControl: '86400',
    upsert: true,
  })

  if (error) {
    console.error('Error ', error)
    throw new Error('Error while saving the settings ' + error.message)
  }

  return true
}
export const GetJsonFile = async (path: string) => {
  const { data, error } = await supabaseClient.storage.from('discovery').list(path)

  if (error) {
    console.error('Error while getting the settings from ', error)
    throw new Error(`Error while getting the settings from ${path} ${error.message}`)
  }

  return data
}

function containsArabicText(word: string): string {
  const words = word.split('.')
  const arabicRegex = /[\u0600-\u06FF]/
  return arabicRegex.test(words[0]) ? `${v4()}.${words[1]}` : word
}

function extractLastPart(url: string): string {
  const lastSlashIndex = url.lastIndexOf('/')
  const lastPart = url.substring(lastSlashIndex + 1)

  return `tour_images/${lastPart}`
}
export async function getImagePlacecs(_imagePrefix: string) {
  let total = 0
  var results = new Map()
  var imagePrefix = extractLastPart(_imagePrefix)

  const tour_result = supabaseClient
    .from('tour')
    .select('*')
    .containedBy('images', [`${imagePrefix}`])

  const hotel_result = supabaseClient.from('hotel').select('*').or(`hotel_logo.eq.${imagePrefix}, images.cs.{${imagePrefix}}`)

  const location_result = supabaseClient.from('location').select('id,name,image').eq('image ->> url', imagePrefix)

  const types_result = supabaseClient.from('tour_type').select('*').eq('image', imagePrefix)

  const content = getContentData()

  const [a1, a2, a3, a4, a5] = await Promise.all([tour_result, location_result, types_result, content, hotel_result])

  const sliders_result = a4?.home?.sliders?.filter((x) => x.image == imagePrefix)
  const visaes_result = a4?.visa?.visa_types?.filter((x) => x.image == imagePrefix)

  if (a1.data && a1.data.length > 0) {
    total += a1.data.length
    results.set('Tours', a1.data)
  }

  if (a2.data && a2.data.length > 0) {
    total += a2.data?.length
    results.set('Destinations', a2.data)
  }

  if (a3.data && a3.data.length > 0) {
    total += a3.data?.length
    results.set('Tour Types', a3.data)
  }

  if (sliders_result && sliders_result?.length > 0) {
    total += sliders_result.length
    results.set(
      'Home Sliders',
      sliders_result.map((s) => {
        return {
          name: s.title,
        }
      }),
    )
  }

  if (visaes_result && visaes_result.length > 0) {
    total += visaes_result.length
    results.set(
      'Visa',
      visaes_result.map((v) => {
        return {
          name: v.title,
        }
      }),
    )
  }

  if (a5.data && a5.data.length > 0) {
    total += a5.data.length
    results.set('Hotels', a5.data)
  }

  return {
    results,
    total,
  }
}
