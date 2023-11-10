import { FunctionComponent, ReactNode } from 'react'

interface LayoutVisaProps {
  children: ReactNode
}

const LayoutVisa: FunctionComponent<LayoutVisaProps> = ({ children }) => {
  return <div className="mt-10">{children}</div>
}

export default LayoutVisa
