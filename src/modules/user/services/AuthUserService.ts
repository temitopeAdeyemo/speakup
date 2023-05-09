import ILoginDTO from '../dtos/ILoginDTO';
import BaseService, { IBaseService } from './BaseService';

class AuthUserService extends BaseService implements IBaseService {
  async execute(data: ILoginDTO): Promise<object> {
    this.checkPassword;
    const user = await this.getUser('email', data.email);

    await this.checkPassword(data.password, user.password);

    await this.throwCredNotVerified('email', user);

    const accessToken = this.jwtClient.generateAccessToken({ id: user.id });

    return { access_token: accessToken };
  }
}

export default AuthUserService;
