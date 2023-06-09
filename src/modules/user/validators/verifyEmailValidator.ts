import { celebrate, Joi, Segments } from 'celebrate';

export default celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required(),
    otp: Joi.string().required(),
  }),
});
