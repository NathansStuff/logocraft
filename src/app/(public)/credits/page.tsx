'use client';

import React from 'react';

import PageLayout from '@/components/container/PageLayout';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetSparkActions } from '@/features/sparkAction/api/useGetSparkActions';
import Leaderboard from '@/features/sparkAction/components/Leaderboard';
import SparkButton from '@/features/sparkAction/components/SparkButton';

function CreditPage(): React.JSX.Element {
  const sparkActionsQuery = useGetSparkActions();
  const isLoading = sparkActionsQuery.isLoading;
  const users = sparkActionsQuery.data?.users ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PageLayout>
      <Card className='mx-auto mb-5 max-w-2xl text-center'>
        <CardHeader>
          <CardTitle>🎉 Welcome to the Click Challenge 🎉</CardTitle>
        </CardHeader>
        <SparkButton />
      </Card>

      {/* Leaderboard Section */}
      <Leaderboard users={users} />
    </PageLayout>
  );
}

export default CreditPage;
