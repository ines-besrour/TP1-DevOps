import { OneToMany, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { DateEntity } from 'src/todo/entities/entities/DateEntity';

export enum UserRoleEnum {
  ADMIN= 'admin',
  USER = 'user'
}

@Entity('user')
export class UserEntity extends DateEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    unique: true
  })
  username: string;

  @Column({
    unique: true
  })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  @Exclude()
  salt: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.USER
  })
  role: string;

}