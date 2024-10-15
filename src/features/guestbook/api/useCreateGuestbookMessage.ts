import { useMutation, useQueryClient } from '@tanstack/react-query';

import { GuestbookMessageWithId } from '../types/GuestbookMessage';
import { GuestbookMessageRequest } from '../types/GuestbookMessageRequest';
import { BaseApiClient } from '@/lib/BaseApiClient';

type RequestType = GuestbookMessageRequest;
type ResponseType = GuestbookMessageWithId;

export const useCreateGuestbookMessage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await BaseApiClient.post<ResponseType>('/api/guestbook-message', json);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guestbookMessages'] });
    },
    onError: () => {},
  });

  return mutation;
};
