import { useQuery } from '@tanstack/react-query';

import { GuestbookMessageWithUser } from '../types/GuestbookMessageWithUser';
import { BaseApiClient } from '@/lib/BaseApiClient';

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
