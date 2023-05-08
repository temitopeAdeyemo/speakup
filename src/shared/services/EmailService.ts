const SibApiV3Sdk = require('sib-api-v3-sdk');

import environment from '../../config/environments.config';

class EmailService {
  private client: any;
  private apiInstance;
  private sendSmtpEmail;
  private apiKey;
  private defaultClient;

  constructor() {
    this.defaultClient = SibApiV3Sdk.ApiClient.instance;
    this.apiKey = this.defaultClient.authentications['api-key'];
    this.apiKey.apiKey = environment.sendInBlueApiKey;
    // this.client = client.setApiKey(environment.sendgridApiKey);
    this.apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    this.sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  }

  async sendOTP(
    recipient: Array<string>,
    otp: string,
    options?: {
      passReset?: boolean;
      pinReset?: boolean;
      verifyEmail?: boolean;
    }
  ) {
    let subject = 'Verify Your Account';
    let content = `<p>Hi there, <br/>Kindly verify your account with this code: ${otp}</p>`;

    if (options?.passReset) {
      subject = 'Reset Your Password';
      content = `<p>Hi there, <br/>Kindly reset your password with this code: ${otp}</p>`;
    }

    if (options?.verifyEmail) {
      subject = 'Verify Email';
      content = `<p>Hi there, <br/>Kindly verify your email with this code: ${otp}</p>`;
    }

    if (options?.pinReset) {
      subject = 'Reset Your Pin';
      content = `<p>Hi there, <br/>Kindly reset your pin with this code: ${otp}</p>`;
    }

    await this.sendEmail(recipient, subject, content);
  }

  async sendWelcomeMail(recipient: Array<string>, name: string) {
    let subject = 'Welcome To Speak Up!';
    let content = `<h1>Welcome</h1>`
    this.sendEmail(recipient, subject, content);
  }

  async sendEmail(recipient: Array<string>, subject: string, content: string) {


    this.sendSmtpEmail.subject = subject;
    this.sendSmtpEmail.htmlContent = content;
    this.sendSmtpEmail.sender = { name: '', email: '' };
    this.sendSmtpEmail.to = [{ email: recipient[0], name: '' }];
    // sendSmtpEmail.cc = [{ email: 'example2@example2.com', name: 'Janice Doe' }];
    // sendSmtpEmail.bcc = [{ email: 'John Doe', name: 'example@example.com' }];
    this.sendSmtpEmail.replyTo = {
      email: '',
      name: '',
    };

    this.sendSmtpEmail.headers = { 'SpeakUp Service': 'unique-id-1234' };
    this.sendSmtpEmail.params = {
      parameter: 'My param value',
      subject: 'New Subject',
    };

    try {
      // const response = await this.apiInstance.sendTransacEmail(
      //   this.sendSmtpEmail
      // );

      console.log("Mail Sent!");
    } catch (error: any) {
      console.error(error);
    }
  }
}
export default EmailService;
