'use client'

import { Button, Input, ModalFooter, Popover, PopoverContent, PopoverTrigger, SelectItem } from '@nextui-org/react'
import CustomSelect from '@/components/next-ui/custom-select'

import { AnimatePresence, motion } from 'framer-motion'
import { Separator } from '../ui/separator'
import useSubmitForm from '@/hooks/use-submit-form'
import { useModal } from '@/hooks/use-modal'
import { Modal } from '../common/modal'
import IconSocialProvider from '@/provider/icon-social-provider'
import { FaCheckCircle } from 'react-icons/fa'
import { useEffect } from 'react'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '../ui/calendar'
import { format } from 'date-fns'

const CustomerFormModal = () => {
  const { data, isCustomer, onClose } = useModal()
  const { formik, isSuccess, loading, onClear } = useSubmitForm({ tourId: data })
  const { values, handleBlur, handleChange, touched, errors, setFieldValue } = formik

  useEffect(() => {
    return () => {
      onClear()
    }
  }, [])

  return (
    <Modal size="3xl" isOpen={isCustomer} onClose={onClose}>
      {isSuccess ? (
        <AnimatePresence>
          <motion.div className=" p-4">
            <motion.div
              className="grid justify-items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 1.6 }}
            >
              <IconSocialProvider size="35px">
                <FaCheckCircle />
              </IconSocialProvider>
              <h1 className="text-xl text-center mt-4">شكراً لتواصلك ، سيتم التواصل معك في اقرب وقت ممكن!</h1>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className={' p-4'}>
          <div className="mb-2 text-light-1 text-center">
            <span className="text-xl fw-500 text-dark-1 ">تواصل معنا لمزيد من المعلومات</span>
            <Separator className="mt-4" />
          </div>
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={formik.handleSubmit}
            className="grid gap-y-5"
            transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.6 }}
          >
            <Input
              type="text"
              placeholder="يرجى إدخال الإسم"
              variant="bordered"
              value={values.name}
              name="name"
              onBlur={handleBlur}
              onChange={handleChange}
              isInvalid={!!touched.name && !!errors.name}
              errorMessage={touched.name && errors.name}
              labelPlacement="outside"
            />
            <Input
              variant="bordered"
              value={values.phone_number}
              onChange={(phone) => formik.setFieldValue('phone_number', phone.target.value)}
              placeholder="يرجى ادخال رقم الهاتف"
              isInvalid={!!touched.phone_number && !!errors.phone_number}
              errorMessage={touched.phone_number && errors.phone_number}
              classNames={{
                input: 'placeholder:text-right',
                label: 'right-0',
              }}
              name="phone_number"
              dir="ltr"
              labelPlacement="outside"
            />
            <CustomSelect
              variant="bordered"
              placeholder="طريقة التواصل المفضلة"
              value={values.contact_method?.toString()}
              name="contact_method"
              selectorIcon={<></>}
              onBlur={handleBlur}
              className="text-right"
              classNames={{
                value: 'text-right',
                label: 'right-0',
              }}
              onChange={handleChange}
              labelPlacement="outside"
              dir="rtl"
            >
              {['Whatsapp', 'Call'].map((x) => (
                <SelectItem key={x} value={x}>
                  {x}
                </SelectItem>
              ))}
            </CustomSelect>

            <Input
              type="text"
              placeholder="ملاحظات أخرى"
              variant="bordered"
              value={values.notes?.toString()}
              name="notes"
              onBlur={handleBlur}
              onChange={handleChange}
              isInvalid={!!touched.notes && !!errors.notes}
              errorMessage={touched.notes && errors.notes}
              labelPlacement="outside"
            />

            <Popover>
              <PopoverTrigger>
                <Input
                  type="text"
                  placeholder="ملاحظات أخرى"
                  variant="bordered"
                  value={values.expected_travel_date ? format(values.expected_travel_date, 'PPP') : 'التاريخ المتوقع للسفر'}
                  name="expected_travel_date"
                  classNames={{
                    input: 'text-right',
                  }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  isInvalid={!!touched.notes && !!errors.notes}
                  errorMessage={touched.notes && errors.notes}
                  startContent={<CalendarIcon className="mr-2 h-4 w-4" />}
                  labelPlacement="outside"
                />
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={values.expected_travel_date || new Date()}
                  onSelect={(e) => setFieldValue('expected_travel_date', e)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <div className="flex-col sm:flex-row flex gap-y-5 gap-x-2">
              <Input
                variant="bordered"
                type="number"
                value={values.number_of_adults?.toString()}
                onChange={(e) => formik.setFieldValue('number_of_adults', e.target.value)}
                placeholder="عدد الاشخاص البالغين (اختياري)"
                isInvalid={!!touched.number_of_adults && !!errors.number_of_adults}
                errorMessage={touched.number_of_adults && errors.number_of_adults}
                classNames={{
                  input: 'placeholder:text-right ',
                }}
                name="number_of_adults"
                labelPlacement="outside"
              />
              <Input
                variant="bordered"
                type="number"
                value={values.number_of_kids?.toString()}
                onChange={(e) => formik.setFieldValue('number_of_kids', e.target.value)}
                placeholder="عدد الأطفال (اختياري)"
                isInvalid={!!touched.number_of_kids && !!errors.number_of_kids}
                errorMessage={touched.number_of_kids && errors.number_of_kids}
                classNames={{
                  input: 'placeholder:text-right',
                }}
                name="number_of_kids"
                labelPlacement="outside"
              />
            </div>
            <div className="mt-2">
              <Button color="primary" type="submit" isLoading={loading}>
                {'إرســال'}
              </Button>
            </div>
            <div className="border-t">
              <h1 className="text-sm text-right mt-2">
                او يمكنكم التواصل مباشره على هذا الرقم <br />
                <a dir="ltr" className="underline" href="tel:+96899801355">
                  +968-99801355
                </a>
              </h1>
            </div>
          </motion.form>
        </div>
      )}
    </Modal>
  )
}

export default CustomerFormModal
