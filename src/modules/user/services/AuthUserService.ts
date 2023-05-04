import ILoginDTO from '../dtos/ILoginDTO';
import BaseService, { IBaseService } from './BaseService';

class AuthUserService extends BaseService implements IBaseService {
  async execute(data: ILoginDTO): Promise<{ access_token: string }> {
    const user = await this.getUser('email', data.email);

    this.checkCredentialVerified('phone_number', user);

    await this.checkPassword(data.password, user.password);

    const accessToken = this.jwtClient.generateAccessToken({ id: user.id });

    return { access_token: accessToken };
  }
}

export default AuthUserService;
