export const dynamic = 'force-dynamic'

import './globals.css'
import type { Metadata } from 'next'
import { Cairo, Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import { ReactQueryProvider } from '@/provider/react-query-provider'
import { cn } from '@/lib/utils'
import { ModalProvider } from '@/provider/modal-provider'
import { headers } from 'next/headers'
import CustomerClientProvider from '@/provider/customer-client-provider'
import { getTourTypes } from '@/lib/operations'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'
import 'swiper/css/effect-cards'
import ToolBar from '@/layout/customer/top-bar'
import Menu from '@/layout/customer/menu'
import Footer from '@/layout/customer/footer'
import { supabaseClient } from '@/lib/supabaseClient'
import { CONFIG_PATH, SETTING_PATH } from '@/lib/keys'
import { Setting } from '@/types/custom'
import SettingLayoutProvider from '@/provider/setting-layout-provider'
const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  preload: true,
  style: 'normal',
  weight: ['1000', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = headers()
  const { data, error } = await supabaseClient.storage.from('discovery').list(SETTING_PATH)
  let responseData: Setting | undefined
  if (data && data.length > 0 && data.find((x) => x.name === CONFIG_PATH)) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_IMAGE_URL}${SETTING_PATH}/${CONFIG_PATH}`, { next: { revalidate: 0 } })

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`)
    }

    responseData = (await response.json()) as Setting
  }
  const types = await getTourTypes()
  return (
    <html dir={headersList.get('x-dir') ?? 'rtl'} lang={headersList.get('x-lang') ?? 'ar'} style={{ height: '100%' }}>
      <body className={cn(cairo.className, 'h-full')}>
        <CustomerClientProvider types={types.results ?? []}>
          <ReactQueryProvider>
            <ModalProvider />
            <Toaster position="top-right" expand={true} richColors />
            {headersList.get('x-dir') == 'rtl' ? (
              <SettingLayoutProvider settingData={responseData}>
                <ToolBar />
                <Menu />
                {children}
                <Footer />
              </SettingLayoutProvider>
            ) : (
              <> {children}</>
            )}
          </ReactQueryProvider>
        </CustomerClientProvider>
      </body>
    </html>
  )
}
