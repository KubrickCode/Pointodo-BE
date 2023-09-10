import {
  BadgeEntity,
  BadgeType_,
} from '@admin/badge/domain/entities/badge.entity';
import { IBadgeAdminRepository } from '@admin/badge/domain/interfaces/badge.admin.repository.interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/service/prisma.service';
import { plainToClass } from 'class-transformer';

@Injectable()
export class BadgeAdminRepository implements IBadgeAdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllBadges(): Promise<BadgeEntity[]> {
    return await this.prisma.badge.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async getBadgePrice(id: number): Promise<number> {
    const result = await this.prisma.badge.findFirst({
      where: { id },
      select: { price: true },
    });
    return result.price;
  }

  async getBadgeIdByName(name: string): Promise<Pick<BadgeEntity, 'id'>> {
    const result = await this.prisma.badge.findUnique({
      where: { name },
      select: { id: true },
    });
    return result;
  }

  async isExistBadge(name: string): Promise<boolean> {
    const isExist = await this.prisma.badge.findUnique({
      where: { name },
    });
    if (!isExist) return false;
    return true;
  }

  async createBadge(
    name: string,
    description: string,
    iconLink: string,
    type: BadgeType_,
    price?: number,
  ): Promise<BadgeEntity> {
    const result = await this.prisma.badge.create({
      data: {
        name,
        description,
        iconLink,
        price,
        type,
      },
    });
    return plainToClass(BadgeEntity, result);
  }

  async updateBadge(
    id: number,
    name?: string,
    description?: string,
    iconLink?: string,
    price?: number,
  ): Promise<BadgeEntity> {
    const data: object = {};

    if (name) {
      Object.assign(data, { name });
    }

    if (description) {
      Object.assign(data, { description });
    }

    if (iconLink) {
      Object.assign(data, { iconLink });
    }

    if (price !== undefined) {
      Object.assign(data, { price });
    }

    const result = await this.prisma.badge.update({
      where: {
        id,
      },
      data,
    });

    return plainToClass(BadgeEntity, result);
  }

  async deleteBadge(id: number): Promise<BadgeEntity> {
    return await this.prisma.badge.delete({ where: { id } });
  }
}
