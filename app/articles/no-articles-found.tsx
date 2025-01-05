'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Plane } from 'lucide-react'

export default function NoArticleFound() {
  return (
    <div className="flex items-center justify-center p-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl text-center">
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
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
        <h1 className="mb-4 text-3xl font-bold text-gray-800">لا يوجد اي مدونات حاليا</h1>
        <p className="mb-8 text-xl text-gray-600">
          حاليًا، لا توجد أي مدونات متاحة للعرض في هذا القسم. قد يكون ذلك بسبب عدم توفر محتوى جديد أو لأن البيانات المتعلقة بالمدونات لم تتم إضافتها
          بعد. يُرجى التحقق لاحقًا للحصول على تحديثات أو مراجعة مصادر أخرى للحصول على المعلومات المطلوبة
        </p>
        <TourElements />
      </motion.div>
    </div>
  )
}

function TourElements() {
  const elements = [
    { icon: '✈️', delay: 0 }, // Airplane
    { icon: '🗺️', delay: 1.5 }, // Map
    { icon: '🏖️', delay: 3 }, // Beach with umbrella
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
