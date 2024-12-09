import React, { useEffect, useState } from 'react';
import './CircularProgressBar.css';

const CircularProgressBar = ({ pdca }) => {
  const [progressValue, setProgressValue] = useState(0);
  let targetValue = 0;
  let displayLetter = '';

  switch (pdca.toLowerCase()) {
    case 'planejar':
      targetValue = 25;
      displayLetter = 'P';
      break;
    case 'fazer':
      targetValue = 50;
      displayLetter = 'D';
      break;
    case 'checar':
      targetValue = 75;
      displayLetter = 'C';
      break;
    case 'agir':
      targetValue = 100;
      displayLetter = 'A';
      break;
    default:
      targetValue = 0;
      displayLetter = '';
  }

  useEffect(() => {
    const speed = 20;
    const progress = setInterval(() => {
      setProgressValue((oldValue) => {
        const newValue = oldValue + 1;
        if (newValue >= targetValue) {
          clearInterval(progress);
          return targetValue;
        }
        return newValue;
      });
    }, speed);
    return () => clearInterval(progress);
  }, [targetValue]);

  return (
    <div className="circular-progress" style={{ background: `conic-gradient(#42B8DE ${progressValue * 3.6}deg, #fafafa 0deg)` }}>
      <span className="progress-value">{displayLetter}</span>
    </div>
  );
};

export default CircularProgressBar;
