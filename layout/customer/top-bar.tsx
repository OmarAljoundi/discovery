'use client'

import { Phone, AtSign } from 'lucide-react'
import { AiOutlineWhatsApp, AiOutlineInstagram } from 'react-icons/ai'
import { HiOutlineMapPin } from 'react-icons/hi2'
const ToolBar = () => {
  return (
    <header className="bg-black py-3 px-4 lg:block hidden">
      <div className="container">
        <div className="flex justify-between">
          <div className="flex justify-between">
            <div className="contact-info flex gap-4 ">
              <a href="https://api.whatsapp.com/send/?phone=%2B96895929251&text&type=phone_number&app_absent=0" target="_blank">
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
              <a className="text-white font-bold " href="tel:+96899801355" dir="ltr">
                +968-99801355
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
