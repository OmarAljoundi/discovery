'use client'
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import { FunctionComponent } from 'react'

interface TourBreadcrumbProps {
  tourName: string
}

const TourBreadcrumb: FunctionComponent<TourBreadcrumbProps> = ({ tourName }) => {
  return (
    <div className="my-6">
      <Breadcrumbs variant="solid">
        <BreadcrumbItem href="/">الرئيسية</BreadcrumbItem>
        <BreadcrumbItem href="/tour-listing">الأقسام</BreadcrumbItem>
        <BreadcrumbItem href="/">{tourName}</BreadcrumbItem>
      </Breadcrumbs>
    </div>
  )
}

export default TourBreadcrumb
