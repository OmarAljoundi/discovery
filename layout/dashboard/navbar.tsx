'use client'
import Image from 'next/image'
import { ThemeToggle } from './theme-toggle'
import { UserNav } from './user-nav'
import BlurImage from '@/components/common/blur-image'

const Navbar = () => {
  return (
    <div className="fixed  bg-white w-[calc(100%-200px)] z-50">
      <div className="flex h-12 max-h-12 items-center px-4 border-b relative">
        <a className="block" href="/admin/dashboard">
          <BlurImage
            src="/images/discovery-footer.png"
            alt="April-tours-logo"
            width={80}
            height={45}
            quality={100}
            className="mx-auto h-[75px] w-full cursor-pointer rounded p-2"
          />
        </a>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </div>
  )
}

export default Navbar
