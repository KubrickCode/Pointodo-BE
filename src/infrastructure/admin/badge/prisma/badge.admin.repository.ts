import { BadgeTypesEntity } from '@domain/admin/badge/entities/badgeTypes.entity';
import { IBadgeAdminRepository } from '@domain/admin/badge/interfaces/badge.admin.repository.interface';
import { Injectable } from '@nestjs/common';
import { BadgeTypes } from '@prisma/client';
import { PrismaService } from '@shared/services/prisma.service';

@Injectable()
export class BadgeAdminRepository implements IBadgeAdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllBadgeTypes(): Promise<BadgeTypesEntity[]> {
    const query = `
    SELECT * FROM "BadgeTypes"
    `;
    return await this.prisma.$queryRawUnsafe<BadgeTypes[]>(query);
  }

  async isExist(req: Partial<BadgeTypesEntity>): Promise<boolean> {
    const { id, name } = req;
    const query = `
    SELECT * FROM "BadgeTypes"
    WHERE id = $1 OR name = $2
    `;
    const values = [id, name];
    const isExist = await this.prisma.$queryRawUnsafe<BadgeTypes | null>(
      query,
      ...values,
    );
    if (!isExist[0]) return false;
    return true;
  }

  async create(req: Partial<BadgeTypesEntity>): Promise<BadgeTypesEntity> {
    const { id, name, description, iconLink } = req;
    const query = `
      INSERT INTO "BadgeTypes" (id, name, description, icon)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `;

    const values = [id, name, description, iconLink];

    const newBadgeType = await this.prisma.$queryRawUnsafe<BadgeTypes>(
      query,
      ...values,
    );
    return newBadgeType[0];
  }

  async update(req: Partial<BadgeTypesEntity>): Promise<BadgeTypesEntity> {
    const { id, newId, name, description, iconLink } = req;
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

    if (description) {
      updateFields.push(`description = $${placeholderIndex}`);
      values.push(description);
      placeholderIndex++;
    }

    if (iconLink) {
      updateFields.push(`iconLink = $${placeholderIndex}`);
      values.push(iconLink);
      placeholderIndex++;
    }

    values.push(id);
    placeholderIndex++;

    const query = `
    UPDATE "BadgeTypes"
    SET ${updateFields.join(', ')}
    WHERE id = $${placeholderIndex - 1}
    RETURNING *
  `;

    const updatedBadgeType = await this.prisma.$queryRawUnsafe<BadgeTypes>(
      query,
      ...values,
    );
    return updatedBadgeType[0];
  }

  async delete(id: number): Promise<BadgeTypesEntity> {
    const query = `
      DELETE FROM "BadgeTypes"
      WHERE id = $1
      RETURNING *
    `;
    const values = [id];
    const newBadgeType = await this.prisma.$queryRawUnsafe<BadgeTypes>(
      query,
      ...values,
    );
    return newBadgeType[0];
  }
}
