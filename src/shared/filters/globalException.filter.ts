import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = '서버 내부 오류';
    let error = '서버 오류';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message || '서버 내부 오류';
      error = exception.name;
    }

    this.logger.error(
      `에러 상태 코드:${status}, 에러 종류:${error}, 에러 메시지:${message}, 경로:${request.url}`,
    );

    response.status(status).json({
      statusCode: status,
      message: message,
      path: request.url,
    });
  }
}