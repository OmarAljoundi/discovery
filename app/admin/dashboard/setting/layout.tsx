export const revalidate = 0

import { CONFIG_PATH, SETTING_PATH } from '@/lib/keys'
import { GetJsonFile } from '@/lib/storage-operations'
import { supabaseClient } from '@/lib/supabaseClient'
import SettingLayoutProvider from '@/provider/setting-layout-provider'
import { Setting } from '@/types/custom'
import { notFound } from 'next/navigation'
import { FunctionComponent, ReactNode } from 'react'
interface SettingLayoutProps {
  children: ReactNode
}

const SettingLayout: FunctionComponent<SettingLayoutProps> = async ({ children }) => {
  const { data, error } = await supabaseClient.storage.from('discovery').list(SETTING_PATH)

  let responseData: Setting | undefined

  if (data && data.length > 0 && data.find((x) => x.name === CONFIG_PATH)) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_IMAGE_URL}${SETTING_PATH}/${CONFIG_PATH}`, { next: { revalidate: 0 } })

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`)
    }

    responseData = (await response.json()) as Setting
  }

  return <SettingLayoutProvider settingData={responseData}>{children}</SettingLayoutProvider>
}

export default SettingLayout
