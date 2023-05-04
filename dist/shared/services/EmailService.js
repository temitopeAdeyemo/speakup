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
    async transactionMailFund(recipient, receiver_name, account_number, amount, newBalance, description, reference_number, type) {
        let subject = 'Phast Transaction Notification';
        let content = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PhastPay</title>
  <style>
    *{
      margin: 0;
      padding: 0;
    }
    html,
    body,
    table,
    tbody,
    tr,
    td,
    div,
    p,
    ul,
    ol,
    li,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 0;
      padding: 0;
    }

    body {
      margin: 0;
      padding: 0;
      font-size: 0;
      line-height: 0;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    }

    table {
      border-spacing: 0;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    table td {
      border-collapse: collapse;
    }

    .ExternalClass {
      width: 100%;
    }

    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
      line-height: 100%;
    }
    /* Outermost container in Outlook.com */

    .ReadMsgBody {
      width: 100%;
    }

    img {
      -ms-interpolation-mode: bicubic;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: Arial;
    }

    h1 {
      font-size: 16px;
      font-weight: 500;
      line-height: 32px;
      padding-top: 30px;
    }

    h2 {
      font-size: 24px;
      line-height: 28px;
      padding-top: 10px;
      padding-bottom: 20px;
    }

    h3 {
      font-size: 20px;
      line-height: 24px;
      padding-top: 10px;
      padding-bottom: 16px;
    }

    p {
      font-size: 16px;
      line-height: 20px;
      font-family: Georgia, Arial, sans-serif;
    }

    </style>

    <style>

      .container600 {
        width: 600px;
        max-width: 100%;
      }

    @media all and (max-width: 2000px) {
      .container600 {
        width: 100% !important;
      }

      .smarttable {
        border: 0;
      }
      .smarttable tr {
        display: block;
        width:95%;
        margin: 20px auto 0;
      }
      .smarttable td {
        display: block;
        font-size: 15px;
        text-align: left;
      }
      .smarttable td:before {
        /* content: attr(data-label); */
        font-weight: bold;
        text-align: right;
        text-transform: capitalize;
      }

    }
  </style>

   <!--[if gte mso 9]>
        <style>
            .ol {
              width: 100%;
            }
        </style>
    <![endif]-->

</head>
<body style="background-color:#ffffff;">
    <center>

        <!--[if gte mso 9]><table width="600" cellpadding="0" cellspacing="0"><tr><td>
                    <![endif]-->
      <table class="container600" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:calc(100%);max-width:calc(600px);margin: 0 auto;">
        <tr>
          <td width="100%" style="text-align: left;">

                <table width="100%" cellpadding="0" cellspacing="0" style="min-width:100%;">
                  <tr>
                    <td style="background-color: #00529C;;color:#000000;padding:30px;">
                    </td>
                  </tr>
                </table>
                <table width="100%" cellpadding="0" cellspacing="0" style="min-width:100%;">
                  <tr>
                    <td style="background-color:#ffffff;color:#000000;padding:0 20px;">
                      <h1>Dear ${receiver_name},</h1>
                      <p>Your account has been Credited <span style="font-weight: bold;">NGN${Number(amount) / 100}</span></p>
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color:#ffffff;color:#000000;padding:0 20px;"><p style="font-weight: bold; margin-top: 20px;">Transaction Summary</p></td>
                  </tr>
                  <tr>
                    <td style="padding:0px;">

                        <table class="smarttable" width="100%" cellpadding="0" cellspacing="0" style="min-width:100%;">

                          <tbody>
                            <tr>
                              <td valign="top" style="padding:5px; display: flex;  align-items: center; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><p style="padding: 10px 20px 10px 10px; background-color:#ccdceb; ">A/C Number</p><span style="font-size: 13px; margin-left: 10px;">${account_number?.substring(4, 7)}****${account_number?.substring(11)}</span></td>
                              <td valign="top" style="padding:5px; display: flex;  align-items: center; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><p style="padding: 10px 20px 10px 10px; background-color:#ccdceb; ">Account Name</p><span style="font-size: 13px; margin-left: 10px;">${receiver_name}</span></td>
                              <td valign="top" style="padding:5px; display: flex;  align-items: center; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><p style="padding: 10px 20px 10px 10px; background-color:#ccdceb; ">Description</p><span style="font-size: 13px; margin-left: 10px;">Funding</span></td>
                              <td valign="top" style="padding:5px; display: flex;  align-items: center; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><p style="padding: 10px 20px 10px 10px; background-color:#ccdceb; ">Transaction ID</p><span style="font-size: 13px; margin-left: 10px;">${reference_number}</span></td>
                              <td valign="top" style="padding:5px; display: flex;  align-items: center; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><p style="padding: 10px 20px 10px 10px; background-color:#ccdceb; ">Transaction Date</p><span style="font-size: 13px; margin-left: 10px;">${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}
                          </span></td>
                              <td valign="top" style="padding:5px; display: flex;  align-items: center; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><p style="padding: 10px 20px 10px 10px; background-color:#ccdceb; ">Transaction Time</p><span style="font-size: 13px; margin-left: 10px;">${new Date().getHours() + 1}:${new Date().getMinutes()}:${new Date().getSeconds()}</span></td>
                              <td valign="top" style="padding:5px; display: flex;  align-items: center; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><p style="padding: 10px 20px 10px 10px; background-color:#ccdceb; "> Available Balance</p><span style="font-size: 13px; margin-left: 10px;">${Number(newBalance) / 100}</span></td>
                            </tr>
                          </tbody>
                        </table>

                    </td>
                  </tr>
                </table>

              </td>
        </tr>
    </table>

  <!--[if gte mso 9]></td></tr></table>
                    <![endif]-->
    </center>
