'use client'
import { FunctionComponent } from 'react'
import { BreadcrumbItem, Breadcrumbs } from '@/provider/nextui-client'

interface CustomerReviewBreadCrumbProps {}

const CustomerReviewBreadCrumb: FunctionComponent<CustomerReviewBreadCrumbProps> = () => {
  return (
    <Breadcrumbs variant="solid">
      <BreadcrumbItem href="/">الرئيسية</BreadcrumbItem>
      <BreadcrumbItem href="/about-us">آراء العملاء</BreadcrumbItem>
    </Breadcrumbs>
  )
}

export default CustomerReviewBreadCrumb
