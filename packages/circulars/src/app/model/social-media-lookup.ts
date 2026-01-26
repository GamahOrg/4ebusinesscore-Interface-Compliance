export class SocialLookupModel {
    id: string;
    nameAr: string;
    nameEn: string;
    createdOn: string;
  
    constructor(
      id: string,
      nameAr: string,
      nameEn: string,
      createdOn: string,
    ) {
      this.id = id;
      this.nameAr = nameAr;
      this.nameEn = nameEn;
      this.createdOn = createdOn;
    }
  }
  