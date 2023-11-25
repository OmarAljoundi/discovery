'use client'
import { useModal } from '@/hooks/use-modal'
import { ATTACHMENT_PATH } from '@/lib/keys'
import { ExternalFile } from '@/types/custom'
import { BreadcrumbItem, Breadcrumbs, Button } from '@nextui-org/react'
import { File, Send } from 'lucide-react'
import { FunctionComponent } from 'react'

interface TourBreadcrumbProps {
  tourName: string
  tourId: number
  file?: ExternalFile | null
}

const TourBreadcrumb: FunctionComponent<TourBreadcrumbProps> = ({ tourName, file, tourId }) => {
  const { onOpenCustomer } = useModal()

  return (
    <div className="my-6 flex justify-between flex-wrap items-center gap-x-2 gap-y-4">
      <Breadcrumbs variant="solid">
        <BreadcrumbItem href="/">الرئيسية</BreadcrumbItem>
        <BreadcrumbItem href="/tour-listing">جميع الرحلات</BreadcrumbItem>
        <BreadcrumbItem href="/">{tourName}</BreadcrumbItem>
      </Breadcrumbs>
      <div className="flex gap-x-2">
        {file && (
          <form method="get" action={`${process.env.NEXT_PUBLIC_IMAGE_URL!}${ATTACHMENT_PATH}/${file?.name}`}>
            <Button size="sm" color="primary" type="submit" endContent={<File />}>
              تحميل البرنامج
            </Button>
          </form>
        )}

        <Button size="sm" color="primary" type="button" endContent={<Send />} onPress={() => onOpenCustomer(tourId)}>
          تواصل معنا
        </Button>
      </div>
    </div>
  )
}

export default TourBreadcrumb
