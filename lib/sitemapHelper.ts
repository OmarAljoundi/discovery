import { IImageEntry, ISitemapField } from 'next-sitemap'
import { getArticles, getDestination, getTours } from './operations'

export const getAllPaths = async () => {
  const [tours, destination, destination_sections, articles] = await Promise.all([
    getAllTours(),
    getAllDestination(),
    getAllDestinationSections(),
    getAllArticles(),
  ])
  return [
    {
      loc: `${process.env.NEXT_PUBLIC_URL}`,
      lastmod: new Date(),
      changefreq: 'daily',
      priority: 1.0,
    },
    ...(tours ?? []),
    ...destination,
    ...destination_sections,
    ...(articles ?? []),
  ]
}

const getAllTours = async (): Promise<ISitemapField[]> => {
  const response = await getTours()
  return (response ?? [])?.map((tour) => ({
    loc: `${process.env.NEXT_PUBLIC_URL}/tour/${tour.slug}`,
    lastmod: tour.created_at?.toString(),
    changefreq: 'daily',
    priority: 0.8,
    images: tour?.images?.map((o) => {
      return { loc: new URL(`${process.env.NEXT_PUBLIC_IMAGE_URL}${o}`) }
    }),
  }))
}

const getAllDestination = async () => {
  const response = await getDestination()
  if (response.success && response.results && response.results.length > 0) {
    return response.results
      .filter((x) => x.is_active)
      .map((dest) => ({
        loc: `${process.env.NEXT_PUBLIC_URL}/tour-listing/${dest.slug}`,
        lastmod: dest.created_at || new Date(),
        changefreq: 'daily',
        priority: 0.8,
      }))
  }
  return []
}

const getAllDestinationSections = async () => {
  const response = await getDestination()
  var results: any[] = []
  response?.results
    ?.filter((x) => x.is_active)
    .map((dest) => {
      if (dest.location_attributes && dest.location_attributes.length > 1) {
        dest.location_attributes?.map((attr) => {
          results.push({
            loc: `${process.env.NEXT_PUBLIC_URL}/tour-listing/${dest.slug}/${attr?.title?.replaceAll(' ', '-')}`,
            lastmod: attr.created_at || new Date(),
            changefreq: 'daily',
            priority: 0.8,
          })
        })
      }
    })

  return results
}

const getAllArticles = async (): Promise<ISitemapField[]> => {
  const response = await getArticles()
  return (response ?? [])?.map((article) => ({
    loc: `${process.env.NEXT_PUBLIC_URL}/articles/${article.slug}`,
    lastmod: article.created_at?.toString(),
    changefreq: 'daily',
    priority: 0.8,
    images: [
      {
        loc: new URL(`${process.env.NEXT_PUBLIC_IMAGE_URL}${article.image}`),
      },
    ],
  }))
}
