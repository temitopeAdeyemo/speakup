const credentials = {
  apiKey: "procesAFRICASTALKING_API_KEY",
  username: "processAFRICASTALKING_USERNAME",
};

const Africastalking = require('africastalking')(credentials);

class SmsService {
  private sendSMS: any;
  constructor() {
    this.sendSMS = Africastalking.SMS;
  }

  public async sendOtp(
    type: 'passReset' | 'verifyPhone' | 'verifyEmail',
    smsRecipient: string,
    otp: string
  ) {
    switch (type) {
      case 'passReset':
        return this.send(
          smsRecipient,
          `Hi  Use the OTP below to verify your SpeakUp phone number.
${otp}`
        );

      case 'verifyPhone':
        return this.send(
          smsRecipient,
          `Hi  Use the OTP below to verify your SpeakUp phone number.
${otp}`
        );
    }
  }

  public async send(smsRecipient: string, message: string) {
    const options = {
      to: smsRecipient,
      message: message,
      from: 'Speak Up',
    };
    return "Sent!"
    // this.sendSMS.send(options);
  }
}

export default SmsService;
