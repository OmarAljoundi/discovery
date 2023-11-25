import { Tour } from '@/types/custom'
import { Input } from '@nextui-org/react'
import { FormikProps } from 'formik'
import { PlaneLanding, PlaneTakeoff } from 'lucide-react'
import { FunctionComponent } from 'react'

interface AirportFormProps {
  formik: FormikProps<Tour>
}

const AirportForm: FunctionComponent<AirportFormProps> = ({ formik }) => {
  const { handleBlur, handleChange, values, errors, touched, setFieldValue } = formik
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-6">
      <div>
        <Input
          label="Airpot going"
          labelPlacement="outside"
          placeholder="Enter airpot going"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.airpot_going?.toString() || ''}
          onClear={() => setFieldValue('airpot_going', undefined)}
          name="airpot_going"
          isClearable
          isInvalid={touched.airpot_going && !!errors.airpot_going}
          startContent={
            <div className="pointer-events-none flex items-center border-r pr-2">
              <PlaneTakeoff className="text-default-400 text-small" />
            </div>
          }
        />
      </div>
      <div>
        <Input
          label="Airpot coming"
          labelPlacement="outside"
          placeholder="Enter airpot coming"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.airpot_coming?.toString() || ''}
          onClear={() => setFieldValue('airpot_coming', undefined)}
          name="airpot_coming"
          isClearable
          isInvalid={touched.airpot_coming && !!errors.airpot_coming}
          startContent={
            <div className="pointer-events-none flex items-center border-r pr-2">
              <PlaneLanding className="text-default-400 text-small" />
            </div>
          }
        />
      </div>
    </div>
  )
}

export default AirportForm
