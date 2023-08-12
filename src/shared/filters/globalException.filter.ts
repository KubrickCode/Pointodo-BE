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

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const exceptionResponse = exception.getResponse && exception.getResponse();
    const status =
      (exception.getStatus && exception.getStatus()) ||
      HttpStatus.INTERNAL_SERVER_ERROR;
    const error = exception.name || '서버 오류';
    let message: string | Array<string> = '서버 내부 오류';

    if (
      typeof exceptionResponse === 'object' &&
      'message' in exceptionResponse
    ) {
      message = exceptionResponse.message as string | Array<string>;
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
