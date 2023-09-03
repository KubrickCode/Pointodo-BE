const throttlerTTL = 60;
const throttlerLimit = process.env.NODE_ENV === 'production' ? 60 : 60000;

export const throttlerConfig = {
  throttlerTTL,
  throttlerLimit,
  throttlerOption: {
    ttl: throttlerTTL,
    limit: throttlerLimit,
  },
};
