import { generateOTP } from '../utils';
import * as uuid from 'uuid';
import DbRepoHelper from './DbRepoHelper';
import EmailSmsHelper from './EmailSmsHelper';
import OtpHelper from './OtpHelper';
import PasswordHelpers from './PasswordHelpers';
import ExtraHelpers from './ExtraHelpers';
// import UserRepository from '../../modules/user/models/repositories/UserRepository';
import JwtClient from '../services/JWT';

export type IBaseResponse = null | void | object;
export type CredentialTypes = 'email' | 'phone_number';

export interface IBaseService {
  execute: (args: any) => Promise<IBaseResponse>;
}

export default abstract class BaseService {
  private readonly dbRepoHelper = new DbRepoHelper();
  private readonly emailSmsHelper = new EmailSmsHelper();
  private readonly otpHelper = new OtpHelper();
  private readonly passwordHelpers = new PasswordHelpers();
  private readonly extraHelpers = new ExtraHelpers();
  protected readonly jwtClient = new JwtClient();

  /**
   * This property returns a generated otp
   */
  protected readonly generateOTP = generateOTP();

  /**
   * This property returns a generated uuid number
   */
  protected readonly uuid = uuid.v4();

  /**
   * This property creates a user when called.
   */
  protected createUser = this.dbRepoHelper.createUser_;

  // protected updateAccInfo = this.dbRepoHelper.updateAccInfo_;

  protected throwCredTaken = this.dbRepoHelper.credentialTaken_;

  protected getUser = this.dbRepoHelper.getUser_;

  protected sendOtpMail = this.emailSmsHelper.sendOtpMail_;

  protected hashPassword = this.passwordHelpers.hashPassword_;

  protected checkPassword = this.passwordHelpers.checkPassword_;

  protected cacheOtp = this.otpHelper.cacheOtp_;

  protected generatedOtp = this.generateOTP;

  protected sendOtpSms = this.emailSmsHelper.sendOtpSms_;

  protected returnNumberOREmail = this.extraHelpers.returnNumberOREmail_;

  protected sendOtpEmailOrSms = this.emailSmsHelper.sendOtpEmailOrSms_;

  protected getUserByPhoneOREmail = this.dbRepoHelper.getUserByPhoneOREmail_;

  protected throwCredVerified = this.extraHelpers.checkCredentialNotVerified_;

  protected throwCredNotVerified = this.extraHelpers.checkCredentialVerified_;

  protected getAndValidateOtp = this.otpHelper.getAndValidateOtp_;

  protected updateUser = this.dbRepoHelper.updateUser_;

  protected hashAndUpdatePassword = this.passwordHelpers.hashAndUpdatePassword_;

  protected deleteCachedOtp = this.otpHelper.deleteCachedOtp_;

  protected getCachedOtp = this.otpHelper.getCachedOtp_;
}
