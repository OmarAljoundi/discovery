import { getArticles, getContentData } from '@/lib/operations'
import React from 'react'
import { ListAllArticles } from './list-all-articles'
import NoArticleFound from './no-articles-found'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const response = await getContentData()

  const { description, tags, title } = response?.article_seo?.seo || { title: '', description: '', tags: '' }
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: 'website',
      siteName: 'Discovery',
      url: `https://www.discovery-om.com/articles`,
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
  const articles = await getArticles()

  if (!articles || articles?.length == 0) return <NoArticleFound />
  return <ListAllArticles articles={articles} />
}
