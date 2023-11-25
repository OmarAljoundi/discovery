'use client'
import { FunctionComponent } from 'react'
import { BreadcrumbItem, Breadcrumbs } from '@/provider/nextui-client'

interface FaqBreadCrumbProps {}

const FaqBreadCrumb: FunctionComponent<FaqBreadCrumbProps> = () => {
  return (
    <Breadcrumbs variant="solid">
      <BreadcrumbItem href="/">الرئيسية</BreadcrumbItem>
      <BreadcrumbItem href="/about-us">الاسئلة الشائعة</BreadcrumbItem>
    </Breadcrumbs>
  )
}

export default FaqBreadCrumb
