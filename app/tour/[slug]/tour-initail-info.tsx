import { Separator } from '@/components/ui/separator'
import IconTourProvider from '@/provider/icon-tour-provider'
import { Tour } from '@/types/custom'
import { FunctionComponent } from 'react'
import { IoPricetags } from 'react-icons/io5'
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
          <h4 className="font-bold text-lg md:text-xl">{tour.price} ر.ع</h4>
        </div>
        <div className="grid space-y-2 justify-items-center border  bg-secondary rounded-medium p-2 md:p-4 gap-x-2 h-full items-start">
          <IconTourProvider>
            <IoPricetags />
          </IconTourProvider>
          <h1 className="text-sm sm:text-base flex flex-col md:flex-row text-center">
            <span>طفل مع سرير</span>
            <span className="font-bold pr-1">(2 - 12 سنة)</span>
          </h1>
          <h4 className="font-bold text-lg md:text-xl">{tour.price_child} ر.ع</h4>
        </div>
        <div className="grid space-y-2 justify-items-center border  bg-secondary rounded-medium p-2 md:p-4 gap-x-2 h-full items-start">
          <IconTourProvider>
            <IoPricetags />
          </IconTourProvider>
          <h1 className="text-sm sm:text-base flex flex-col md:flex-row text-center">
            <span>طفل من غير سرير </span>
            <span className="font-bold pr-1">(2 - 6 سنوات)</span>
          </h1>
          <h4 className="font-bold text-lg md:text-xl"> {tour.price_child_no_bed} ر.ع</h4>
        </div>
        <div className="grid space-y-2 justify-items-center border  bg-secondary rounded-medium p-2 md:p-4 gap-x-2 h-full items-start">
          <IconTourProvider>
            <IoPricetags />
          </IconTourProvider>
          <h1 className="text-sm sm:text-base flex flex-col md:flex-row text-center">
            <span>رضيع</span>
            <span className="font-bold pr-1">(0 - 2 سنة)</span>
          </h1>
          <h4 className="font-bold text-lg md:text-xl">{tour.price_infant} ر.ع</h4>
        </div>
      </div>
    </div>
  )
}

export default TourInitailInfo
