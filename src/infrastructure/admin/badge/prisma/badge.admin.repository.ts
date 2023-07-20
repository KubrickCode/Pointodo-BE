import { BadgeTypesEntity } from '@domain/admin/badge/entities/badgeTypes.entity';
import { IBadgeAdminRepository } from '@domain/admin/badge/interfaces/badge.admin.repository.interface';
import { Injectable } from '@nestjs/common';
import { BadgeTypes } from '@prisma/client';
import { PrismaService } from '@shared/services/prisma.service';

@Injectable()
export class BadgeAdminRepository implements IBadgeAdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(req: Partial<BadgeTypesEntity>): Promise<BadgeTypesEntity> {
    const { id, name, description, icon } = req;
    const query = `
      INSERT INTO "BadgeTypes" (id, name, description, icon)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [id, name, description, icon];
    const newBadgeType = await this.prisma.$queryRawUnsafe<BadgeTypes>(
      query,
      ...values,
    );
    return newBadgeType[0];
  }

  async update(req: Partial<BadgeTypesEntity>): Promise<BadgeTypesEntity> {
    return;
  }
  async delete(id: number): Promise<BadgeTypesEntity> {
    return;
  }
}
