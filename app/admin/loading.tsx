import { FunctionComponent } from 'react'

interface LoadingPageProps {}

const LoadingPage: FunctionComponent<LoadingPageProps> = () => {
  return (
    <div className="p-8">
      <span className="loader"></span>
    </div>
  )
}

export default LoadingPage
