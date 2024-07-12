import { BadRequestException } from '@nestjs/common';
import mongoose from 'mongoose';

export class MongooseValidator {
  /**
   *  Validate if the id is a valid mongoose id
   * @param id id of the document
   */
  static validateId(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid id');
    }
  }
}
