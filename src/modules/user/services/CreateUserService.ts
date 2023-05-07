import ICreateUserDTO from '../dtos/ICreateUserDTO';
import BaseService, { IBaseService } from '../../../shared/Helpers/BaseService';
class CreateUserService extends BaseService implements IBaseService {
  async execute(data: ICreateUserDTO): Promise<object> {
    this.throwCredTaken('email', data.email);

    this.throwCredTaken('phone_number', data.phone_number);

    data.password = await this.hashPassword(data.password);

    this.createUser(data);

    const otpId = this.cacheOtp(
      `$verify_phone_number.${data.phone_number}`,
      this.generatedOtp
    );

    this.sendOtpSms('verifyPhone', data.phone_number, this.generatedOtp);

    return { email: data.email, otp_id: otpId };
  }
}

export default CreateUserService;
