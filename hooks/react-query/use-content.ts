import { CONFIG_PATH, REVALIDATE_LOCATION_LIST, REVALIDATE_TOUR_LIST, SETTING_PATH } from '@/lib/keys'
import { getDestination } from '@/lib/operations'
import { supabaseClient } from '@/lib/supabaseClient'
import { Setting } from '@/types/custom'
import { useQuery } from 'react-query'

export function useContent() {
  const getContentData = async () => {
    const { data } = await supabaseClient.storage.from('discovery').list(SETTING_PATH)
    let responseData: Setting | undefined
    if (data && data.length > 0 && data.find((x) => x.name === CONFIG_PATH)) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_IMAGE_URL}${SETTING_PATH}/${CONFIG_PATH}`, { next: { revalidate: 0 } })

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`)
      }

      responseData = (await response.json()) as Setting
    }
    return responseData
  }
  return useQuery({
    queryFn: async () => await getContentData(),
    queryKey: [SETTING_PATH],
    enabled: true,
  })
}
