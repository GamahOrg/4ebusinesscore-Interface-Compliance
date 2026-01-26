export class OrgDataModel {
  orgId: string;
  orgNameEn: string;
  orgNameAr: string;

  constructor(
    orgId: string = "",
    orgNameEn: string = "",
    orgNameAr: string = ""
  ) {
    this.orgId = orgId;
    this.orgNameEn = orgNameEn;
    this.orgNameAr = orgNameAr;
  }
}
export class UserDataModel {
  userId: string;
  fullName: string;

  constructor(userId: string = "", fullName: string = "") {
    this.userId = userId;
    this.fullName = fullName;
  }
}
export class AttachmentModel {
  filePath: string;
  fileName: string;

  constructor(filePath: string, fileName: string) {
    this.filePath = filePath;
    this.fileName = fileName;
  }
}
export class OrgConcernModel {
  orgConcernedId: string;
  orgConcernedNameAr: string;
  orgConcernedNameEn: string;

  constructor(
    orgConcernedId: string = "",
    orgConcernedNameAr: string = "",
    orgConcernedNameEn: string = ""
  ) {
    this.orgConcernedId = orgConcernedId;
    this.orgConcernedNameAr = orgConcernedNameAr;
    this.orgConcernedNameEn = orgConcernedNameEn;
  }
}
export class CircularModel {
  name: string;
  number: number;
  accreditationDate: Date;
  approvalId: string;
  approvalNameAr: string;
  approvalNameEn: string;
  enforcementId: string;
  enforcementNameAr: string;
  enforcementNameEn: string;
  approval: string;
  documentClass: string;
  documentAbout: string;
  documentAboutEn: string;
  fromDate: Date;
  toDate: Date;
  details: string;
  publicationType: number;
  isArchived: boolean;
  ispublished: boolean;
  attachments: AttachmentModel[];
  issuerId: string;
  issuerNameEn: string;
  issuerNameAr: string;
  orgsConcernedData: OrgConcernModel[];
  users: string[];
  orgs: string[];
  orgsData: OrgDataModel[];
  userData: UserDataModel[];
  accreditationDateHijri: string;
  nameEn: string;
  constructor(
    name: string = "",
    number: number = 0,
    approvalId: string = "",
    approval: string = "",
    documentAbout: string = "",
    documentAboutEn: string = "",
    documentClass: string = "",
    accreditationDate: Date = new Date(),
    fromDate: Date = new Date(),
    toDate: Date = new Date(),
    details: string = "",
    issuerId: string = "",
    publicationType: number = 0,
    isArchived: boolean = false,
    ispublished: boolean = false,
    attachments: AttachmentModel[] = [],
    users: string[] = [],
    orgs: string[] = [],
    orgsConcernedData: OrgConcernModel[] = [],
    orgsData: OrgDataModel[] = [],
    userData: UserDataModel[] = [],
    approvalNameAr: string = "",
    approvalNameEn: string = "",
    enforcementId: string = "",
    enforcementNameAr: string = "",
    enforcementNameEn: string = "",
    issuerNameAr: string = "",
    issuerNameEn: string = "",
    accreditationDateHijri: string = "",
    nameEn: string = ""
  ) {
    this.name = name;
    this.number = number;
    this.approvalId = approvalId;
    this.approval = approval;
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.details = details;
    this.issuerId = issuerId;
    this.publicationType = publicationType;
    this.isArchived = isArchived;
    this.ispublished = ispublished;
    this.attachments = attachments;
    this.users = users;
    this.orgs = orgs;
    this.orgsData = orgsData;
    this.userData = userData;
    this.documentAbout = documentAbout;
    this.documentAboutEn = documentAboutEn;
    this.documentClass = documentClass;
    this.issuerId = issuerId;
    this.orgsConcernedData = orgsConcernedData;
    this.approvalNameAr = approvalNameAr;
    this.approvalNameEn = approvalNameEn;
    this.enforcementId = enforcementId;
    this.enforcementNameAr = enforcementNameAr;
    this.enforcementNameEn = enforcementNameEn;
    this.issuerNameAr = issuerNameAr;
    this.issuerNameEn = issuerNameEn;
    this.accreditationDate = accreditationDate;
    this.accreditationDateHijri = accreditationDateHijri;
    this.nameEn = nameEn;
  }
}
