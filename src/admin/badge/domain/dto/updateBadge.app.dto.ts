export class ReqUpdateBadgeAppDto {
  readonly id: number;
  readonly name?: string;
  readonly description?: string;
  readonly iconLink?: string;
  readonly price?: number;
}

export class ResUpdateBadgeAppDto {
  readonly message: string;
}
