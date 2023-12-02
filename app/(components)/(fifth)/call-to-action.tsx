'use client'
import { Button, Input } from '@nextui-org/react'
import { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Globe from '@/lib/globe'
import { joinNewLetter } from '@/lib/operations'
import { CiCircleCheck } from 'react-icons/ci'
import IconTourProvider from '@/provider/icon-tour-provider'
import { IoCloseCircleOutline } from 'react-icons/io5'

interface CallToActionProps {}

const CallToAction: FunctionComponent<CallToActionProps> = () => {
  const emailOrPhone = useRef<HTMLInputElement | null>(null)
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<{ message?: string; success: boolean }>()

  const handleSubmit = async () => {
    setLoading(true)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    var request: any = {}

    if (emailRegex.test(emailOrPhone.current!.value)) {
      request.email = emailOrPhone.current!.value
    } else {
      request.phone_number = emailOrPhone.current!.value
    }

    var result = await joinNewLetter(request)

    if (result.success) {
      emailOrPhone.current!.value = ''
    }
    setResponse(result)

    setLoading(false)
  }

  const isValidInput = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^\d{10}$/

    if (emailRegex.test(emailOrPhone.current?.value ?? '')) {
      return true
    } else if (phoneRegex.test(emailOrPhone.current?.value ?? '')) {
      return true
    } else {
      setResponse({
        success: false,
        message: 'الرجاء ادخال رقم صحيح او ايميل صحيح',
      })
      return false
    }
  }

  return (
    <div className="pt-10 lg:pt-20 pb-36 bg-primary z-[1] relative block overflow-hidden">
      <div className="call-to-action bg-[50%]  opacity-5 -z-[1] bg-cover bg-no-repeat absolute top-0 right-0 left-0 bottom-0"></div>

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
        <div className="flex-col md:flex-row flex justify-between space-y-9 items-center">
          <div className="justify-items-center md:justify-items-start grid text-black space-y-2">
            <h3 className="text-6xl text-white font-specialAr">لكل رحلة .. حكاية</h3>
            <h1 className="text-2xl text-center  font-specialEn md:text-right  lg:text-4xl text-white direc">Every Journey .. Has a story</h1>
          </div>

          <div className="grid gap-y-2 justify-items-center lg:justify-items-start max-w-sm w-full">
            <Input
              label="البريد الإلكتروني او رقم الهاتف"
              classNames={{
                label: 'text-white lg:text-right right-0 text-base lg:text-xl mx-auto left-0 text-center',
                inputWrapper: 'rounded-sm',
                input: 'placeholder:text-right',
              }}
              ref={emailOrPhone}
              dir="ltr"
              labelPlacement="outside"
              placeholder="الرجاء إدخال رقم الهاتف او البريد الإلكتروني"
              isInvalid={response?.success == false}
              isClearable
            />
            {response?.success != true && (
              <Button
                variant="solid"
                className="h-12 bg-[#18c2dc] text-black font-bold w-fit px-10"
                size="sm"
                isLoading={loading}
                onPress={() => {
                  if (isValidInput()) {
                    handleSubmit()
                  }
                }}
              >
                سجل لتصلك أخر العروض
              </Button>
            )}
            {response?.success == true && (
              <div className="bg-white shadow-medium p-4 rounded-medium relative z-50">
                <div className="flex justify-start items-center gap-x-2">
                  <IconTourProvider>
                    <CiCircleCheck />
                  </IconTourProvider>
                  <h1>شكراً لك .. تم اضافتك للقائمة بنجاح</h1>
                </div>
              </div>
            )}

            {response?.success == false && (
              <div className="bg-danger-50 shadow-medium p-4 rounded-medium relative z-50">
                <div className="flex justify-start items-center gap-x-2">
                  <IconTourProvider>
                    <IoCloseCircleOutline />
                  </IconTourProvider>
                  <h1>{response.message}</h1>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default CallToAction
