import AppError from '../../shared/utils/AppError';
import EmailService from '../../shared/services/EmailService';
import SmsService from '../../shared/services/SendSMS';

export default class EmailSmsHelper {
  private readonly emailService = new EmailService();

  private smsService = new SmsService();

  async sendOtpMail_(
    type: 'passReset' | 'verifyEmail' | 'pinReset',
    email: string,
    otp: string
  ) {
    let option: any = {};
    option[type] = true;

    if (email) await this.emailService.sendOTP([email], otp, option);
  }

  async sendOtpSms_(
    type: 'passReset' | 'verifyPhone',
    phone_number: string,
    otp: string
  ) {
    await this.smsService.sendOtp(type, phone_number, otp);
  }

  sendOtpEmailOrSms_(
    type: 'passReset',
    otp: string,
    email?: string,
    phone_number?: string
  ) {
    if (email) return this.sendOtpMail_(type, email, otp);
    else if (phone_number) return this.sendOtpSms_(type, phone_number, otp);
  }
}
