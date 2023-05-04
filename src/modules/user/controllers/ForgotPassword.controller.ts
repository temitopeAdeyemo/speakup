import { jsonResponse } from '../../../shared/utils/AppSuccess';
import { Request, Response, NextFunction } from 'express';
import { ForgotPasswordService } from '../services';

class PhoneVerification {
  async getOtp(req: Request, res: Response, next: NextFunction) {
    const { phone_number, email } = req.body;

    const response = await new ForgotPasswordService().execute({
      phone_number,
      email,
    });

    const successResponse = jsonResponse.build(
      200,
      'User Verified successfully',
      response
    );

    next(successResponse);
  }
}

export default new PhoneVerification();
