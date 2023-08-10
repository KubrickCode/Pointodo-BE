export class ReqUpdateBadgeAppDto {
  readonly id: number;
  readonly name?: string;
  readonly description?: string;
  readonly iconLink?: string;
}

export class ResUpdateBadgeAppDto {
  readonly message: string;
}
