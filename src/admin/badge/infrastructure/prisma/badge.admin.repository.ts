import { BadgeTypesEntity } from '@admin/badge/domain/entities/badgeTypes.entity';
import { IBadgeAdminRepository } from '@admin/badge/domain/interfaces/badge.admin.repository.interface';
import { Injectable } from '@nestjs/common';
import { BadgeTypes } from '@prisma/client';
import { PrismaService } from '@shared/service/prisma.service';

@Injectable()
export class BadgeAdminRepository implements IBadgeAdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllBadgeTypes(): Promise<BadgeTypesEntity[]> {
    const query = `
    SELECT * FROM "BadgeTypes"
    `;
    return await this.prisma.$queryRawUnsafe<BadgeTypes[]>(query);
  }

  async getBadgePrice(name: string): Promise<number> {
    const query = `
    SELECT price FROM "BadgeTypes"
    WHERE name = $1
    `;
    const values = [name];
    const result = await this.prisma.$queryRawUnsafe<[{ price: number }]>(
      query,
      ...values,
    );
    return result[0].price;
  }

  async isExist(name: string): Promise<boolean> {
    const query = `
    SELECT * FROM "BadgeTypes"
    WHERE name = $1
    `;
    const values = [name];
    const isExist = await this.prisma.$queryRawUnsafe<BadgeTypes | null>(
      query,
      ...values,
    );
    if (!isExist[0]) return false;
    return true;
  }

  async create(
    name: string,
    description: string,
    iconLink: string,
    price?: number,
  ): Promise<BadgeTypesEntity> {
    const query = `
      INSERT INTO "BadgeTypes" (name, description, "iconLink", price)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `;

    const values = [name, description, iconLink, price];

    const newBadgeType = await this.prisma.$queryRawUnsafe<BadgeTypes>(
      query,
      ...values,
    );
    return newBadgeType[0];
  }

  async update(req: Partial<BadgeTypesEntity>): Promise<BadgeTypesEntity> {
    const { id, name, description, iconLink } = req;
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

    if (iconLink) {
      updateFields.push(`"iconLink" = $${placeholderIndex}`);
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
    const deletedBadgeType = await this.prisma.$queryRawUnsafe<BadgeTypes>(
      query,
      ...values,
    );
    return deletedBadgeType[0];
  }
}
