import { TaskTypesEntity } from '../entities/taskTypes.entity';

export interface ITaskAdminRepository {
  getAllTaskTypes(): Promise<TaskTypesEntity[]>;
  isExist(req: Partial<TaskTypesEntity>): Promise<boolean>;
  create(req: TaskTypesEntity): Promise<TaskTypesEntity>;
  update(req: Partial<TaskTypesEntity>): Promise<TaskTypesEntity>;
  delete(id: number): Promise<TaskTypesEntity>;
}
