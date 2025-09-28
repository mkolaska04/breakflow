import NavBar from './components/NavBar.tsx'
import { useTheme } from './hooks/useTheme'
import './App.css'
import BodyDataForm from './components/BodyDataForm.tsx'
import WaterCounter from './components/WaterCounter.tsx'
import { useState, useEffect } from 'react'

function App() {
  const { isDarkMode, toggleTheme } = useTheme()
  const [bodyData, setBodyData] = useState(null)
  const [optimalIntake, setOptimalIntake] = useState<number | null>(null)
  const handleFormSubmit = (data: any) => {
    setBodyData(data);
    console.log("Received valid data:", data);
  };


  useEffect(() => {
    if (bodyData) {
      const { weight } = bodyData;
    
      const calculatedIntake = weight * 0.033;
      setOptimalIntake(calculatedIntake);
    }
  }, [bodyData]);

  return (
    <>
      <header>
        <NavBar onToggleAction={toggleTheme} isDarkMode={isDarkMode} />
                  <BodyDataForm onFormSubmit={handleFormSubmit} />

      </header>
      <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] p-4">
        <div className="max-w-4xl mx-auto">
          <section>

          </section>
          <section>
            <WaterCounter optimalIntake={optimalIntake === null ? undefined : optimalIntake} />
          </section>
        </div>
      </main>
    </>
  )
}

export default App