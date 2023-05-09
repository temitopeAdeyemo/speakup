import AppError from '../utils/AppError';
import UserRepository from '../../modules/user/models/repositories/UserRepository';
import IGenericUserDTO from '../../modules/user/dtos/IUserDTO';
import ICreateUserDTO from '../../modules/user/dtos/ICreateUserDTO';

export type CredentialTypes = 'email' | 'phone_number';

export default class DbRepoHelper {
  protected readonly userRepository = new UserRepository();

  async createUser_(data: ICreateUserDTO) {
    await this.userRepository.create(data);
  }

  async credentialTaken_(credential: CredentialTypes, value: string) {
    const userExists = await this.userRepository.findByPhoneOrEmail(
      credential,
      value
    );
    console.log(888888, userExists);

    if (userExists) {
      throw new AppError(`${credential} taken.`, 400);
    }
  }

  async getUser_(credential: CredentialTypes, value: string) {
    const user = await this.userRepository.findByPhoneOrEmail(
      credential,
      value
    );

    if (!user) {
      throw new AppError(`Invalid Credentials.`, 401);
    }

    return user;
  }

  getUserByPhoneOREmail_(email?: string, phone_number?: string) {
    if (email) return this.getUser_('email', email);
    else if (phone_number) return this.getUser_('phone_number', phone_number);
  }

  async updateUser_(data: IGenericUserDTO, user: IGenericUserDTO) {
    user = { ...user, ...data };
    await this.userRepository.save(user);
  }
}
