import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

// Define the props for each component for better type safety and clarity
interface NavBarProps {
  onToggleAction: () => void;
  isDarkMode: boolean;
}

interface ThemeSwitchProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

function ThemeSwitch({ isDarkMode, onToggle }: ThemeSwitchProps) {
  return (
    <button
      onClick={onToggle}
      className={`
        relative inline-flex h-10 w-18 items-center rounded-full border-2
        transition-all duration-300 ease-in-out focus:outline-none focus:ring-2
        focus:ring-blue-500 focus:ring-offset-2
        ${isDarkMode ? 'bg-primary border-[var(--bg-primary)]' : 'bg-gray-300 border-[var(--bg-primary)]'}
      `}
      role="switch"
      aria-checked={isDarkMode}
    >
      <span className="sr-only">Toggle theme</span>

      <div className="absolute left-1.5 flex items-center justify-center">
        <LightModeIcon
          className={`
            h-5 w-5 transition-opacity duration-300
            ${isDarkMode ? 'opacity-30 text-gray-400' : 'opacity-100 text-yellow-400'}
          `}
        />
      </div>

      <div className="absolute right-1.5 flex items-center justify-center">
        <DarkModeIcon
          className={`
            h-5 w-5 transition-opacity duration-300
            ${isDarkMode ? 'opacity-100 text-white' : 'opacity-30 text-gray-400'}
          `}
        />
      </div>

      <span
        className={`
          absolute left-1 h-8 w-8 flex items-center justify-center
          rounded-full bg-white shadow-lg transform transition-transform
          duration-300 ease-in-out border border-gray-200
          ${isDarkMode ? 'translate-x-8' : 'translate-x-0'}
        `}
      >
        {isDarkMode ? (
          <DarkModeIcon className="text-blue-600" style={{ fontSize: '24px' }} />
        ) : (
          <LightModeIcon className="text-yellow-500" style={{ fontSize: '24px' }} />
        )}
      </span>
    </button>
  );
}

export default function NavBar({ onToggleAction, isDarkMode }: NavBarProps) {
  return (
    <nav className="bg-[var(--theme-primary)] w-full h-16 flex justify-between items-center px-6 shadow-lg">
      <h1 className="text-2xl font-bold text-white">BreakFlow</h1>
      <div className="flex items-center space-x-4">
        <ThemeSwitch isDarkMode={isDarkMode} onToggle={onToggleAction} />
      </div>
    </nav>
  );
}