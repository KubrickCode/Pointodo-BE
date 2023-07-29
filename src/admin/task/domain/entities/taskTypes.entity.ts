import { TaskTypes } from '@prisma/client';

export class TaskTypesEntity implements TaskTypes {
  id: number;
  newId?: number;
  name: string;
}
