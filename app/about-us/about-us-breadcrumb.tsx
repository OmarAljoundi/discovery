'use client'
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import { FunctionComponent } from 'react'

interface AboutUsBreadCrumbProps {}

const AboutUsBreadCrumb: FunctionComponent<AboutUsBreadCrumbProps> = () => {
  return (
    <Breadcrumbs variant="solid">
      <BreadcrumbItem href="/">الرئيسية</BreadcrumbItem>
      <BreadcrumbItem href="/about-us">عن دسكفري</BreadcrumbItem>
    </Breadcrumbs>
  )
}

export default AboutUsBreadCrumb
