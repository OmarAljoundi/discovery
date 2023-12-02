'use client'
import { FunctionComponent, useState } from 'react'
import CardList from './card-list'
import { Separator } from '@/components/ui/separator'
import { useSetting } from '@/hooks/use-setting'
import { Home } from '@/types/custom'
import { PushJsonFile } from '@/lib/storage-operations'
import { toast } from 'sonner'
import { useFormik } from 'formik'
import SeoForm from '@/components/common/seo-form'
import { Button } from '@nextui-org/react'
import { Save } from 'lucide-react'
import FooterForm from '@/components/settings/home-setting/footer-form'

interface HomePageProps {}

const HomePage: FunctionComponent<HomePageProps> = () => {
  const [loading, setLoading] = useState(false)
  const config = useSetting()
  const SaveChanges = (formData: Home) => {
    setLoading(true)
    let newObject = { ...config.setting }
    newObject = {
      ...newObject,
      home: {
        ...newObject.home,
        seo: formData.seo,
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
      finally() {
        setLoading(false)
      },
    })
  }
  const formik = useFormik({
    initialValues: config?.setting?.home ?? { seo: { description: '', tags: '', title: '' } },
    onSubmit: SaveChanges,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
  })
  return (
    <div className=" lg:px-4 ">
      <div className=" h-full flex-1 flex-col space-y-8 p-8 flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <p className="text-xl">Home Sliders!</p>
            <p className="text-muted-foreground">Here&apos;s a list of your slides!</p>
          </div>
        </div>
        <CardList />
        <Separator />
        <div>
          <p className="text-xl">Home Seo!</p>
          <p className="text-muted-foreground">Add Seo to your page to boots customers search!</p>
        </div>
        <form onSubmit={formik.handleSubmit} className="p-4 shadow-medium rounded-medium">
          <SeoForm formik={formik} />
          <Button color="primary" endContent={<Save />} type="submit" className="mt-8" isLoading={loading}>
            Save Changes
          </Button>
        </form>

        <Separator />
        <div>
          <p className="text-xl">Footer Setting!</p>
          <p className="text-muted-foreground">Add footer settings!</p>
        </div>
        <FooterForm />
      </div>
    </div>
  )
}

export default HomePage
