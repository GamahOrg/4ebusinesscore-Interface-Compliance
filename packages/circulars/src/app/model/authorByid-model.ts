export class AuthorByIdModel {
    id: string;
    nameAr: string;
    nameEn: string;
    email: string;
    state:number;
    address: string;
    phoneNumber: string;
    jobTitle : string;
    jobLocation : string;
    
  
    constructor(
      id: string = '',
      nameAr: string = '',
      nameEn: string = '',
      email: string = '',
      state:number,
      address: string = '',
      phoneNumber: string = '',
      jobTitle: string = '',
      jobLocation: string = '',
       
      
    ) {
      this.id = id;
      this.nameAr = nameAr;
      this.nameEn = nameEn;
      this.email = email;
      this.state = state;
      this.address = address;
      this.phoneNumber = phoneNumber;
      this.jobTitle = jobTitle;
      this.jobLocation = jobLocation;
      
      
      
    }
  }