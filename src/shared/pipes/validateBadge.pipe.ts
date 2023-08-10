import {
  PipeTransform,
  Injectable,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { IBadgeAdminRepository } from '@admin/badge/domain/interfaces/badge.admin.repository.interface';
import { INVALID_BADGE } from '@shared/messages/global/global.error';

@Injectable()
export class ValidateBadgePipe implements PipeTransform {
  constructor(
    @Inject('IBadgeAdminRepository')
    private readonly badgeAdminRepository: IBadgeAdminRepository,
  ) {}

  async transform(body: any) {
    if (body.hasOwnProperty('badgeId')) {
      const validBadges = await this.badgeAdminRepository.getAllBadges();
      const validBadgeId = validBadges.map((badge) => badge.id);

      if (!validBadgeId.includes(body.badgeId)) {
        throw new BadRequestException(INVALID_BADGE);
      }
    }

    return body;
  }
}
