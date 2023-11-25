'use client'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Link from 'next/link'
import { AiOutlineInstagram, AiOutlineWhatsApp } from 'react-icons/ai'
import { HiOutlineMapPin } from 'react-icons/hi2'
import { AtSign, Phone } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { MenuItems } from './menu'
const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
        <span className="sr-only">Toggle menu</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </SheetTrigger>
      <SheetContent side={'top'}>
        <nav aria-label="Global ">
          <ul className="flex items-center gap-6 text-sm flex-wrap pt-8 justify-center">
            {MenuItems.map((item) => (
              <li key={item.title}>
                <Link className="text-primary transition hover:text-gray-500/75  font-semibold" href={item.link}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Separator className="my-4" />

        <h1 className=" text-center pb-4 text-primary">تواصل معنا</h1>
        <div className="container">
          <div className="flex justify-center flex-wrap flex-1">
            <div className="flex justify-center">
              <div className="contact-info flex justify-center gap-4 ">
                <a href="https://api.whatsapp.com/send/?phone=%2B96895929251&text&type=phone_number&app_absent=0" target="_blank">
                  <AiOutlineWhatsApp className="text-primary text-2xl" />
                </a>
                <a href="https://maps.app.goo.gl/iY9WwncyNi7rJXvu7" target="_blank">
                  <HiOutlineMapPin className="text-primary text-2xl" />
                </a>
                <a href="https://www.instagram.com/Discovery.oman/" target="_blank">
                  <AiOutlineInstagram className="text-primary text-2xl" />
                </a>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="contact-info grid gap-2 justify-items-center ">
              <div className="flex gap-3 items-center">
                <span className="text-primary font-bold " dir="ltr">
                  +968-99801355
                </span>
                <Phone className="text-primary" />
              </div>
              <div className="flex gap-3 items-center">
                <span className="text-primary font-bold font-english">info@discovery-om.com</span>
                <AtSign className="text-primary" />
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileMenu
