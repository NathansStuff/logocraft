import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAppSelector } from '@/contexts/storeHooks';
import { selectUser } from '@/contexts/userSlice';
import { UserWithId } from '@/features/user/types/User';

interface Props {
  users: UserWithId[];
}

function Leaderboard({ users }: Props): React.JSX.Element {
  const user = useAppSelector(selectUser);
  const isOnBoard = users.some((u) => u._id.toString() === user._id);

  const getEmojiForRank = (index: number): string => {
    switch (index) {
      case 0:
        return '🥇'; // First place
      case 1:
        return '🥈'; // Second place
      case 2:
        return '🥉'; // Third place
      default:
        return '🔥'; // For the rest
    }
  };

  return (
    <Card className='mx-auto max-w-2xl text-center'>
      <CardHeader>
        <CardTitle>🏆 Leaderboard 🏆</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className='list-none'>
          {users.map((user, index) => (
            <li
              key={index}
              className='py-1'
            >
              {getEmojiForRank(index)} {index + 1}. {user.name}: {user.sparksUsed} clicks
            </li>
          ))}
        </ul>
        <Separator className='mx-auto my-2 w-1/2' />
        {isOnBoard && <p className='py-1'>You are on the leaderboard!</p>}
        {!isOnBoard && (
          <p className='py-1'>
            {user.name}: {user.sparksUsed} clicks ⚡
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default Leaderboard;
