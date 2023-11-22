'use client'
import { FunctionComponent } from 'react'
import CallToAction from '../(components)/(fifth)/call-to-action'
import { Separator } from '@/components/ui/separator'
import { useContent } from '@/hooks/react-query/use-content'
import VisaCard from './visa-card'
import VisaCardLoading from './visa-card-loading'
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'

interface VisaPageProps {}

const VisaPage: FunctionComponent<VisaPageProps> = () => {
  const { data, isLoading } = useContent()
  return (
    <>
      <div className="container mb-10">
        <Breadcrumbs variant="solid">
          <BreadcrumbItem href="/">الرئيسية</BreadcrumbItem>
          <BreadcrumbItem href="/visa">التأشيرات</BreadcrumbItem>
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
