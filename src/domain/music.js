export class Music {
    constructor(fileID, title, type, date, author) {
      this.fileID = fileID
      this.title = title
      this.type = type
      this.date = date
      this.author = author
    }
  
    static fromJSON(musicJSON) { return Object.assign(new Music(), musicSON) }
  
  }