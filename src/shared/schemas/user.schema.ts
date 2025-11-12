import { z } from 'zod';

// validate dat
export const userSchema = z.object({
  email: z.email().nonempty(),
  password: z.string().min(3, 'minimun 3 caractere'),
  role: z.enum(['admin', 'user']),
});

export type UserDto = z.infer<typeof userSchema>;
