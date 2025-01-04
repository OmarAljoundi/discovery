'use client'

import BlurImage from '@/components/common/blur-image'
import { Separator } from '@/components/ui/separator'
import IconTourProvider from '@/provider/icon-tour-provider'
import { FaWhatsapp, FaFacebookF, FaInstagram } from 'react-icons/fa'
import { MenuItems } from './menu'
import Link from 'next/link'
import { useTourTypes } from '@/hooks/react-query/use-tour-types'
import IconSocialProvider from '@/provider/icon-social-provider'
import { HiOutlineMapPin } from 'react-icons/hi2'
import { useQuery } from '@tanstack/react-query'
import { REVALIDATE_CONTENT_LIST } from '@/lib/keys'
import { getContentData } from '@/lib/operations'
const Footer = () => {
  const { data, isLoading } = useTourTypes()
  const { data: setting } = useQuery({
    queryKey: [REVALIDATE_CONTENT_LIST],
    queryFn: async () => await getContentData(),
  })
  return (
    <footer className="bg-gray-200">
      <div className="container px-6 py-12 mx-auto">
        <div className="grid  gap-6 grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          <div className="col-span-2">
            <h1 className="text-primary text-xl mb-4">ديسكفري للسياحة والسفر</h1>
            <p className="pl-14">
              هي شركة رائدة في صناعة العطلات السياحية العائلية على مستوى دول الخليج العربي، حيث تقدم تجارب سفر استثنائية وفريدة لعملائها بجودة عالية،
              يوجد لدى ديسكفري فروع في سلطنة عمان والبحرين وقريباً في الإمارات والسعودية.
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

        <div className="flex-col sm:flex-row flex items-center justify-between space-y-2">
          <Link href="/">
            <BlurImage
              src={'/images/discovery-footer.png'}
              className="sm:max-w-[200px] "
              containerClassName={'text-center md:text-right  flex justify-around md:block'}
              alt="Discovery Logo"
              width={300}
              height={100}
            />
            <p className="text-center lg:text-right font-bold">HORIZONS INTERNATIONAL BUSINESS ENTERPRISES</p>
          </Link>

          <div className="flex -mx-2">
            <a
              href="https://www.instagram.com/Discovery.oman/"
              className="mx-2 text-gray-600 transition-colors duration-300  hover:text-primary hover:text-blue-400"
              aria-label="Instagram"
              target="_blank"
            >
              <IconSocialProvider>
                <FaInstagram />
              </IconSocialProvider>
            </a>

            <a
              href={`https://api.whatsapp.com/send/?phone=${setting?.home?.footer?.phone_number
                ?.replaceAll('-', '')
                .replaceAll('+', '')}&text&type=phone_number&app_absent=0`}
              className="mx-2 text-gray-600 transition-colors duration-300  hover:text-primary hover:text-blue-400"
              aria-label="Whatsapp"
              target="_blank"
            >
              <IconSocialProvider>
                <FaWhatsapp />
              </IconSocialProvider>
            </a>

            <a
              href="https://maps.app.goo.gl/iY9WwncyNi7rJXvu7"
              target="_blank"
              className="mx-2 text-gray-600 transition-colors duration-300  hover:text-primary hover:text-blue-400"
            >
              <IconSocialProvider>
                <HiOutlineMapPin />
              </IconSocialProvider>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
