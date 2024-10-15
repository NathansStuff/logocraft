import { initializeApiClient } from '@operation-firefly/api-toolkit';

import { env } from '@/constants';

export const BaseApiClient = initializeApiClient({
  baseURL: env.NEXT_PUBLIC_BASE_URL,
});
