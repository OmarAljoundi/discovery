import { getTours } from '@/lib/operations'
import { FunctionComponent } from 'react'
import BestToursList from './best-tours-list'

interface BestToursProps {}

const BestTours: FunctionComponent<BestToursProps> = async () => {
  const response = await getTours()
  return <BestToursList data={response || []} />
}

export default BestTours
