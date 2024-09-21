import { useMutation, useQueryClient } from '@tanstack/react-query';

import { NEXT_PUBLIC_BASE_URL } from '@/constants';
import { Log, LogWithId } from '@/features/log/types/Log';
import { postRequest } from '@/lib/fetch';

type RequestType = Log;
type ResponseType = LogWithId;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
