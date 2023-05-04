export default interface IResetPasswordServiceDTO {
  phone_number?: string;
  email?: string;
  otp: string;
  new_password: string;
}