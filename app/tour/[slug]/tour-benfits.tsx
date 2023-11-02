import { Separator } from '@/components/ui/separator'
import IconTourProvider from '@/provider/icon-tour-provider'
import { Tour } from '@/types/custom'
import { Check, Dot, X } from 'lucide-react'
import { FC } from 'react'
import { BsCheckLg } from 'react-icons/bs'
import { RxCross2 } from 'react-icons/rx'
const TourBenfits: FC<{ tour: Tour }> = ({ tour }) => {
  return (
    <div className="shadow-medium rounded-medium p-4">
      <h4 className="mb-0 text-2xl font-semibold font-primary">مميزات البرنامج</h4>
      <Separator className="my-4" />
      <h6 className="mb-4 font-semibold font-primary"> ما يشمله البرنامج </h6>
      <ul className="flex flex-col gap-4 mb-10">
        {tour?.tour_includes?.map((i) => (
          <li key={i.uuid}>
            <div className="flex items-start gap-4">
              <IconTourProvider>
                <BsCheckLg />
              </IconTourProvider>

              <div className="grid items-start">
                <span className="font-bold font-primary">{i.title}</span>
                <span className="inline-block font-primary ">
                  <div className="grid items-center flex-wrap">
                    {i.description.split(',').map((i) => (
                      <div className="flex items-center" key={i}>
                        <div>
                          <Dot className="text-green-900 w-6 h-6" />
                        </div>
                        <div>{i}</div>
                      </div>
                    ))}
                  </div>
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <h6 className="mb-4 font-semibold font-primary"> البرنامج لا يشمل التالي </h6>
      <ul className="flex flex-col gap-4 mb-10">
        {tour?.tour_excludes?.map(({ uuid, description, title }) => (
          <li key={uuid}>
            <div className="flex items-center gap-2">
              <IconTourProvider>
                <RxCross2 />
              </IconTourProvider>

              <span className="inline-block font-primary">{description}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TourBenfits
