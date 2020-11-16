export class History {
    constructor(historyID, author, fileID, userId, type, title, date) {
      this.historyID = historyID
      this.author = author
      this.fileID = fileID
      this.userId = userId
      this.type = type
      this.title = title
      this.date = date
    }
  
    static fromJSON(historyJSON) { return Object.assign(new History(), historyJSON) }
  
  }