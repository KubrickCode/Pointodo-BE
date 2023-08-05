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
    if (body.hasOwnProperty('badgeType')) {
      const validBadgeTypes =
        await this.badgeAdminRepository.getAllBadgeTypes();
      const validBadgeNames = validBadgeTypes.map((badge) => badge.name);

      if (!validBadgeNames.includes(body.badgeType)) {
        throw new BadRequestException(INVALID_BADGE_TYPE);
      }
    }

    return body;
  }
}
