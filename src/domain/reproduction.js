export class Reproduction {
    constructor(historyID, startDate, reproductionID, endDate, endDateHour, usedOS) {
      this.historyID = historyID
      this.startDate = startDate
      this.reproductionID= reproductionID
      this.endDate = endDate
      this.endDateHour = endDateHour
      this.usedOS = usedOS
    }
  
    static fromJSON(reproductionJSON) { return Object.assign(new Reproduction(), reproductionJSON) }
  
  }