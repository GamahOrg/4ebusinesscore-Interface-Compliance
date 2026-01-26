export class BasicDetailsModel {
  authorityLogo: any;
  nameAr: string;
  nameEn: string;
  phoneNumber: string;
  email: string;
  website: string;
  addressArabic: string;
  addressEnglish: string;
  aboutArabic: string;
  aboutEnglish: string;

  constructor(
    authorityLogo: any = "",
    nameAr: string = "",
    nameEn: string = "",
    phoneNumber: string = "",
    email: string = "",
    website: string = "",
    addressArabic: string = "",
    addressEnglish: string = "",
    aboutArabic: string = "",
    aboutEnglish: string=""
  ) {
    this.aboutArabic = aboutArabic;
    this.aboutEnglish = aboutEnglish;
    this.addressArabic = addressArabic;
    this.addressEnglish = addressEnglish;
    this.authorityLogo = authorityLogo;
    this.email = email;
    this.nameAr = nameAr;
    this.nameEn = nameEn;
    this.phoneNumber = phoneNumber;
    this.website = website;
  }
}
