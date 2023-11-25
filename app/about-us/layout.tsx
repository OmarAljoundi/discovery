import { FunctionComponent, ReactNode } from 'react'

interface AboutUsLayoutProps {
  children: ReactNode
}

const AboutUsLayout: FunctionComponent<AboutUsLayoutProps> = ({ children }) => {
  return <div className="mt-10">{children}</div>
}

export default AboutUsLayout
