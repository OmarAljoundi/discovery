import { Tour } from '@/types/custom'
import { Input } from '@nextui-org/react'
import { FormikProps } from 'formik'
import { FunctionComponent } from 'react'

interface PriceInfoProps {
  formik: FormikProps<Tour>
}

const PriceInfo: FunctionComponent<PriceInfoProps> = ({ formik }) => {
  const { dirty, errors, values, handleBlur, handleChange, isValid, touched, setFieldValue, handleReset } = formik

  return (
    <div className="grid grid-cols-4 gap-x-4 gap-y-6">
      <div className="col-span-2 xl:col-span-1">
        <Input
          label="Price"
          labelPlacement="outside"
          placeholder="Tour price"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.price?.toString() || ''}
          onClear={() => setFieldValue('price', undefined)}
          name="price"
          type="number"
          isClearable
          isInvalid={touched.price && !!errors.price}
          startContent={
            <div className="pointer-events-none flex items-center border-r pr-2">
              <span className="text-default-400 text-small">OMR</span>
            </div>
          }
        />
      </div>
      <div className="col-span-2 xl:col-span-1">
        <Input
          label="Price with child"
          labelPlacement="outside"
          placeholder="Tour price with child"
          onClear={() => setFieldValue('price_child', undefined)}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.price_child?.toString() || ''}
          name="price_child"
          isClearable
          isInvalid={touched.price_child && !!errors.price_child}
          type="number"
          startContent={
            <div className="pointer-events-none flex items-center border-r pr-2">
              <span className="text-default-400 text-small">OMR</span>
            </div>
          }
        />
      </div>
      <div className="col-span-2 xl:col-span-1">
        <Input
          label="Price with child (no bed)"
          labelPlacement="outside"
          onClear={() => setFieldValue('price_child_no_bed', undefined)}
          placeholder="Tour price with child (no bed)"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.price_child_no_bed?.toString() || ''}
          name="price_child_no_bed"
          type="number"
          isClearable
          isInvalid={touched.price_child_no_bed && !!errors.price_child_no_bed}
          startContent={
            <div className="pointer-events-none flex items-center border-r pr-2">
              <span className="text-default-400 text-small">OMR</span>
            </div>
          }
        />
      </div>
      <div className="col-span-2 xl:col-span-1">
        <Input
          label="Price with infant"
          labelPlacement="outside"
          onClear={() => setFieldValue('price_infant', undefined)}
          placeholder="Tour price with infant"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.price_infant?.toString() || ''}
          name="price_infant"
          isClearable
          isInvalid={touched.price_infant && !!errors.price_infant}
          type="number"
          startContent={
            <div className="pointer-events-none flex items-center border-r pr-2">
              <span className="text-default-400 text-small">OMR</span>
            </div>
          }
        />
      </div>
    </div>
  )
}

export default PriceInfo
