'use client'
import { useStatic } from '@/hooks/use-static'
import { TourType } from '@/types/custom'
import { FunctionComponent, ReactNode, useEffect } from 'react'

interface ClientProviderProps {
  children: ReactNode
  types: TourType[]
}

const CustomerClientProvider: FunctionComponent<ClientProviderProps> = ({ children, types }) => {
  const staticData = useStatic()
  useEffect(() => {
    staticData.onCreate(types)
  }, [])
  return <>{children}</>
}

export default CustomerClientProvider
