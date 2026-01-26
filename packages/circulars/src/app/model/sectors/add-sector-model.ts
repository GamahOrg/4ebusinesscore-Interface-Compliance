export class SectorModel {
  id: string;
  nameAr: string;
  nameEn: string;
  description: string;

  constructor(nameAr: string, nameEn: string, description: string, id: string) {
    this.id = id;
    this.nameAr = nameAr;
    this.nameEn = nameEn;
    this.description = description;
  }
}
