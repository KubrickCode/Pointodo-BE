import { TaskTypesEntity } from '@admin/task/domain/entities/taskTypes.entity';
import { ITaskAdminRepository } from '@admin/task/domain/interfaces/task.admin.repository.interface';
import { Injectable } from '@nestjs/common';
import { TaskTypes } from '@prisma/client';
import { PrismaService } from '@shared/service/prisma.service';

@Injectable()
export class TaskAdminRepository implements ITaskAdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllTaskTypes(): Promise<TaskTypesEntity[]> {
    const query = `
    SELECT * FROM "TaskTypes"
    `;
    return await this.prisma.$queryRawUnsafe<TaskTypes[]>(query);
  }

  async isExist(name: string): Promise<boolean> {
    const query = `
    SELECT * FROM "TaskTypes"
    WHERE name = $1
    `;
    const values = [name];
    const isExist = await this.prisma.$queryRawUnsafe<TaskTypes | null>(
      query,
      ...values,
    );
    if (!isExist[0]) return false;
    return true;
  }

  async create(name: string): Promise<TaskTypesEntity> {
    const query = `
      INSERT INTO "TaskTypes" (name)
      VALUES ($1)
      RETURNING *
      `;

    const values = [name];

    const newBadgeType = await this.prisma.$queryRawUnsafe<TaskTypes>(
      query,
      ...values,
    );
    return newBadgeType[0];
  }

  async update(id: number, name: string): Promise<TaskTypesEntity> {
    const query = `
    UPDATE "TaskTypes"
    SET name = $1
    WHERE id = $2
    RETURNING *
  `;

    const values = [name, id];

    const updatedBadgeType = await this.prisma.$queryRawUnsafe<TaskTypes>(
      query,
      ...values,
    );
    return updatedBadgeType[0];
  }

  async delete(id: number): Promise<TaskTypesEntity> {
    const query = `
      DELETE FROM "TaskTypes"
      WHERE id = $1
      RETURNING *
    `;
    const values = [id];
    const deletedBadgeType = await this.prisma.$queryRawUnsafe<TaskTypes>(
      query,
      ...values,
    );
    return deletedBadgeType[0];
  }
}
