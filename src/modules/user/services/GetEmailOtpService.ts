import BaseService, { IBaseService } from '../../../shared/Helpers/BaseService';
import IGetEmailOtp from '../dtos/IGetEmailOtpDTO';

class GetPhoneOtpService extends BaseService implements IBaseService {
  async execute(data: IGetEmailOtp): Promise<object> {
    const user = await this.getUser('email', data.email);

    await this.throwCredVerified('email', user);

    await this.cacheOtp(`verify_email.${data.email}`, this.generatedOtp);

    this.sendOtpMail('verifyEmail', data.email, this.generatedOtp);

    return { otp: this.generatedOtp };
  }
}

export default GetPhoneOtpService;
