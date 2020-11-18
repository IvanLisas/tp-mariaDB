export class Document {
  constructor(id) {
    this.id = id
  }

  static fromJSON(documentJSON) { return Object.assign(new Document(), documentJSON) }

}