import { scrypt, randomBytes, timingSafeEqual } from 'node:crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

/**
 * crypto password
 *
 * @param password - string
 * @returns
 */
export const hashPassword = async (password: string) => {
  try {
    const salt = randomBytes(16).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString('hex')}.${salt}`;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * compare password
 *
 * @param password - string
 * @param hash - string
 * @returns
 */
export const comparePassword = async (password: string, hash: string) => {
  try {
    const [hashedPassword, salt] = hash.split('.');
    const hashedPasswordBuf = Buffer.from(hashedPassword, 'hex');
    const suppliedPasswordBuf = (await scryptAsync(
      password,
      salt,
      64,
    )) as Buffer;
    return timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
  } catch (error) {
    return Promise.reject(error);
  }
};
