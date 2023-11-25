import { submitForm } from '@/lib/operations'
import { Customer, eCustomerStatus } from '@/types/custom'
import { useFormik } from 'formik'
import { useState } from 'react'
import { toast } from 'sonner'
import * as yup from 'yup'

export default function useSubmitForm({ tourId }: { tourId: number }) {
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const handleSubmitForm = async (values: Customer) => {
    setLoading(true)
    values.tour_id = tourId
    var result = await submitForm(values)

    if (result.success) {
      setIsSuccess(true)
      formik.resetForm()
    } else {
      toast.error('حدث خطأ ما')
    }
    setLoading(false)
  }

  const formik = useFormik({
    initialValues: {
      tour_id: tourId,
      status: 'Pending',
    },
    onSubmit: handleSubmitForm,
    validateOnChange: true,
    validationSchema: Schema,
  })

  const onClear = () => {
    setLoading(false)
    setIsSuccess(false)
    formik.resetForm()
  }

  return {
    formik,
    loading,
    isSuccess,
    onClear,
  }
}

const Schema = yup.object().shape({
  name: yup.string().required('الرجاء إدخال الإسم'),
  phone_number: yup.string().required('الرجاء إدخال رقم الجوال'),
  contact_method: yup.string().nullable().required('الرجاء إختيار طريقة التواصل'),
})
