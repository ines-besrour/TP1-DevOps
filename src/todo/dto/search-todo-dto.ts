import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { TodoStatus } from '../TodoModel';
import { PaginationDto } from './pagination-dto';




export class SearchTodoDto extends PaginationDto{
  @IsOptional()
  @IsString()
  @MaxLength(10)
  data: string;

  @IsOptional()
  @IsEnum(TodoStatus)
  status?: TodoStatus;
}