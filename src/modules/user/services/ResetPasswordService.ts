import IResetPasswordServiceDTO from '../dtos/IResetPasswordServiceDTO';
import BaseService, { IBaseService } from './BaseService';
class ResetPasswordService extends BaseService implements IBaseService {
  async execute(data: IResetPasswordServiceDTO): Promise<void> {
    const user = this.returnNumberOREmail(data.email, data.phone_number);

    const userDetails = await this.getUserByPhoneOREmail();

    await this.getAndValidateOtp(`reset_pass.${user}`, data.otp);

    await this.hashAndUpdatePassword(data.new_password, userDetails);

    this.deleteCachedOtp(`reset_pass.${user}`);
  }
}

export default ResetPasswordService;
