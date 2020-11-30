import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class DtoPipe<T> implements PipeTransform<any, T> {

  constructor(
    private transformer: (value: any) => T
  ) { }

  transform(value: any, metadata: ArgumentMetadata): T {
    try {
      return this.transformer(value);
    } catch(err) {
      throw new BadRequestException();
    }
  }
}