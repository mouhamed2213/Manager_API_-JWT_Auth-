import { SetMetadata } from '@nestjs/common';

export const Public = (...args: string[] | boolean[]) =>
  SetMetadata('public', args);
