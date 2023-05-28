import IVerifyEmailDTO from '../dtos/IVerifyEmailDTO';
import BaseService, { IBaseService } from './BaseService';
class VerifyUserPhoneService extends BaseService implements IBaseService {
  async execute(data: IVerifyEmailDTO): Promise<void> {
    const userDetails = await this.getUser('email', data.email);

    await this.throwCredVerified('email', userDetails);

    await this.getAndValidateOtp(`verify_email.${data.email}`, data.otp);

    this.updateUser({ email_verified: true }, userDetails);
  }
}

export default VerifyUserPhoneService;
