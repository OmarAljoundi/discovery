export const dynamic = 'force-dynamic'
import './globals.css'
import '../public/scss/citiesCard.scss'
import type { Metadata } from 'next'
import { Cairo } from 'next/font/google'
import { Toaster } from 'sonner'
import { cn } from '@/lib/utils'
import { headers } from 'next/headers'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'
import 'swiper/css/effect-cards'
import ToolBar from '@/layout/customer/top-bar'
import Menu from '@/layout/customer/menu'
import Footer from '@/layout/customer/footer'
import { getContentData } from '@/lib/operations'
import dynamics from 'next/dynamic'
import NextUIProvider from '@/provider/next-ui-provider'
import { fontSpecialAr, fontSpecialEn } from './fonts'
import CustomerFormModal from '@/components/modals/customer-form-modal'
import { CurrencyProvider } from '@/provider/currency-provider'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { TooltipProvider } from '@/components/ui/tooltip'
import '@/components/minimal-tiptap/styles/index.css'
const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  preload: true,
  style: 'normal',
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
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

const ReactQueryProvider = dynamics(() => import('@/provider/react-query-provider'), {
  ssr: false,
})
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = headers()

  return (
    <html dir={headersList.get('x-dir') ?? 'rtl'} lang={headersList.get('x-lang') ?? 'ar'} style={{ height: '100%' }}>
      <body className={cn(cairo.className, fontSpecialAr.variable, fontSpecialEn.variable, 'h-full')}>
        <Toaster position="top-right" expand={true} richColors />
        <SpeedInsights />
        <TooltipProvider>
          <ReactQueryProvider>
            <NextUIProvider>
              <CurrencyProvider>
                {headersList.get('x-dir') == 'rtl' ? (
                  <>
                    <CustomerFormModal />
                    <ToolBar />
                    <Menu />
                    {children}
                    <Footer />
                  </>
                ) : (
                  <> {children}</>
                )}
              </CurrencyProvider>
            </NextUIProvider>
          </ReactQueryProvider>
        </TooltipProvider>
      </body>
    </html>
  )
}
