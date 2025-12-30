import { News } from '@/types/custom'
import { FormikProps } from 'formik'
import { FunctionComponent } from 'react'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import SingleImageForm from '../common/single-image-form'
import Image from 'next/image'

interface ImageFormProps {
  formik: FormikProps<News>
}

const ImageForm: FunctionComponent<ImageFormProps> = ({ formik }) => {
  return (
    <div className="col-span-3  xl:col-span-2">
      <SingleImageForm formik={formik} field="image" maxNumber={1}>
        {formik.values.image && (
          <div className="px-2 pb-4">
            <div className="image-item border rounded-xl relative dark:bg-white w-28 mt-5">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL!}${formik.values.image}`}
                alt=""
                width={200}
                height={200}
                className="rounded-xl w-28 h-16"
              />
              <Button
                type="button"
                size={'icon'}
                variant={'ghost'}
                className="absolute -top-2 -right-2 bg-white w-6 h-6 rounded-full border border-red-600 z-50"
                onClick={() => formik.setFieldValue('image', null)}
              >
                <X className="w-4 h-4 text-red-600" />
              </Button>
            </div>
          </div>
        )}
      </SingleImageForm>
    </div>
  )
}

export default ImageForm
