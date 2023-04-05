import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export enum ErrorsEnum {
    REQUIRED_FIELD = 'You need to fill this field',
    IS_STRING = 'This field must be a string',
    IS_NUMBER = 'This field must be a number',
    MAX_LENGTH_10 = 'This field must be less than 10 characters',
  }

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber(
    {},
    {
      message: ErrorsEnum.IS_NUMBER,
    },
  )
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber(
    {},
    {
      message: ErrorsEnum.IS_NUMBER,
    },
  )
  limit?: number;
}