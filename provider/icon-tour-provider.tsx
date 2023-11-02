'use client'
import { FunctionComponent, ReactNode } from 'react'
import { IconContext, IconType } from 'react-icons'
interface IconTourProviderProps {
  children: ReactNode
}

const IconTourProvider: FunctionComponent<IconTourProviderProps> = ({ children }) => {
  return (
    <div className="p-2 rounded-full  text-primary" style={{ background: '#4e008a26' }}>
      <IconContext.Provider value={{ size: '15px', className: 'text-primary' }}>
        <div>{children}</div>
      </IconContext.Provider>
    </div>
  )
}

export default IconTourProvider
