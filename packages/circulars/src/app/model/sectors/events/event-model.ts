import { EventsStatus } from "../../../enums/events";
import { EventAgendaModel } from "./event-agenda-model";
import { EventAttachmentsModel } from "./event-attachments-model";
export class EventModel {
  id: string;
  name: string;
  description: string;
  mainImageUrl: string;
  videoEventUrl: string;
  sectorId: string;
  eventsStatus: EventsStatus;
  startDate: string;
  endDate: string;
  location: string;
  locationDetails: string;
  urlLocation: string;
  registerationUrl: string;
  targetGroup: string;
  isFree: boolean;
  cost: number;
  // eventAgenda: EventAgendaModel[];
  eventAgendas: EventAgendaModel[];
  eventsAttachments: EventAttachmentsModel[];
  createdOn: string;
  isMainEvents: boolean;
  constructor(
    id: string = "",
    name: string = "",
    description: string = "",
    mainImageUrl: string = "",
    videoEventUrl: string = "",
    sectorId: string = "",
    eventsStatus: EventsStatus = 0,
    startDate: string = "",
    endDate: string = "",
    location: string = "",
    locationDetails: string = "",
    urlLocation: string = "",
    registerationUrl: string = "",
    targetGroup: string = "",
    isFree: boolean = true,
    cost: number = 0,
    eventAgendas: EventAgendaModel[] = [],
    eventsAttachments: EventAttachmentsModel[] = [],
    createdOn: string = "",
    isMainEvents: boolean = true
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.mainImageUrl = mainImageUrl;
    this.videoEventUrl = videoEventUrl;
    this.sectorId = sectorId;
    this.eventsStatus = eventsStatus;
    this.startDate = startDate;
    this.endDate = endDate;
    this.location = location;
    this.locationDetails = locationDetails;
    this.urlLocation = urlLocation;
    this.registerationUrl = registerationUrl;
    this.targetGroup = targetGroup;
    this.isFree = isFree;
    this.cost = cost;
    this.eventAgendas = eventAgendas;
    this.eventsAttachments = eventsAttachments;
    this.createdOn = createdOn;
    this.isMainEvents = isMainEvents;
  }
}
