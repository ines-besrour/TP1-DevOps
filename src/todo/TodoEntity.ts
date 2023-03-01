import { IsIn } from 'class-validator';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('todo')
export class TodoEntity extends Date{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column()
    description: string;

    @Column()
    @IsIn(['En Attente','En Cours','Finalisé'])
    status: string;
 

}
