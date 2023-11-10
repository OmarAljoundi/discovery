import { getContentData } from '@/lib/operations'
import { Metadata } from 'next'
import { FunctionComponent, ReactNode } from 'react'

interface AboutUsLayoutProps {
  children: ReactNode
}
export async function generateMetadata(): Promise<Metadata> {
  const response = await getContentData()
  const { description, tags, title } = response?.about || { title: '', description: '', tags: '' }
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: 'website',
      siteName: 'Discovery',
    },
    keywords: tags,
  }
}
const AboutUsLayout: FunctionComponent<AboutUsLayoutProps> = ({ children }) => {
  return <div className="mt-10">{children}</div>
}

export default AboutUsLayout
