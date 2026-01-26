export class NewsByIdModel {
  id: string;
  title: string;
  description: string;
  brief: string;
  mainImageUrl: string;
  newsSubImages: string;
  sectorId: string;
  authorId: string;
  startDate: Date;
  isArchive: boolean;
  isMainNews: boolean;
  newsStatus: number;
  newsAttachment: NewsAttachment[];
  authorNameAr: string;
  authorNameEn: string;
  subImages: string[];
  rate: number;
  views: number;
  userRate:number;
  url:string;
  constructor(
    id: string = "",
    title: string = "",
    description: string = "",
    brief: string = "",
    mainImageUrl: string = "",
    newsSubImages: string = "",
    sectorId: string = "",
    authorId: string = "",
    isArchive: boolean,
    isMainNews: boolean,
    newsStatus: number,
    startDate: Date = new Date(),
    newsAttachment: NewsAttachment[] = [],
    authorNameAr: string,
    authorNameEn: string,
    subImages: string[],
    rate: number,
    views: number,
    userRate:number,
    url:string,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.brief = brief;
    this.mainImageUrl = mainImageUrl;
    this.newsSubImages = newsSubImages;
    this.sectorId = sectorId;
    this.authorId = authorId;
    this.isArchive = isArchive;
    this.isMainNews = isMainNews;
    this.newsStatus = newsStatus;
    this.startDate = startDate;
    this.newsAttachment = newsAttachment;
    this.authorNameAr = authorNameAr;
    this.authorNameEn = authorNameEn;
    this.subImages = subImages;
    this.rate = rate;
    this.views = views;
    this.userRate = userRate;
    this.url=url
  }
}
export class NewsAttachment {
  id: string;
  imagePath: string;

  constructor(id: string = "", imagePath: string = "") {
    this.id = id;
    this.imagePath = imagePath;
  }
}
