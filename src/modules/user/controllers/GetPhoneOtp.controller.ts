import { jsonResponse } from '../../../shared/utils/AppSuccess';
import { Request, Response, NextFunction } from 'express';
import { GetPhoneOtpService } from '../services';

class GetPhoneOtpController {
  async getOtp(req: Request, res: Response, next: NextFunction) {
    const { phone_number } = req.body;

    const response = await new GetPhoneOtpService().execute({
      phone_number,
    });

    const successResponse = jsonResponse.build(
      200,
      'User created successfully',
      response
    );

    next(successResponse);
  }
}

export default new GetPhoneOtpController();
