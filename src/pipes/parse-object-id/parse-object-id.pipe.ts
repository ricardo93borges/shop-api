import { ObjectId } from 'mongodb';
import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, ObjectId> {
  transform(value: any, metadata: ArgumentMetadata): ObjectId {
    try {
      return new ObjectId(value);
    } catch (error) {
      throw new BadRequestException('Invalid ID');
    }
  }
}
