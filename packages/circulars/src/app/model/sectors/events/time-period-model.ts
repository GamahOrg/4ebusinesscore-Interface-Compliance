export class TimePeriodModel {
  // id: string;
  startTime: string;
  endTime: string;
  details: string;
  constructor(
    // id: string="",
    startTime: string = "",
    endTime: string = "",
    details: string = ""
  ) {
    // this.id=id;
    this.startTime = startTime;
    this.endTime = endTime;
    this.details = details;
  }
}
