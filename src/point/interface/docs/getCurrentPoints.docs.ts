import { PointConstant } from '@shared/constants/point.constant';
import { ResGetCurrentPointsDto } from '../dto/getCurrentPoints.dto';

export const getCurrentPointsDocs = {
  operation: {
    summary: '보유 포인트 요청',
    description: `보유 포인트 반환\n
    유저의 현재 보유 포인트를 반환합니다.
  `,
  },
  okResponse: {
    type: ResGetCurrentPointsDto,
    description: PointConstant.CURRENT_POINTS,
  },
};
