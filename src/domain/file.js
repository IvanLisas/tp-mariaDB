export class File {
    constructor(fileID, size, extension, type, uploadDate) {
      this.fileID = fileID
      this.size = size
      this.extension = extension
      this.type = type
      this.uploadDate = uploadDate
    }
  
    static fromJSON(fileJSON) { return Object.assign(new File(), fileJSON) }
  
  }