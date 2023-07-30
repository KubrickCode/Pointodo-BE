import { PointEntity } from '../entities/point.entity';

export interface IPointRepository {
  isContinuous(userId: string, yesterday: string): Promise<boolean>;
  createPointLog(
    userId: string,
    taskTypesId: number,
    points: number,
  ): Promise<PointEntity>;
}
