'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {}

const SettingMenu = [
  {
    label: 'Home Setting',
    href: '/admin/dashboard/setting',
  },
  {
    label: 'About us Seo',
    href: '/admin/dashboard/setting/about-us-seo',
  },
  {
    label: 'Visa Setting',
    href: '/admin/dashboard/setting/visa',
  },
  {
    label: 'FAQ Setting',
    href: '/admin/dashboard/setting/faq',
  },
  {
    label: 'Customer Reviews',
    href: '/admin/dashboard/setting/customers-review',
  },
  {
    label: 'Best Tours',
    href: '/admin/dashboard/setting/best-tours',
  },
  {
    label: 'Articles Seo',
    href: '/admin/dashboard/setting/articles',
  },
]

export function SidebarNav({ className, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn('flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1', className)} {...props}>
      {SettingMenu.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            pathname === item.href ? 'bg-muted hover:bg-muted' : 'hover:bg-transparent hover:underline',
            'justify-start w-52',
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
