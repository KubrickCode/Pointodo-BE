export interface IRedisService {
  set(key: string, value: any, ttl: number): Promise<void>;
  get(key: string): Promise<any | null>;
  delete(key: string): Promise<void>;
  deleteKeysByPrefix(prefix: string): Promise<void>;
}
