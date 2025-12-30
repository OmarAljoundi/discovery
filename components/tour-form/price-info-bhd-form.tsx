import { Tour } from '@/types/custom'
import { Input } from '@nextui-org/react'
import { FormikProps } from 'formik'
import { FunctionComponent } from 'react'

interface PriceInfoBHDProps {
  formik: FormikProps<Tour>
}

const PriceInfoBHD: FunctionComponent<PriceInfoBHDProps> = ({ formik }) => {
  const { errors, values, handleBlur, handleChange, touched, setFieldValue } = formik

  return (
    <div className="grid grid-cols-4 gap-x-4 gap-y-6">
      <div className="col-span-2 xl:col-span-1">
        <Input
          label="Price BHD"
          labelPlacement="outside"
          placeholder="Tour price BHD"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.price_bhd?.toString() || ''}
          onClear={() => setFieldValue('price_bhd', undefined)}
          name="price"
          type="number"
          isClearable
          isInvalid={touched.price_bhd && !!errors.price_bhd}
          startContent={
            <div className="pointer-events-none flex items-center border-r pr-2">
              <span className="text-default-400 text-small">BHD</span>
            </div>
          }
        />
      </div>
      <div className="col-span-2 xl:col-span-1">
        <Input
          label="Price with child BHD"
          labelPlacement="outside"
          placeholder="Tour price with child BHD"
          onClear={() => setFieldValue('price_child_bhd', undefined)}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.price_child_bhd?.toString() || ''}
          name="price_child_bhd"
          isClearable
          isInvalid={touched.price_child_bhd && !!errors.price_child_bhd}
          type="number"
          startContent={
            <div className="pointer-events-none flex items-center border-r pr-2">
              <span className="text-default-400 text-small">BHD</span>
            </div>
          }
        />
      </div>
      <div className="col-span-2 xl:col-span-1">
        <Input
          label="Price with child (no bed) BHD"
          labelPlacement="outside"
          onClear={() => setFieldValue('price_child_no_bed_bhd', undefined)}
          placeholder="Tour price with child (no bed)"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.price_child_no_bed_bhd?.toString() || ''}
          name="price_child_no_bed_bhd"
          type="number"
          isClearable
          isInvalid={touched.price_child_no_bed_bhd && !!errors.price_child_no_bed_bhd}
          startContent={
            <div className="pointer-events-none flex items-center border-r pr-2">
              <span className="text-default-400 text-small">BHD</span>
            </div>
          }
        />
      </div>
      <div className="col-span-2 xl:col-span-1">
        <Input
          label="Price with infant BHD"
          labelPlacement="outside"
          onClear={() => setFieldValue('price_infant_bhd', undefined)}
          placeholder="Tour price with infant BHD"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.price_infant_bhd?.toString() || ''}
          name="price_infant_bhd"
          isClearable
          isInvalid={touched.price_infant_bhd && !!errors.price_infant_bhd}
          type="number"
          startContent={
            <div className="pointer-events-none flex items-center border-r pr-2">
              <span className="text-default-400 text-small">BHD</span>
            </div>
          }
        />
      </div>
    </div>
  )
}

export default PriceInfoBHD
