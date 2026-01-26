export class UsersAggModel {
    id:string;
    userId: string;
    orgId: string;
    imgUrl: string;
    userName: string;
    orgNameAr: string;
    orgNameEn: string;
    forthName: string;
    thirdName: string;
    fisrtName: string;
    secondName: string;
    imageUrl: string;
    email: string;
    userGender: number;
    constructor(
      id:string="",
      userId: string = "",
      orgId: string = "",
      imgUrl: string = "",
      userName: string = "",
      orgNameAr: string = "",
      orgNameEn: string = "",
      forthName: string = "",
      thirdName: string = "",
      fisrtName: string = "",
      secondName: string = "",
      imageUrl: string = "",
      email: string = "",
      userGender: number = 0
    ) {
      this.userName=userName;
      this.id=id;
      this.email = email;
      this.fisrtName = fisrtName;
      this.forthName = forthName;
      this.imageUrl = imageUrl;
      this.imgUrl = imgUrl;
      this.orgId = orgId;
      this.orgNameAr = orgNameAr;
      this.orgNameEn = orgNameEn;
      this.secondName = secondName;
      this.thirdName = thirdName;
      this.userGender = userGender;
      this.userId = userId;
    }
  }
  