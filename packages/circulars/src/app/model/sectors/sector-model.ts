export class SectorModel {
  id: string;
  nameAr: string;
  nameEn: string;
  createdOn: string;
  index: number;

  constructor(
    id: string,
    nameAr: string,
    nameEn: string,
    createdOn: string,
    index: number
  ) {
    this.id = id;
    this.nameAr = nameAr;
    this.nameEn = nameEn;
    this.createdOn = createdOn;
    this.index = index;
  }
}
