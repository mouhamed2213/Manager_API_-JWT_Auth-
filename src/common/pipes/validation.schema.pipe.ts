import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import type { ZodSchema } from 'zod';

@Injectable()
export class ValidationSchemaPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}
  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const validateSchemas = this.schema.parse(value);
      return validateSchemas;
    } catch (error) {
      // const [ZodError] = ;
      console.log('Error with the data validation ', error.message);
      throw new BadRequestException();
    }
  }
}
