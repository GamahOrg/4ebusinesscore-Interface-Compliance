export class SectorByIdModel {
  id: string;
  nameAr: string;
  nameEn: string;
  createdOn: string;
  index: number;
  description: string;
  constructor(
    id: string,
    nameAr: string,
    nameEn: string,
    createdOn: string,
    index: number,
    description: string
  ) {
    this.id = id;
    this.nameAr = nameAr;
    this.nameEn = nameEn;
    this.createdOn = createdOn;
    this.index = index;
    this.description = description;
  }
}
