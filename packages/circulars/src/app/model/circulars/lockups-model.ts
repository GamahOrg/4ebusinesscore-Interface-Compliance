export class LookupModel {
  id: string;
  nameEn: string;
  nameAr: string;

  constructor(id: string = "", nameEn: string = "", nameAr: string = "") {
    this.id = id;
    this.nameAr = nameAr;
    this.nameEn = nameEn;
  }
}
