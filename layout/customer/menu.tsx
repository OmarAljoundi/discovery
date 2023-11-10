import Image from 'next/image'
import Link from 'next/link'
import MobileMenu from './mobile-menu'
import BlurImage from '@/components/common/blur-image'

export const MenuItems = [
  {
    title: 'الرئيسية',
    link: '/',
  },
  {
    title: 'جميع الرحلات',
    link: '/tour-listing',
  },
  {
    title: 'التأشيرات',
    link: '/visa',
  },
  {
    title: 'آراء العملاء',
    link: 'https://www.instagram.com/p/B2Gr4omDs0y/',
  },
  {
    title: 'عن دسكفري',
    link: '/about-us',
  },
]

const Menu = () => {
  return (
    <header className="bg-white shadow-card">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link className="block text-teal-600" href="/" scroll={false}>
          <span className="sr-only">Home</span>
          <BlurImage src={'/images/discovery-01.png'} width={1080} height={1080} className="max-w-[65px]" alt="دسكفري لوجو" />
        </Link>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              {MenuItems.map((item) => (
                <li key={item.title}>
                  <Link scroll={false} className="text-black transition hover:text-gray-500/75 font-primary font-semibold" href={item.link}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Menu
