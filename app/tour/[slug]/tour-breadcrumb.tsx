'use client'
import BreadcrumbItems from '@/components/common/bread-crumb-item'
import Breadcrumbs from '@/components/common/bread-crumbs'
import { FunctionComponent } from 'react'

interface TourBreadcrumbProps {
  tourName: string
}

const TourBreadcrumb: FunctionComponent<TourBreadcrumbProps> = ({ tourName }) => {
  return (
    <div className="my-6">
      <Breadcrumbs>
        <BreadcrumbItems href="/">الرئيسية</BreadcrumbItems>
        <BreadcrumbItems href="/tour-listing">الأقسام</BreadcrumbItems>
        <BreadcrumbItems href="/">{tourName}</BreadcrumbItems>
      </Breadcrumbs>
    </div>
  )
}

export default TourBreadcrumb
