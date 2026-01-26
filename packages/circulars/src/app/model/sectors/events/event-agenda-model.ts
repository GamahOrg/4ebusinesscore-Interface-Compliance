import { TimePeriodModel } from "./time-period-model";

export class EventAgendaModel {
  // id: string;
  startDate: string;
  endDate: string;
  timePeriods: TimePeriodModel[];
  constructor(
    // id: string="",
    startDate: string = "",
    endDate: string = "",
    timePeriods: TimePeriodModel[] = []
  ) {
    // this.id=id;
    this.startDate = startDate;
    this.endDate = endDate;
    this.timePeriods = timePeriods;
  }
}
