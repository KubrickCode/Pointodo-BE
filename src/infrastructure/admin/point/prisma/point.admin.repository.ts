import { PointTransactionTypesEntity } from '@domain/admin/point/entities/pointTransactionTypes.entity';
import { IPointAdminRepository } from '@domain/admin/point/interfaces/point.admin.repository.interface';
import { Injectable } from '@nestjs/common';
import { PointTransactionTypes } from '@prisma/client';
import { PrismaService } from '@shared/services/prisma.service';

@Injectable()
export class PointAdminRepository implements IPointAdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllPointTransactionTypes(): Promise<PointTransactionTypesEntity[]> {
    const query = `
    SELECT * FROM "PointTransactionTypes"
    `;
    return await this.prisma.$queryRawUnsafe<PointTransactionTypes[]>(query);
  }

  async isExist(req: Partial<PointTransactionTypesEntity>): Promise<boolean> {
    const { id, name } = req;
    const query = `
    SELECT * FROM "PointTransactionTypes"
    WHERE id = $1 OR name = $2
    `;
    const values = [id, name];
    const isExist =
      await this.prisma.$queryRawUnsafe<PointTransactionTypes | null>(
        query,
        ...values,
      );
    if (!isExist[0]) return false;
    return true;
  }

  async create(
    req: Partial<PointTransactionTypesEntity>,
  ): Promise<PointTransactionTypesEntity> {
    const { id, name } = req;
    const query = `
      INSERT INTO "PointTransactionTypes" (id, name)
      VALUES ($1, $2)
      RETURNING *
      `;

    const values = [id, name];

    const newBadgeType =
      await this.prisma.$queryRawUnsafe<PointTransactionTypes>(
        query,
        ...values,
      );
    return newBadgeType[0];
  }

  async update(
    req: Partial<PointTransactionTypesEntity>,
  ): Promise<PointTransactionTypesEntity> {
    const { id, newId, name } = req;
    const updateFields: string[] = [];
    const values: (number | string)[] = [];
    let placeholderIndex = 1;

    if (newId) {
      updateFields.push(`id = $${placeholderIndex}`);
      values.push(newId);
      placeholderIndex++;
    }

    if (name) {
      updateFields.push(`name = $${placeholderIndex}`);
      values.push(name);
      placeholderIndex++;
    }

    values.push(id);
    placeholderIndex++;

    const query = `
    UPDATE "PointTransactionTypes"
    SET ${updateFields.join(', ')}
    WHERE id = $${placeholderIndex - 1}
    RETURNING *
  `;

    const updatedBadgeType =
      await this.prisma.$queryRawUnsafe<PointTransactionTypes>(
        query,
        ...values,
      );
    return updatedBadgeType[0];
  }

  async delete(id: number): Promise<PointTransactionTypesEntity> {
    const query = `
      DELETE FROM "PointTransactionTypes"
      WHERE id = $1
      RETURNING *
    `;
    const values = [id];
    const newBadgeType =
      await this.prisma.$queryRawUnsafe<PointTransactionTypes>(
        query,
        ...values,
      );
    return newBadgeType[0];
  }
}
