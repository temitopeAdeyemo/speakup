export default interface IGenericUserDTO {
  password?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  phone_number_verified?: boolean;
  email_verified?: boolean;
  bvn_verified?: boolean;
}
