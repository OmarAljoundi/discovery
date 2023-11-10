import IconTourProvider from '@/provider/icon-tour-provider'
import { Tour } from '@/types/custom'
import { FunctionComponent } from 'react'
import { IoPricetags } from 'react-icons/io5'
interface TourInitailInfoProps {
  tour: Tour
}

const TourInitailInfo: FunctionComponent<TourInitailInfoProps> = ({ tour }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 ">
      <div className="grid space-y-2 justify-items-center shadow-medium rounded-medium p-2 md:p-4 gap-x-2">
        <IconTourProvider>
          <IoPricetags />
        </IconTourProvider>
        <h1 className="text-xs md:text-base "> الشخص في الغرفة المزدوجة</h1>
        <h4 className="font-bold">{tour.price}</h4>
      </div>
      <div className="grid  space-y-2 justify-items-center shadow-medium rounded-medium p-2 md:p-4 gap-x-2">
        <IconTourProvider>
          <IoPricetags />
        </IconTourProvider>
        <h1 className="text-xs md:text-base"> شخص مع طفل</h1>
        <h4 className="font-bold">{tour.price_child}</h4>
      </div>
      <div className="grid space-y-2 justify-items-center shadow-medium rounded-medium p-2 md:p-4 gap-x-2">
        <IconTourProvider>
          <IoPricetags />
        </IconTourProvider>
        <h1 className="text-xs md:text-base">شخص مع طفل (بدون سرير)</h1>
        <h4 className="font-bold"> {tour.price_child_no_bed}</h4>
      </div>
      <div className="grid space-y-2 justify-items-center shadow-medium rounded-medium p-2 md:p-4 gap-x-2">
        <IconTourProvider>
          <IoPricetags />
        </IconTourProvider>
        <h1 className="text-xs md:text-base">شخص مع رضيع</h1>
        <h4 className="font-bold">{tour.price_infant}</h4>
      </div>
    </div>
  )
}

export default TourInitailInfo
