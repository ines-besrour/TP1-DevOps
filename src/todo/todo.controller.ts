import { Controller, Get, Post, Delete, Put, Body, Param, NotFoundException, UseInterceptors, Patch, ParseIntPipe, Query } from '@nestjs/common';
import { TodoModel, TodoStatus } from './TodoModel';
import { v4 as uuidv4 } from 'uuid';
import { AddTodoDto } from './dto/add-todo.dto';
import { EditTodoDto } from './dto/edit-todo.dto';
import { TodoService } from './todo.service';
import { TodoEntity } from './entities/entities/TodoEntity';
import { SearchTodoDto } from './dto/search-todo-dto';


@Controller('todo')
export class TodoController {
  constructor(private todoService:TodoService){}
  
//  @Get()
//  async getTodos() {
//    return await this.todoService.getTodos();
//  }


  @Get()
  async getTodos(@Query() queryParam: SearchTodoDto): Promise<TodoEntity[]> {
    return await this.todoService.getTodos(queryParam);
  }

  @Post()
  async addTodoBD( @Body() todoData: AddTodoDto ): Promise<TodoEntity> {
    return await this.todoService.addTodoBD(todoData);
  }

  @Get('status')
  async nbTodoByState() {
    return await this.todoService.nbTodoByState();
  }


  @Get('/restore/:id')
  async restoreTodo(
    @Param('id')id)
    {
      return await this.todoService.restoreTodo(id);
    }

  @Get('/:id')
  async getTodoById(
    @Param('id')id
  ){
    return await this.todoService.getTodoById(id);
  }

  @Delete('/:id')
  async deleteTodoById(
    @Param('id')id
  ){
    return await this.todoService.softDeleteTodo(id);
  }

  @Patch('/:id')
  async editTodo(
    @Param('id')id,
    @Body() todo: Partial<EditTodoDto>
  ): Promise<TodoEntity>  {
    return await this.todoService.editTodo(id,todo);
  }
}
