import {
  Injectable,
  UnauthorizedException,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { IUserRepository } from '@domain/user/interfaces/user.repository.interface';
import { UserEntity } from '@domain/user/entities/user.entity';
import { IPasswordHasher } from '@domain/user/interfaces/passwordHasher.interface';

@Injectable()
export class ValidationService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IPasswordHasher')
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('존재하지 않는 계정입니다');
    }

    const isCorrectPassword = await this.passwordHasher.comparePassword(
      password,
      user.password,
    );

    if (!isCorrectPassword) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다');
    }

    return user;
  }
}
