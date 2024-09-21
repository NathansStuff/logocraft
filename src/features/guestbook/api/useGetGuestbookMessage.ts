import { useQuery } from '@tanstack/react-query';

import { NEXT_PUBLIC_BASE_URL } from '@/constants';
import { getRequest } from '@/lib/fetch';

import { GuestbookMessageWithUser } from '../types/GuestbookMessageWithUser';

type ResponseType = { messages: GuestbookMessageWithUser[] };

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useGetGuestbookMessages() {
  const query = useQuery({
    queryKey: ['guestbookMessages'],
    queryFn: async () => {
      const response = await getRequest<ResponseType>(`${NEXT_PUBLIC_BASE_URL}/api/guestbook-message`);
      return response.data;
    },
  });

  return query;
}
