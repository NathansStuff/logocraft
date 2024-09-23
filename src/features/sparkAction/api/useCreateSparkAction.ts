import { useMutation, useQueryClient } from '@tanstack/react-query';

import { env } from '@/constants';
import { postRequest } from '@/lib/fetch';

import { SparkActionRequest } from '../types/SparkActionRequest';
import { SparkActionWithId } from '../types/SparkMeter';

type RequestType = SparkActionRequest;
type ResponseType = SparkActionWithId;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useCreateSparkAction = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await postRequest<ResponseType>(`${env.NEXT_PUBLIC_BASE_URL}/api/spark-action`, json);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sparkActions'] });
    },
    onError: () => {},
  });

  return mutation;
};
