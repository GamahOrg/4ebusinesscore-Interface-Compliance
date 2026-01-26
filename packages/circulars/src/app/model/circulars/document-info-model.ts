export class DocumentInfoModel {
  id: string;
  accreditation: string;
  documentNumber: number;
  issuer: string;
  documentClass: string;
  accreditationDate: string;
  enforcement: string;
  source: string;
  editionNumber: number;
  editionDate: string;
  documentAbout: string;
  CircularId: string;

  constructor(
    id: string = "",
    accreditation: string = "",
    documentNumber: number = 0,
    issuer: string = "",
    documentClass: string = "",
    accreditationDate: string = "",
    enforcement: string = "",
    source: string = "",
    editionNumber: number = 0,
    editionDate: string = "",
    documentAbout: string = "",
    CircularId: string = ""
  ) {
    this.id = id;
    this.accreditation = accreditation;
    this.documentNumber = documentNumber;
    this.issuer = issuer;
    this.documentClass = documentClass;
    this.accreditationDate = accreditationDate;
    this.enforcement = enforcement;
    this.source = source;
    this.editionNumber = editionNumber;
    this.editionDate = editionDate;
    this.documentAbout = documentAbout;
    this.CircularId = CircularId;
  }
}
