'use client';

import { useState, useEffect } from 'react';

interface BreathingTechnique {
  name: string;
  description: string;
  inhale: number;
  hold: number;
  exhale: number;
  cycles: number;
}

interface BreathingPhase {
  type: 'inhale' | 'hold' | 'exhale';
  duration: number;
  label: string;
}

const breathingTechniques: Record<string, BreathingTechnique> = {
  box: {
    name: 'Box Breathing',
    description: 'Equal counts: inhale, hold, exhale, hold (4-4-4-4)',
    inhale: 4,
    hold: 4,
    exhale: 4,
    cycles: 5,
  },
  deep: {
    name: 'Deep Breathing',
    description: 'Slow and deep breathing (4-0-6)',
    inhale: 4,
    hold: 0,
    exhale: 6,
    cycles: 5,
  },
  478: {
    name: '4-7-8 Breathing',
    description: 'Calming technique (4-7-8)',
    inhale: 4,
    hold: 7,
    exhale: 8,
    cycles: 4,
  },
  alternate: {
    name: 'Alternate Nostril',
    description: 'Balancing technique (4-4-4)',
    inhale: 4,
    hold: 4,
    exhale: 4,
    cycles: 5,
  },
};

export default function BreathingExercise() {
  const [selectedTechnique, setSelectedTechnique] = useState<string>('box');
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [scaleValue, setScaleValue] = useState(1);

  const technique = breathingTechniques[selectedTechnique];

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (isActive && timeRemaining === 0) {
      // Move to next phase
      handlePhaseChange();
    }

    return () => clearInterval(interval);
  }, [isActive, timeRemaining]);

  useEffect(() => {
    // Update scale based on phase
    if (currentPhase === 'inhale') {
      setScaleValue(1.5);
    } else if (currentPhase === 'hold') {
      setScaleValue(1.5);
    } else if (currentPhase === 'exhale') {
      setScaleValue(1);
    }
  }, [currentPhase]);

  const handlePhaseChange = () => {
    if (currentPhase === 'inhale') {
      setCurrentPhase('hold');
      setTimeRemaining(technique.hold > 0 ? technique.hold : 1);
    } else if (currentPhase === 'hold') {
      setCurrentPhase('exhale');
      setTimeRemaining(technique.exhale);
    } else if (currentPhase === 'exhale') {
      if (cycleCount < technique.cycles - 1) {
        setCycleCount((prev) => prev + 1);
        setCurrentPhase('inhale');
        setTimeRemaining(technique.inhale);
      } else {
        // Exercise complete
        setIsActive(false);
        setSessionsCompleted((prev) => prev + 1);
        resetExercise();
      }
    }
  };

  const startExercise = () => {
    setIsActive(true);
    setCycleCount(0);
    setCurrentPhase('inhale');
    setTimeRemaining(technique.inhale);
    setScaleValue(1);
  };

  const pauseExercise = () => {
    setIsActive(false);
  };

  const resumeExercise = () => {
    setIsActive(true);
  };

  const resetExercise = () => {
    setIsActive(false);
    setCycleCount(0);
    setCurrentPhase('inhale');
    setTimeRemaining(0);
    setScaleValue(1);
  };

  const changeTechnique = (technique: string) => {
    resetExercise();
    setSelectedTechnique(technique);
  };

  const phaseColors: Record<string, string> = {
    inhale: 'from-blue-400 to-blue-600',
    hold: 'from-purple-400 to-purple-600',
    exhale: 'from-green-400 to-green-600',
  };

  const phaseLabels: Record<string, string> = {
    inhale: 'Breathe In',
    hold: 'Hold',
    exhale: 'Breathe Out',
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Technique Selection */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Guided Breathing Exercises</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(breathingTechniques).map(([key, tech]) => (
            <button
              key={key}
              onClick={() => changeTechnique(key)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedTechnique === key
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 bg-white hover:border-indigo-400'
              }`}
            >
              <h3 className="font-semibold text-gray-900">{tech.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{tech.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Breathing Circle */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-12 flex flex-col items-center justify-center min-h-96">
        <div className="relative w-64 h-64 flex items-center justify-center mb-8">
          {/* Animated Circle */}
          <div
            className={`absolute w-64 h-64 rounded-full bg-gradient-to-br ${phaseColors[currentPhase]} opacity-20 transition-transform duration-1000 ease-in-out`}
            style={{
              transform: `scale(${scaleValue})`,
            }}
          />

          {/* Inner Circle */}
          <div
            className={`absolute w-48 h-48 rounded-full bg-gradient-to-br ${phaseColors[currentPhase]} opacity-40 transition-transform duration-1000 ease-in-out`}
            style={{
              transform: `scale(${Math.max(scaleValue - 0.3, 0.7)})`,
            }}
          />

          {/* Center Content */}
          <div className="relative z-10 text-center">
            <div className="text-5xl font-bold text-indigo-600 mb-2">{timeRemaining}</div>
            <div className="text-xl font-semibold text-gray-700">{phaseLabels[currentPhase]}</div>
            {isActive && (
              <div className="text-sm text-gray-600 mt-2">
                Cycle {cycleCount + 1} of {technique.cycles}
              </div>
            )}
          </div>
        </div>

        {/* Current Phase Info */}
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 mb-4">
            {isActive
              ? `${phaseLabels[currentPhase]} - ${timeRemaining} seconds`
              : 'Ready to start? Press Begin'}
          </p>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-4 justify-center">
          {!isActive && cycleCount === 0 && (
            <button
              onClick={startExercise}
              className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-colors"
            >
              Begin Exercise
            </button>
          )}
          {isActive && (
            <button
              onClick={pauseExercise}
              className="px-8 py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
            >
              Pause
            </button>
          )}
          {!isActive && cycleCount > 0 && (
            <>
              <button
                onClick={resumeExercise}
                className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-colors"
              >
                Resume
              </button>
              <button
                onClick={resetExercise}
                className="px-8 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500 transition-colors"
              >
                Reset
              </button>
            </>
          )}
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h4 className="text-gray-600 font-semibold mb-2">Sessions Completed</h4>
          <p className="text-3xl font-bold text-indigo-600">{sessionsCompleted}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h4 className="text-gray-600 font-semibold mb-2">Current Technique</h4>
          <p className="text-xl font-bold text-gray-800">{technique.name}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h4 className="text-gray-600 font-semibold mb-2">Exercise Duration</h4>
          <p className="text-xl font-bold text-gray-800">
            {technique.inhale + technique.hold + technique.exhale} × {technique.cycles}s
          </p>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Tips for Best Results</h3>
        <ul className="text-blue-800 space-y-2">
          <li>✓ Find a quiet, comfortable place to sit or lie down</li>
          <li>✓ Practice daily for maximum benefits</li>
          <li>✓ Use box breathing for quick stress relief</li>
          <li>✓ Use 4-7-8 breathing before sleep</li>
          <li>✓ Follow the visual circle - don't rush</li>
        </ul>
      </div>
    </div>
  );
}
