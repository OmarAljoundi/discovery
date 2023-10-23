import { FunctionComponent } from 'react'

interface LoadingDashboardPageProps {}

const LoadingDashboardPage: FunctionComponent<LoadingDashboardPageProps> = () => {
  return (
    <div className="p-8">
      <span className="loader"></span>
    </div>
  )
}

export default LoadingDashboardPage
