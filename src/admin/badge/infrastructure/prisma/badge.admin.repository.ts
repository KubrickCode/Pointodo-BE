import { BadgeEntity } from '@admin/badge/domain/entities/badge.entity';
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
    `;
    return await this.prisma.$queryRawUnsafe<Badge[]>(query);
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

  async isExist(name: string): Promise<boolean> {
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

  async create(
    name: string,
    description: string,
    iconLink: string,
    price?: number,
  ): Promise<BadgeEntity> {
    const query = `
      INSERT INTO "Badge" (name, description, "iconLink", price)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `;

    const values = [name, description, iconLink, price];

    const newBadgeType = await this.prisma.$queryRawUnsafe<Badge>(
      query,
      ...values,
    );
    return newBadgeType[0];
  }

  async update(
    id: number,
    name?: string,
    description?: string,
    iconLink?: string,
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

  async delete(id: number): Promise<BadgeEntity> {
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
