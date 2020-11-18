export class File {
  constructor(id, title, extension_type, publish_date, type) {
    this.id = id
    this.title = title
    this.extension_type = extension_type
    this.publish_date = publish_date
    this.type = type
  }



  static fromJSON(fileJSON) { return Object.assign(new File(), fileJSON) }

}