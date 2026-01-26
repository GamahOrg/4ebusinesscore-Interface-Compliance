export class QuickAccessModel {
    id: string;
    createdBy: string; 
    creator: string;
    noteNameAr: string;
    description: string;
    noteNameEn: string;
    icon: string;
    color: number;
    updatedOn: Date;
    createdOn: Date;
    isChecked: boolean;
    workspaceId: string;
  
    constructor(
      id: string,
      createdBy: any,
      creator: string,
      noteNameAr: string,
      description: string,
      noteNameEn: string,
      icon: string,
      color: number,
      updatedOn: Date,
      createdOn: Date,
      isChecked: boolean,
      workspaceId: string
    ) {
      this.id = id;
      this.createdBy = createdBy;
      this.creator = creator;
      this.noteNameAr = noteNameAr;
      this.description = description;
      this.noteNameEn = noteNameEn;
      this.icon = icon;
      this.color = color;
      this.updatedOn = updatedOn;
      this.createdOn = createdOn;
      this.isChecked = isChecked;
      this.workspaceId = workspaceId;
    }
  }
  

  