import { jsonResponse } from '../../../shared/utils/AppSuccess';
import { Request, Response, NextFunction } from 'express';
import { ResetPasswordService } from '../services';

class ResetPasswordController {
  async reset(req: Request, res: Response, next: NextFunction) {
    const { phone_number, email, otp, new_password } = req.body;

    const response = await new ResetPasswordService().execute({
      new_password,
      phone_number,
      email,
      otp,
    });

    const successResponse = jsonResponse.build(
      200,
      'User Verified successfully',
      response
    );

    next(successResponse);
  }
}

export default new ResetPasswordController();
