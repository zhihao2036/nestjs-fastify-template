import { Redis } from 'ioredis';

/**
 * redis util
 */
export class RedisUtil {
  private static pool: Redis = null;

  /**
   * create redis instance
   *
   * @param db
   */
  private static initRedis(db?: number) {
    const redis = new Redis({
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
      db: db || +process.env.REDIS_DEFAULT_DB,
    });
    this.pool = redis;
  }

  /**
   * get redis instance
   *
   * @returns - redis
   */
  public static getRedis(): Redis {
    if (!this.pool) {
      this.initRedis();
    }
    return this.pool;
  }
}
