'use client'

import BlurImage from '@/components/common/blur-image'
import { Separator } from '@/components/ui/separator'
import IconTourProvider from '@/provider/icon-tour-provider'
import { FaWhatsapp, FaFacebookF, FaInstagram } from 'react-icons/fa'
import { MenuItems } from './menu'
import Link from 'next/link'
import { useTourTypes } from '@/hooks/react-query/use-tour-types'
const Footer = () => {
  const { data, isLoading } = useTourTypes()
  return (
    <footer>
      <div className="container px-6 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <h1 className="text-primary text-xl mb-4">دسكفري للسياحة والسفر</h1>
            <p className="pl-14">
              دسكفري للسياحة هي واحدة من أكبر الشركات المتخصصة بالسفر و السياحية فى سلطنة عمان التي تعمل تحت شعار (انت اختار ) نقدم مئات البرامج
              أسبوعيا و يوميا لاكثر من 50 دولة حول العالم مع تقديم خيار الاختيار للمسافر لمدة و تاريخ و طريقة الرحلة.
            </p>
          </div>

          <div>
            <p className="font-semibold text-primary ">روابط مهمة</p>

            <div className="flex flex-col items-start mt-5 space-y-2">
              {MenuItems.map((item) => (
                <Link key={item.title} href={item.link} className="text-gray-600 transition-colors duration-300  hover:text-primary hover:underline">
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold text-primary ">انوع الرحلات</p>

            <div className="flex flex-col items-start mt-5 space-y-2">
              {data?.results?.map((item) => (
                <Link
                  key={item.id}
                  href={`/tour-listing?type=${item.name}`}
                  className="text-gray-600 transition-colors duration-300  hover:underline hover:text-primary"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-6 md:my-8 " />

        <div className="flex items-center justify-between">
          <a href="#">
            <BlurImage src={'/images/discovery-footer.png'} className="max-w-[200px]" alt="Discovery Logo" width={300} height={100} />
          </a>

          <div className="flex -mx-2">
            <a href="#" className="mx-2 text-gray-600 transition-colors duration-300  hover:text-primary hover:text-blue-400" aria-label="Facebook">
              <IconTourProvider>
                <FaFacebookF />
              </IconTourProvider>
            </a>

            <a href="#" className="mx-2 text-gray-600 transition-colors duration-300  hover:text-primary hover:text-blue-400" aria-label="Instagram">
              <IconTourProvider>
                <FaInstagram />
              </IconTourProvider>
            </a>

            <a href="#" className="mx-2 text-gray-600 transition-colors duration-300  hover:text-primary hover:text-blue-400" aria-label="Whatsapp">
              <IconTourProvider>
                <FaWhatsapp />
              </IconTourProvider>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
