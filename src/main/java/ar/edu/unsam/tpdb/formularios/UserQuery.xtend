package ar.edu.unsam.tpdb.formularios

import ar.edu.unsam.tpdb.database.ConexionMariaDB
import ar.edu.unsam.tpdb.domain.User
import java.sql.PreparedStatement
import java.sql.Connection

class UserQuery {
	Connection c = new ConexionMariaDB().conectar()
	
	def insertUser(User user){
		var PreparedStatement stmt = c.prepareStatement("INSERT INTO user
 		(`name`, `surname`, `username`, `password`, `dni`, `email`) 
		VALUES (?, ?, ?, ?, ?, ?)")
		
		stmt.setString(1, user.name)
		stmt.setString(2, user.surname)
		stmt.setString(3, user.username)
		stmt.setString(4, user.password)
		stmt.setInt(5, user.dni)
		stmt.setString(6, user.email)
		stmt.executeUpdate
	}
}
