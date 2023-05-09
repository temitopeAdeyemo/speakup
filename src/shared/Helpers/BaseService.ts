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
  protected createUser = this.dbRepoHelper.createUser_.bind(this.dbRepoHelper);

  // protected updateAccInfo = this.dbRepoHelper.updateAccInfo_;

  protected throwCredTaken = this.dbRepoHelper.credentialTaken_.bind(
    this.dbRepoHelper
  );

  protected getUser = this.dbRepoHelper.getUser_.bind(this.dbRepoHelper);

  protected sendOtpMail = this.emailSmsHelper.sendOtpMail_.bind(
    this.emailSmsHelper
  );

  protected hashPassword = this.passwordHelpers.hashPassword_.bind(
    this.passwordHelpers
  );

  protected checkPassword = this.passwordHelpers.checkPassword_.bind(
    this.passwordHelpers
  );

  protected cacheOtp = this.otpHelper.cacheOtp_.bind(this.otpHelper);

  protected generatedOtp = this.generateOTP;

  protected sendOtpSms = this.emailSmsHelper.sendOtpSms_.bind(
    this.emailSmsHelper
  );

  protected returnNumberOREmail = this.extraHelpers.returnNumberOREmail_.bind(
    this.extraHelpers
  );

  protected sendOtpEmailOrSms = this.emailSmsHelper.sendOtpEmailOrSms_.bind(
    this.emailSmsHelper
  );

  protected getUserByPhoneOREmail =
    this.dbRepoHelper.getUserByPhoneOREmail_.bind(this.dbRepoHelper);

  protected throwCredVerified =
    this.extraHelpers.checkCredentialNotVerified_.bind(this.extraHelpers);

  protected throwCredNotVerified =
    this.extraHelpers.checkCredentialVerified_.bind(this.extraHelpers);

  protected getAndValidateOtp = this.otpHelper.getAndValidateOtp_.bind(
    this.otpHelper
  );

  protected updateUser = this.dbRepoHelper.updateUser_.bind(this.dbRepoHelper);

  protected hashAndUpdatePassword =
    this.passwordHelpers.hashAndUpdatePassword_.bind(this.passwordHelpers);

  protected deleteCachedOtp = this.otpHelper.deleteCachedOtp_.bind(
    this.otpHelper
  );

  protected getCachedOtp = this.otpHelper.getCachedOtp_.bind(this.otpHelper);
}
