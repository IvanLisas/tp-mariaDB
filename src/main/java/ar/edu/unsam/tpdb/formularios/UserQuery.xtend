package ar.edu.unsam.tpdb.formularios

import ar.edu.unsam.tpdb.database.ConexionMariaDB
import ar.edu.unsam.tpdb.domain.User
import ar.edu.unsam.tpdb.domain.Download
import ar.edu.unsam.tpdb.domain.File
import java.sql.Connection
import java.sql.PreparedStatement
import java.time.LocalDateTime
import java.util.ArrayList
import java.util.List
import ar.edu.unsam.tpdb.domain.BusinessException
import java.sql.SQLException
import ar.edu.unsam.tpdb.domain.Reproduction
import ar.edu.unsam.tpdb.domain.Category
import ar.edu.unsam.tpdb.domain.Action
import java.security.MessageDigest
import java.security.SecureRandom
import java.security.NoSuchAlgorithmException
import java.sql.ResultSet

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

	def updateUser(User user) {

		var c = cx.conectar()
		var PreparedStatement stmt = null
		try {
			stmt = c.prepareStatement("UPDATE user SET name = ?, surname  = ?,
            password  = ? , dni  = ?, email  = ? WHERE username = ? ")

			stmt.setString(1, user.name)
			stmt.setString(2, user.surname)
			stmt.setString(3, new Encriptar().encriptarContenido(user.password))
			stmt.setInt(4, user.dni)
			stmt.setString(5, user.email)
			stmt.setString(6, user.username)
			stmt.executeQuery
		} finally {
			if (stmt !== null) {
				stmt.close();
			}
			cx.desconectar(c)
		}
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
	
//	def updateUser(User user) {
//
//		var c = cx.conectar()
//		var PreparedStatement stmt = null
//		val hashPassword = new Encriptar().encriptarContenido(user.password)
//		try {
//			println(user.dni)
//			val query = 'UPDATE user SET name = "' + user.name + '", surname  = "' + user.surname + '",
//            password  = "' + hashPassword + '", dni  = "' + user.dni + '", email  = "' + user.email + '" 
//			WHERE username = "' + user.username + '"'
//			println(query)
//			stmt = c.prepareStatement(query)
//			stmt.executeQuery()
//			
//
//		} finally {
//			if (stmt !== null) {
//				stmt.close();
//			}
//			cx.desconectar(c)
//		}
//	}
	
	
}

