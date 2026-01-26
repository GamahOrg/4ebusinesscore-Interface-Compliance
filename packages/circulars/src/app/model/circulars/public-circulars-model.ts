export class PublicCircularModel {
  id: string;
  name: string;
  nameEn: string;
  number: number;
  approval: string;
  accreditationDate: Date;
  fromDate: Date;
  toDate: Date;
  publicationType: number;
  isArchived: boolean;
  ispublished: boolean;
  source: string;
  issuer: string;
  orgs: string[];
  users: string[];
  orgsConcerned: any;
  issuerNameAr: string;
  issuerNameEn: string;

  constructor(
    id: string = "",
    name: string = "",
    nameEn: string = "",
    number: number = 0,
    approval: string = "",
    accreditationDate: Date = new Date(),
    fromDate: Date = new Date(),
    toDate: Date = new Date(),
    publicationType: number = 0,
    isArchived: boolean = false,
    ispublished: boolean = false,
    source: string = "",
    issuer: string = "",
    orgs: string[] = [],
    users: string[] = [],
    orgsConcerned: any = [],
    issuerNameAr: string = "",
    issuerNameEn: string = ""
  ) {
    this.id = id;
    this.name = name;
    this.nameEn = nameEn;
    this.number = number;
    this.approval = approval;
    this.accreditationDate = accreditationDate;
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.publicationType = publicationType;
    this.isArchived = isArchived;
    this.ispublished = ispublished;
    this.source = source;
    this.issuer = issuer;
    this.orgs = orgs;
    this.users = users;
    this.orgsConcerned = orgsConcerned;
    this.issuerNameAr = issuerNameAr;
    this.issuerNameEn = issuerNameEn;
  }
}
