'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Article } from '@/types/custom'
import NoArticleFound from './no-articles-found'

export function ListAllArticles({ articles }: { articles: Array<Article> }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  return (
    <div
      dir="rtl"
      className="
        w-full
        min-h-screen
        bg-white
        text-black
        py-10
        px-4
      "
    >
      {/* Title + description (in Arabic) */}
      <header className="text-center mb-10 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4" style={{ color: '#800080' }}>
          قائمة المقالات
        </h1>
        <p className="text-lg">مرحباً بكم في صفحة المقالات. تصفّح أحدث المقالات التي نطرحها واستمتع بقراءة متنوعة ومفيدة.</p>
      </header>

      {/* No articles fallback */}
      {articles.length === 0 ? (
        <NoArticleFound />
      ) : (
        <motion.div className="mx-auto max-w-2xl space-y-8" variants={containerVariants} initial="hidden" animate="visible">
          {articles.map((post, index) => (
            <PostItem key={index} {...post} />
          ))}
        </motion.div>
      )}
    </div>
  )
}

function PostItem(props: Article) {
  const { title, author, image, slug } = props

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 50 },
    },
  }

  return (
    <motion.article
      variants={itemVariants}
      className="
        border
        rounded
        shadow
        p-4
      "
      style={{ borderColor: '#800080' }}
    >
      {/* Optional image with fixed max width */}
      {image && (
        <div className="mb-4 w-full h-auto max-w-full overflow-hidden rounded">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${image}`}
            alt={title!}
            width={800} // Ensures the image won't blow up to full screen width
            height={450}
            className="object-cover w-full h-auto"
          />
        </div>
      )}

      {/* Author */}
      <div className="mb-1 text-sm text-black">{author}</div>

      {/* Title */}
      <h2 className="text-xl font-bold mb-2" style={{ color: '#800080' }}>
        <Link href={`/articles/${slug}`}>{title}</Link>
      </h2>

      {/* اقرأ المزيد */}
      <Link href={`/insights/${slug}`} className="text-sm font-medium" style={{ color: '#800080' }}>
        اقرأ المزيد <span className="mr-1">&larr;</span>
      </Link>
    </motion.article>
  )
}
