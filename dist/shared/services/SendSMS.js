"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const credentials = {
    apiKey: "procesAFRICASTALKING_API_KEY",
    username: "processAFRICASTALKING_USERNAME",
};
const Africastalking = require('africastalking')(credentials);
class SmsService {
    constructor() {
        this.sendSMS = Africastalking.SMS;
    }
    async sendOtp(type, smsRecipient, otp) {
        switch (type) {
            case 'passReset':
                return this.send(smsRecipient, `Hi  Use the OTP below to verify your SpeakUp phone number.
${otp}`);
            case 'verifyPhone':
                return this.send(smsRecipient, `Hi  Use the OTP below to verify your SpeakUp phone number.
${otp}`);
        }
    }
    async send(smsRecipient, message) {
        const options = {
            to: smsRecipient,
            message: message,
            from: 'Speak Up',
        };
        return "Sent!";
        // this.sendSMS.send(options);
    }
}
exports.default = SmsService;
