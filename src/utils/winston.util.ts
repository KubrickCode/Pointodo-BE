import { format, transports } from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

export const getWinstonLogger = (nodeEnv: string, moduleName: string) => {
  const isLocalEnv = ['local', 'test', undefined].includes(nodeEnv);
  const level = isLocalEnv ? 'debug' : 'info';

  console.log(`nodeEnv=${nodeEnv}, level=${level}`);

  return {
    transports: [
      new transports.Console({
        level,
        format: isLocalEnv
          ? getTextFormat(moduleName)
          : getJsonFormat(moduleName),
      }),
      new transports.File({
        filename: 'logs/application.log',
        level,
        format: getJsonFormat(moduleName),
      }),
    ],
  };
};

const getTextFormat = (moduleName: string) => {
  return format.combine(
    format.label({ label: `[${moduleName}]` }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.ms(),
    format.colorize(),
    nestWinstonModuleUtilities.format.nestLike(),
  );
};

const getJsonFormat = (moduleName: string) => {
  return format.combine(
    format.label({ label: `[${moduleName}]` }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.ms(),
    format.json(),
  );
};
