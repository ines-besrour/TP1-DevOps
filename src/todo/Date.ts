import {Column, CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn} from 'typeorm';

@Entity('date')
export class Date{
    @CreateDateColumn()
    @Column({
        update:false
    })
    createdDate: Date;
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
    @DeleteDateColumn()
    @Column()
    deletedAt: Date;
}