import { format, transports } from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import winstonDaily from 'winston-daily-rotate-file';

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

      new winstonDaily(dailyOptions('warn')),
      new winstonDaily(dailyOptions('error')),
      new winstonDaily(dailyOptions('info')),
    ],
  };
};

const dailyOptions = (level: string) => {
  return {
    level,
    datePattern: 'YYYY-MM-DD',
    dirname: `logs/${level}`,
    filename: `%DATE%.${level}.log`,
    maxFiles: 30,
    zippedArchive: true,
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
