import {
  ReqRegisterDto,
  ResRegisterDto,
} from 'src/interface/dto/user/register.dto';
import { ResGetUserDto } from 'src/interface/dto/user/getUser.dto';
import { ResChangePasswordDto } from 'src/interface/dto/user/changePassword.dto';

export interface IUserService {
  registerUser(user: ReqRegisterDto): Promise<ResRegisterDto>;
  getUser(id: string): Promise<ResGetUserDto>;
  changePassword(id: string, password: string): Promise<ResChangePasswordDto>;
}
