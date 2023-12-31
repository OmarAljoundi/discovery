import { useModal } from '@/hooks/use-modal'
import { FunctionComponent } from 'react'
import { Modal } from '../common/modal'
import { Button, Image, Input, ModalFooter } from '@nextui-org/react'
import { Hotel } from '@/types/custom'
import { useFormik } from 'formik'
import { X } from 'lucide-react'
import { Button as ShcdnButton } from '@/components/ui/button'

import { useRouter } from 'next/navigation'
import MultipleImageForm from '../common/multiple-image-form'
import { toast } from 'sonner'
import { http } from '@/service/httpService'
import { REVALIDATE_HOTEL_LIST, REVALIDATE_TOUR_LIST } from '@/lib/keys'
import { createHotel, updateHotel } from '@/lib/operations'
import { HotalSchema } from '@/types/validations'
import { cn } from '@/lib/utils'
import SingleImageForm from '../common/single-image-form'
interface HotelModalProps {}

const HotelModal: FunctionComponent<HotelModalProps> = () => {
  const modal = useModal()
  const router = useRouter()
  const handleSubmitFeature = (formData: Hotel) => {
    const { onClose, data } = modal
    if (data && data.id) {
      toast.promise(updateHotel(formData), {
        loading: 'Loading, Updating your Hotel...',
        error(error) {
          return error.message
        },
        async success(data) {
          await http(`/api/revalidate?tag=${REVALIDATE_HOTEL_LIST}`).get()
          await http(`/api/revalidate?tag=${REVALIDATE_TOUR_LIST}`).get()
          router.refresh()
          resetForm()
          onClose()
          return 'Hotel updated successfully'
        },
      })
    } else {
      toast.promise(createHotel(formData), {
        loading: 'Loading, Creating your hotel...',
        error(error) {
          return error.message
        },
        async success(data) {
          await http(`/api/revalidate?tag=${REVALIDATE_HOTEL_LIST}`).get()
          router.refresh()
          resetForm()
          onClose()
          return 'Hotel created successfully'
        },
      })
    }
    resetForm()
    onClose()
  }

  const onImageRemove = (_index: number) => {
    setValues({
      ...values,
      images: [...(values.images?.filter((image, index) => index !== _index) ?? [])],
    })
  }

  const formik = useFormik({
    initialValues: modal.data ?? {},
    onSubmit: handleSubmitFeature,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: HotalSchema,
  })

  const { handleChange, handleBlur, values, touched, errors, resetForm, handleSubmit, setFieldValue, isValid, setValues } = formik

  return (
    <Modal
      isOpen={modal.isOpenHotel}
      onClose={modal.onClose}
      dialogClass="px-2"
      size="5xl"
      title={`${modal.data ? 'Update Hotal' : 'Create new hotal'}`}
      renderFooter={() => {
        return (
          <ModalFooter>
            <Button variant="bordered" color="primary" type="button" onClick={() => handleSubmit()} isDisabled={!isValid}>
              Save Changes
            </Button>
          </ModalFooter>
        )
      }}
    >
      <form className="grid space-y-4 mt-4 gap-x-4 mb-4">
        <div className="space-y-4">
          <div className="grid gap-y-4">
            <div className="grid grid-cols-12 gap-x-2">
              <div className="col-span-8">
                <h1 className="text-xl text-center mb-2">Hotel Images</h1>
                <MultipleImageForm formik={formik} field="images" maxNumber={10}>
                  <div className={cn(values.images && values.images.length > 0 ? 'flex flex-wrap gap-6 px-2 pb-4' : '')}>
                    {values.images?.map((image, index) => (
                      <div className="image-item border rounded-xl relative dark:bg-white w-28 mt-5" key={index}>
                        <Image src={`${process.env.NEXT_PUBLIC_IMAGE_URL!}${image}`} alt="" className="rounded-xl w-28 h-16" />
                        <ShcdnButton
                          type="button"
                          size={'icon'}
                          variant={'ghost'}
                          className="absolute -top-2 -right-2 bg-white w-6 h-6 rounded-full border border-red-600 z-50"
                          onClick={() => onImageRemove(index)}
                        >
                          <X className="w-4 h-4 text-red-600" />
                        </ShcdnButton>
                      </div>
                    ))}
                  </div>
                </MultipleImageForm>
              </div>
              <div className="col-span-4">
                <h1 className="text-xl text-center mb-2">Hotel Logo Image</h1>

                <SingleImageForm formik={formik} field="hotel_logo" maxNumber={1}>
                  {values.hotel_logo && (
                    <div className="px-2 pb-4">
                      <div className="image-item border rounded-xl relative dark:bg-white w-28 mt-5">
                        <Image src={`${process.env.NEXT_PUBLIC_IMAGE_URL!}${values.hotel_logo}`} alt="" className="rounded-xl w-28 h-16" />
                        <ShcdnButton
                          type="button"
                          size={'icon'}
                          variant={'ghost'}
                          className="absolute -top-2 -right-2 bg-white w-6 h-6 rounded-full border border-red-600 z-50"
                          onClick={() => setFieldValue('hotel_logo', null)}
                        >
                          <X className="w-4 h-4 text-red-600" />
                        </ShcdnButton>
                      </div>
                    </div>
                  )}
                </SingleImageForm>
              </div>
            </div>
            <div className="mt-4 space-y-4">
              <div className="flex gap-x-4">
                <Input
                  label="Hotal Name"
                  labelPlacement="outside"
                  placeholder="Enter hotal name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onClear={() => setFieldValue('name', '')}
                  value={values.name || ''}
                  name="name"
                  isInvalid={touched.name && !!errors.name}
                  errorMessage={errors.name}
                />
                <Input
                  type="number"
                  label="Hotal Rating"
                  labelPlacement="outside"
                  placeholder="Enter hotal rating"
                  name="rating"
                  value={values.rating?.toString() ?? ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.rating && !!errors.rating}
                  errorMessage={errors.rating}
                />
              </div>
              <div className="flex gap-x-4">
                <Input
                  label="Hotal Place"
                  labelPlacement="outside"
                  placeholder="Enter hotal place"
                  name="place"
                  value={values.place?.toString() ?? ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.place && !!errors.place}
                  errorMessage={errors.place}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default HotelModal
