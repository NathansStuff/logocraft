import { useMutation, useQueryClient } from '@tanstack/react-query';

import { env } from '@/constants';
import { LogWithId } from '@/features/log/types/Log';
import { postRequest } from '@/lib/fetch';

import { CreateLogRequest } from '../types/CreateLogRequest';

type RequestType = CreateLogRequest;
type ResponseType = LogWithId;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useCreateLog = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await postRequest<ResponseType>(`${env.NEXT_PUBLIC_BASE_URL}/api/log`, json);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logs'] });
    },
    onError: () => {},
  });

  return mutation;
};
