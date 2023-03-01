import { Controller, Get, Post, Delete, Put, Body, Param, NotFoundException } from '@nestjs/common';
import { TodoModel, TodoStatus } from './TodoModel';
import { v4 as uuidv4 } from 'uuid';
import { AddTodoDto } from './dto/add-todo.dto';
import { EditTodoDto } from './dto/edit-todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService:TodoService){}
  
  @Get()
  getTodos() {
    return this.todoService.getTodos();
  }

  @Post()
  addTodo( @Body() todoData: AddTodoDto ) {
    return this.todoService.addTodo(todoData);
  }

  @Get('/:id')
  getTodoById(
    @Param('id')id
  ){
    return this.todoService.getTodoById(id);
  }

  @Delete('/:id')
  deleteTodoById(
    @Param('id')id
  ) {
    return this.todoService.deleteTodoById(id);
  }

  @Put('/:id')
  editTodo(
    @Param('id')id,
    @Body() newtodo: Partial<EditTodoDto>
  ) {
    return this.todoService.editTodo(id,newtodo);
  }
}
