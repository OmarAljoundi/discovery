'use client'

import { REVALIDATE_CONTENT_LIST } from '@/lib/keys'
import { getContentData } from '@/lib/operations'
import { useQuery } from '@tanstack/react-query'
import { Phone, AtSign } from 'lucide-react'
import { AiOutlineWhatsApp, AiOutlineInstagram } from 'react-icons/ai'
import { HiOutlineMapPin } from 'react-icons/hi2'
const ToolBar = () => {
  const { data: setting } = useQuery({
    queryKey: [REVALIDATE_CONTENT_LIST],
    queryFn: async () => await getContentData(),
  })
  return (
    <header className="bg-black py-3 px-4 lg:block hidden">
      <div className="container">
        <div className="flex justify-between">
          <div className="flex justify-between">
            <div className="contact-info flex gap-4 ">
              <a
                href={`https://api.whatsapp.com/send/?phone=${setting?.home?.footer?.phone_number
                  ?.replaceAll('-', '')
                  .replaceAll('+', '')}&text&type=phone_number&app_absent=0`}
                target="_blank"
              >
                <AiOutlineWhatsApp className="text-white text-2xl" />
              </a>
              <a href="https://maps.app.goo.gl/iY9WwncyNi7rJXvu7" target="_blank">
                <HiOutlineMapPin className="text-white text-2xl" />
              </a>
              <a href="https://www.instagram.com/Discovery.oman/" target="_blank">
                <AiOutlineInstagram className="text-white text-2xl" />
              </a>
            </div>
          </div>
          <div className="contact-info flex gap-8 ">
            <div className="flex gap-3 items-center">
              <a
                className="text-white font-bold "
                href={`tel:${setting?.home?.footer?.phone_number?.replaceAll('-', '').replaceAll('+', '')}`}
                dir="ltr"
              >
                {setting?.home?.footer?.phone_number}
              </a>
              <Phone className="text-[#18c2dc]" />
            </div>
            <div className="flex gap-3 items-center">
              <a className="text-white font-bold font-english" href="mailto:info@discovery-om.com">
                info@discovery-om.com
              </a>
              <AtSign className="text-[#18c2dc]" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default ToolBar
