import { celebrate, Joi, Segments } from 'celebrate';
const pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,}$/;

export default celebrate({
  [Segments.BODY]: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .required()
      // .min(8)
      .pattern(pattern),
    phone_number: Joi.string().required().min(14),
  }),
});
