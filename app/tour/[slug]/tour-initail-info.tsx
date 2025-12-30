import { Separator } from '@/components/ui/separator'
import IconTourProvider from '@/provider/icon-tour-provider'
import { Tour } from '@/types/custom'
import { FunctionComponent } from 'react'
import { IoPricetags } from 'react-icons/io5'
import { MdInfoOutline } from 'react-icons/md'
import Price from '@/components/common/price'
interface TourInitailInfoProps {
  tour: Tour
}

const TourInitailInfo: FunctionComponent<TourInitailInfoProps> = ({ tour }) => {
  return (
    <div className="relative shadow-medium rounded-medium p-4">
      <h4 className="mb-0 text-2xl font-semibold font-primary"> الأسعار</h4>
      <Separator className="my-4" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        <div className="grid space-y-2 justify-items-center border bg-secondary rounded-medium p-2 md:p-4 gap-x-2 h-full items-start">
          <IconTourProvider>
            <IoPricetags />
          </IconTourProvider>
          <h1 className="text-sm sm:text-base"> بالغ في غرفة مزدوجة</h1>
          <h4 className="text-lg md:text-xl">
            <Price amount={tour.price || 0} />
          </h4>
        </div>
        <div className="grid space-y-2 justify-items-center border  bg-secondary rounded-medium p-2 md:p-4 gap-x-2 h-full items-start">
          <IconTourProvider>
            <IoPricetags />
          </IconTourProvider>
          <h1 className="text-sm sm:text-base flex flex-col md:flex-row text-center">
            <span>طفل مع سرير</span>
            <span className="font-bold pr-1">(2 - 12 سنة)</span>
          </h1>
          <h4 className="text-lg md:text-xl">
            <Price amount={tour.price_child || 0} />
          </h4>
        </div>
        <div className="grid space-y-2 justify-items-center border  bg-secondary rounded-medium p-2 md:p-4 gap-x-2 h-full items-start">
          <IconTourProvider>
            <IoPricetags />
          </IconTourProvider>
          <h1 className="text-sm sm:text-base flex flex-col md:flex-row text-center">
            <span>طفل من غير سرير </span>
            <span className="font-bold pr-1">(2 - 6 سنوات)</span>
          </h1>
          <h4 className="text-lg md:text-xl">
            <Price amount={tour.price_child_no_bed || 0} />
          </h4>
        </div>
        <div className="grid space-y-2 justify-items-center border  bg-secondary rounded-medium p-2 md:p-4 gap-x-2 h-full items-start">
          <IconTourProvider>
            <IoPricetags />
          </IconTourProvider>
          <h1 className="text-sm sm:text-base flex flex-col md:flex-row text-center">
            <span>رضيع</span>
            <span className="font-bold pr-1">(0 - 2 سنة)</span>
          </h1>
          <h4 className="text-lg md:text-xl">
            <Price amount={tour.price_infant || 0} />
          </h4>
        </div>
      </div>

      {tour.additional_Info && (
        <>
          <Separator className="my-4" />
          <div className="flex gap-x-2 items-center mb-3">
            <IconTourProvider>
              <MdInfoOutline />
            </IconTourProvider>
            <h4 className="mb-0 text-xl font-semibold font-primary">معلومات إضافية</h4>
          </div>
          <div className="prose prose-sm max-w-none">
            <p className="text-foreground whitespace-pre-wrap leading-relaxed">{tour.additional_Info}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default TourInitailInfo
