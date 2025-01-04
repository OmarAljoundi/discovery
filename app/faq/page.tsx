import { getContentData } from '@/lib/operations'
import { FunctionComponent } from 'react'
import CallToAction from '../(components)/(fifth)/call-to-action'
import { Separator } from '@/components/ui/separator'
import FaqItems from './faq-items'
import BreadCrumb from './faq-bread-crumb'
import { Metadata } from 'next'

interface FaqPageProps {}

export async function generateMetadata(): Promise<Metadata> {
  const response = await getContentData()

  const { description, tags, title } = response?.faq_seo?.seo || { title: '', description: '', tags: '' }
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: 'website',
      siteName: 'Discovery',
      url: `https://www.discovery-om.com/faq`,
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

const FaqPage: FunctionComponent<FaqPageProps> = async () => {
  const data = await getContentData()

  return (
    <>
      <div className="container mb-10">
        <BreadCrumb />
        <Separator className="my-4" />

        <h1 className="text-primary text-2xl lg:text-4xl  text-center my-10">الأسئلة الشائعة</h1>

        <FaqItems data={data} />
      </div>

      <CallToAction />
    </>
  )
}

export default FaqPage
