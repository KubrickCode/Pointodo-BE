import {
  BadgeEntity,
  BadgeType_,
} from '@admin/badge/domain/entities/badge.entity';
import { IBadgeAdminRepository } from '@admin/badge/domain/interfaces/badge.admin.repository.interface';
import { Injectable } from '@nestjs/common';
import { Badge } from '@prisma/client';
import { PrismaService } from '@shared/service/prisma.service';

@Injectable()
export class BadgeAdminRepository implements IBadgeAdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllBadges(): Promise<BadgeEntity[]> {
    const query = `
    SELECT * FROM "Badge"
    ORDER BY id ASC
    `;
    return await this.prisma.$queryRawUnsafe<Badge[]>(query);
  }

  async getBadgeList(type: BadgeType_): Promise<BadgeEntity[]> {
    const query = `
    SELECT * FROM "Badge"
    WHERE type = $1::"BadgeType"
    ORDER BY id ASC
    `;
    return await this.prisma.$queryRawUnsafe<Badge[]>(query, type);
  }

  async getBadgePrice(id: number): Promise<number> {
    const query = `
    SELECT price FROM "Badge"
    WHERE id = $1
    `;
    const values = [id];
    const result = await this.prisma.$queryRawUnsafe<[{ price: number }]>(
      query,
      ...values,
    );
    return result[0].price;
  }

  async getBadgeIdByName(name: string): Promise<Pick<BadgeEntity, 'id'>> {
    const query = `
    SELECT id FROM "Badge"
    WHERE name = $1
    `;
    const values = [name];
    const result = await this.prisma.$queryRawUnsafe<Pick<Badge, 'id'>>(
      query,
      ...values,
    );
    return result[0];
  }

  async isExistBadge(name: string): Promise<boolean> {
    const query = `
    SELECT * FROM "Badge"
    WHERE name = $1
    `;
    const values = [name];
    const isExist = await this.prisma.$queryRawUnsafe<Badge | null>(
      query,
      ...values,
    );
    if (!isExist[0]) return false;
    return true;
  }

  async createBadge(
    name: string,
    description: string,
    iconLink: string,
    type: BadgeType_,
    price?: number,
  ): Promise<BadgeEntity> {
    const query = `
      INSERT INTO "Badge" (name, description, "iconLink", price, type)
      VALUES ($1, $2, $3, $4, $5::"BadgeType")
      RETURNING *
      `;

    const values = [name, description, iconLink, price, type];

    const newBadgeType = await this.prisma.$queryRawUnsafe<Badge>(
      query,
      ...values,
    );
    return newBadgeType[0];
  }

  async updateBadge(
    id: number,
    name?: string,
    description?: string,
    iconLink?: string,
    price?: number,
  ): Promise<BadgeEntity> {
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

    if (price !== undefined) {
      updateFields.push(`price = $${placeholderIndex}`);
      values.push(price);
      placeholderIndex++;
    }

    values.push(id);
    placeholderIndex++;

    const query = `
    UPDATE "Badge"
    SET ${updateFields.join(', ')}
    WHERE id = $${placeholderIndex - 1}
    RETURNING *
  `;

    const updatedBadgeType = await this.prisma.$queryRawUnsafe<Badge>(
      query,
      ...values,
    );
    return updatedBadgeType[0];
  }

  async deleteBadge(id: number): Promise<BadgeEntity> {
    const query = `
      DELETE FROM "Badge"
      WHERE id = $1
      RETURNING *
    `;
    const values = [id];
    const deletedBadgeType = await this.prisma.$queryRawUnsafe<Badge>(
      query,
      ...values,
    );
    return deletedBadgeType[0];
  }
}
