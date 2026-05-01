import { useEffect, useState, useRef } from "react";

export default function Timer({ onClose }) {
  const START_TIME = 3599; // 0:59:59

  const [time, setTime] = useState(START_TIME);
  const [isRunning, setIsRunning] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  const intervalRef = useRef(null);

  // запуск / остановка интервала
  useEffect(() => {
    if (isRunning && !isFinished) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, isFinished]);

  // формат времени
  const formatTime = () => {
    if (isFinished) return "таймер истёк";

    const h = Math.floor(time / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = time % 60;

    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // стоп / старт
  const toggleTimer = () => {
    if (isFinished) return;
    setIsRunning((prev) => !prev);
  };

  // рестарт
  const restart = () => {
    setTime(START_TIME);

    if (isFinished) {
      setIsFinished(false);
      setIsRunning(true);
      return;
    }

    if (isRunning) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  };

  return (
    <div className="timer">
      <button onClick={onClose}>✖</button>
        <h4>Special Deal</h4>
      <h2>{formatTime()}</h2>
        
      <button onClick={toggleTimer} disabled={isFinished}>
        {isRunning ? "Стоп" : "Возобновить"}
      </button>

      <button onClick={restart}>
        Рестарт
      </button>
    </div>
  );
}