export class CircularRelatedDocumentModel {
  id: string;
  circularId: string;
  relatedDocumentId: string;
  circularName: string;
  circularNumber: number;
  date: Date;
  constructor(
    id: string = "",
    circularId: string = "",
    relatedDocumentId: string = "",
    circularName: string = "",
    circularNumber: number = 0,
    date: Date = new Date()
  ) {
    this.id = id;
    this.circularId = circularId;
    this.relatedDocumentId = relatedDocumentId;
    this.circularName = circularName;
    this.circularNumber = circularNumber;
    this.date = date;
  }
}
