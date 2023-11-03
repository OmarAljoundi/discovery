import IconTourProvider from '@/provider/icon-tour-provider'
import { Tour } from '@/types/custom'
import { FunctionComponent } from 'react'
import { IoPricetags } from 'react-icons/io5'
import { ImLocation2 } from 'react-icons/im'
import { Separator } from '@/components/ui/separator'
interface TourInitailInfoProps {
  tour: Tour
}

const TourInitailInfo: FunctionComponent<TourInitailInfoProps> = ({ tour }) => {
  return (
    <div className="shadow-medium rounded-medium p-4">
      <div className="flex flex-col items-start sm:flex-row sm:justify-between my-4 ">
        <div className="gird space-y-3 px-2">
          <h1 className="text-2xl" title={tour.name}>
            {tour.name}
          </h1>
          <div className="flex  items-center gap-x-3">
            <IconTourProvider>
              <ImLocation2 />
            </IconTourProvider>
            <h4 className="text-foreground-600">{tour.tour_countries?.join(' ، ')}</h4>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 ">
          <div className="flex gap-x-2 justify-end items-start px-2 mt-3 sm:px-0 sm:mt-0">
            <IconTourProvider>
              <IoPricetags />
            </IconTourProvider>
            <h4>ابتداء من {tour.price}</h4>
          </div>
          <div className="flex gap-x-2 justify-end items-start px-2 mt-3 sm:px-0 sm:mt-0">
            <IconTourProvider>
              <IoPricetags />
            </IconTourProvider>
            <h4>ابتداء من {tour.price_child}</h4>
          </div>
          <div className="flex gap-x-2 justify-end items-start px-2 mt-3 sm:px-0 sm:mt-0">
            <IconTourProvider>
              <IoPricetags />
            </IconTourProvider>
            <h4>ابتداء من {tour.price_child_no_bed}</h4>
          </div>
          <div className="flex gap-x-2 justify-end items-start px-2 mt-3 sm:px-0 sm:mt-0">
            <IconTourProvider>
              <IoPricetags />
            </IconTourProvider>
            <h4>ابتداء من {tour.price_infant}</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TourInitailInfo
