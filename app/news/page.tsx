import { getContentData, getNews } from '@/lib/operations'
import React from 'react'
import { Metadata } from 'next'
import NoNewsFound from './no-news-found'
import { ListAllNews } from './list-all-news'

export async function generateMetadata(): Promise<Metadata> {
  const response = await getContentData()

  const { description, tags, title } = response?.news_seo?.seo || { title: '', description: '', tags: '' }
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: 'website',
      siteName: 'Discovery',
      url: `https://www.discovery-om.com/news`,
      images: [
        {
          url: `https://www.discovery-om.com/_next/image?url=/images/discovery-footer.png&w=384&q=100`,
          width: 120,
          height: 60,
          alt: 'Discovery Logo',
        },
      ],
      locale: 'ar_OM',
    },
    creator: 'Discovery tours',
    publisher: 'Discovery Inc.',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    keywords: tags,
  }
}

export default async function Page() {
  const news = await getNews()

  if (!news || news?.length == 0) return <NoNewsFound />
  return <ListAllNews news={news} />
}
