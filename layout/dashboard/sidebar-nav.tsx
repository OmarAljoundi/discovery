'use client'
import { MenuItems } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Tooltip } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FunctionComponent } from 'react'

interface SidebarNavProps {}

const SidebarNav: FunctionComponent<SidebarNavProps> = () => {
  const pathname = usePathname()
  return (
    <div className="flex w-14 flex-col justify-between overflow-y-hidden p-2 border-r dark:border-dark bg-body border-scale-500">
      <ul className="flex flex-col space-y-4 items-center ">
        <a className="block" href="/dashboard/projects">
          <Image
            src="/images/discovery_logo.png"
            alt="Supabase"
            width={500}
            height={500}
            className="mx-auto h-[40px] w-[50px] cursor-pointer rounded dark:bg-white"
          />
        </a>
        {MenuItems.map((i) => (
          <Tooltip key={i.label} placement={'right'} content={i.label}>
            <button>
              <Link href={i.href}>
                <span
                  className={cn(
                    `transition-colors
                  duration-200 flex items-center group
                   justify-center h-10 w-10 rounded  hover:dark:bg-scale-500 hover:bg-slate-300 group `,
                    pathname.startsWith(i.href) ? 'dark:bg-scale-500 bg-slate-300 text-slate-600 ' : '',
                  )}
                >
                  <i.icon className={cn('h-7 w-7 group-hover:text-slate-600 ')} />
                </span>
              </Link>
            </button>
          </Tooltip>
        ))}
      </ul>
    </div>
  )
}

export default SidebarNav
