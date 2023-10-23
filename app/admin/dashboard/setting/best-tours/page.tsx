import BestToursForm from '@/components/settings/best-tours'
import { FunctionComponent } from 'react'

interface BestToursPageProps {}

const BestToursPage: FunctionComponent<BestToursPageProps> = () => {
  return (
    <div className="mt-16 px-8">
      <BestToursForm />
    </div>
  )
}

export default BestToursPage
