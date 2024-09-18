import connectMongo from '@/lib/mongodb';
import { Log, LogWithId } from '../types/Log';
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
