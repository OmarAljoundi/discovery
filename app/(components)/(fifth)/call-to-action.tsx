'use client'
import IconTourProvider from '@/provider/icon-tour-provider'
import { Button } from '@nextui-org/react'
import { FunctionComponent, useRef } from 'react'
import { PiShootingStarThin } from 'react-icons/pi'
import { motion } from 'framer-motion'
import Globe from '@/lib/globe'
interface CallToActionProps {}

const CallToAction: FunctionComponent<CallToActionProps> = () => {
  return (
    <div className="pt-20 pb-36 bg-primary/25 z-[1] relative block overflow-hidden">
      <div className="call-to-action bg-[50%]   opacity-5 -z-[1] bg-cover bg-no-repeat absolute top-0 right-0 left-0 bottom-0 "></div>

      <Globe />

      <motion.div
        className="container px-4 lg:px-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, scale: 0.52 },
          visible: {
            opacity: 1,
            scale: 1.0,
            transition: {
              type: 'spring',
              stiffness: 50,
            },
          },
        }}
      >
        <div className="flex-col md:flex-row flex justify-between space-y-4 items-center">
          <div className="justify-items-center md:justify-items-start grid text-black space-y-2">
            <h3 className="text-xl lg:text-2xl">خطط لرحلتك المسقبلية اليوم</h3>
            <h1 className="text-2xl text-center md:text-right lg:text-4xl ">من الشرق الى غرب ، سافر اليوم معنا وعش تجربة لاتنسى</h1>
          </div>
          <Button
            variant="solid"
            className="w-72 h-16 bg-black text-white"
            size="lg"
            endContent={
              <IconTourProvider background="white">
                <PiShootingStarThin />
              </IconTourProvider>
            }
          >
            سافر الآن
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default CallToAction
