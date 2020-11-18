export class Video {
  constructor(id) {
    this.id = id
  }

  static fromJSON(videoJSON) { return Object.assign(new Video(), videoJSON) }

}