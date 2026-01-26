export class PostNewsModel {
   
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
    
    
  
    constructor(
      
      title: string ,
      description: string,
      brief: string ,
      mainImageUrl: string ,
      newsSubImages: string ,
      sectorId: string ,
      authorId: string ,
      isArchive: boolean ,
      isMainNews: boolean ,
      newsStatus: number ,
      startDate: Date ,
    
      
    ) {
      
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
      
      
      
      
    }
  }