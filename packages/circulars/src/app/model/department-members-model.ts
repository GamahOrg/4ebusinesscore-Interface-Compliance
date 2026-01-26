import { EntityMember } from "../enums/enums-members";

export class BoardMembersModel {
  id: string;
  userImage: string;
  fullName: string;
  email: string;
  lK_Position: PositionLookupModel;
  job: string;
  destinationName: string;
  startDate: Date;
  endDate: Date;
  memberword: string;
  entityMember: EntityMember;
  isInternal: boolean;
  isPreviouseMemeber: boolean;
  memberSocialMedia: MemberSocialMediaLookupModel[];
  constructor(
    id: string = "",
    userImage: string = "",
    fullName: string = "",
    email: string = "",
    lK_Position: PositionLookupModel = new PositionLookupModel(),
    job: string = "",
    destinationName: string = "",
    startDate: Date = new Date(),
    endDate: Date = new Date(),
    memberword: string = "",
    entityMember: EntityMember = 0,
    isInternal: boolean = false,
    isPreviouseMemeber: boolean = false,
    memberSocialMedia: MemberSocialMediaLookupModel[] = []
  ) {
    this.id = id;
    this.userImage = userImage;
    this.fullName = fullName;
    this.email = email;
    this.lK_Position = lK_Position;
    this.job = job;
    this.destinationName = destinationName;
    this.startDate = startDate;
    this.endDate = endDate;
    this.memberword = memberword;
    this.entityMember = entityMember;
    this.isInternal = isInternal;
    this.isPreviouseMemeber = isPreviouseMemeber;
    this.memberSocialMedia = memberSocialMedia;
  }
}

export class PositionLookupModel {
  id:string;
  nameAr: string;
  nameEn: string;
  lK_PositionId?:string
  constructor(id:string = "",nameAr: string = "", nameEn: string = "",lK_PositionId:string="") {
    this.nameAr = nameAr;
    this.nameEn = nameEn;
    this.id=id;
    this.lK_PositionId=lK_PositionId
  }
}

export class MemberSocialMediaLookupModel {
  id: string;
  nameEn: string;
  nameAr: string;
  link: string;
  constructor(
    id: string = "",
    nameEn: string = "",
    nameAr: string = "",
    link: string = ""
  ) {
    this.id = id;
    this.nameEn = nameEn;
    this.nameAr = nameAr;
    this.link = link;
  }
}
