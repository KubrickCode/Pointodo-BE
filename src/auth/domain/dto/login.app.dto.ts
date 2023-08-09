export class ReqLoginAppDto {
  readonly id: string;
}

export class ResLoginAppDto {
  readonly accessToken: string;
  readonly refreshToken?: string;
}
