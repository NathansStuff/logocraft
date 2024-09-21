import { ObjectId } from 'mongodb';

import { createLog, getAllLogs } from '@/features/log/db/logDal';
import { Log, LogWithId } from '@/features/log/types/Log';

import { CreateLogRequest } from '../types/CreateLogRequest';
import { ELogStatus } from '../types/ELogStatus';

// ***** Basic CRUD *****
// Service to create a Log
export async function createLogService(request: CreateLogRequest, ipAddress: string): Promise<LogWithId> {
  const log: Log = {
    userId: new ObjectId(request.userId),
    details: request.details,
    status: ELogStatus.SUCCESS, // hardcoded user action
    additionalInfo: request.additionalInfo,
    action: request.action,
    ipAddress,
  };
  const validLog = Log.parse(log);
  return await createLog(validLog);
}

export async function createServerLogService(log: Log): Promise<LogWithId> {
  return await createLog(log);
}

// Service to get all Logs
export async function getAllLogsService(): Promise<LogWithId[]> {
  return await getAllLogs();
}
