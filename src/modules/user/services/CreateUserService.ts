import ICreateUserDTO from '../dtos/ICreateUserDTO';
import BaseService, { IBaseService } from './BaseService';

type EmailAndOtpId = { email: string; otp_id: string };

class CreateUserService extends BaseService implements IBaseService {
  async execute(data: ICreateUserDTO): Promise<EmailAndOtpId> {
    this.credentialTaken('email', data.email);

    this.credentialTaken('phone_number', data.phone_number);

    data.password = await this.hashPassword(data.password);

    this.userRepository.create(data);

    const otpId = this.cacheOtp(`verify_email.${data.phone_number}`);

    this.sendOtpEmailOrSms('verifyEmail', data.email);

    return { email: data.email, otp_id: otpId };
  }
}

export default CreateUserService;
