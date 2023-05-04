import IForgotPasswordDTO from '../dtos/IForgotPasswordDTO';
import BaseService, { IBaseService } from './BaseService';
class ForgotPasswordService extends BaseService implements IBaseService {
  async execute(data: IForgotPasswordDTO): Promise<{otp_id: string}> {
    const user = this.returnNumberOREmail(data.email, data.phone_number);

    this.getUserByPhoneOREmail(data.email, data.phone_number);

    const otpId = this.cacheOtp(`reset_pass.${user}`);

    this.sendOtpEmailOrSms('passReset', data.email, data.phone_number);

    return { otp_id: otpId };
  }
}

export default ForgotPasswordService;
