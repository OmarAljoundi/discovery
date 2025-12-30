'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Plane } from 'lucide-react'

export default function NoNewsFound() {
  return (
    <div className="flex items-center justify-center p-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl text-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          className="mb-8 inline-block"
        >
          <Plane size={64} className="text-gray-400" />
        </motion.div>

        <h1 className="mb-4 text-3xl font-bold text-gray-800">لا توجد أخبار حالياً</h1>

        <p className="mb-8 text-xl text-gray-600">
          حالياً، لا توجد أي أخبار متاحة للعرض في هذا القسم. قد يكون ذلك بسبب عدم توفر تحديثات جديدة أو لأن بيانات الأخبار لم تتم إضافتها بعد.
          يُرجى التحقق لاحقاً للاطّلاع على آخر المستجدات، أو زيارة أقسام أخرى للحصول على المعلومات المطلوبة.
        </p>

        <TourElements />
      </motion.div>
    </div>
  )
}

function TourElements() {
  const elements = [
    { icon: '📰', delay: 0 },   // News
    { icon: '🔔', delay: 1.5 }, // Alerts
    { icon: '🌍', delay: 3 },   // World news
  ]

  return (
    <div className="mt-12 flex justify-center space-x-8">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className="text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [20, 0, 0, -20],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: element.delay,
            ease: 'easeInOut',
          }}
        >
          {element.icon}
        </motion.div>
      ))}
    </div>
  )
}
