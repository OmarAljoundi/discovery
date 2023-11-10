'use client'
import { FunctionComponent } from 'react'
import CallToAction from '../(components)/(fifth)/call-to-action'
import { Separator } from '@/components/ui/separator'
import Breadcrumbs from '@/components/common/bread-crumbs'
import BreadcrumbItems from '@/components/common/bread-crumb-item'
import { useContent } from '@/hooks/react-query/use-content'
import VisaCard from './visa-card'
import VisaCardLoading from './visa-card-loading'

interface VisaPageProps {}

const VisaPage: FunctionComponent<VisaPageProps> = () => {
  const { data, isLoading } = useContent()
  return (
    <>
      <div className="container mb-10">
        <Breadcrumbs>
          <BreadcrumbItems href="/">الرئيسية</BreadcrumbItems>
          <BreadcrumbItems href="/visa">التأشيرات</BreadcrumbItems>
        </Breadcrumbs>
        <Separator className="my-4" />
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Array.from(new Array(4)).map((_, index) => (
              <VisaCardLoading key={index} />
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {data?.visa?.visa_types?.map((visa) => (
            <VisaCard visa={visa} key={visa.uuid} />
          ))}
        </div>
      </div>
      <CallToAction />
    </>
  )
}

export default VisaPage
