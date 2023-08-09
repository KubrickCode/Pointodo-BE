export class ReqUpdateBadgeTypeAppDto {
  readonly id: number;
  readonly name?: string;
  readonly description?: string;
  readonly iconLink?: string;
}

export class ResUpdateBadgeTypeAppDto {
  readonly message: string;
}
