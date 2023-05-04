import { Router } from 'express';
import {
  CreateUser,
  AuthUser,
  VerifyPhoneController,
  GetPhoneOtpController,
  ResetPasswordController,
  ForgotPasswordController,
} from '../controllers';

import {
  registerValidator,
  loginValidator,
  VerifyPhoneValidator,
  GetPhoneOtpValidator,
  resetPasswordValidator,
  ForgotPasswordValidator,
} from '../validators/';
const router = Router();

router.post(
  '/register',
  registerValidator,
  CreateUser.register.bind(CreateUser)
);

router.post('/login', loginValidator, AuthUser.login.bind(AuthUser));

router.patch(
  '/verify',
  VerifyPhoneValidator,
  VerifyPhoneController.verify.bind(VerifyPhoneController)
);

router.post(
  '/verify',
  GetPhoneOtpValidator,
  GetPhoneOtpController.getOtp.bind(GetPhoneOtpController)
);

router.patch(
  '/reset-password',
  resetPasswordValidator,
  ResetPasswordController.reset.bind(ResetPasswordController)
);

router.patch(
  '/forgot-password',
  ForgotPasswordValidator,
  ForgotPasswordController.getOtp.bind(ForgotPasswordController)
);

export default router;
