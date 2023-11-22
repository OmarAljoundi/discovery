import { FunctionComponent, ReactNode } from 'react'

interface BreadcrumbsProps {
  children: ReactNode[]
}

const Breadcrumbs: FunctionComponent<BreadcrumbsProps> = ({ children }) => {
  return (
    <div
      className="flex items-center whitespace-nowrap min-w-0 bg-secondary gap-1 md:gap-2 w-fit py-1 px-2 md:px-3 rounded-medium"
      aria-label="Breadcrumb"
    >
      {children.map((item, index) => (
        <div key={`bc-${index}`} className="flex items-center gap-x-2">
          {item}
          {index != children.length - 1 && (
            <svg
              className="flex-shrink-0  overflow-visible h-2.5 w-2.5 text-gray-400 dark:text-gray-600 rotate-180"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  )
}

export default Breadcrumbs
