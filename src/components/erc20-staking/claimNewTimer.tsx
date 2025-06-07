// // import { useState, useEffect } from 'react';

// // const WithdrawalTimer = ({ finalTimestamp }: { finalTimestamp: number }) => {
// //   const [secondsLeft, setSecondsLeft] = useState(0);
// //   const [isRunning, setIsRunning] = useState(true);

// //   useEffect(() => {
// //     if (Date.now() >= finalTimestamp) {
// //       setIsRunning(false);
// //       return;
// //     }

// //     // Calculate remaining seconds to the next 1-minute mark
// //     const updateRemainingTime = () => {
// //       const currentTime = Date.now();
// //       const timeLeft = Math.max(finalTimestamp - currentTime, 0);
// //       setSecondsLeft(timeLeft % 60000 === 0 ? 60 : Math.floor((timeLeft % 60000) / 1000));
// //     };

// //     updateRemainingTime(); // Run immediately

// //     const timer = setInterval(() => {
// //       setSecondsLeft((prev) => {
// //         if (prev === 1) {
// //           handleClaimReward();
// //           updateRemainingTime(); // Recalculate remaining time accurately
// //           return 60;
// //         }
// //         return prev - 1;
// //       });
// //     }, 1000);

// //     return () => clearInterval(timer);
// //   }, [finalTimestamp]);

// //   const handleClaimReward = () => {
// //     console.log('Claim reward executed at:', new Date().toLocaleTimeString());
// //     if (Date.now() >= finalTimestamp) {
// //       setIsRunning(false);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h3>{isRunning ? `Next Claim In: ${secondsLeft}s` : 'Claiming Period Ended'}</h3>
// //     </div>
// //   );
// // };

// // export default WithdrawalTimer;

// import { useState, useEffect } from 'react';

// const WithdrawalTimer = ({ finalTimestamp }: { finalTimestamp: number }) => {
//   const [secondsLeft, setSecondsLeft] = useState(0);
//   const [isRunning, setIsRunning] = useState(true);

//   useEffect(() => {
//     const updateRemainingTime = () => {
//       const currentTime = Date.now();
//       const timeLeft = Math.max(finalTimestamp - currentTime, 0);

//       if (timeLeft === 0) {
//         setIsRunning(false); // Stop when time is up
//         return;
//       }

//       // minutes calculations
//       const timeBreakDowns = 2 * 60;

//       // Calculate remaining seconds to the next 1-minute mark
//       setSecondsLeft(Math.floor((timeLeft % 60000) / 1000) || timeBreakDowns);
//     };

//     updateRemainingTime(); // Run immediately

//     const timer = setInterval(() => {
//       setSecondsLeft((prev) => {
//         if (prev === 1) {
//           handleClaimReward();
//           updateRemainingTime();
//           return 60;
//         }
//         return Math.max(prev - 1, 0); // Prevent negative countdown
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [finalTimestamp]);

//   const handleClaimReward = () => {
//     console.log('Claim reward executed at:', new Date().toLocaleTimeString());
//     if (Date.now() >= finalTimestamp) {
//       setIsRunning(false);
//     }
//   };

//   return (
//     <div>
//       <h3>{isRunning ? `Next Claim In: ${secondsLeft}s` : 'Claiming Period Ended'}</h3>
//     </div>
//   );
// };

// export default WithdrawalTimer;

import { useState, useEffect } from 'react';

const WithdrawalTimer = ({
  finalTimestamp,
  updateFn,
}: {
  finalTimestamp: number;
  updateFn: () => void;
}) => {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const checkTimeCompletion = () => {
      const currentTime = Date.now();
      if (currentTime >= finalTimestamp) {
        setIsCompleted(true);
        // updateFn();
        return;
      }
      setIsCompleted(false);
      updateRemainingTime();
    };

    const updateRemainingTime = () => {
      const currentTime = Date.now();
      const timeLeft = Math.max(finalTimestamp - currentTime, 0);

      if (timeLeft === 0) {
        // updateFn();
        setIsCompleted(true);
        return;
      }

      // 2-minute breakdown (if needed)
      const timeBreakDowns = 1 * 60;
      // const timeBreakDowns = 1 * 60 * 60;

      // Calculate remaining seconds to the next 1-minute mark
      // setSecondsLeft(Math.floor(((timeLeft % 60) * 60 * 1000) / 1000) || timeBreakDowns);  // for 1 hour
      setSecondsLeft(Math.floor(((timeLeft % 60) * 1000) / 1000) || timeBreakDowns); // for 1 minute
    };

    checkTimeCompletion(); // Check on mount

    const timer = setInterval(() => {
      if (Date.now() >= finalTimestamp) {
        setIsCompleted(true);
        // updateFn();
        clearInterval(timer);
        return;
      }

      setSecondsLeft((prev) => {
        if (prev === 1) {
          handleClaimReward();
          updateRemainingTime();
          return 60;
        }

        return Math.max(prev - 1, 0); // Prevent negative countdown
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [finalTimestamp]);

  const handleClaimReward = () => {
    updateFn();
    console.log('Claim reward executed at:', new Date().toLocaleTimeString());
  };

  return (
    <div>
      {/* <h3>{isCompleted ? '' : `Next Claim In: ${secondsLeft}s`}</h3> */}
      {isCompleted ? (
        <p></p>
      ) : (
        <p>
          {' '}
          Next Claim: ( {Math.floor(secondsLeft / (24 * 60 * 60))}D{' '}
          {Math.floor((secondsLeft % (24 * 60 * 60)) / 3600)}h{' '}
          {Math.floor((secondsLeft % 3600) / 60)}m {secondsLeft % 60}s )
        </p>
      )}
    </div>
  );
};

export default WithdrawalTimer;
