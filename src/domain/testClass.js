export class Test {
  constructor(value) {
    this.value = value
  }

  static fromJSON(testJSON) { return Object.assign(new Test(), testJSON) }

}