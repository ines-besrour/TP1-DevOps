import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { AddTodoDto } from './dto/add-todo.dto';
import { TodoModel, TodoStatus } from './TodoModel';
import { EditTodoDto } from './dto/edit-todo.dto';

@Injectable()
export class TodoService {
    @Inject('UUID') uuid: () => string;
    private todos: TodoModel[] = [];

    getTodos() : TodoModel[]{
        return this.todos;
    }

    addTodo(todoData : AddTodoDto) : TodoModel{
        const todo= new TodoModel(
            this.uuid(), // générer un id unique avec uuid
            new Date(), // utiliser la date courante pour la date de création
            TodoStatus.EnAttente // définir le statut par défaut sur "En attente"
          );
          const {name,description}= todoData;
          todo.name=name;
          todo.description=description;
      
          this.todos.push(todo);
          return todo;
    }

    getTodoById(id: string): TodoModel {
        const todo=this.todos.find((actualtodo)=>actualtodo.id === id)
        if(todo)
          return todo;
        throw new NotFoundException(`ce todo : ${id} n'existe pas`);
    }

    deleteTodoById(id) {
        const i=this.todos.findIndex((actualtodo)=>actualtodo.id === id)
        if(i>=0){
          this.todos.splice(i,1);
          return "todo deleted successfully";}
        else throw new NotFoundException(`ce todo : ${id} n'existe pas`);
    }

    editTodo(id,newtodo: Partial<EditTodoDto>) : TodoModel{
        const todo=this.getTodoById(id);
        todo.description=newtodo.description? newtodo.description : todo.description;
        todo.name=newtodo.name? newtodo.name : todo.name;
        return todo;
    }
}
