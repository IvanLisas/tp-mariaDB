
export class User {
  constructor(username, surname, date, dni, email, password) {
    this.username = username
    this.surname = surname
    this.date = date
    this.dni = dni
    this.email = email
    this.password = password
  }

  static fromJSON(userJSON) { return Object.assign(new User(), userJSON) }

}