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

 

    
class UserQuery {

	Connection c = new ConexionMariaDB().conectar()

	def insertUser(User user) {
    
		var PreparedStatement stmt = c.prepareStatement("INSERT INTO user
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
		}  
			
		   
	}
	

	

	def loginUser(String _username, String _password) {

		var PreparedStatement stmt = c.prepareStatement("SELECT * FROM user
 		WHERE username= ? and password= ?")
		stmt.setString(1, _username)
		stmt.setString(2, _password)
		val rs = stmt.executeQuery
		rs.next

		new User() => [
			id = rs.getInt("id")
			username = rs.getString("username")
			name = rs.getString("name")
			surname = rs.getString("surname")
			dni = rs.getInt("dni")
			email = rs.getString("email")
		]
	}

	

	def updateUser(User user) {

		var PreparedStatement stmt = c.prepareStatement("UPDATE user SET name = ?, surname  = ?,
        password  = ? , dni  = ?, email  = ? WHERE username = ? ")

		stmt.setString(1, user.name)
		stmt.setString(2, user.surname)
		stmt.setString(3, user.password)
		stmt.setInt(4, user.dni)
		stmt.setString(5, user.email)
		stmt.setString(6, user.username)

		val rs = stmt.executeQuery

		var PreparedStatement state = c.prepareStatement("COMMIT ")
		val rs2 = stmt.executeQuery

	}

	def deleteUser(User user) {

		var PreparedStatement stmt3 = c.prepareStatement("DELETE survey FROM survey INNER JOIN user ON survey.user_id= user.id WHERE user.id 
           IN (SELECT id FROM user WHERE username= ? )")

		stmt3.setString(1, user.username)
		val rs1 = stmt3.executeQuery

		var PreparedStatement stmt2 = c.prepareStatement("DELETE download FROM download INNER JOIN user ON download.user_id= user.id WHERE user.id 
           IN (SELECT id FROM user WHERE username= ? )")

		stmt2.setString(1, user.username)
		val rs2 = stmt2.executeQuery

		var PreparedStatement stmt = c.prepareStatement("DELETE FROM user WHERE username = ? ")

		stmt.setString(1, user.username)
		val rs = stmt.executeQuery

	}

}
