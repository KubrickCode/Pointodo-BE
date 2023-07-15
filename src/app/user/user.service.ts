import {
  Inject,
  Injectable,
  Logger,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import {
  ReqRegisterDto,
  ResRegisterDto,
} from '../../interface/dto/user/register.dto';
import { REGISTER_SUCCESS_MESSAGE } from '../../shared/messages/user.messages';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { IUserRepository } from '@domain/user/interfaces/user.repository.interface';
import { IPasswordHasher } from '@domain/user/interfaces/passwordHasher.interface';
import {
  USER_ALREADY_EXISTS,
  USER_NOT_FOUND,
} from '@domain/user/errors/user.errors';
import { ResGetUserDto } from 'src/interface/dto/user/getUser.dto';
import { IUserService } from '@domain/user/interfaces/user.service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IPasswordHasher')
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  async registerUser(newUser: ReqRegisterDto): Promise<ResRegisterDto> {
    const { email, password } = newUser;
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new ConflictException(USER_ALREADY_EXISTS);
    }

    const hashedPassword = await this.passwordHasher.hashPassword(password);

    const user = {
      email,
      password: hashedPassword,
    };
    const createdUser = await this.userRepository.createUser(user);
    this.logger.log(
      'info',
      `가입 이메일:${createdUser.email}, 사용자 ID:${createdUser.id}, 가입 일시:${createdUser.createdAt}, 공급 업체:${createdUser.provider}`,
    );
    return { message: REGISTER_SUCCESS_MESSAGE };
  }

  async getUser(_id: string): Promise<ResGetUserDto> {
    const user = await this.userRepository.findById(_id);
    if (user === null) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    const { id, email, provider, role, defaultBadgeId, createdAt } = user;
    return { id, email, provider, role, defaultBadgeId, createdAt };
  }
}
