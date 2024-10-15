import { useMutation, useQueryClient } from '@tanstack/react-query';

import { SparkActionRequest } from '../types/SparkActionRequest';
import { SparkActionWithId } from '../types/SparkMeter';
import { BaseApiClient } from '@/lib/BaseApiClient';

type RequestType = SparkActionRequest;
type ResponseType = SparkActionWithId;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useCreateSparkAction = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await BaseApiClient.post<ResponseType>(`/api/spark-action`, json);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sparkActions'] });
    },
    onError: () => {},
  });

  return mutation;
};
