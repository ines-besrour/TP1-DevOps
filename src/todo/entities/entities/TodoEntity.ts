import { IsIn } from 'class-validator';
import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import { DateEntity } from './DateEntity';


@Entity('todo')
export class TodoEntity extends DateEntity{
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
