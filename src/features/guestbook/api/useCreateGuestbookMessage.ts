import { useMutation, useQueryClient } from '@tanstack/react-query';

import { NEXT_PUBLIC_BASE_URL } from '@/constants';
import { postRequest } from '@/lib/fetch';

import { GuestbookMessageWithId } from '../types/GuestbookMessage';
import { GuestbookMessageRequest } from '../types/GuestbookMessageRequest';

type RequestType = GuestbookMessageRequest;
type ResponseType = GuestbookMessageWithId;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useCreateGuestbookMessage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await postRequest<ResponseType>(`${NEXT_PUBLIC_BASE_URL}/api/guestbook-message`, json);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guestbookMessages'] });
    },
    onError: () => {},
  });

  return mutation;
};
