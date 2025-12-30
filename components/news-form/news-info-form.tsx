'use client'
import { News } from '@/types/custom'
import { Input } from '@nextui-org/react'
import { FormikProps } from 'formik'
import { FunctionComponent } from 'react'
import ImageForm from './news-image-form'
import RichTextEditor from '../editor'
import { cn } from '@/lib/utils'
import { Globe } from 'lucide-react'

interface NewsInfoFormProps {
  formik: FormikProps<News>
}

const NewsInfoForm: FunctionComponent<NewsInfoFormProps> = ({ formik }) => {
  const { errors, values, handleBlur, handleChange, touched, setFieldValue } = formik

  return (
    <div className="flex flex-col gap-y-4">
      <div className="grid grid-cols-6 space-y-4 mt-4 gap-x-4">
        <div className="col-span-3 xl:col-span-4 space-y-4">
          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            <div className="col-span-2 lg:col-span-1">
              <Input
                label="News title"
                labelPlacement="outside"
                placeholder="Enter News title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title || ''}
                name="title"
                isClearable
                isInvalid={touched.title && !!errors.title}
              />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <Input
                label="News author"
                labelPlacement="outside"
                placeholder="Enter News author"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.author || ''}
                name="author"
                isClearable
                isInvalid={touched.author && !!errors.author}
              />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <Input
                label="News tag"
                labelPlacement="outside"
                placeholder="Enter News tag"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.tag || ''}
                name="tag"
                isClearable
                isInvalid={touched.tag && !!errors.tag}
              />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <Input
                label="Slug"
                labelPlacement="outside"
                placeholder="Enter slug url"
                description="Slug should not contains any spaces, use - or _ for spaces"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.slug || ''}
                name="slug"
                isInvalid={touched.slug && !!errors.slug}
                errorMessage={errors.slug && errors.slug}
                startContent={<Globe />}
              />
            </div>
          </div>
        </div>
        <ImageForm formik={formik} />
      </div>

      <div className="col-span-full">
        <RichTextEditor
          isRtL={true}
          throttleDelay={0}
          className={cn('h-full min-h-56 w-full rounded-xl')}
          editorContentClassName="overflow-auto h-full"
          placeholder="This is your placeholder..."
          editable={true}
          output="html"
          editorClassName="focus:outline-none px-5 py-4 h-full"
          onChange={(p) => setFieldValue('content', p)}
          value={values.content}
        />
      </div>
    </div>
  )
}

export default NewsInfoForm
