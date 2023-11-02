'use client'
import cn from 'clsx'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import type { ComponentProps } from 'react'
import { Skeleton } from '../ui/skeleton'

export default function BlurImage(props: ComponentProps<typeof Image>) {
  const [isLoading, setLoading] = useState(true)

  return (
    <div className="aspect-[3/2] rounded-medium">
      <Image
        {...props}
        alt={props.alt}
        className={cn(props.className, 'duration-700 ease-in-out rounded-medium', isLoading ? 'scale-105 blur-lg' : 'scale-100 blur-0')}
        onLoad={() => setLoading(false)}
      />
    </div>
  )
}
