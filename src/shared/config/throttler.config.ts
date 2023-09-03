export const throttlerTTL = 1;
export const throttlerLimit = process.env.NODE_ENV === 'production' ? 1 : 1000;

export const throttlerOption = {
  ttl: throttlerTTL,
  limit: throttlerLimit,
};
