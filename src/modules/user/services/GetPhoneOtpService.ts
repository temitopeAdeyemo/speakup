import IGetPhoneOtpDTO from '../dtos/IGetPhoneOtpDTO';
import BaseService, { IBaseService } from './BaseService';
class GetPhoneOtpService extends BaseService implements IBaseService {
  async execute(data: IGetPhoneOtpDTO): Promise<void> {
    const user = await this.getUser('phone_number', data.phone_number);

    this.checkCredentialNotVerified('phone_number', user);

    this.cacheOtp(data.phone_number);
    

    this.sendOtpSms('verifyPhone', data.phone_number);

  }
}

export default GetPhoneOtpService;
