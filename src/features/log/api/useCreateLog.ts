import { useMutation, useQueryClient } from '@tanstack/react-query';

import { NEXT_PUBLIC_BASE_URL } from '@/constants/constants';
import { postRequest } from '@/lib/fetch';

import { Log, LogWithId } from '../types/Log';

type RequestType = Log;
type ResponseType = LogWithId;

export const useCreateLog = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await postRequest<ResponseType>(`${NEXT_PUBLIC_BASE_URL}/api/log`, json);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logs'] });
    },
    onError: () => {},
  });

  return mutation;
};
