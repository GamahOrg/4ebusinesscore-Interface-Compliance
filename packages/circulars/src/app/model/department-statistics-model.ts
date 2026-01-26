export class DepartmentStatisticsModel {
  categoryId: string;
  numberOfOrgs: number;
  nameAr: string;
  nameEn: string;
  organizationMembers: number;
  constructor(
    categoryId: string = "",
    numberOfOrgs: number = 0,
    nameAr: string = "",
    nameEn: string = "",
    organizationMembers: number = 0
  ) {
    this.categoryId = categoryId;
    this.numberOfOrgs = numberOfOrgs;
    this.nameAr = nameAr;
    this.nameEn = nameEn;
    this.organizationMembers = organizationMembers;
  }
}