</body>
</html>
Footer`;
        if (type?.debit) {
            subject = 'Phast Transaction Notification';
            content = `<p>Hi there, Your Account has been debited with ${Number(amount) / 100} <br/> Amount: ${Number(amount) / 100} <br/> Payment Number: ${reference_number} <br/> Date: ${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()} 
      Time : ${new Date().getHours() + 1}:${new Date().getMinutes()}:${new Date().getSeconds()}</p>`;
        }
        await this.sendEmail(recipient, subject, content);
    }
    async transactionMailCr(recipient, receiver_name, sender_name, account_number, amount, newBalance, description, reference_number, type) {
        let subject = 'Phast Transaction Notification';
        let content = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PhastPay</title>
  <style>
    *{
      margin: 0;
      padding: 0;
    }
    html,
    body,
    table,
    tbody,
    tr,
    td,
    div,
    p,
    ul,
    ol,
    li,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 0;
      padding: 0;
    }

    body {
      margin: 0;
      padding: 0;
      font-size: 0;
      line-height: 0;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    }

    table {
      border-spacing: 0;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    table td {
      border-collapse: collapse;
    }

    .ExternalClass {
      width: 100%;
    }

    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
      line-height: 100%;
    }
    /* Outermost container in Outlook.com */

    .ReadMsgBody {
      width: 100%;
    }

    img {
      -ms-interpolation-mode: bicubic;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: Arial;
    }

    h1 {
      font-size: 16px;
      font-weight: 500;
      line-height: 32px;
      padding-top: 30px;
    }

    h2 {
      font-size: 24px;
      line-height: 28px;
      padding-top: 10px;
      padding-bottom: 20px;
    }

    h3 {
      font-size: 20px;
      line-height: 24px;
      padding-top: 10px;
      padding-bottom: 16px;
    }

    p {
      font-size: 16px;
      line-height: 20px;
      font-family: Georgia, Arial, sans-serif;
    }

    </style>

    <style>

      .container600 {
        width: 600px;
        max-width: 100%;
      }

    @media all and (max-width: 2000px) {
      .container600 {
        width: 100% !important;
      }

      .smarttable {
        border: 0;
      }
      .smarttable tr {
        display: block;
        width:95%;
        margin: 20px auto 0;
      }
      .smarttable td {
        display: block;
        font-size: 15px;
        text-align: left;
      }
      .smarttable td:before {
        /* content: attr(data-label); */
        font-weight: bold;
        text-align: right;
        text-transform: capitalize;
      }

    }
  </style>

   <!--[if gte mso 9]>
        <style>
            .ol {
              width: 100%;
            }
        </style>
    <![endif]-->

</head>
<body style="background-color:#ffffff;">
    <center>

        <!--[if gte mso 9]><table width="600" cellpadding="0" cellspacing="0"><tr><td>
                    <![endif]-->
      <table class="container600" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:calc(100%);max-width:calc(600px);margin: 0 auto;">
        <tr>
          <td width="100%" style="text-align: left;">

                <table width="100%" cellpadding="0" cellspacing="0" style="min-width:100%;">
                  <tr>
                    <td style="background-color: #00529C;;color:#000000;padding:30px;">
                    </td>
                  </tr>
                </table>
                <table width="100%" cellpadding="0" cellspacing="0" style="min-width:100%;">
                  <tr>
                    <td style="background-color:#ffffff;color:#000000;padding:0 20px;">
                      <h1>Dear ${receiver_name},</h1>
                      <p>Your account has been Credited <span style="font-weight: bold;">NGN${Number(amount) / 100}</span></p>
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color:#ffffff;color:#000000;padding:0 20px;"><p style="font-weight: bold; margin-top: 20px;">Transaction Summary</p></td>
                  </tr>
                  <tr>
                    <td style="padding:0px;">

                        <table class="smarttable" width="100%" cellpadding="0" cellspacing="0" style="min-width:100%;">

                          <tbody>
                            <tr>
                              <td valign="top" style="padding:5px; display: flex;  align-items: center; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><p style="padding: 10px 20px 10px 10px; background-color:#ccdceb; ">Wallet ID</p><span style="font-size: 13px; margin-left: 10px;">${account_number?.substring(4, 7)}****${account_number?.substring(11)}</span></td>
                              <td valign="top" style="padding:5px; display: flex;  align-items: center; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><p style="padding: 10px 20px 10px 10px; background-color:#ccdceb; ">Account Name</p><span style="font-size: 13px; margin-left: 10px;">${receiver_name}</span></td>
                              <td valign="top" style="padding:5px; display: flex;  align-items: center; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><p style="padding: 10px 20px 10px 10px; background-color:#ccdceb; ">Description</p><span style="font-size: 13px; margin-left: 10px;">${description}/FROM ${sender_name}</span></td>
                              <td valign="top" style="padding:5px; display: flex;  align-items: center; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><p style="padding: 10px 20px 10px 10px; background-color:#ccdceb; ">Transaction ID</p><span style="font-size: 13px; margin-left: 10px;">${reference_number}</span></td>
                              <td valign="top" style="padding:5px; display: flex;  align-items: center; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><p style="padding: 10px 20px 10px 10px; background-color:#ccdceb; ">Transaction Date</p><span style="font-size: 13px; margin-left: 10px;">${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}
                          </span></td>
                              <td valign="top" style="padding:5px; display: flex;  align-items: center; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><p style="padding: 10px 20px 10px 10px; background-color:#ccdceb; ">Transaction Time</p><span style="font-size: 13px; margin-left: 10px;">${new Date().getHours() + 1}:${new Date().getMinutes()}:${new Date().getSeconds()}</span></td>
                              <td valign="top" style="padding:5px; display: flex;  align-items: center; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><p style="padding: 10px 20px 10px 10px; background-color:#ccdceb; "> Available Balance</p><span style="font-size: 13px; margin-left: 10px;">${Number(newBalance) / 100}</span></td>
                            </tr>
                          </tbody>
                        </table>

                    </td>
                  </tr>
                </table>

              </td>
        </tr>
    </table>

  <!--[if gte mso 9]></td></tr></table>
                    <![endif]-->
    </center>
</body>
</html>
Footer`;
        this.sendEmail(recipient, subject, content);
    }
    async transactionMailDr(recipient, receiver_name, sender_name, account_number, amount, newBalance, description, reference_number, type) {
        let subject = 'Phast Transaction Notification';
        let content = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PhastPay</title>
  <style>
    *{
      margin: 0;
      padding: 0;
    }
    html,
    body,
    table,
    tbody,
    tr,
    td,
    div,
    p,
    ul,
    ol,
    li,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 0;
      padding: 0;
    }

    body {
      margin: 0;
      padding: 0;
      font-size: 0;
      line-height: 0;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    }

    table {
      border-spacing: 0;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    table td {
      border-collapse: collapse;
    }

    .ExternalClass {
      width: 100%;
    }

    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
      line-height: 100%;
    }
    /* Outermost container in Outlook.com */

    .ReadMsgBody {
      width: 100%;
    }

    img {
      -ms-interpolation-mode: bicubic;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: Arial;
    }

    h1 {
      font-size: 16px;
      font-weight: 500;
      line-height: 32px;
      padding-top: 30px;
    }

    h2 {
      font-size: 24px;
      line-height: 28px;
      padding-top: 10px;
      padding-bottom: 20px;
    }

    h3 {
      font-size: 20px;
      line-height: 24px;
      padding-top: 10px;
      padding-bottom: 16px;
    }

    p {
      font-size: 16px;
      line-height: 20px;
      font-family: Georgia, Arial, sans-serif;
    }

    </style>

    <style>

      .container600 {
        width: 600px;
        max-width: 100%;
      }

    @media all and (max-width: 2000px) {
      .container600 {
        width: 100% !important;
      }

      .smarttable {
        border: 0;
      }
      .smarttable tr {
        display: block;
        width:95%;
        margin: 20px auto 0;
      }
      .smarttable td {
        display: block;
        font-size: 15px;
        text-align: left;
      }
      .smarttable td:before {
        /* content: attr(data-label); */
        font-weight: bold;
        text-align: right;
        text-transform: capitalize;
      }

    }
  </style>

   <!--[if gte mso 9]>
        <style>
            .ol {
              width: 100%;
            }
        </style>
    <![endif]-->

