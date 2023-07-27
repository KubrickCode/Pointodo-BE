import {
  ReqCreatePointTransactionTypeAppDto,
  ResCreatePointTransactionTypeAppDto,
} from '../dto/createPointTransactionType.app.dto';
import { ResDeletePointTransactionTypeAppDto } from '../dto/deletePointTransactionType.app.dto';
import {
  ReqUpdatePointTransactionTypeAppDto,
  ResUpdatePointTransactionTypeAppDto,
} from '../dto/updatePointTransactionType.app.dto';
import { PointTransactionTypesEntity } from '../entities/pointTransactionTypes.entity';

export interface IPointAdminService {
  getAllPointTransactionTypes(): Promise<PointTransactionTypesEntity[]>;
  createPointTransactionType(
    req: ReqCreatePointTransactionTypeAppDto,
  ): Promise<ResCreatePointTransactionTypeAppDto>;
  updatePointTransactionType(
    req: ReqUpdatePointTransactionTypeAppDto,
  ): Promise<ResUpdatePointTransactionTypeAppDto>;
  deletePointTransactionType(
    id: number,
  ): Promise<ResDeletePointTransactionTypeAppDto>;
}
