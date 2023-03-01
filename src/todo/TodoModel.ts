import { IsIn } from "class-validator";

export enum TodoStatus {
    EnAttente = "En attente",
    EnCours = "En cours",
    Finalise = "Finalisé"
  }


export class TodoModel {
    id: string;
    name: string;
    description: string;
    createdDate: Date;
    @IsIn(['En Attente','En Cours','Finalisé'])
    status: string;

    constructor(id: string,createdDate: Date, status: TodoStatus) {
      this.id = id;
      this.createdDate = createdDate;
      this.status = status;
    }


  }