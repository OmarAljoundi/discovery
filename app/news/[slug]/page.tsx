import { getNews } from '@/lib/operations'
import { notFound } from 'next/navigation'
import { FunctionComponent } from 'react'
import { Metadata } from 'next'
import { NewsDetails } from './details'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const response = (await getNews())?.find((x) => x.slug == decodeURIComponent(params.slug) && x.is_active)
  if (!response) {
    return {
      title: 'No article found',
    }
  }

  const { description, tags, title } = response.seo || { title: '', description: '', tags: '' }
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: 'website',
      siteName: 'Discovery',
      url: `https://www.discovery-om.com/news/${decodeURIComponent(params.slug)}`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_IMAGE_URL}${response?.image}`,
          width: 640,
          height: 427,
          alt: response?.title,
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
export async function generateStaticParams() {
  const response = await getNews()
  if (response && response.length > 0) {
    return response
      .filter((x) => x.is_active)
      .map((news) => ({
        slug: `${news.slug}`,
      }))
  }
  return []
}

const Page: FunctionComponent<{ params: { slug: string } }> = async ({ params }) => {
  const news = await getNews()
  const newsItem = news?.find((x) => x.slug == decodeURIComponent(params.slug) && x.is_active)

  if (!newsItem) return notFound()

  return <NewsDetails newsItem={newsItem} />
}

export default Page
