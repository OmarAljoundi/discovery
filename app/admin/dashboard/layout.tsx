export const dynamic = 'force-dynamic'

import Navbar from '@/layout/dashboard/navbar'
import SubSidebarNav from '@/layout/dashboard/sub-sidebar-nav'
import { getTourTypes } from '@/lib/operations'
import ClientProvider from '@/provider/client-provider'
import { FunctionComponent, ReactNode } from 'react'
import { ThemeProvider } from '@/provider/theme-provider'
import { Metadata } from 'next'
import { ModalProvider } from '@/provider/modal-provider'
interface DashboardLayoutProps {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'Discovery | Dashboard',
}
const DashboardLayout: FunctionComponent<DashboardLayoutProps> = async ({ children }) => {
  const response = await getTourTypes()

  return (
    <div id="__next">
      <div className="min-h-full block h-full">
        <div>
          <div className="h-full">
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              <ModalProvider />
              <ClientProvider types={response.results || []}>
                <SubSidebarNav />
                <main className="flex flex-col flex-1 w-full  bg-scale-200 overflow-visible ml-[200px]">
                  <Navbar />
                  <div className="pt-6">{children}</div>
                </main>
              </ClientProvider>
            </ThemeProvider>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
