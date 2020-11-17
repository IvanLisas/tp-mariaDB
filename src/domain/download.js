export class Download {
    constructor(historyID, transferSpeed, downloadID, user) {
      this.historyID = historyID
      this.transferSpeed = transferSpeed
      this.downloadID = downloadID
      this.user = user
    }
  
    static fromJSON(downloadJSON) { return Object.assign(new Download(), downloadJSON) }
  
  }