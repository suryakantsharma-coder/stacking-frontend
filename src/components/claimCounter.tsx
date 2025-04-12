// import { useState, useEffect } from 'react';

// const ClaimCounter = ({ updateFn }: { updateFn: () => void }) => {
//   // const monthInSeconds = 30 * 24 * 60 * 60;

//   // set for one hours
//   // const monthInSeconds = 1 * 60 * 60;

//   const monthInSeconds = 1 * 60;

//   const getStoredTime = () => {
//     const storedTime = localStorage.getItem('monthCountdown');
//     return storedTime ? parseInt(storedTime, 10) : monthInSeconds;
//   };

//   const [seconds, setSeconds] = useState(getStoredTime);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setSeconds((prev) => {
//         const newTime = prev > 0 ? prev - 1 : monthInSeconds;
//         if (prev == 0) {
//           updateFn();
//         }
//         localStorage.setItem('monthCountdown', `${newTime}`);
//         return newTime;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div>
//       <p
//         style={{
//           textAlign: 'center',
//           fontSize: 16,
//         }}
//       >
//         Next Claim: ( {Math.floor(seconds / (24 * 60 * 60))}D{' '}
//         {Math.floor((seconds % (24 * 60 * 60)) / 3600)}h {Math.floor((seconds % 3600) / 60)}m{' '}
//         {seconds % 60}s )
//       </p>
//     </div>
//   );
// };

// export default ClaimCounter;

import { useState, useEffect } from 'react';

const ClaimCounter = ({ updateFn }: { updateFn: () => void }) => {
  const monthInSeconds = 1 * 60; // 1 minute countdown for testing

  const getStoredTime = () => {
    const storedTime = localStorage.getItem('monthCountdown');
    return storedTime ? parseInt(storedTime, 10) : monthInSeconds;
  };

  const getRestartCount = () => {
    const storedCount = localStorage.getItem('restartCount');
    return storedCount ? parseInt(storedCount, 10) : 0;
  };

  const [seconds, setSeconds] = useState(getStoredTime);
  const [restartCount, setRestartCount] = useState(getRestartCount);

  useEffect(() => {
    if (restartCount >= 9) return; // Stop the countdown after 9 resets

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev > 0) {
          localStorage.setItem('monthCountdown', `${prev - 1}`);
          return prev - 1;
        } else {
          updateFn();
          const newCount = restartCount + 1;
          setRestartCount(newCount);
          localStorage.setItem('restartCount', `${newCount}`);
          localStorage.setItem('monthCountdown', `${monthInSeconds}`);
          return monthInSeconds;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [restartCount]);

  return (
    <div>
      <p
        style={{
          textAlign: 'center',
          fontSize: 16,
        }}
      >
        Next Claim: ( {Math.floor(seconds / (24 * 60 * 60))}D{' '}
        {Math.floor((seconds % (24 * 60 * 60)) / 3600)}h {Math.floor((seconds % 3600) / 60)}m{' '}
        {seconds % 60}s )
      </p>
      {/* <p style={{ textAlign: 'center', fontSize: 14 }}>Restart Count: {restartCount}/9</p> */}
    </div>
  );
};

export default ClaimCounter;

// import { useState, useEffect } from 'react';

// const ClaimCounter = ({ updateFn }: { updateFn: () => void }) => {
//   const monthInSeconds = 1 * 60; // 1 minute countdown for testing
//   // const monthInSeconds = 1 * 60 * 60;

//   const getStoredTime = () => {
//     const storedTime = localStorage.getItem('monthCountdown');
//     return storedTime ? parseInt(storedTime, 10) : monthInSeconds;
//   };

//   const getRestartCount = () => {
//     const storedCount = localStorage.getItem('restartCount');
//     return storedCount ? parseInt(storedCount, 10) : 1;
//   };

//   const [seconds, setSeconds] = useState(getStoredTime);
//   const [restartCount, setRestartCount] = useState(getRestartCount);

//   useEffect(() => {
//     if (restartCount >= 9) return; // Stop the countdown after 9 resets

//     const interval = setInterval(() => {
//       setSeconds((prev) => {
//         if (prev > 0) {
//           localStorage.setItem('monthCountdown', `${prev - 1}`);
//           return prev - 1;
//         } else {
//           if (restartCount < 9) {
//             updateFn();
//             const newCount = restartCount + 1;
//             setRestartCount(newCount);
//             localStorage.setItem('restartCount', `${newCount}`);
//             localStorage.setItem('monthCountdown', `${monthInSeconds}`);
//             return monthInSeconds;
//           }
//           return 0;
//         }
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [restartCount]);

//   if (restartCount >= 9) return null; // Hide the component when countdown finishes

//   return (
//     <div>
//       <p
//         style={{
//           textAlign: 'center',
//           fontSize: 16,
//         }}
//       >
//         Next Claim: ( {Math.floor(seconds / (24 * 60 * 60))}D{' '}
//         {Math.floor((seconds % (24 * 60 * 60)) / 3600)}h {Math.floor((seconds % 3600) / 60)}m{' '}
//         {seconds % 60}s )
//       </p>
//       {/* <p style={{ textAlign: 'center', fontSize: 14 }}>Restart Count: {restartCount}/9</p> */}
//     </div>
//   );
// };

// export default ClaimCounter;
