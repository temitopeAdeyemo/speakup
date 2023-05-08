"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SibApiV3Sdk = require('sib-api-v3-sdk');
const environments_config_1 = __importDefault(require("../../config/environments.config"));
class EmailService {
    constructor() {
        this.defaultClient = SibApiV3Sdk.ApiClient.instance;
        this.apiKey = this.defaultClient.authentications['api-key'];
        this.apiKey.apiKey = environments_config_1.default.sendInBlueApiKey;
        // this.client = client.setApiKey(environment.sendgridApiKey);
        this.apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        this.sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    }
    async sendOTP(recipient, otp, options) {
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
    async sendWelcomeMail(recipient, name) {
        let subject = 'Welcome To Speak Up!';
        let content = `<h1>Welcome</h1>`;
        this.sendEmail(recipient, subject, content);
    }
    async sendEmail(recipient, subject, content) {
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
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.default = EmailService;
