/**
 * get env variables
 *
 * @returns
 */
export const loadEnvFile = () => {
  const IS_PRODUCTION = process.env.NODE_ENV === 'production';
  if (IS_PRODUCTION) {
    return ['.env.prod'];
  }
  return ['.env.dev'];
};
