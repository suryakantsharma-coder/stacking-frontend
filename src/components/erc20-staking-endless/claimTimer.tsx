import { useState, useEffect } from 'react';

const ClaimTimer = ({
  finalTimestamp,
  updateFn,
}: {
  finalTimestamp: number; // should be in milliseconds, like Date.now()
  updateFn: () => void;
}) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  useEffect(() => {
    const updateTimeLeft = () => {
      const currentTime = Date.now();
      const timeLeftMs = Math.max(finalTimestamp - currentTime, 0);
      setSecondsLeft(Math.floor(timeLeftMs / 1000));
    };

    updateTimeLeft(); // Initialize immediately

    const timer = setInterval(() => {
      updateTimeLeft();

      if (Date.now() >= finalTimestamp) {
        clearInterval(timer);
        updateFn();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [finalTimestamp, updateFn]);

  const formatTime = (totalSeconds: number) => {
    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${days}D ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div>
      {secondsLeft > 0 ? (
        <p>Next Claim: ({formatTime(secondsLeft)})</p>
      ) : (
        <p>Claiming Period Ended</p>
      )}
    </div>
  );
};

export default ClaimTimer;
