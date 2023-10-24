'use client'
import cn from 'clsx'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import type { ComponentProps } from 'react'
import { Skeleton } from '../ui/skeleton'

export default function BlurImage(props: ComponentProps<typeof Image>) {
  const [isLoading, setLoading] = useState(true)

  return (
    <>
      <Image
        {...props}
        alt={props.alt}
        className={cn(props.className, 'duration-700 ease-in-out', isLoading ? 'scale-105 blur-lg' : 'scale-100 blur-0')}
        onLoadingComplete={() => setLoading(false)}
      />
      {isLoading && <Skeleton className="w-44 h-40" />}
    </>
  )
}
