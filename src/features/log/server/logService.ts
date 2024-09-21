import { createLog, getAllLogs } from '@/features/log/db/logDal';
import { Log, LogWithId } from '@/features/log/types/Log';

// ***** Basic CRUD *****
// Service to create a Log
export async function createLogService(log: Log): Promise<LogWithId> {
  return await createLog(log);
}

// Service to get all Logs
export async function getAllLogsService(): Promise<LogWithId[]> {
  return await getAllLogs();
}
