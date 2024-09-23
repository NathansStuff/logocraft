import { useQuery } from '@tanstack/react-query';

import { env } from '@/constants';
import { UserWithId } from '@/features/user/types/User';
import { getRequest } from '@/lib/fetch';

type ResponseType = { users: UserWithId[] };

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useGetSparkActions() {
  const query = useQuery({
    queryKey: ['sparkActions'],
    queryFn: async () => {
      const response = await getRequest<ResponseType>(`${env.NEXT_PUBLIC_BASE_URL}/api/spark-action`);
      return response.data;
    },
  });

  return query;
}
