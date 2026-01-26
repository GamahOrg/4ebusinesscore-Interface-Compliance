export class CircularModel {
  id: string;
  name: string;
  number: number;
  approval: string;
  fromDate: Date;
  toDate: Date;
  publicationType: number;
  isArchived: boolean;
  isPublished: boolean;
  source: string;
  issuer: string;
  orgs: string[];
  users: string[];
  accreditationDate:Date;
  orgsConcerned: any;
  issuerNameAr: string;
  issuerNameEn:string;


  constructor(
    id: string = "",
    name: string = "",
    number: number = 0,
    approval: string = "",
    fromDate: Date = new Date(),
    toDate: Date = new Date(),
    publicationType: number = 0,
    isArchived: boolean = false,
    isPublished: boolean = false,
    source: string = "",
    issuer: string = "",
    orgs: string[] = [],
    users: string[] = [],
    accreditationDate: Date = new Date(),
    orgsConcerned: any = [],
              issuerNameAr: string = "",
    issuerNameEn:string = ""

  ) {
    this.id = id;
    this.name = name;
    this.number = number;
    this.approval = approval;
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.publicationType = publicationType;
    this.isArchived = isArchived;
    this.isPublished = isPublished;
    this.source = source;
    this.issuer = issuer;
    this.orgs = orgs;
    this.users = users;
    this.accreditationDate = accreditationDate;
    this.orgsConcerned = orgsConcerned
    this.issuerNameAr= issuerNameAr
    this.issuerNameEn= issuerNameEn
  }
}

export class ConfidentialCircularsModel {
  userId: string;
  fullName: string;
  circulars: CircularModel[];

  constructor(
    userId: string = "",
    fullName: string = "",
    circulars: CircularModel[] = []
  ) {
    this.userId = userId;
    this.fullName = fullName;
    this.circulars = circulars;
  }
}
