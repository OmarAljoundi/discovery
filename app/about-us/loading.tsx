import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { FunctionComponent } from 'react'

interface LoadingAboutUsProps {}

const LoadingAboutUs: FunctionComponent<LoadingAboutUsProps> = () => {
  return (
    <div className="container mb-10">
      <Skeleton className="h-6 w-36 rounded-medium" />
      <Separator className="my-4" />

      <div className=" grid space-y-4">
        <div className="shadow-medium rounded-medium p-4">
          <Skeleton className=" rounded-medium w-full h-40" />
        </div>

        <div className="shadow-medium rounded-medium p-4">
          <Skeleton className=" rounded-medium w-full h-40" />
        </div>

        <div className="shadow-medium rounded-medium p-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-4">
            {Array.from(new Array(5)).map((i, index) => (
              <div className="grid bg-secondary p-4 justify-items-center" key={index}>
                <Skeleton className="rounded-medium w-full h-40" />
              </div>
            ))}
          </div>
        </div>

        <div className="shadow-medium rounded-medium p-4">
          <ul className="mt-4 text-right list-disc list-inside text-base lg:text-xl space-y-4 lg:space-y-2 " dir="rtl">
            <li className="text-right">
              <Skeleton className=" rounded-medium w-full h-12" />
            </li>
            <li className="text-right">
              <Skeleton className=" rounded-medium w-full h-12" />
            </li>
            <Skeleton className=" rounded-medium w-full h-12" />
            <li className="text-right"></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default LoadingAboutUs
