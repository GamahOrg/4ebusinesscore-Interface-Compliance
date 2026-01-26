export class SocialsModel {
    id: string;
    nameAr: string;
    nameEn: string;
    link: string;
    lkSocialMediaId: string;
  
    constructor(
      id: string,
      nameAr: string,
      nameEn: string,
      link: string,
      lkSocialMediaId:string
    ) {
      this.id = id;
      this.nameAr = nameAr;
      this.nameEn = nameEn;
      this.link = link;
      this.lkSocialMediaId = lkSocialMediaId
    }
  }
  