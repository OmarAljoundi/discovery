import CardAdd from '@/components/common/card-add'
import { Separator } from '@/components/ui/separator'
import { SETTING_PATH } from '@/lib/keys'
import { GetJsonFile } from '@/lib/storage-operations'
import { Visa } from '@/types/custom'
import { notFound } from 'next/navigation'
import { FunctionComponent } from 'react'
import CardDetails from './card-details'
import { supabaseClient } from '@/lib/supabaseClient'
import CardList from './card-list'

interface VisaPageProps {}

const VisaPage: FunctionComponent<VisaPageProps> = async () => {
  return (
    <div className=" lg:px-4 ">
      <div className=" h-full flex-1 flex-col space-y-8 p-8 flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <p className="text-muted-foreground">Here&apos;s a list of your visaes!</p>
          </div>
        </div>
        <CardList />
        <Separator />
      </div>
    </div>
  )
}

export default VisaPage
