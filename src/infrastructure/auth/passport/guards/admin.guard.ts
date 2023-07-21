import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any) {
    console.log('유저는', user);
    return user;
  }
}
