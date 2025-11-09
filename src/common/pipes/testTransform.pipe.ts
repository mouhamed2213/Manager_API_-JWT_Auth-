import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class TestTransformPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('value Passed ', value, ' =>  ', typeof value);
    if (isNaN(value)) {
      throw new BadRequestException('value should be a number');
    }

    const transfomValue = parseInt(value, 10);
    console.log(
      'Value Tranformed ',
      transfomValue,
      ' => ',
      typeof transfomValue,
    );
    console.log('Metadata ', metadata);
    return transfomValue;
  }
}
