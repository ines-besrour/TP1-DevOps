import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { AddTodoDto } from './dto/add-todo.dto';
import { TodoModel, TodoStatus } from './TodoModel';
import { EditTodoDto } from './dto/edit-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './entities/entities/TodoEntity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { PaginationDto } from './dto/pagination-dto';
import { SearchTodoDto } from './dto/search-todo-dto';

class APIfeatures {
    constructor(
      public query: SelectQueryBuilder<TodoEntity>,
      private queryString: PaginationDto,
    ) {}
  
    paginating() {
      const page = this.queryString.page || 1;
      const limit = this.queryString.limit || 20;
      const skip = (page - 1) * limit;
      this.query = this.query.offset(skip).limit(limit);
      return this;
    }
  }

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(TodoEntity)
        private TodoRepository: Repository<TodoEntity>
    ){}



    @Inject('UUID') uuid: () => string;
    private todos: TodoModel[] = [];

    
/*    async getTodos(): Promise<TodoEntity[]>{
        return await this.TodoRepository.find();
    } */

    async getTodos({ data, status, page, limit }: SearchTodoDto) {
        const qb = this.TodoRepository.createQueryBuilder('todo');
        const pagination = { page, limit };
        if (data) {
          // look if data is found in name or description
          qb.where('todo.name LIKE :data', { data: `%${data}%` }).orWhere(
            'todo.description LIKE :data',
            { data: `%${data}%` },
          );
        }
        if (status) {
          qb.andWhere('todo.status = :status', { status });
        }
        const feature = new APIfeatures(qb, pagination).paginating();
        return await feature.query.getMany();
      }


    async  addTodoBD(todoData : AddTodoDto) : Promise<TodoEntity>{
        return await this.TodoRepository.save(todoData);
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

    async getTodoById(id):Promise<TodoEntity[]>{
        const todo=this.TodoRepository.findByIds(id)
        if(! todo){
            throw new NotFoundException("ce todo n'existe pas");
        }
        return await this.TodoRepository.findByIds(id);
    }

    async deleteTodoById(id){
        return await this.TodoRepository.delete(id);
    }

    async editTodo(id,todo: Partial<EditTodoDto>) : Promise<TodoEntity>{
        const newtodo= await this.TodoRepository.preload({
            id,
            ...todo
        })
        return await this.TodoRepository.save(newtodo);
    }

    async softDeleteTodo(id){
        return await this.TodoRepository.softDelete(id);
    }

    async restoreTodo(id) {
        return this.TodoRepository.restore(id);
    }

    async nbTodoByState() {
        // Créer un queryBuilder
        const qb = this.TodoRepository.createQueryBuilder("todo");
        // Chercher le nombre de cv par age
          qb.select("todo.status, count(todo.id) as nombreDeTodo")
          .groupBy("todo.status");
          console.log(qb.getSql());
          return await qb.getRawMany();
      }
}
