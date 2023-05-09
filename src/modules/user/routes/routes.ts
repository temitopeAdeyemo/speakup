import { Router } from 'express';
import {
  createUser,
  authUser,
  verifyPhoneController,
  getPhoneOtpController,
  resetPasswordController,
  forgotPasswordController,
  verifyEmailController,
  getEmailOtpController
} from '../controllers';

import {
  registerValidator,
  loginValidator,
  VerifyPhoneValidator,
  GetPhoneOtpValidator,
  resetPasswordValidator,
  ForgotPasswordValidator,
  verifyEmailValidator,
  getEmailValidator
} from '../validators/';
const router = Router();

router.post(
  '/register',
  registerValidator,
  createUser.register.bind(createUser)
);

router.post('/login', loginValidator, authUser.login.bind(authUser));

router.patch(
  '/verify-phone-number',
  VerifyPhoneValidator,
  verifyPhoneController.verify.bind(verifyPhoneController)
);

router.patch(
  '/verify-email',
  verifyEmailValidator,
  verifyEmailController.verify.bind(verifyEmailController)
);

router.post(
  '/verify',
  GetPhoneOtpValidator,
  getPhoneOtpController.getOtp.bind(getPhoneOtpController)
);

router.post(
  '/verify-email',
  getEmailValidator,
  getEmailOtpController.getOtp.bind(getEmailOtpController)
);

router.patch(
  '/reset-password',
  resetPasswordValidator,
  resetPasswordController.reset.bind(resetPasswordController)
);

router.patch(
  '/forgot-password',
  ForgotPasswordValidator,
  forgotPasswordController.getOtp.bind(forgotPasswordController)
);

export default router;
