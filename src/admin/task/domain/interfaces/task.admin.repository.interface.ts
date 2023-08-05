import { TaskTypesEntity } from '../entities/taskTypes.entity';

export interface ITaskAdminRepository {
  getAllTaskTypes(): Promise<TaskTypesEntity[]>;
  isExist(name: string): Promise<boolean>;
  create(name: string): Promise<TaskTypesEntity>;
  update(id: number, name: string): Promise<TaskTypesEntity>;
  delete(id: number): Promise<TaskTypesEntity>;
}
