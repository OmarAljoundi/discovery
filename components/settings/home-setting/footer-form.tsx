import { useSetting } from '@/hooks/use-setting'
import { REVALIDATE_CONTENT_LIST } from '@/lib/keys'
import { PushJsonFile } from '@/lib/storage-operations'
import { Home } from '@/types/custom'
import { Button, Input } from '@nextui-org/react'
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { Save } from 'lucide-react'
import { FunctionComponent, useState } from 'react'
import { toast } from 'sonner'

interface FooterFormProps {}

const FooterForm: FunctionComponent<FooterFormProps> = () => {
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()
  const config = useSetting()
  const SaveChanges = (formData: Home) => {
    setLoading(true)
    let newObject = { ...config.setting }
    newObject = {
      ...newObject,
      home: {
        ...newObject.home,
        footer: formData.footer,
      },
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
        return 'Saved successfully'
      },
      async finally() {
        setLoading(false)
        await queryClient.invalidateQueries({ queryKey: [REVALIDATE_CONTENT_LIST] })
      },
    })
  }
  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: config?.setting?.home ?? {},
    onSubmit: SaveChanges,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
  })

  return (
    <form onSubmit={handleSubmit} className="p-4 shadow-medium rounded-medium">
      <Input
        label="Phone Number"
        labelPlacement="outside"
        placeholder="Enter phone number"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.footer?.phone_number || ''}
        name="footer.phone_number"
      />

      <Button color="primary" endContent={<Save />} type="submit" className="mt-8" isLoading={loading}>
        Save Changes
      </Button>
    </form>
  )
}

export default FooterForm
