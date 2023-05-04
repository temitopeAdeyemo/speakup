import { jsonResponse } from '../../../shared/utils/AppSuccess';
import { Request, Response, NextFunction } from 'express';
import { VerifyUserPhoneService } from '../services';

class PhoneVerification {
  async verify(req: Request, res: Response, next: NextFunction) {
    const { phone_number, otp } = req.body;

    const response = await new VerifyUserPhoneService().execute({
      phone_number,
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

export default new PhoneVerification();
