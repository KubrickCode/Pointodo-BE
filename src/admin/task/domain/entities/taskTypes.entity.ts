import { TaskTypes } from '@prisma/client';

export class TaskTypesEntity implements TaskTypes {
  id: number;
  name: string;
}
