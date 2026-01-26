export class EventAttachmentsModel {
  id: string;
  imagePath: string;
  constructor(id: string = "", imagePath: string = "") {
    this.id = id;
    this.imagePath = imagePath;
  }
}
