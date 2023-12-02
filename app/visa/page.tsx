import CallToAction from '../(components)/(fifth)/call-to-action'
import { getContentData } from '@/lib/operations'
import VisaCardListing from './visa-card-listing'

const VisaPage = async () => {
  const data = await getContentData()
  return (
    <>
      <div className="container mb-10">
        <VisaCardListing data={data} />
      </div>
      <CallToAction />
    </>
  )
}

export default VisaPage
