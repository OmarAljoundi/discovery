'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { ar } from 'date-fns/locale'
import { Pencil } from 'lucide-react'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import { Article } from '@/types/custom'
import BlurImage from '@/components/common/blur-image'
import Link from 'next/link'

export function calculateReadingTime(htmlContent: string): string {
  var content = htmlContent.replace(/<[^>]+>/g, '')
  const wordsPerMinute = 200
  const words = content.split(/\s+/).filter((word) => word.length > 0)
  const wordCount = words.length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)
  if (readingTime > 10) {
    return 'اكثر من 10 دقائق'
  }

  const arabicNumbers = ['دقيقة', 'دقيقتين', '3 دقائق', '4 دقائق', '5 دقائق', '6 دقائق', '7 دقائق', '8 دقائق', '9 دقائق']
  return arabicNumbers[readingTime - 1] || 'اكثر من 10 دقائق'
}

function formatArabicDate(date: Date): string {
  return format(date, 'd MMMM yyyy', { locale: ar })
}

export default function ArticleCard({ item, prefix = 'articles' }: { item: Article; prefix?: 'articles' | 'news' }) {
  const { author, content, created_at, image, slug, tag, title } = item
  const formattedDate = formatArabicDate(new Date(created_at ?? ''))
  const lengthOfReading = calculateReadingTime(content ?? '')

  return (
    <Card className="overflow-hidden relative border-0 rounded-2xl h-full flex flex-col">
      <CardHeader className="relative p-0 flex-shrink-0">
        <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }} className="w-full">
          <BlurImage
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${image}`}
            alt={title ?? ''}
            containerClassName="relative h-48 w-full"
            fill
            className="object-cover rounded-t-2xl rounded-b-none"
          />
          <div className="absolute top-4 right-4 left-4 flex justify-end">
            <Badge variant="secondary" className="bg-white/90 hover:bg-white/95">
              {tag}
            </Badge>
          </div>
        </motion.div>
      </CardHeader>
      <div className="relative flex-grow flex flex-col">
        <div className="absolute inset-x-0 top-0 h-6 bg-white rounded-t-3xl" />
        <div className="relative bg-white rounded-3xl -mt-4 pt-4 pb-1 px-0 flex-grow flex flex-col">
          <CardBody className="pt-2 flex-grow">
            <motion.div
              className="flex gap-4 text-xs text-muted-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                <CalendarIcon className="ml-1 h-3 w-3" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                <ClockIcon className="ml-1 h-3 w-3" />
                <span>{lengthOfReading}</span>
              </div>
            </motion.div>
            <motion.h2
              className="text-lg font-bold mb-2 line-clamp-2 text-right h-[56px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {title}
            </motion.h2>
          </CardBody>
          <CardFooter className="flex justify-between items-center pb-4">
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Pencil className="h-5 w-5 text-gray-500" />
              <span className="font-medium text-sm">{author}</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Link href={`/${prefix}/${slug}`}>
                <Button variant="ghost" size="sm" className="text-primary  hover:bg-primary hover:text-white transition-colors duration-300">
                  اقرأ المزيد
                </Button>
              </Link>
            </motion.div>
          </CardFooter>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[2px] overflow-hidden">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 2">
          <motion.path
            d="M0 1L400 1"
            stroke="hsl(274,100%,27%)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
        </svg>
      </div>
    </Card>
  )
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
