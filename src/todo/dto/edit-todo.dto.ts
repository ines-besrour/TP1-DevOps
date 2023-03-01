import { IsIn, IsOptional, MaxLength, MinLength } from "class-validator";



export class EditTodoDto{
    @IsOptional()
    @MinLength(3 , {
        message:'la taille minimale est 3'
    })
    @MaxLength(10, {
        message:'la taille maximale est 10'
    })
    name: string;
    @IsOptional()
    @MinLength(10 , {
        message:'la taille minimale est 10'
    })
    @IsOptional()
    description: string;
    @IsOptional()
    @IsIn(['En Attente','En Cours','Finalisé'])
    status: string;
}