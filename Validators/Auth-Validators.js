const { z } = require('zod');

//creating oject schema

const registerSchema = z.object({
  username: z
    .string({ required_error: 'Name is required' })
    .trim()
    .min(3, { message: 'name at least 3 char' })
    .max(255, { message: 'name must not be more than 255 char' }),
  email: z
    .string({ required_error: 'Email is Required' })
    .email()
    .trim()
    .min(3, { message: 'Email at least 3 char' })
    .max(255, { message: 'Email must not be more than 255 char' }),
  phone: z
    .string({ required_error: 'Phone is required' })
    .trim()
    .min(10, { message: 'Phone at least 10 char' })
    .max(10, { message: 'Phone must not be more than 10 char' }),
  password: z
    .string({ required_error: 'Password is required' })
    .trim()
    .min(8, { message: 'Password must be at least 8 char' })
    .max(1024, { message: 'Password must not be more than 1024 char' }),
  isAdmin: z.boolean().optional(),
});

module.exports = { registerSchema };
