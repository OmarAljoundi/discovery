import { FunctionComponent, Suspense } from 'react'
import CardList from './card-list'

interface HotelPageProps {}

const HotelPage: FunctionComponent<HotelPageProps> = () => {
  return (
    <div>
      <CardList />
    </div>
  )
}

export default HotelPage