</head>
<body style="background-color:#ffffff;">
    <center>

        <!--[if gte mso 9]><table width="600" cellpadding="0" cellspacing="0"><tr><td>
                    <![endif]-->
      <table class="container600" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:calc(100%);max-width:calc(600px);margin: 0 auto;">
        <tr>
          <td width="100%" style="text-align: left;">

                <table width="100%" cellpadding="0" cellspacing="0" style="min-width:100%;">
                  <tr>
                    <td style="background-color: #00529C;;color:#000000;padding:30px;">
                    </td>
                  </tr>
                </table>
                <table width="100%" cellpadding="0" cellspacing="0" style="min-width:100%;">
                  <tr>
                    <td style="background-color:#ffffff;color:#000000;padding:0 20px;">
                      <h1>Dear ${sender_name},</h1>
                      <p>Your account has been Debited <span style="font-weight: bold;">NGN${Number(amount) / 100}</span></p>
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color:#ffffff;color:#000000;padding:0 20px;"><p style="font-weight: bold; margin-top: 20px;">Transaction Summary</p></td>
                  </tr>
                  <tr>
                    <td style="padding:0px;">

                        <table class="smarttable" width="100%" cellpadding="0" cellspacing="0" style="min-width:100%;">

                          <tbody>
                            <tr>
                              <td valign="top" style="padding:5px; display: flex;  align-items: center; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><p style="padding: 10px 20px 10px 10px; background-color:#ccdceb; ">Wallet ID</p><span style="font-size: 13px; margin-left: 10px;">${account_number?.substring(4, 7)}****${account_number?.substring(11)}</span></td>
                              <td valign="top" style="padding:5px; display: flex;  align-items: center; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><p style="padding: 10px 20px 10px 10px; background-color:#ccdceb; ">Account Name</p><span style="font-size: 13px; margin-left: 10px;">${sender_name}</span></td>
                              <td valign="top" style="padding:5px; display: flex;  align-items: center; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><p style="padding: 10px 20px 10px 10px; background-color:#ccdceb; ">Description</p><span style="font-size: 13px; margin-left: 10px;">${description}/TO ${receiver_name}</span></td>
                              <td valign="top" style="padding:5px; display: flex;  align-items: center; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><p style="padding: 10px 20px 10px 10px; background-color:#ccdceb; ">Transaction ID</p><span style="font-size: 13px; margin-left: 10px;">${reference_number}</span></td>
                              <td valign="top" style="padding:5px; display: flex;  align-items: center; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><p style="padding: 10px 20px 10px 10px; background-color:#ccdceb; ">Transaction Date</p><span style="font-size: 13px; margin-left: 10px;">${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}
                          </span></td>
                              <td valign="top" style="padding:5px; display: flex;  align-items: center; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><p style="padding: 10px 20px 10px 10px; background-color:#ccdceb; ">Transaction Time</p><span style="font-size: 13px; margin-left: 10px;">${new Date().getHours() + 1}:${new Date().getMinutes()}:${new Date().getSeconds()}</span></td>
                              <td valign="top" style="padding:5px; display: flex;  align-items: center; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;"><p style="padding: 10px 20px 10px 10px; background-color:#ccdceb; "> Available Balance</p><span style="font-size: 13px; margin-left: 10px;">${Number(newBalance) / 100}</span></td>
                            </tr>
                          </tbody>
                        </table>

                    </td>
                  </tr>
                </table>

              </td>
        </tr>
    </table>

  <!--[if gte mso 9]></td></tr></table>
                    <![endif]-->
    </center>
