'use client'
import { News } from '@/types/custom'
import { Button, Divider, Tab, Tabs } from '@nextui-org/react'
import { useFormik } from 'formik'
import { FunctionComponent } from 'react'
import { createNews, updateNews } from '@/lib/operations'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { http } from '@/service/httpService'
import { REVALIDATE_NEWS_LIST } from '@/lib/keys'
import { Save } from 'lucide-react'
import { NewsSchema } from '@/types/validations'
import NewsInfoForm from './news-info-form'
import SeoForm from '../common/seo-form'

interface NewsFormProps {
  data?: News
}

const options = [
  {
    title: 'News Info',
    component: NewsInfoForm,
  },
  {
    title: 'Search Engine',
    component: SeoForm,
  },
]
const NewsForm: FunctionComponent<NewsFormProps> = ({ data }) => {
  const router = useRouter()

  const handleSubmitData = async (formData: News) => {
    if (!formData.slug) {
      formData.slug = formData.title?.trim().replaceAll(' ', '-')
    }

    if (data && data.id) {
      toast.promise(updateNews(formData), {
        loading: 'Loading, Updating your News...',
        error(error) {
          return error
        },
        async success(data) {
          await http(`/api/revalidate?tag=${REVALIDATE_NEWS_LIST}`).get()
          router.refresh()
          return 'news updated successfully'
        },
      })
    } else {
      toast.promise(createNews(formData), {
        loading: 'Loading, Creating your news...',
        error(error) {
          return error
        },
        async success(data) {
          await http(`/api/revalidate?tag=${REVALIDATE_NEWS_LIST}`).get()
          router.refresh()
          router.push(`/admin/dashboard/news/edit/${data.id}`)
          return 'news created successfully'
        },
      })
    }
  }

  const formik = useFormik({
    initialValues: data ?? {
      author: undefined,
      content: undefined,
      id: undefined,
      image: undefined,
      is_active: true,
      seo: undefined,
      slug: undefined,
      tag: undefined,
      title: undefined,
    },
    onSubmit: handleSubmitData,
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: NewsSchema,
  })
  return (
    <div className="flex w-full flex-col">
      <Divider className="my-4" />
      <form onSubmit={formik.handleSubmit} className="relative">
        <Tabs aria-label="Options">
          {options.map((i) => (
            <Tab key={i.title} title={i.title}>
              <i.component formik={formik} />
            </Tab>
          ))}
        </Tabs>
        <div className="absolute right-0 top-0">
          <div className="flex gap-x-4">
            <Button size="sm" color="primary" type="submit" isDisabled={formik.isSubmitting} isLoading={formik.isSubmitting} endContent={<Save />}>
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default NewsForm
