import { WithId } from 'mongodb';
import * as z from 'zod';

export const Log = z.object({
  message: z.string(),
  state: z.record(z.any()),
});

export type Log = z.infer<typeof Log>;

export const PartialLog = Log.partial();
export type PartialLog = z.infer<typeof PartialLog>;

export type LogWithId = WithId<Log>;
