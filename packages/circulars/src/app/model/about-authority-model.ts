
export class AboutAuthorityModel {
    about:string;
    vision:string;
    message:string;
    goals:string;
  
  
    constructor(
        about:string = "",
        vision:string = "",
        message:string = "",
        goals:string = "",
      
    ) {
 this.about = about;
 this.vision =vision;
 this.message = message;
 this.goals = goals;
      
      
    }
  }