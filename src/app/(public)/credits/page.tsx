'use client';

import React, { useState } from 'react';
import Confetti from 'react-confetti';

import PageLayout from '@/components/container/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppSelector } from '@/contexts/storeHooks';
import { selectUser } from '@/contexts/userSlice';

type LeaderboardEntry = {
  name: string;
  clicks: number;
};

function CreditPage(): React.JSX.Element {
  const user = useAppSelector(selectUser);
  const [credits, setCredits] = useState(10); // Assuming user starts with 10 credits
  const [clicks, setClicks] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // State to track button disabled status

  // Mock leaderboard data
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([
    { name: 'User 1', clicks: 12 },
    { name: 'User 2', clicks: 8 },
    { name: 'User 3', clicks: 5 },
  ]);

  // Function to play audio
  const playSound = (): void => {
    const audio = new Audio('/confetti.mp3');
    audio.play();
  };

  const handleButtonClick = (): void => {
    if (credits > 0) {
      setClicks(clicks + 1);
      setCredits(credits - 1);
      setShowConfetti(true);
      playSound();

      // Disable button for 2 seconds
      setIsButtonDisabled(true);
      setTimeout(() => setIsButtonDisabled(false), 2000);

      // Stop confetti after 5 seconds
      setTimeout(() => setShowConfetti(false), 2000);

      // Update leaderboard
      const updatedLeaderboard = leaderboard.map((entry) =>
        entry.name === user.name ? { ...entry, clicks: clicks + 1 } : entry
      );

      // If user not on leaderboard, add them
      if (!updatedLeaderboard.find((entry) => entry.name === user.name)) {
        updatedLeaderboard.push({ name: user.name || 'anonymous', clicks: clicks + 1 });
      }

      // Sort leaderboard by clicks
      updatedLeaderboard.sort((a, b) => b.clicks - a.clicks);

      setLeaderboard(updatedLeaderboard);
    } else {
      alert('Not enough credits!');
    }
  };

  return (
    <PageLayout>
      <Card className='mx-auto mb-5 max-w-2xl text-center'>
        <CardHeader>
          <CardTitle>🎉 Welcome to the Click Challenge 🎉</CardTitle>
          <CardDescription>
            You have {credits} credits left. <br />
            🎯 Every click costs one credit! 💸
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            className='px-6 py-4 text-lg'
            onClick={handleButtonClick}
            disabled={isButtonDisabled}
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
      </Card>

      {/* Leaderboard Section */}
      <Card className='mx-auto max-w-2xl text-center'>
        <CardHeader>
          <CardTitle>🏆 Leaderboard 🏆</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='list-none'>
            {leaderboard.map((entry, index) => (
              <li
                key={index}
                className='py-1'
              >
                {index + 1}. {entry.name}: {entry.clicks} clicks 🔥
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </PageLayout>
  );
}

export default CreditPage;
