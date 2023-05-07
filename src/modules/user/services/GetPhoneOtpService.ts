import IGetPhoneOtpDTO from '../dtos/IGetPhoneOtpDTO';
import BaseService, { IBaseService } from '../../../shared/Helpers/BaseService';
class GetPhoneOtpService extends BaseService implements IBaseService {
  async execute(data: IGetPhoneOtpDTO): Promise<void> {
    const user = await this.getUser('phone_number', data.phone_number);

    this.throwCredVerified('phone_number', user);

    this.cacheOtp(data.phone_number, this.generatedOtp);

    this.sendOtpSms('verifyPhone', data.phone_number, this.generatedOtp);
  }
}

export default GetPhoneOtpService;
