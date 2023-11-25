'use client'
import { Button, Input, ModalFooter, Textarea } from '@nextui-org/react'
import { Modal } from '../common/modal'
import { v4 as uuidv4 } from 'uuid'
import { CustomerReview, Review } from '@/types/custom'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useModal } from '@/hooks/use-modal'
import { useSetting } from '@/hooks/use-setting'
import { PushJsonFile } from '@/lib/storage-operations'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export const CustomerReviewModal = () => {
  const CustomerReviewModal = useModal()
  const config = useSetting()
  const route = useRouter()

  const [uniqueId, setUniqueId] = useState(uuidv4())

  const { isOpenCustomerReview, onClose, data } = CustomerReviewModal
  const handleSubmitSection = (formData: Review) => {
    let newObject = { ...config.setting }
    if (data) {
      newObject = {
        ...newObject,
        customers_review: {
          ...newObject.customers_review,
          review: [...(newObject.customers_review?.review?.filter((x) => x.uuid !== data.uuid) ?? []), formData],
        },
      }
    } else {
      newObject = {
        ...newObject,
        customers_review: {
          ...newObject.customers_review,
          review: [...(newObject.customers_review?.review ?? []), formData],
        },
      }
    }

    config.onCreate(newObject)
    const jsonData = JSON.stringify(newObject)
    const blob = new Blob([jsonData], { type: 'application/json' })
    toast.promise(PushJsonFile(blob), {
      loading: 'Saving your changes..',
      error(error) {
        return error
      },
      success() {
        route.refresh()
        return 'Saved successfully'
      },
    })

    setUniqueId(uuidv4())
    resetForm()
    onClose()
  }

  const formik = useFormik({
    initialValues: CustomerReviewModal.data ?? {
      uuid: uniqueId,
    },
    onSubmit: handleSubmitSection,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
  })

  const { handleChange, handleBlur, values, touched, errors, resetForm, handleSubmit, setFieldValue } = formik

  return (
    <Modal
      isOpen={isOpenCustomerReview}
      onClose={onClose}
      dialogClass="px-2"
      title="Customer Review Form"
      renderFooter={() => {
        return (
          <ModalFooter>
            <Button variant="bordered" color="primary" type="button" onClick={() => handleSubmit()}>
              Save Customer Review
            </Button>
          </ModalFooter>
        )
      }}
    >
      <form className="grid space-y-4 mt-4 gap-x-4">
        <div className="space-y-4">
          <div className="grid gap-y-4">
            <Input
              label="Customer Review Title"
              labelPlacement="outside"
              placeholder="Enter Customer Review title"
              onChange={handleChange}
              onBlur={handleBlur}
              onClear={() => setFieldValue('title', '')}
              value={values.title || ''}
              name="title"
              isClearable
              isInvalid={touched.title && !!errors.title}
            />
            <Textarea
              label="Customer Review Description"
              labelPlacement="outside"
              placeholder="Enter Customer Review Description"
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.description && !!errors.description}
            />
          </div>
        </div>
      </form>
    </Modal>
  )
}
