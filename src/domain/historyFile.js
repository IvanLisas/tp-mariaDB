export class HistoryFile {
    constructor(historyID, fileID) {
      this.historyID = historyID
      this.fileID = fileID
    }
  
    static fromJSON(historyFiletJSON) { return Object.assign(new HistoryFile(), historyFiletJSON) }
  
  }