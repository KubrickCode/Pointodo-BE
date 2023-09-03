const throttlerTTL = 1;
const throttlerLimit = process.env.NODE_ENV === 'production' ? 1 : 1000;

export const throttlerConfig = {
  throttlerTTL,
  throttlerLimit,
  throttlerOption: {
    ttl: throttlerTTL,
    limit: throttlerLimit,
  },
};
