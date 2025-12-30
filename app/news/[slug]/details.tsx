'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { ar } from 'date-fns/locale'
import { CalendarIcon, ClockIcon, Pencil } from 'lucide-react'
import { News } from '@/types/custom'
import { calculateReadingTime } from '@/app/(components)/(sixth)/articles-card'
import CallToAction from '@/app/(components)/(fifth)/call-to-action'

function formatArabicDate(date: Date): string {
  return format(date, 'd MMMM yyyy', { locale: ar })
}

export function NewsDetails({ newsItem }: { newsItem: News }) {
  const lengthOfReading = calculateReadingTime(newsItem.content ?? '')
  return (
    <div>
      <div className="container mb-10">
        <div className="space-y-4">
          <main className="container mx-auto px-4 py-8">
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Badge className="mb-4 bg-primary text-white">{newsItem.tag}</Badge>
              <h1 className="text-4xl font-bold mb-4">{newsItem.title}</h1>

              <div className="flex items-center text-gray-600 mb-6">
                <div className="flex items-center mr-4">
                  <Pencil className="h-5 w-5 ml-1" />
                  <span>{newsItem.author}</span>
                </div>
                <div className="flex items-center mr-4">
                  <CalendarIcon className="h-5 w-5 ml-1" />
                  {newsItem.created_at && <span>{formatArabicDate(new Date(newsItem.created_at ?? ''))}</span>}
                </div>
                <div className="flex items-center mr-4">
                  <ClockIcon className="h-5 w-5 ml-1" />
                  <span>{lengthOfReading}</span>
                </div>
              </div>

              <motion.img
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${newsItem.image}`}
                alt={newsItem.title}
                className="w-full h-auto object-cover rounded-lg shadow-lg mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              />

              <motion.div
                className="minimal-tiptap-editor max-w-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="ProseMirror" dangerouslySetInnerHTML={{ __html: newsItem.content ?? '' }} />
              </motion.div>
            </motion.div>
          </main>
        </div>
      </div>

      <motion.footer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.8 }}>
        <CallToAction />
      </motion.footer>
    </div>
  )
}
