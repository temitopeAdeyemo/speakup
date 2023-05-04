import Bcrypt from '../../../shared/services/Bcrypt';
import AppError from '../../../shared/utils/AppError';
import UserRepository from '../models/repositories/UserRepository';
import { generateOTP } from '../../../shared/utils';
import EmailService from '../../../shared/services/EmailService';
import Cache from '../../../shared/services/Redis';
import * as uuid from 'uuid';
import JwtClient from '../../../shared/services/JWT';
import SmsService from '../../../shared/services/SendSMS';
import config from '../../../config/environments.config';
import User from '../models/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUpdateUserDTO from '../dtos/IUserDTO';

export type IBaseResponse = null | void | object;
export type CredentialTypes = 'email' | 'phone_number';

export interface IBaseService {
  execute: (args: any) => Promise<IBaseResponse>;
}

export default abstract class BaseService {
  protected readonly userRepository = new UserRepository();

  private readonly bcrypt = new Bcrypt();

  protected readonly jwtClient = new JwtClient();

  private readonly emailService = new EmailService();

  private smsService = new SmsService();

  private readonly cache = new Cache();

  private readonly generatedOTP = generateOTP();

  protected readonly uuid = uuid.v4();

  protected readonly otp = this.generatedOTP; // Be careful as this otp is used when you call this.otp

  protected async credentialTaken(credential: CredentialTypes, value: string) {
    const userExists = await this.userRepository.findByPhoneOrEmail(
      credential,
      value
    );

    if (userExists) {
      throw new AppError(`${credential} taken.`, 400);
    }
  }

  protected async getUser(credential: CredentialTypes, value: string) {
    const user = await this.userRepository.findByPhoneOrEmail(
      credential,
      value
    );

    if (!user) {
      throw new AppError(`Invalid Credentials.`, 401);
    }

    return user;
  }

  protected async sendOtpMail(
    type: 'passReset' | 'verifyEmail' | 'pinReset',
    email: string
  ) {
    let option: any = {};
    option[type] = true;

    if (email) await this.emailService.sendOTP([email], this.otp, option);
  }

  protected async sendOtpSms(
    type: 'passReset' | 'verifyPhone' | 'verifyEmail',
    phone_number: string
  ) {
    await this.smsService.sendOtp(type, phone_number, this.otp);
  }

  protected async hashPassword(Password: string) {
    return await this.bcrypt.hash(Password);
  }

  protected cacheOtp(key: any) {
    this.cache.set(key, this.otp, config.otpExpiresin);

    return key;
  }

  protected async checkPassword(password: string, hash: string) {
    const passwordMatch = await this.bcrypt.compare(password, hash);

    if (!passwordMatch) {
      throw new AppError('Invalid Credentials.', 401);
    }
  }

  protected returnNumberOREmail(email?: string, phone_number?: string) {
    if (email && phone_number) {
      throw new AppError('Provide either phone number or email address', 400);
    }
    return email || phone_number;
  }

  protected sendOtpEmailOrSms(
    type: 'passReset' | 'verifyEmail',
    email?: string,
    phone_number?: string
  ) {
    if (email) return this.sendOtpMail(type, email);
    else if (phone_number) return this.sendOtpSms(type, phone_number);
  }

  protected getUserByPhoneOREmail(email?: string, phone_number?: string) {
    if (email) return this.getUser('email', email);
    else if (phone_number) return this.getUser('phone_number', phone_number);
  }

  protected async checkCredentialNotVerified(
    param: 'email' | 'phone_number' | 'bvn',
    data: User
  ) {
    if (data[`${param}_verified`]) {
      throw new AppError(`${param} already verified`, 401);
    }
  }

  protected async checkCredentialVerified(
    param: 'email' | 'phone_number' | 'bvn',
    data: User
  ) {
    if (!data[`${param}_verified`]) {
      throw new AppError(`${param} not verified`, 401);
    }
  }

  protected async getAndValidateOtp(key: any, otp: string) {
    const cachedOtp = await this.cache.get(key);

    if (!cachedOtp) {
      throw new AppError('Invalid otp or otp expired.', 403);
    }

    if (cachedOtp != otp) {
      throw new AppError('Otp do not match.', 403);
    }
  }

  async updateUser(data: IUpdateUserDTO, user: User) {
    user = { ...user, ...data };
    await this.userRepository.save(user);
  }

  async hashAndUpdatePassword(newPassword: string, user?: User) {
    if (!user) {
      throw new AppError('User not found', 401);
    }
    newPassword = await this.hashPassword(newPassword);

    return await this.updateUser({ password: newPassword }, user);
  }

  async deleteCachedOtp(key: any) {
    this.cache.delete(key);
  }

  async getCachedOtp(key: any) {
    return await this.cache.get(key);
  }
}
