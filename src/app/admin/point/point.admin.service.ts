import { IPointAdminRepository } from '@domain/admin/point/interfaces/point.admin.repository.interface';
import { IPointAdminService } from '@domain/admin/point/interfaces/point.admin.service.interface';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { PointTransactionTypesEntity } from '@domain/admin/point/entities/pointTransactionTypes.entity';
import {
  ReqCreatePointTransactionTypeAppDto,
  ResCreatePointTransactionTypeAppDto,
} from '@domain/admin/point/dto/createPointTransactionType.app.dto';
import {
  ReqUpdatePointTransactionTypeAppDto,
  ResUpdatePointTransactionTypeAppDto,
} from '@domain/admin/point/dto/updatePointTransactionType.app.dto';
import { ResDeletePointTransactionTypeAppDto } from '@domain/admin/point/dto/deletePointTransactionType.app.dto';
import {
  CREATE_POINT_TRANSACTION_TYPE_SUCCESS_MESSAGE,
  DELETE_POINT_TRANSACTION_TYPE_SUCCESS_MESSAGE,
  UPDATE_POINT_TRANSACTION_TYPE_SUCCESS_MESSAGE,
} from '@shared/messages/admin/point.admin.message';

@Injectable()
export class PointAdminService implements IPointAdminService {
  constructor(
    @Inject('IPointAdminRepository')
    private readonly pointAdminRepository: IPointAdminRepository,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async getAllPointTransactionTypes(): Promise<PointTransactionTypesEntity[]> {
    return await this.pointAdminRepository.getAllPointTransactionTypes();
  }

  async createPointTransactionType(
    req: ReqCreatePointTransactionTypeAppDto,
  ): Promise<ResCreatePointTransactionTypeAppDto> {
    const { id, name } = req;
    const isExist = await this.pointAdminRepository.isExist({ id, name });
    if (isExist) throw new ConflictException('이미 존재하는 ID 혹은 뱃지 이름');
    const createdPointTransactionType = await this.pointAdminRepository.create(
      req,
    );
    this.logger.log(
      'info',
      `생성 뱃지 타입 ID:${createdPointTransactionType.id}, 뱃지명:${createdPointTransactionType.name}`,
    );
    return { message: CREATE_POINT_TRANSACTION_TYPE_SUCCESS_MESSAGE };
  }

  async updatePointTransactionType(
    req: ReqUpdatePointTransactionTypeAppDto,
  ): Promise<ResUpdatePointTransactionTypeAppDto> {
    const { newId, name } = req;
    const isExist = await this.pointAdminRepository.isExist({
      id: newId,
      name,
    });
    if (isExist) throw new ConflictException('이미 존재하는 ID 혹은 뱃지 이름');
    const updatedPointTransactionType = await this.pointAdminRepository.update(
      req,
    );
    this.logger.log(
      'info',
      `업데이트 뱃지 타입 ID:${updatedPointTransactionType.id}, 뱃지명:${updatedPointTransactionType.name}`,
    );
    return { message: UPDATE_POINT_TRANSACTION_TYPE_SUCCESS_MESSAGE };
  }

  async deletePointTransactionType(
    id: number,
  ): Promise<ResDeletePointTransactionTypeAppDto> {
    const deletedPointTransactionType = await this.pointAdminRepository.delete(
      id,
    );
    this.logger.log(
      'info',
      `삭제 뱃지 타입 ID:${deletedPointTransactionType.id}`,
    );
    return { message: DELETE_POINT_TRANSACTION_TYPE_SUCCESS_MESSAGE };
  }
}
