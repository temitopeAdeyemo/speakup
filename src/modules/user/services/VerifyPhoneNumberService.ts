import IVerifyPhoneDTO from '../dtos/IVerifyPhoneDTO';
import BaseService, { IBaseService } from './BaseService';
class VerifyUserPhoneService extends BaseService implements IBaseService {
  async execute(data: IVerifyPhoneDTO): Promise<void> {
    const userDetails = await this.getUser('phone_number', data.phone_number);

    this.checkCredentialNotVerified('phone_number', userDetails);

    await this.getAndValidateOtp(
      `verify_phone_number.${data.phone_number}`,
      data.otp
    );

    this.updateUser({ phone_number_verified: true }, userDetails);
  }
}

export default VerifyUserPhoneService;
