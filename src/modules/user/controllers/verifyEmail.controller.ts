import { jsonResponse } from '../../../shared/utils/AppSuccess';
import { Request, Response, NextFunction } from 'express';
import { VerifyEmailService } from '../services';

class EmailVerification {
  async verify(req: Request, res: Response, next: NextFunction) {
    const { email, otp } = req.body;

    const response = await new VerifyEmailService().execute({
      email,
      otp,
    });

    const successResponse = jsonResponse.build(
      200,
      'Email Verified successfully',
      response
    );

    next(successResponse);
  }
}

export default new EmailVerification();
