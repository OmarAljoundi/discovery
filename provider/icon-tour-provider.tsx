'use client'
import { FunctionComponent, ReactNode } from 'react'
import { IconContext, IconType } from 'react-icons'
import { motion } from 'framer-motion'
interface IconTourProviderProps {
  children: ReactNode
  background?: string
}

const IconTourProvider: FunctionComponent<IconTourProviderProps> = ({ children, background }) => {
  return (
    <div className="p-2 rounded-full  text-primary" style={{ background: background ?? '#4e008a26' }}>
      <IconContext.Provider value={{ size: '15px', className: 'text-primary' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, scale: 0.52 },
            visible: {
              opacity: 1,
              scale: 1.0,
              transition: {
                duration: 1.2,
              },
            },
          }}
        >
          {children}
        </motion.div>
      </IconContext.Provider>
    </div>
  )
}

export default IconTourProvider
