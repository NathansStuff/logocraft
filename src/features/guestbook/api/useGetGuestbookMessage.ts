import { useQuery } from '@tanstack/react-query';

import { BaseApiClient } from '@/lib/BaseApiClient';

import { GuestbookMessageWithUser } from '../types/GuestbookMessageWithUser';

type ResponseType = { messages: GuestbookMessageWithUser[] };

export function useGetGuestbookMessages() {
  const query = useQuery({
    queryKey: ['guestbookMessages'],
    queryFn: async () => {
      const response = await BaseApiClient.get<ResponseType>('/api/guestbook-message');
      return response.data;
    },
  });

  return query;
}
