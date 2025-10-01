import NavBar from './components/NavBar.tsx'
import { useTheme } from './hooks/useTheme'
import './App.css'
import BodyDataForm from './components/BodyDataForm.tsx'
import WaterCounter from './components/WaterCounter.tsx'
import { useState, useEffect } from 'react'
import ActivityReminder from './components/ActivityReminder.tsx'

function App() {
    const { isDarkMode, toggleTheme } = useTheme();
  const [bodyData, setBodyData] = useState({});
  const [optimalIntake, setOptimalIntake] = useState<number | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('bodyData'); 
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setBodyData({ ...parsedData, changed: true });
      } catch (error) {
        console.error("Failed to parse bodyData from localStorage", error);
      }
    } else {
      setBodyData({ gender: '', height: 0, weight: 0, age: 0, changed: false });
    }
  }, []);

  const handleFormSubmit = (data: any) => {
    const newData = { ...data, changed: true };
    setBodyData(newData);
    localStorage.setItem('bodyData', JSON.stringify(data)); 
    console.log("Received valid data and saved to localStorage:", data);
  };

  useEffect(() => {
    if (bodyData && bodyData.weight && !isNaN(Number(bodyData.weight))) {
      const { weight } = bodyData;
      const calculatedIntake = Number(weight) * 0.033;
      setOptimalIntake(calculatedIntake);
    } else {
      setOptimalIntake(null);
    }
  }, [bodyData]);
  return (
    <>
      <header>
        <NavBar onToggleAction={toggleTheme} isDarkMode={isDarkMode} />
                  <BodyDataForm onFormSubmit={handleFormSubmit} />

      </header>
      <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] p-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:space-x-4 space-y-8 md:space-y-0">
          <section className="w-full">
            <ActivityReminder />
          </section>
          <section className="w-full">
            <WaterCounter optimalIntake={optimalIntake === null ? undefined : optimalIntake} changed={bodyData.changed} />
          </section>
        </div>
      </main>
      
    </>
  )
}

export default App