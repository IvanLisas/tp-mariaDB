
export class User {
  constructor(username, surname, name, dni, email, password, date) {
    this.username = username
    this.surname = surname
    this.date = date
    this.dni = dni
    this.email = email
    this.name = name
    this.password = password
  }

  static fromJSON(userJSON) { return Object.assign(new User(), userJSON) }

}