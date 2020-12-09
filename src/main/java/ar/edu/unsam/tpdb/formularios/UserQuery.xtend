package ar.edu.unsam.tpdb.formularios

import ar.edu.unsam.tpdb.database.ConexionMariaDB
import ar.edu.unsam.tpdb.domain.Encriptar
import ar.edu.unsam.tpdb.domain.User
import java.sql.PreparedStatement
import java.sql.SQLException

class UserQuery {

	ConexionMariaDB cx = new ConexionMariaDB()

	def insertUser(User user) {
		var c = cx.conectar()
		var PreparedStatement stmt = null
		try {
			stmt = c.prepareStatement("INSERT INTO user
 		(`name`, `surname`, `username`, `password`, `dni`, `email`) 
		VALUES (?, ?, ?, ?, ?, ?)")
			stmt.setString(1, user.name)
			stmt.setString(2, user.surname)
			stmt.setString(3, user.username)
			val encriptar = new Encriptar().encriptarContenido(user.password)
			stmt.setString(4, encriptar)
			stmt.setInt(5, user.dni)
			stmt.setString(6, user.email)
			stmt.executeUpdate
		} finally {
			if (stmt !== null) {
				stmt.close();
			}
			cx.desconectar(c)
		}
	}

	def loginUser(String _username, String _password) {
		var c = cx.conectar();
		var PreparedStatement stmt = null;
		var user = new User()
		try {
			val query = 'SELECT * FROM user WHERE username ="' + _username + '" and 
        password="' + new Encriptar().encriptarContenido(_password) + '" and isDeleted = 0'
			stmt = c.prepareStatement(query)
			val rs = stmt.executeQuery()
			rs.next
			user = new User() => [
				id = rs.getInt("id")
				username = rs.getString("username")
				name = rs.getString("name")
				surname = rs.getString("surname")
				dni = rs.getInt("dni")
				email = rs.getString("email")
			]
			rs.close();
		} finally {
			if (stmt !== null) {
				stmt.close();
			}

			cx.desconectar(c)
		}
		user
	}

	def deleteUser(User user) {
		var c = cx.conectar()
		var PreparedStatement stmt = null
		try {
			val query = 'UPDATE user SET isDeleted = 1 WHERE username ="' + user.username + '"'
			stmt = c.prepareStatement(query)
			stmt.executeQuery()
		} finally {
			if (stmt !== null) {
				stmt.close();
			}
			cx.desconectar(c)
		}
	}

	def updateUser(int user_id, User user) {

		var c = cx.conectar()
		var PreparedStatement stmt = null
		var PreparedStatement stmt2 = null
		var userTo = new User()
		try {
			val query = 'UPDATE user SET name = "' + user.name + '", username  = "' + user.username +
				'", surname  = "' + user.surname + '",
             dni  = ' + user.dni as int + ', email  = "' + user.email + '"  
			where id = ' + user_id

			stmt = c.prepareStatement(query)
			stmt.executeQuery()

			val query2 = 'SELECT * FROM user WHERE username ="' + user.username + '"'
			stmt2 = c.prepareStatement(query2)

			val rs = stmt2.executeQuery()
			rs.next
			userTo = new User() => [
				id = rs.getInt("id")
				username = rs.getString("username")
				name = rs.getString("name")
				surname = rs.getString("surname")
				dni = rs.getInt("dni")
				email = rs.getString("email")
			]
			rs.close();

		} finally {
			if (stmt !== null) {
				stmt.close();
				stmt2.close();
			}
			cx.desconectar(c)
		}
		userTo
	}

	def updatePassword(int user_id, String oldPassword, String newPassword) {
		var c = cx.conectar()
		var PreparedStatement stmt = null
		val oldHashedPassword = new Encriptar().encriptarContenido(oldPassword)
		val newHashedPassword = new Encriptar().encriptarContenido(newPassword)
		try {
			val query = 'UPDATE user SET password = "' + newHashedPassword + '" where id = ' + user_id +
				' and password = "' + oldHashedPassword + '"'
				println(query)
			stmt = c.prepareStatement(query)
			if(stmt.executeUpdate == 0) throw new SQLException('Contraseña Incorrecta')

		} finally {
			if (stmt !== null) {
				stmt.close();

			}
			cx.desconectar(c)
		}
	}
}
