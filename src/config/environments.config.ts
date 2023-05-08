import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

export default {
  port: process.env.PORT || '',
  nodeEnv: process.env.NODE_ENV || '',
  dbHost: process.env.DB_HOST || 'db',
  dbType: process.env.DB_TYPE || 'postgres',
  dbPort: process.env.DB_PORT || '5432',
  dbUserName: process.env.DB_USERNAME || 'postgres',
  dbPassword: process.env.DB_PASSWORD || '123456789',
  database: process.env.DB_DATABASE || '',
  databaseAppName: process.env.DB_APPLICATION_NAME || '',
  redisHost: process.env.REDIS_HOST || 'redis',
  redisPort: process.env.REDIS_PORT || '6379',
  jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET || 'secret',
  jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET || 'secret',
  sendInBlueApiKey: process.env.SENDINBLUE_API_KEY || '',
  saltRounds: process.env.SALT_ROUNDS || 10,
  otpExpiresin: Number(process.env.OTP_EXPIRES_IN) || 60,
};
