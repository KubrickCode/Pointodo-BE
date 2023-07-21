import { BadgeTypesEntity } from '@domain/admin/badge/entities/badgeTypes.entity';
import { IBadgeAdminRepository } from '@domain/admin/badge/interfaces/badge.admin.repository.interface';
import { Injectable } from '@nestjs/common';
import { BadgeTypes } from '@prisma/client';
import { PrismaService } from '@shared/services/prisma.service';

@Injectable()
export class BadgeAdminRepository implements IBadgeAdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getByName(name: string) {
    const query = `
    SELECT * FROM "BadgeTypes"
    WHERE name = $1
    `;
    const values = [name];
    const badgeTypes = await this.prisma.$queryRawUnsafe<BadgeTypes>(
      query,
      ...values,
    );
    return badgeTypes[0];
  }

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
    const { id, name, description, icon } = req;
    const updateFields: string[] = [];
    const values: (number | string)[] = [];
    let placeholderIndex = 1;

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

    if (icon) {
      updateFields.push(`icon = $${placeholderIndex}`);
      values.push(icon);
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
