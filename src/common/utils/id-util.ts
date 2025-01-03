import { randomUUID } from 'crypto';

const { Snowflake } = require('nodejs-snowflake');

/**
 * ID Generate
 */
export class IdUtil {
  private static SnowflakeIdConfig = {
    custom_epoch: Date.now(), // Defaults to Date.now(). This is UNIX timestamp in ms
    instance_id: parseInt(process.env.SNOWFLAKE_MACHINE_ID, 10) || 1, // A value ranging between 0 - 4095. If not provided then a random value will be used
  };

  /**
   * get one snowflake id
   *
   * @returns - string
   */
  static getSnowflakeID = (): string => {
    const uid = new Snowflake(this.SnowflakeIdConfig);
    const id: bigint = uid.getUniqueID();
    return id.toString();
  };

  /**
   * get one version 4 UUID
   *
   * @returns - string
   */
  static getUUID = (): string => randomUUID();

  /**
   * get one version 4 UUID
   * simple uuid without '-'
   *
   * @returns - string
   */
  static getSimpleUUID = (): string => randomUUID().replace(/-/g, '');
}