</body>
</html>
Footer`;
        this.sendEmail(recipient, subject, content);
    }
    async sendWelcomeMail(recipient, name) {
        let subject = 'Welcome To Phast!';
        let content = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>welcome message</title>
    <style>
      .content {
        padding-top: 50px;
        width: 90%;
        margin: 0 auto;
      }
      .content h2 {
        margin-bottom: 20px;
      }
      .content p {
        line-height: 24px;
        font-size: 14px;
        margin-top: 20px;
      }
      ul {
        width: 90%;
        margin: 0 auto;
        font-weight: 700;
        line-height: 24px;
        margin-bottom: 30px;
      }
      ol {
        width: 90%;
        margin: 0 auto;
        margin-bottom: 20px;
        line-height: 20px;
      }
    </style>
  </head>
  <body>
    <header></header>
    <div class="content">
      <h2>Welcome message</h2>
      <div class="contentText">
        <p>
          Dear ${name},<br />
          Hi,<br />
          I’m Demola and I welcome you to phast.Start enjoying a new
          dispensation of everything concerning your money and financial
          management.
        </p>
      </div>
      <div class="service">
        <p>Here’s a quick list of the services we offer you</p>
        <ol type="1">
          <li>Money Transfers</li>
          <li>Virtual card</li>

          <li>services Savings</li>

          <li>Cashback</li>

          <li>Bill payments</li>
        </ol>
        <p>
          Start using the app now, to enjoy these features and achieve your
          money goals!
        </p>
      </div>
      <div>
        <p>Remember that scammers are real!</p>
        <ul>
          <li>
            Use strong characters for your Password and all your PINs
            (Preferably not your Date of Birth).
          </li>
          <li>Keep your password and PINs safe!</li>
        </ul>
        <p>
          Welcome to phast once again!<br />
          Cheers,<br />
          Demola.
        </p>
      </div>
    </div>
  </body>
</html> `;
        this.sendEmail(recipient, subject, content);
    }
    async sendEmail(recipient, subject, content) {
        // const msg = {
        //   to: recipient,
        //   from: "info@phastpay.com",
        //   subject: subject,
        //   html: content,
        //   footer: false,
        // };
        // try {
        //   await this.client.send(msg);
        // } catch (error: any) {
        //   console.error(error);
        //   if (error.response) {
        //     console.error(error.response.body);
        //   }
        // }
        this.sendSmtpEmail.subject = subject;
        this.sendSmtpEmail.htmlContent = content;
        this.sendSmtpEmail.sender = { name: 'PHAST', email: 'info@phastpay.com' };
        this.sendSmtpEmail.to = [{ email: recipient[0], name: 'Phast User' }];
        // sendSmtpEmail.cc = [{ email: 'example2@example2.com', name: 'Janice Doe' }];
        // sendSmtpEmail.bcc = [{ email: 'John Doe', name: 'example@example.com' }];
        this.sendSmtpEmail.replyTo = {
            email: 'info@phastpay.com',
            name: 'PHAST',
        };
        this.sendSmtpEmail.headers = { 'Phast Service': 'unique-id-1234' };
        this.sendSmtpEmail.params = {
            parameter: 'My param value',
            subject: 'New Subject',
        };
        try {
            const response = await this.apiInstance.sendTransacEmail(this.sendSmtpEmail);
            console.log(response);
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.default = EmailService;
