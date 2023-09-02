export class ReqUpdateTaskAppDto {
  readonly id: number;
  readonly name?: string;
  readonly description?: string;
  readonly importance?: number;
  readonly dueDate?: string;
}
