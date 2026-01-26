export class PostAuthorModel {
    
    nameAr: string;
    nameEn: string;
    email: string;
    address: string;
    phoneNumber: string;
    jobTitle : string;
    jobLocation : string;
    
  
    constructor(
      
      nameAr: string ,
      nameEn: string ,
      email: string ,
      address: string ,
      phoneNumber: string ,
      jobTitle: string ,
      jobLocation: string ,
       
      
    ) {
     
      this.nameAr = nameAr;
      this.nameEn = nameEn;
      this.email = email;
      this.address = address;
      this.phoneNumber = phoneNumber;
      this.jobTitle = jobTitle;
      this.jobLocation = jobLocation;
      
      
      
    }
  }