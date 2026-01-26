export class AuthorsModel {
    id: string;
    nameAr: string;
    nameEn: string;
    email: string;
    state:number;
    address: string;
    phoneNumber: string;
    jobTitle : string;
    jobLocation : string;
    isPublisher?:boolean;
  
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
      isPublisher:boolean=false
      
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
      this.isPublisher=isPublisher
      
      
    }
  }