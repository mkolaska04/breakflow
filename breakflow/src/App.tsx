import NavBar from './components/NavBar.tsx'
import { useTheme } from './hooks/useTheme'
import './App.css'
import BodyDataForm from './components/BodyDataForm.tsx'
import WaterCounter from './components/WaterCounter.tsx'
import { useState, useEffect } from 'react'
import ActivityReminder from './components/ActivityReminder.tsx'
import Footer from './components/Footer.tsx'

function App() {
    const { isDarkMode, toggleTheme } = useTheme();
  type BodyData = {
    height: number;
    weight: number;
    age: number;
    changed: boolean;
  };

  const [bodyData, setBodyData] = useState<BodyData>({
    height: 0,
    weight: 0,
    age: 0,
    changed: false,
  });
  const [optimalIntake, setOptimalIntake] = useState<number | null>(null);
  const [bmi, setBmi] = useState<number | null>(null);

  useEffect(() => {
    if (bodyData && bodyData.height && bodyData.weight && !isNaN(Number(bodyData.height)) && !isNaN(Number(bodyData.weight))) {
      const heightInMeters = Number(bodyData.height) / 100;
      const calculatedBmi = Number(bodyData.weight) / (heightInMeters * heightInMeters);
      setBmi(parseFloat(calculatedBmi.toFixed(2)));
    } else {
      setBmi(null);
    }
  }, [bodyData]);

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
      setBodyData({  height: 0, weight: 0, age: 0, changed: false });
    }
  }, []);

  const handleFormSubmit = (data: { height: string; weight: string; age: string }) => {
    const newData = {
      height: parseFloat(data.height),
      weight: parseFloat(data.weight),
      age: parseInt(data.age, 10),
      changed: true,
    };
    setBodyData(newData);
    localStorage.setItem('bodyData', JSON.stringify(newData));
    console.log("Received valid data and saved to localStorage:", newData);
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
    < div className="min-h-screen ">
      <header>
        <NavBar onToggleAction={toggleTheme} isDarkMode={isDarkMode} />
                  <BodyDataForm onFormSubmit={handleFormSubmit} />

      </header>
      <main className=" bg-[var(--bg-primary)] text-[var(--text-primary)] p-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:space-x-4 space-y-8 md:space-y-0">
          <section className="w-full">
            <ActivityReminder bmi={bmi === null ? undefined : bmi} />
          </section>
          <section className="w-full">
            <WaterCounter optimalIntake={optimalIntake === null ? undefined : optimalIntake} changed={bodyData.changed} />
          </section>
        </div>
      </main>
      <Footer />
      
    </div>
  )
}

export default App