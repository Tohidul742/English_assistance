import { z } from 'zod';
import { AuthConstraints } from './auth.constraint.js';

export class AuthValidation {
  public static readonly loginValidationSchema = z.object({
    body: z.object({
      email: z.string().email({ message: 'Invalid email address' }),
      password: z.string().min(AuthConstraints.PASSWORD_MIN_LENGTH, {
        message: `Password must be at least ${AuthConstraints.PASSWORD_MIN_LENGTH} characters long`,
      }),
    }),
  });

  public static readonly signUpValidationSchema = z.object({
    body: z.object({
      user_name: z.string({ message: 'User name is required' }),
      email: z.string().email({ message: 'Invalid email address' }),
      password: z.string().min(AuthConstraints.PASSWORD_MIN_LENGTH, {
        message: `Password must be at least ${AuthConstraints.PASSWORD_MIN_LENGTH} characters long`,
      }),
    }),
  });
}
