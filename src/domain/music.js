export class Music {
  constructor(id) {
    this.id = id
  }

  static fromJSON(musicJSON) { return Object.assign(new Music(), musicSON) }

}