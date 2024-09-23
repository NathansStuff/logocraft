import { useQuery } from '@tanstack/react-query';

import { env } from '@/constants';
import { getRequest } from '@/lib/fetch';

import { SparkActionWithUser } from '../types/SparkActionWithUser';

type ResponseType = { actions: SparkActionWithUser[] };

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
