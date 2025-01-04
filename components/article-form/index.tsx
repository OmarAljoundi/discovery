'use client'
import { Article } from '@/types/custom'
import { Button, Divider, Tab, Tabs } from '@nextui-org/react'
import { useFormik } from 'formik'
import { FunctionComponent } from 'react'
import { createArticle, updateArticle } from '@/lib/operations'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { http } from '@/service/httpService'
import { REVALIDATE_ARTICLE_LIST } from '@/lib/keys'
import { Save } from 'lucide-react'
import { ArticleSchema } from '@/types/validations'
import ArticleInfoForm from './article-info-form'
import SeoForm from '../common/seo-form'

interface ArticleFormProps {
  data?: Article
}

const options = [
  {
    title: 'Article Info',
    component: ArticleInfoForm,
  },
  {
    title: 'Search Engine',
    component: SeoForm,
  },
]
const ArticleForm: FunctionComponent<ArticleFormProps> = ({ data }) => {
  const router = useRouter()

  const handleSubmitData = async (formData: Article) => {
    if (!formData.slug) {
      formData.slug = formData.title?.trim().replaceAll(' ', '-')
    }

    if (data && data.id) {
      toast.promise(updateArticle(formData), {
        loading: 'Loading, Updating your Article...',
        error(error) {
          return error
        },
        async success(data) {
          await http(`/api/revalidate?tag=${REVALIDATE_ARTICLE_LIST}`).get()
          router.refresh()
          return 'article updated successfully'
        },
      })
    } else {
      toast.promise(createArticle(formData), {
        loading: 'Loading, Creating your article...',
        error(error) {
          return error
        },
        async success(data) {
          await http(`/api/revalidate?tag=${REVALIDATE_ARTICLE_LIST}`).get()
          router.refresh()
          router.push(`/admin/dashboard/article/edit/${data.id}`)
          return 'article created successfully'
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
    validationSchema: ArticleSchema,
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

export default ArticleForm
