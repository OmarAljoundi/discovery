import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { FunctionComponent } from 'react'

interface LoadingFaqProps {}

const LoadingFaq: FunctionComponent<LoadingFaqProps> = () => {
  return (
    <div className="container mb-10">
      <Skeleton className="h-6 w-36 rounded-medium" />
      <Separator className="my-4" />

      <h1 className="text-primary text-2xl lg:text-4xl max-w-xs w-[75%] mx-auto  text-center my-10">
        <Skeleton className="h-6 w-full rounded-lg" />
      </h1>
      <div className="grid md:grid-cols-2 gap-4 items-start">
        {Array.from(new Array(6)).map((_, index) => (
          <div key={index}>
            <Skeleton className=" rounded-medium w-full h-40" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default LoadingFaq
