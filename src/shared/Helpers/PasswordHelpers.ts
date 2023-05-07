import Bcrypt from '../../shared/services/Bcrypt';
import AppError from '../../shared/utils/AppError';
import DbRepoHelper from './DbRepoHelper';
import IGenericUserDTO from '../../modules/user/dtos/IUserDTO';

export default class PasswordHelper {
  protected readonly dbHelper = new DbRepoHelper();

  private readonly bcrypt = new Bcrypt();

  async hashPassword_(Password: string) {
    return await this.bcrypt.hash(Password);
  }

  async checkPassword_(password: string, hash: string) {
    const passwordMatch = await this.bcrypt.compare(password, hash);

    if (!passwordMatch) {
      throw new AppError('Invalid Credentials.', 401);
    }
  }

  async hashAndUpdatePassword_(newPassword: string, user?: IGenericUserDTO) {
    if (!user) {
      throw new AppError('User not found', 401);
    }
    newPassword = await this.hashPassword_(newPassword);

    return await this.dbHelper.updateUser_(user, { password: newPassword });
  }
}
