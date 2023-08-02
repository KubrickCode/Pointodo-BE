import {
  Inject,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { IUserBadgeRepository } from '@badge/domain/interfaces/userBadge.repository.interface';
import { NOT_EXIST_USER_BADGE } from '@shared/messages/badge/badge.errors';

@Injectable()
export class VerifyBadgePipe implements PipeTransform {
  constructor(
    @Inject('IUserBadgeRepository')
    private userBadgeRepository: IUserBadgeRepository,
  ) {}

  async transform(value: { userId: string; badgeType: string }) {
    const { userId, badgeType } = value;
    const userBadgeList = await this.userBadgeRepository.getUserBadgeList(
      userId,
    );
    const hasBadge = userBadgeList.some(
      (badge) => badge.badgeType === badgeType,
    );

    if (!hasBadge) {
      throw new BadRequestException(NOT_EXIST_USER_BADGE);
    }

    return value;
  }
}
