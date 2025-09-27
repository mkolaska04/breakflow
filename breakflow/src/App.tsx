import NavBar from './components/NavBar.tsx'
import { useTheme } from './hooks/useTheme'
import './App.css'

function App() {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <>
      <header>
        <NavBar onToggleAction={toggleTheme} isDarkMode={isDarkMode} />
      </header>
      <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] p-4">
        <div className="max-w-4xl mx-auto">
          
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[var(--bg-surface)] p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2 text-[var(--theme-primary)]">Primary Theme</h3>
              <p className="text-[var(--text-muted)]">This card demonstrates the primary theme colors.</p>
            </div>
            
            <div className="bg-[var(--bg-surface)] p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2 text-[var(--theme-secondary)]">Secondary Theme</h3>
              <p className="text-[var(--text-muted)]">This card uses the secondary theme colors.</p>
            </div>
            
            <div className="bg-[var(--bg-surface)] p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2 text-[var(--theme-success)]">Success Theme</h3>
              <p className="text-[var(--text-muted)]">This card showcases the success theme colors.</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
