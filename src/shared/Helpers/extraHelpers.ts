import AppError from '../utils/AppError';
import UserRepository from '../../modules/user/models/repositories/UserRepository';
import IGenericUserDTO from '../../modules/user/dtos/IUserDTO';
import DbRepoHelper from './DbRepoHelper';

export type CredentialTypes = 'email' | 'phone_number';

export default class Extras {
  returnNumberOREmail_(email?: string, phone_number?: string) {
    if (email && phone_number) {
      throw new AppError('Provide either phone number or email address', 400);
    }
    return email || phone_number;
  }

  async checkCredentialNotVerified_(
    param: 'email' | 'phone_number',
    data: IGenericUserDTO
  ) {
    if (data[`${param}_verified`]) {
      throw new AppError(`${param} already verified`, 401);
    }
  }

  async checkCredentialVerified_(
    param: 'email' | 'phone_number',
    data: IGenericUserDTO
  ) {
    if (!data[`${param}_verified`]) {
      throw new AppError(`${param} not verified`, 401);
    }
  }
}
