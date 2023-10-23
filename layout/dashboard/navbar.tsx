'use client'
import { ThemeToggle } from './theme-toggle'
import { UserNav } from './user-nav'

const Navbar = () => {
  return (
    <div>
      <div className="flex h-12 max-h-12 items-center px-4 border-b">
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </div>
  )
}

export default Navbar
