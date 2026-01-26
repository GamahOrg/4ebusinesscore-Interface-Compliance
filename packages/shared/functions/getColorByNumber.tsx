export const getColorByNumber = (number :any) => {
    switch (true) {
      case (number >= 1 && number <= 2):
        return '#4A9D13'; 
  
      case (number >= 3 && number <= 4):
        return '#89DE00'; 
  
      case (number >= 5 && number <= 9):
        return '#F8E72F'; 
  
      case (number >= 10 && number <= 16):
        return '#FF9D00'; 
  
      case (number >= 17 && number <= 25):
        return '#F14141'; 
  
      default:
        return 'disastrous'; 
    }
  }
  