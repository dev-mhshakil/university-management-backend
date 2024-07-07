import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string({ invalid_type_error: 'Name must be a string' })
    .max(20, 'Password cannot be more than 20 characters')
    .optional(),
});

export const UserValidation = {
  userValidationSchema,
};
