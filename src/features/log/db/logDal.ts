import { Log, LogWithId } from '@/features/log/types/Log';
import { LogModel } from './logModel';
import { dbConnector } from '@/lib/mongodb';
import { wrapWithConnection } from '@operation-firefly/mongodb-package';

const baseLogDal = {
  async create(log: Log): Promise<LogWithId> {
    const result = await LogModel.create(log);
    return result;
  },
  async getAll(): Promise<LogWithId[]> {
    const result = await LogModel.find({});
    return result;
  },
};

export const LogDal = wrapWithConnection(baseLogDal, dbConnector);
