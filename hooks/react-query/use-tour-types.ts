import { REVALIDATE_TOUR_LIST } from '@/lib/keys'
import { getTourTypes } from '@/lib/operations'
import { useQuery } from 'react-query'

export function useTourTypes() {
  return useQuery({
    queryFn: async () => await getTourTypes(),
    queryKey: [REVALIDATE_TOUR_LIST],
    enabled: true,
  })
}
