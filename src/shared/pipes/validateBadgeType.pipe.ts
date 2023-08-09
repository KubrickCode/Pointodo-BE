import {
  PipeTransform,
  Injectable,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { IBadgeAdminRepository } from '@admin/badge/domain/interfaces/badge.admin.repository.interface';
import { INVALID_BADGE_TYPE } from '@shared/messages/global/global.error';

@Injectable()
export class ValidateBadgeTypePipe implements PipeTransform {
  constructor(
    @Inject('IBadgeAdminRepository')
    private readonly badgeAdminRepository: IBadgeAdminRepository,
  ) {}

  async transform(body: any) {
    if (body.hasOwnProperty('badgeId')) {
      const validBadgeTypes =
        await this.badgeAdminRepository.getAllBadgeTypes();
      const validBadgeId = validBadgeTypes.map((badge) => badge.id);

      if (!validBadgeId.includes(body.badgeId)) {
        throw new BadRequestException(INVALID_BADGE_TYPE);
      }
    }

    return body;
  }
}
