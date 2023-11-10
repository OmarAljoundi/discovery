import { REVALIDATE_LOCATION_LIST } from '@/lib/keys'
import { getDestination } from '@/lib/operations'
import { useQuery } from 'react-query'

export function useDestination() {
  return useQuery([REVALIDATE_LOCATION_LIST], async () => await getDestination(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  })
}
