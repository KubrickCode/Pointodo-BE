export interface ICacheService {
  getFromCache<T>(key: string): Promise<T | null>;
  setCache<T>(key: string, value: T, ttl: number): Promise<void>;
  deleteCache(key: string): Promise<void>;
}
