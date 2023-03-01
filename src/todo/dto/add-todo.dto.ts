import { IsNotEmpty, MaxLength, MinLength } from "class-validator";


export class AddTodoDto{
    @IsNotEmpty()
    @MinLength(3 , {
        message:'la taille minimale est 3'
    })
    @MaxLength(10, {
        message:'la taille maximale est 10'
    })
    name: string;
    @IsNotEmpty()
    @MinLength(10 , {
        message:'la taille minimale est 10'
    })
    description: string;
}