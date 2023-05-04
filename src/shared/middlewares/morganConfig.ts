import morgan from 'morgan';
import { Request, Response, NextFunction } from 'express';
import config from '../../config/environments.config';

export default morgan('short', {
  skip: (request: Request, response: Response) => config.nodeEnv === 'test',
});
