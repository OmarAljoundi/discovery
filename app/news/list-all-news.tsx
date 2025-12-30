'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Article, News } from '@/types/custom'
import ArticleCard from '../(components)/(sixth)/articles-card'

export function ListAllNews({ news }: { news: Array<News> }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  return (
    <div dir="rtl" className="container mb-12 pt-6 lg:mb-16 px-3 lg:px-0">
      <header className="text-center mb-10 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4" style={{ color: '#800080' }}>
قائمة الأخبار
        </h1>
        <p className="text-lg">

مرحباً بكم في صفحة الأخبار. تصفّح أحدث الأخبار التي نعرضها واطّلع على مستجدات الأحداث والمعلومات الموثوقة أولاً بأول.

        </p>
      </header>

      <motion.div
        className="mx-auto gap-4 grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {news.map((post, index) => (
          <PostItem key={index} {...post} />
        ))}
      </motion.div>
    </div>
  )
}

function PostItem(props: Article) {
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 50 },
    },
  }

  return (
    <motion.article variants={itemVariants}>
      <ArticleCard item={props} prefix="news" />
    </motion.article>
  )
}
