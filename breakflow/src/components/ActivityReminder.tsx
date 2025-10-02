import { useState, useEffect, useRef } from "react"; 

type TimerPhase = 'work' | 'activity';

export default function ActivityReminder({ bmi }: { bmi?: number }) {

  const [sessionDuration, setSessionDuration] = useState(8 * 60); 
  const [workInterval, setWorkInterval] = useState(45); 
  const [activityInterval, setActivityInterval] = useState(15); 

  const [totalTimeLeft, setTotalTimeLeft] = useState(sessionDuration * 60); 
  const [phaseTimeLeft, setPhaseTimeLeft] = useState(workInterval * 60); 
  
  const [currentPhase, setCurrentPhase] = useState<TimerPhase>('work'); 
  const [isSessionActive, setIsSessionActive] = useState(false); 
  const [isPaused, setIsPaused] = useState(false); 

  const sound = useRef<HTMLAudioElement | null>(null);


  useEffect(() => {
    sound.current = new Audio('/sounds/mode_change.wav'); 
    
  }, []); 

  useEffect(() => {
    if (bmi !== undefined) {
      if (bmi < 18.5) {
        setWorkInterval(50);
        setActivityInterval(10);
      } else if (bmi >= 18.5 && bmi < 24.9) {
        setWorkInterval(45);
        setActivityInterval(15);
      } else if (bmi >= 25 && bmi < 29.9) {
        setWorkInterval(40);
        setActivityInterval(20);
      } else {
        setWorkInterval(35);
        setActivityInterval(22); 
      }
    }
  }, [bmi]);

  useEffect(() => {
    if (!isSessionActive || isPaused) {
      return;
    }

    if (totalTimeLeft <= 0) {
      setIsSessionActive(false);
      return;
    }

    const interval = setInterval(() => {
      setPhaseTimeLeft(prev => prev - 1);
      setTotalTimeLeft(prev => prev - 1);
    }, 1000);


    if (phaseTimeLeft <= 0) {
      if (currentPhase === 'work') {
        setCurrentPhase('activity');
        setPhaseTimeLeft(activityInterval * 60);
      } else {
        setCurrentPhase('work');
        setPhaseTimeLeft(workInterval * 60);
      }
    }

    return () => clearInterval(interval);

  }, [isSessionActive, isPaused, phaseTimeLeft, totalTimeLeft, currentPhase, workInterval, activityInterval]);

  useEffect(() => {
    if (isSessionActive && !isPaused) {
      if (currentPhase === 'work' && sound.current) {
        sound.current.play().catch(e => console.error("Error playing work sound:", e));
      } else if (currentPhase === 'activity' && sound.current) {
        sound.current.play().catch(e => console.error("Error playing activity sound:", e));
      }
    }
  }, [currentPhase, isSessionActive, isPaused]); 

  useEffect(() => {
    if (!isSessionActive) {
      setTotalTimeLeft(sessionDuration * 60);
      setPhaseTimeLeft(workInterval * 60);
      setCurrentPhase('work');
    }
  }, [sessionDuration, workInterval, isSessionActive]);

  const handleStartSession = () => {
    setIsSessionActive(true);
    setIsPaused(false);
    if (currentPhase === 'work' && sound.current) {
      sound.current.play().catch(e => console.error("Error playing initial work sound:", e));
    }
  };

  const handlePauseSession = () => {
    setIsPaused(true);
  };
    
  const handleResumeSession = () => {
    setIsPaused(false);
  };

  const handleResetSession = () => {
    setIsSessionActive(false);
    setIsPaused(false);
    setCurrentPhase('work');
    setTotalTimeLeft(sessionDuration * 60);
    setPhaseTimeLeft(workInterval * 60);
  };

  const formatTime = (seconds: number) => {
    if (seconds < 0) seconds = 0;
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    
    if (h > 0) {
      return `${h.toString()}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };
  
  const isSessionFinished = totalTimeLeft <= 0 && !isSessionActive;

  return (
    <div className="p-6 bg-[var(--bg-surface)] rounded-lg shadow-xl flex flex-col w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-[var(--theme-secondary)] ">Activity Reminder</h2>
      <p className=" text-[var(--text-secondary)]">Optimal values for your BMI ({bmi?.toFixed(1)}) :</p> 

      {!isSessionActive && (
        <div className="w-full rounded-lg my-4">
          <h3 className="text-lg font-semibold mb-3 ">Settings</h3>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium">Session (hours)</label>
              <input type="number" value={sessionDuration / 60} onChange={e => setSessionDuration(Number(e.target.value) * 60)} className="mt-1 block w-full px-3 py-2 bg-[var(--bg-primary)] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-[var(--text-primary)]" />
            </div>
             <div>
              <label className="block text-sm font-medium">Work (minutes)</label>
              <input type="number" value={workInterval} onChange={e => setWorkInterval(Number(e.target.value))} className="mt-1 block w-full px-3 py-2 bg-[var(--bg-primary)] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-[var(--text-primary)]" />
            </div>
             <div>
              <label className="block text-sm font-medium">Activity (minutes)</label>
              <input type="number" value={activityInterval} onChange={e => setActivityInterval(Number(e.target.value))} className="mt-1 block w-full px-3 py-2 bg-[var(--bg-primary)] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-[var(--text-primary)]" />
            </div>
          </div>
        </div>
      )}

      <div className="text-center my-4">
        {isSessionFinished ? (
            <h3 className="text-3xl font-bold text-green-500">Session Complete!</h3>
        ) : currentPhase === 'work' ? (
          <>
            <h3 className="text-3xl font-bold text-[var(--theme-primary)]">Time to Focus!</h3>
            <p className="text-7xl font-mono font-bold text-theme-primary my-2">
              {formatTime(phaseTimeLeft)}
            </p>
          </>
        ) : (
          <>
            <h3 className="text-3xl font-bold text-green-500">Time to Stand up!</h3>
            <p className="text-7xl font-mono font-bold text-theme-primary my-2">
              {formatTime(phaseTimeLeft)}
            </p>
          </>
        )}
         <p className="text-sm text-[var(--text-secondary)] mt-2">
           Total time left: {formatTime(totalTimeLeft)}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {!isSessionActive ? (
          <button onClick={handleStartSession} className="px-8 py-3 rounded-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white transition-colors text-lg">
            Start Session
          </button>
        ) : isPaused ? (
          <button onClick={handleResumeSession} className="px-8 py-3 rounded-lg font-semibold bg-green-500 hover:bg-green-600 text-white transition-colors text-lg">
            Resume
          </button>
        ) : (
          <button onClick={handlePauseSession} className="px-8 py-3 rounded-lg font-semibold bg-yellow-500 hover:bg-yellow-600 text-white transition-colors text-lg">
            Pause
          </button>
        )}
        <button onClick={handleResetSession} className="px-8 py-3 rounded-lg font-semibold bg-[var(--theme-error)] hover:bg-red-600 text-white transition-colors text-lg">
          Reset Session
        </button>
      </div>
    </div>
  );
}