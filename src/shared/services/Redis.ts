import { default as Redis } from 'ioredis';

import environment from '../../config/environments.config';

class Cache {
  client: Redis;

  constructor() {
    this.client = new Redis({
      host: environment.redisHost,
      port: parseInt(environment.redisPort),
    });

    this.client.on('connect', () => {
      console.log('Redis connected');
    });

    this.client.on('ready', () => {
      console.log('Redis ready for connection');
    });

    this.client.on('end', () => {
      console.log('Redis connection ended');
    });

    this.client.on('error', (error) => {
      console.log('Redis Error', error);
    });

    this.client.on('SIGINT', () => {
      console.log('SIGINT ERR');
    });
  }

  set(key: string, value: any, expiry = 3600) {
    this.client.set(key, JSON.stringify(value), 'EX', expiry);
  }

  async get(key: string) {
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : null;
  }

  delete(key: string) {
    this.client.del(key);
  }
}

export default new Cache();
