import { Request, Response, NextFunction } from 'express';
import { AuthUserService } from '../services';
import BaseController from './baseController';

class AuthUser extends BaseController {
  constructor() {
    super(
      'body',
      ['email', 'password', 'phone_number', 'first_name', 'last_name'],
      new AuthUserService(),
      200,
      'OK'
    );
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const response = await this.exec(req, next);
    console.log(response);

    this.pushResponse(response, next);
  }
}

export default new AuthUser();
