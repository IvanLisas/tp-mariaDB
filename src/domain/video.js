export class Video {
    constructor(fileID, title, type, date, author) {
      this.fileID = fileID
      this.title = title
      this.type = type
      this.date = date
      this.author = author
    }
  
    static fromJSON(videoJSON) { return Object.assign(new Video(), videoJSON) }
  
  }