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

  async isExist(req: Partial<TaskTypesEntity>): Promise<boolean> {
    const { id, name } = req;
    const query = `
    SELECT * FROM "TaskTypes"
    WHERE id = $1 OR name = $2
    `;
    const values = [id, name];
    const isExist = await this.prisma.$queryRawUnsafe<TaskTypes | null>(
      query,
      ...values,
    );
    if (!isExist[0]) return false;
    return true;
  }

  async create(req: Partial<TaskTypesEntity>): Promise<TaskTypesEntity> {
    const { id, name } = req;
    const query = `
      INSERT INTO "TaskTypes" (id, name)
      VALUES ($1, $2)
      RETURNING *
      `;

    const values = [id, name];

    const newBadgeType = await this.prisma.$queryRawUnsafe<TaskTypes>(
      query,
      ...values,
    );
    return newBadgeType[0];
  }

  async update(req: Partial<TaskTypesEntity>): Promise<TaskTypesEntity> {
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
    UPDATE "TaskTypes"
    SET ${updateFields.join(', ')}
    WHERE id = $${placeholderIndex - 1}
    RETURNING *
  `;

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
    const newBadgeType = await this.prisma.$queryRawUnsafe<TaskTypes>(
      query,
      ...values,
    );
    return newBadgeType[0];
  }
}
