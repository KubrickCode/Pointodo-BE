import { UUID } from 'crypto';

export class ReqValidateAdminAppDto {
  readonly id: UUID;
}

export class ResValidateAdminAppDto {
  readonly validation: boolean;
}
