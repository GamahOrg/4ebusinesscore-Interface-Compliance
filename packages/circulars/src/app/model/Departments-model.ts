export class OrgHierarchyDefinationModel {
  orgId: string;
  orgNameAr: string;
  orgNameEn: string;
  checkRequesterForm: string;
  parentId: string;
  mainImage:string;
  description:string;
  slogan:string;
  attachment:string;
  subOrgs: OrgHierarchyDefinationModel[];
  requesterForm: string;
  constructor(
    orgId: string ="" ,
    orgNameAr: string ="",
    orgNameEn: string ="",
    checkRequesterForm: string ="",
    parentId: string ="",
    subOrgs: OrgHierarchyDefinationModel[] = [],
    requesterForm: string = "",
    description: string= "",
    mainImage: string= "",
    attachment: string= "",
    slogan: string= "",
  ) {
    this.orgId = orgId ;
    this.orgNameAr = orgNameAr ;
    this.orgNameEn = orgNameEn ;
    this.checkRequesterForm = checkRequesterForm ;
    this.parentId = parentId ;
    this.subOrgs = subOrgs;
    this.requesterForm = requesterForm;
    this.description = description;
    this.mainImage = mainImage;
    this.attachment = attachment;
    this.slogan = slogan;
  }
}
