import { jsonResponse } from '../../../shared/utils/AppSuccess';
import { Request, Response, NextFunction } from 'express';
import { GetEmailOtpService } from '../services';

class GetEmailOtpController {
  async getOtp(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    const response = await new GetEmailOtpService().execute({
      email,
    });

    const successResponse = jsonResponse.build(
      200,
      'Otp sent successfully.',
      response
    );

    next(successResponse);
  }
}

export default new GetEmailOtpController();
