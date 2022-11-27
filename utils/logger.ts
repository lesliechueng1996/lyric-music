import pino from 'pino';

const logger = pino({
  formatters: {
    level: (label) => {
      return {
        level: label,
      };
    },
  },
  base: undefined,
  // transport: {
  //   target: 'pino-pretty',
  //   options: {
  //     colorize: true,
  //   },
  // },
});

export default {
  info: (data: any, msg?: string) => {
    if (typeof data === 'string' && msg === undefined) {
      logger.info({}, data);
      return;
    }
    logger.info(
      {
        data,
      },
      msg
    );
  },
  error: (data: any, msg?: string) => {
    if (typeof data === 'string' && msg === undefined) {
      logger.error({}, data);
      return;
    }
    logger.error(
      {
        data,
      },
      msg
    );
  },
};
