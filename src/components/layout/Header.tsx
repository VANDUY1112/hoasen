import { Menu, Bell, Factory } from 'lucide-react'
import { decorativeImages } from '../../data/mockData'

interface HeaderProps {
  subtitle: string
  onMenuClick: () => void
}

export default function Header({ subtitle, onMenuClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 glass z-30 flex items-center justify-between px-4 lg:px-6 transition-all duration-300 border-b border-outline-variant/50">
      <div className="flex items-center gap-2 lg:gap-3">
        {/* Hamburger for mobile */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-lg transition-colors flex items-center"
        >
          <Menu size={22} />
        </button>
        <Factory size={20} className="text-primary" />
        <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.15em] text-on-surface-variant truncate max-w-[200px] sm:max-w-none font-medium">
          {subtitle}
        </span>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        <div className="flex items-center gap-3 sm:pr-4 sm:border-r border-outline-variant">
          <div className="text-right hidden sm:block">
            <p className="text-[15px] font-semibold text-on-surface leading-none">Admin User</p>
            <p className="text-[11px] font-mono text-on-surface-variant uppercase mt-1 tracking-wider">
              Plant Manager
            </p>
          </div>
          <img
            alt="Profile"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-outline-variant/40 hover:border-primary transition-colors"
            src={decorativeImages.profile}
          />
        </div>
        <button className="relative text-on-surface-variant hover:text-primary transition-colors flex items-center p-1">
          <Bell size={20} />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-primary rounded-full border-2 border-surface-container-lowest" />
        </button>
      </div>
    </header>
  )
}
