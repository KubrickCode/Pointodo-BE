import { IUserRepository } from './interfaces/iuser.repository';
import { UserEntity } from './entities/user.entity';
import { IPasswordHasher } from './interfaces/ipasswordHasher';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { DomainRegisterDto } from './dto/register.dto';
import { USER_ALREADY_EXISTS, USER_NOT_FOUND } from './errors/user.errors';

export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IPasswordHasher')
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  async createUser(newUser: DomainRegisterDto): Promise<UserEntity> {
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
    return await this.userRepository.createUser(user);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user: UserEntity | null = await this.userRepository.findByEmail(
      email,
    );
    if (user === null) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    return user;
  }
}
