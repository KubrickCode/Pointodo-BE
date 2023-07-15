import {
  ReqRegisterDto,
  ResRegisterDto,
} from 'src/interface/dto/user/register.dto';
import { ResGetUserDto } from 'src/interface/dto/user/getUser.dto';

export interface IUserService {
  registerUser(user: ReqRegisterDto): Promise<ResRegisterDto>;
  getUser(email: string): Promise<ResGetUserDto>;
}
