import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import { useEffect, useState } from 'react';

export default function WaterCounter({ optimalIntake, changed }: { optimalIntake?: number, changed: boolean }) {
    const [totalCups, setTotalCups] = useState(0);
    const [consumedCups, setConsumedCups] = useState(0);
    const [isGoalMet, setIsGoalMet] = useState(false);

    useEffect(() => {
        if (optimalIntake !== undefined) {
            setTotalCups(Math.ceil(optimalIntake / 0.25));
            setConsumedCups(0); 
        }
    }, [optimalIntake]);

    useEffect(() => {
        if (optimalIntake !== undefined) {
            const consumedLitersActual = consumedCups * 0.25;
            setIsGoalMet(consumedLitersActual >= optimalIntake);
        } else {
            setIsGoalMet(false);
        }
    }, [consumedCups, optimalIntake]); 

    useEffect(() => {
        if (isGoalMet) {
            alert("Congratulations! You've met your water intake goal.");
        }
    }, [isGoalMet]);

    const handleCupClick = (cupIndex: number) => {
        if (cupIndex + 1 <= consumedCups) {
            setConsumedCups(cupIndex); 
        } else {
            setConsumedCups(cupIndex + 1); 
        }
    };

    const consumedLiters = (consumedCups * 0.25).toFixed(2);

    return (
        <div className="p-4 bg-[var(--bg-surface)] rounded-lg shadow-md w-full ">
            <h2 className="text-2xl font-bold mb-4 text-[var(--theme-secondary)]">Water Intake</h2>
            {!changed && <div className="text-red-500">To calculate your water intake, please fill in your body data!</div>}

            {optimalIntake !== undefined && (
                <>
                    <div className="mb-4">
                        <span className="text-lg font-semibold text-[var(--text-primary)]">
                            Water Consumed: {consumedLiters} L / Goal: {optimalIntake.toFixed(2)} L
                        </span>
                    </div>

                    <div className="flex items-center space-x-2 mt-4 md:mt-0 flex-wrap">
                        {Array.from({ length: totalCups }).map((_, i) => {
                            const isConsumed = i < consumedCups;
                            return (
                                <button
                                    key={i}
                                    onClick={() => handleCupClick(i)}
                                    className="focus:outline-none"
                                >
                                    <LocalDrinkIcon
                                        style={{
                                            fontSize: '32px',
                                            color: isConsumed ? 'var(--theme-primary)' : 'var(--text-secondary)',
                                        }}
                                    />
                                </button>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}


// add modal base component with place to add content to give user an info when reaches the goal and to show information about health benefits of drinking or daylife activity