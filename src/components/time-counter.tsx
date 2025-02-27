import { useState, useEffect } from 'react';

const CountdownTimer = ({ seconds }: { seconds: number }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const months = Math.floor(timeLeft / (30 * 24 * 3600));
  const days = Math.floor((timeLeft % (30 * 24 * 3600)) / (24 * 3600));
  const hours = Math.floor((timeLeft % (24 * 3600)) / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const secondsLeft = timeLeft % 60;

  return (
    <div
      style={{
        textAlign: 'center',
        color: 'yellow',
        fontSize: 20,
      }}
    >
      Time Left: {months}M {days}d {hours}h {minutes}m {secondsLeft}s
    </div>
  );
};

export default CountdownTimer;
