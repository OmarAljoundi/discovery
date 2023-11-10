import './globals.css'
import '../public/scss/citiesCard.scss'
import type { Metadata } from 'next'
import { Cairo } from 'next/font/google'
import { Toaster } from 'sonner'
import { ReactQueryProvider } from '@/provider/react-query-provider'
import { cn } from '@/lib/utils'
import { ModalProvider } from '@/provider/modal-provider'
import { headers } from 'next/headers'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'
import 'swiper/css/effect-cards'
import ToolBar from '@/layout/customer/top-bar'
import Menu from '@/layout/customer/menu'
import Footer from '@/layout/customer/footer'
import ImportDynamic from 'next/dynamic'
import { getContentData } from '@/lib/operations'

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  preload: true,
  style: 'normal',
  weight: ['1000', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export async function generateMetadata(): Promise<Metadata> {
  const response = await getContentData()
  const { description, tags, title } = response?.home?.seo || { title: '', description: '', tags: '' }
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = headers()

  return (
    <html dir={headersList.get('x-dir') ?? 'rtl'} lang={headersList.get('x-lang') ?? 'ar'} style={{ height: '100%' }}>
      <body className={cn(cairo.className, 'h-full')}>
        <ReactQueryProvider>
          <ModalProvider />
          <Toaster position="top-right" expand={true} richColors />
          {headersList.get('x-dir') == 'rtl' ? (
            <>
              <ToolBar />
              <Menu />
              {children}
              <Footer />
            </>
          ) : (
            <> {children}</>
          )}
        </ReactQueryProvider>
      </body>
    </html>
  )
}
