import { useQuery } from '@tanstack/react-query';

import { UserWithId } from '@/features/user/types/User';
import { BaseApiClient } from '@/lib/BaseApiClient';

type ResponseType = { users: UserWithId[] };

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useGetSparkActions() {
  const query = useQuery({
    queryKey: ['sparkActions'],
    queryFn: async () => {
      const response = await BaseApiClient.get<ResponseType>('/api/spark-action');
      return response.data;
    },
  });

  return query;
}
