import { Log, LogWithId } from '@/features/log/types/Log';
import connectMongo from '@/lib/mongodb';

import { LogModel } from './logModel';

// ***** Basic CRUD *****
// Create a Log
export async function createLog(Log: Log): Promise<LogWithId> {
  await connectMongo();
  const result = await LogModel.create(Log);
  return result;
}

// Get all Logs
export async function getAllLogs(): Promise<LogWithId[]> {
  await connectMongo();
  const result = await LogModel.find({});
  return result;
}
