import { State } from "../partials/response-status";

export class NewsModel {
    id: string;
    title: string;
    description: string;
    brief: string;
    startDate: Date;
    createdOn: string;
    isPublished : State
    
  
    constructor(
      id: string = '',
      title: string = '',
      description: string = '',
      brief: string = '',
      startDate: Date = new Date(),
      createdOn: string = '',
      isPublished: State 
      
    ) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.brief = brief;
      this.startDate = startDate;
      this.createdOn = createdOn;
      this.isPublished = isPublished;
      
      
      
    }
  }