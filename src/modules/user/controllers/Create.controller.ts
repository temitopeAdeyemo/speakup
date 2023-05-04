import { jsonResponse } from '../../../shared/utils/AppSuccess';
import { Request, Response, NextFunction } from 'express';
import { CreateUserService } from '../services';

class CreateUser {
  async register(req: Request, res: Response, next: NextFunction) {
    const { first_name, last_name, email, password, phone_number } = req.body;

    const response = await new CreateUserService().execute({
      first_name,
      last_name,
      email,
      password,
      phone_number,
    });

    const successResponse = jsonResponse.build(
      201,
      'User created successfully',
      response
    );

    next(successResponse);
  }
}

export default new CreateUser();
