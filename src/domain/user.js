
export class User {
    constructor(username, surname, registrationDate, dni, email, password)  {
      this.username = username
      this.surname = surname
      this.registrationDate = registrationDate
      this.dni = dni
      this.email = email
      this.password = password
    }
  
    static fromJSON(userJSON) { return Object.assign(new User(), userJSON) }
  
  }