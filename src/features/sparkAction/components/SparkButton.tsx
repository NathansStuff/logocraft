'use client';

import React, { useState } from 'react';
import Confetti from 'react-confetti';

import { Button } from '@/components/ui/button';
import { CardContent, CardDescription } from '@/components/ui/card';
import { useAppDispatch, useAppSelector } from '@/contexts/storeHooks';
import { selectUser, setSparkCredit } from '@/contexts/userSlice';

import { useCreateSparkAction } from '../api/useCreateSparkAction';

function SparkButton(): React.JSX.Element {
  const user = useAppSelector(selectUser);
  const mutation = useCreateSparkAction();
  const dispatch = useAppDispatch();

  const credits = user?.credits?.sparks ?? 0; // Handle undefined or missing credits
  const [showConfetti, setShowConfetti] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(!user.isAuthenticated); // State to track button disabled status

  // Function to play audio
  const playSound = (): void => {
    const audio = new Audio('/confetti.mp3');
    audio.play();
  };

  const handleButtonClick = (): void => {
    if (credits > 0) {
      setShowConfetti(true);
      playSound();

      mutation.mutate(
        { userId: user._id, sparksUsed: 1 },
        {
          onSuccess: () => {
            dispatch(setSparkCredit(-1)); // Deduct one spark credit
          },
        }
      );

      // Disable button for 2 seconds
      setIsButtonDisabled(true);
      setTimeout(() => setIsButtonDisabled(false), 2000);

      // Stop confetti after 2 seconds
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  return (
    <>
      <CardDescription>
        <p>
          You have {credits} credits left. <br />
          🎯 Every click costs one credit! 💸
        </p>
        {!user.isAuthenticated && (
          <span>
            <br />
            ⚠️ Please log in to use the Button!
          </span>
        )}
        {user.isAuthenticated && credits <= 0 && (
          <span>
            <br />
            😢 You have no more credits left. Please purchase more to continue using the Spark Button!
          </span>
        )}
      </CardDescription>
      <CardContent>
        <Button
          className='mt-4 px-6 py-4 text-lg'
          onClick={handleButtonClick}
          disabled={isButtonDisabled || credits <= 0} // Disable if button is already disabled or if no credits
        >
          Click Me! 🚀
        </Button>
        {showConfetti && (
          <Confetti
            numberOfPieces={500}
            recycle={false}
            gravity={0.4}
            wind={0.01}
            run={showConfetti}
            width={window.innerWidth}
            height={window.innerHeight}
          />
        )}
      </CardContent>
    </>
  );
}

export default SparkButton;
