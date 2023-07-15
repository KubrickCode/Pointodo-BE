import { Inject, Injectable, Logger } from '@nestjs/common';
import { UserService } from '@domain/user/user.service';
import {
  ReqRegisterDto,
  ResRegisterDto,
} from '../../interface/dto/user/register.dto';
import { DomainRegisterDto } from '@domain/user/dto/register.dto';
import { plainToClass } from 'class-transformer';
import { REGISTER_SUCCESS_MESSAGE } from '../../shared/messages/user.messages';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class UserAppService {
  constructor(
    private readonly userService: UserService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async registerUser(user: ReqRegisterDto): Promise<ResRegisterDto> {
    const newUser = plainToClass(DomainRegisterDto, user);
    const createdUser = await this.userService.createUser(newUser);

    this.logger.log(
      'info',
      `가입 이메일:${createdUser.email}, 사용자 ID:${createdUser.id}, 가입 일시:${createdUser.createdAt}, 공급 업체:${createdUser.provider}`,
    );

    return { message: REGISTER_SUCCESS_MESSAGE };
  }
}
