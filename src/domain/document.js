export class Document {
  constructor(fileID, title, type, date, author) {
    this.fileID = fileID
    this.title = title
    this.type = type
    this.date = date
    this.author = author
  }

  static fromJSON(documentJSON) { return Object.assign(new Document(), documentJSON) }

}