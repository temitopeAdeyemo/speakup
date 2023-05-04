import { Request, Response, NextFunction } from 'express';
import JwtClient from '../../shared/services/JWT';
import AppError from '../../shared/utils/AppError';
import UserRepository from '../../modules/user/models/repositories/UserRepository';

const auth = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let token = request.headers['authorization'];

  if (!token) {
    throw new AppError('No token provided', 401);
  }

  token = token.replace('Bearer ', '');

  const { id } = new JwtClient().verifyAccessToken(token);

  const userRepository = new UserRepository();
  const user = await userRepository.findById(id);

  if (!user) {
    throw new AppError('No user token', 401);
  }

  if (!user.phone_number_verified) {
    throw new AppError('Please verify your phone number to continue.', 401);
  }

  request.user = id;

  return next();
};

export default auth;
