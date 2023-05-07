import IForgotPasswordDTO from '../dtos/IForgotPasswordDTO';
import BaseService, { IBaseService } from '../../../shared/Helpers/BaseService';
class ForgotPasswordService extends BaseService implements IBaseService {
  async execute(data: IForgotPasswordDTO): Promise<object> {
    const user = this.returnNumberOREmail(data.email, data.phone_number);

    this.getUserByPhoneOREmail(data.email, data.phone_number);

    const otpId = this.cacheOtp(`reset_pass.${user}`, this.generatedOtp);

    this.sendOtpEmailOrSms('passReset', this.generatedOtp, data.email);

    return { otp_id: otpId };
  }
}

export default ForgotPasswordService;
