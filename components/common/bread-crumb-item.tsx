import Link from 'next/link'
import { FunctionComponent, ReactNode } from 'react'

interface BreadcrumbItemsProps {
  href: string
  children: ReactNode
}

const BreadcrumbItems: FunctionComponent<BreadcrumbItemsProps> = ({ href, children }) => {
  return (
    <Link className="flex items-center text-gray-500 hover:text-primary text-xs md:text-base" href={href}>
      {children}
    </Link>
  )
}

export default BreadcrumbItems
